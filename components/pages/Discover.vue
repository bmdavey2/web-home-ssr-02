<template lang="pug">
.xp-discover.container
  .px-4.py-4
    .flex.align-center
      h1.has-text-secondary Community Interests
      .mx-3(style="height: 24px; width: 1px; background: #333")
      div(style="white-space: nowrap; font-size: 13px") {{ selectedCount }} selected

    h2.is-size-5-tablet.is-size-6-mobile.is-size-5.mt-2.mb-3 Selecting community interests is how you tell ActivePlace what you want in your feed. You can come back and adjust your interests any time.

    //.parent-list.flex.align-center.mt-4.mb-2(style="justify-content: center; flex-wrap: wrap")
    //  .parent-tab.is-cursor-pointer.is-user-select-none(
    //    v-for="{ name, count } in parents"
    //    @click="clickParent(name)",
    //    :class="{ selected: isParentSelected(name) }")
    //    span {{ name }}
    //    span.ml-1.count ({{ count }})

  .grid.is-user-select-none
    div(v-for="category in visibleCategories", :key="category.id")
      .item(:class="{ selected: isCategorySelected(category) }" @click="clickCategory(category)")
        .flex.align-center.label
          .flex-grow {{ category.name }}
          .flex-auto
            .icon-button
              b-icon(v-if="isCategorySelected(category)" icon="check-bold" size="is-small")
              b-icon(v-else icon="plus" size="is-small")
        .image(:style="{ backgroundImage: `url(${category.PhotoURL})` }")
    .px-1.py-1
      .box-suggest.px-4.py-4.flex-center(style="height: 100%")
        div
          template(v-if="isSuggestionSent")
            .flex-center
              img(src="~/assets/icons/sucessful.svg")
            .mt-4
              strong THANK YOU FOR YOUR REQUEST!

          template(v-else)
            .header SUGGEST A COMMUNITY INTEREST
            .content.my-3 If you think that a community interest is missing and needs a dedicated home on ActivePlace, please let us know.
            b-input(
              v-model="suggestion"
              placeholder="Start typing..."
              icon-right="arrow-right",
              :disabled="isSuggestionSending",
              :icon-right-clickable="canSubmitSuggestion"
              @icon-right-click="onSubmitSuggestion"
              @keyup.native.enter="onSubmitSuggestion")
</template>

<script>
import gql from 'graphql-tag'
import groupBy from 'lodash/groupBy'
export default {
  name: 'XPDiscover',
  data() {
    return {
      suggestion: '',
      isSuggestionSending: false,
      isSuggestionSent: false,
    }
  },
  computed: {
    canSubmitSuggestion() {
      return !!this.suggestion.trim()
    },
    visibleCategories() {
      const { selectedParent } = this.$store.state.discover
      if (!selectedParent) return this.categories
      return this.categories.filter((x) => x.parent === selectedParent)
    },
    activeCategoryIDs() {
      return this.categories?.filter(this.isCategorySelected)?.map((x) => x.id) || []
    },
    selectedCount() {
      return this.activeCategoryIDs.length
    },
    parents() {
      if (!this.categories) return []
      const grouped = groupBy(this.categories, 'parent')
      const arr = Object.keys(grouped).map((name) => ({ name, count: grouped[name].length }))
      arr.unshift({ name: 'All', count: this.categories.length })
      return arr
    },
  },
  mounted() {
    this.$root.$on('reload', this.reload)
  },
  beforeDestroy() {
    this.$root.$off('reload', this.reload)
  },
  methods: {
    reload() {
      if (this.currentBusinessID) {
        this.$apollo.queries.serverBusinessSelectedCategoryIDs.refetch()
      } else {
        this.$apollo.queries.serverSelectedCategoryIDs.refetch()
      }
    },
    async onSubmitSuggestion() {
      if (!this.canSubmitSuggestion) return
      try {
        this.isSuggestionSending = true
        await this.$apollo.mutate({
          // variables: {
          //   name: this.suggestion,
          // },
          mutation: gql`
            mutation ($name: String!) {
              suggestInterestCategory(name: $name) {
                success
              }
            }
          `,
        })
        this.isSuggestionSent = true
      } catch (error) {
        this.doTrackSegmentError(error, 'Community Interests')
      } finally {
        this.isSuggestionSending = false
      }
    },
    async clickCategory(category) {
      const { id } = category
      const unselect = (
        (this.currentBusinessID ? this.serverBusinessSelectedCategoryIDs : this.serverSelectedCategoryIDs) || []
      ).includes(id)

      // prevent to remove one category
      const isSelected = this.isCategorySelected(category)
      if (isSelected && this.activeCategoryIDs.length === 1) {
        this.$toast?.error(`You must have at least one community interest selected.`, {
          duration: 5000,
          position: 'top-center',
        })
        return
      }

      this.$store.commit('discover/toggleCategory', { id, unselect })
      const willAdd = this.isCategorySelected(category)
      if (this.currentBusinessID) {
        const CategoryIDs = this.activeCategoryIDs
        await this.$apollo.mutate({
          fetchPolicy: 'no-cache',
          variables: { id: this.currentBusinessID, input: { CategoryIDs } },
          mutation: gql`
            mutation ($id: String!, $input: InputBusiness!) {
              editBusiness(id: $id, input: $input, patch: true) {
                success
              }
            }
          `,
        })
      } else {
        try {
          await this.$apollo.mutate({
            variables: { id },
            mutation: willAdd
              ? gql`
                  mutation ($id: String!) {
                    addInterestCategory(CategoryID: $id) {
                      success
                    }
                  }
                `
              : gql`
                  mutation ($id: String!) {
                    removeInterestCategory(CategoryID: $id) {
                      success
                    }
                  }
                `,
          })
        } catch (error) {
          this.doTrackSegmentError(error, 'Community Interests')
        }
      }
    },
    clickParent(parent) {
      this.$store.commit('discover/setSelectedParent', parent === 'All' ? null : parent)
    },
    isParentSelected(name) {
      return this.$store.getters['discover/isParentSelected'](name)
    },
    isCategorySelected({ id }) {
      if (this.$store.getters['discover/isCategoryActivelyUnselected'](id)) {
        return false
      }
      if (this.$store.getters['discover/isCategoryActivelySelected'](id)) {
        return true
      }
      if (this.currentBusinessID) {
        return (this.serverBusinessSelectedCategoryIDs || []).includes(id)
      }
      return (this.serverSelectedCategoryIDs || []).includes(id)
    },
  },
  apollo: {
    categories: {
      query: gql`
        query {
          Categories {
            id
            name
            PhotoURL
            parent
          }
        }
      `,
      update: (data) => data.Categories,
    },
    serverSelectedCategoryIDs: {
      fetchPolicy: 'no-cache',
      skip() {
        return !this.isLoggedIn || this.currentBusinessID
      },
      query: gql`
        query {
          Me {
            Profile {
              Member {
                Categories {
                  id
                }
              }
            }
          }
        }
      `,
      update: (data) => data.Me?.Profile?.Member?.Categories?.map((x) => x.id) || [],
      result() {
        this.$store.commit('discover/clear')
      },
    },
    serverBusinessSelectedCategoryIDs: {
      fetchPolicy: 'no-cache',
      skip() {
        return !this.isLoggedIn || !this.currentBusinessID
      },
      variables() {
        return {
          id: this.currentBusinessID,
        }
      },
      query: gql`
        query ($id: String!) {
          Business(id: $id) {
            Categories {
              id
            }
          }
        }
      `,
      update: ({ Business }) => Business?.Categories?.map((x) => x.id) || [],
      result() {
        this.$store.commit('discover/clear')
      },
    },
  },
}
</script>

<style lang="sass" scoped>
.xp-discover::v-deep
  h1
    font-weight: bold
    font-size: 36px
    line-height: 40px

  @include mobile
    h1
      font-size: 24px
      line-height: 28px
    .parent-list
      overflow-y: scroll !important
      justify-content: unset !important
      white-space: nowrap
      width: 100%
      flex-wrap: nowrap !important

  h2
    font-size: 16px
    line-height: 18px
    font-weight: 400

  .parent-tab
    background: #EEF1F1
    color: #0C353E
    font-size: 13px
    padding: 4px 12px
    margin: 0 6px 6px 0
    border-radius: 8px
    transition: all .25s

    &.selected
      background: #0C353E
      color: white

    span.count
      font-size: 11px
      font-weight: 300

  .grid
    display: flex
    flex-wrap: wrap

    > div
      width: 25%
      flex: 0 0 25%
      padding: 6px

    @include mobile
      > div
        width: 100%
        flex: 0 0 100%

    @include tablet-only
      > div
        width: 50%
        flex: 0 0 50%

    @include desktop-only
      > div
        width: 33.3333%
        flex: 0 0 33.3333%

    .icon-button
      display: flex
      align-items: center
      justify-content: center
      width: 24px
      height: 24px
      border-radius: 50%
      color: #aaa
      box-shadow: 0 0 5px rgba(0,0,0,.15)
      transition: all .25s

    .item
      box-shadow: 0 0 5px rgba(0,0,0,.15)
      transition: all .15s
      cursor: pointer

    .image
      width: 100%
      height: 180px
      background-size: cover
      background-position: center
      opacity: .5

    .item:hover
      transform: translateY(-2px)
      .image
        opacity: .75

    .label
      padding: 12px 12px
      margin: 0
      text-transform: uppercase
      font-weight: 300
      color: #0C353E
      font-size: 13px

    .item.selected
      box-shadow: 0 0 20px rgba(0,0,0,.5)

      .image
        opacity: 1

      .label
        font-weight: bold

      .icon-button
        background: #0C353E
        color: white

    .box-suggest
      background: #E8EDF2

      .header
        color: #0c353e
        font-size: 18px
        line-height: 22px

      .content
        color: #7A7A7A
</style>
