<template lang="pug">
.xo-category-pills-selector.is-user-select-none
  template(v-if="grouped")
    div(v-for="[parent, categories] in categoriesGrouped")
      div(style="font-weight: 500") {{ parent }}
      .flex.mt-2.mb-4(style="flex-wrap: wrap")
        XMCategoryPill.mr-2.mb-2(
          v-for="{ id, name, parent } in categories",
          :key="id"
          v-model="selected[id]",
          :label="name",
          :icon="id",
          :parent="parent",
          :clickable="clickable",
          :disabled="disabled",
          :unselectable="disabled",
          :isProductCategories="isProductCategories",
          :is-white="isWhite",
          :is-signup="isSignup")

  template(v-else)
    .flex.mt-2(style="flex-wrap: wrap")
      XMCategoryPill.mr-2.mb-2(
        v-for="{ id, name, parent } in categories",
        :key="id"
        v-model="selected[id]",
        :label="name",
        :icon="id",
        :parent="parent",
        :clickable="clickable",
        :disabled="disabled",
        :unselectable="disabled",
        :isProductCategories="isProductCategories",
        :is-white="isWhite",
        :is-signup="isSignup")
</template>

<script>
import gql from 'graphql-tag'
import pickBy from 'lodash/pickBy'
import mapValues from 'lodash/mapValues'
import keyBy from 'lodash/keyBy'
import toPairs from 'lodash/toPairs'
import groupBy from 'lodash/groupBy'
import XMCategoryPill from '~/components/molecules/CategoryPill'

export default {
  name: 'XOCategoryPillsSelector',
  components: { XMCategoryPill },
  props: {
    value: { type: Array, default: () => [] },
    excludedParent: { type: Array, default: () => [] },
    grouped: Boolean,
    clickable: Boolean,
    max: Number,
    isWhite: Boolean,
    isSignup: Boolean,
    isProductCategories: { type: Boolean, default: false },
  },
  data() {
    return {
      selected: {},
      isRetrieving: true,
      categories: [],
    }
  },
  computed: {
    categoriesGrouped() {
      if (!this.categories) return []
      return toPairs(groupBy(this.categories, 'parent'))
    },
    selectedKeys() {
      const selected = pickBy(this.selected, (x) => x)
      return Object.keys(selected)
    },
    disabled() {
      return this.max > 0 && this.selectedKeys.length >= this.max
    },
  },
  watch: {
    selected: {
      deep: true,
      handler() {
        this.$emit('input', this.selectedKeys)
      },
    },
    categories(value) {
      if (!value) {
        this.selected = {}
        return
      }
      this.selected = mapValues(keyBy(value, 'id'), (_, k) => this.value.includes(k))
    },
  },
  mounted() {
    this.doRetrieveCategories()
  },
  methods: {
    async doRetrieveCategories() {
      try {
        const { data } = await this.$apollo.query({
          query: this.isProductCategories
            ? gql`
                query {
                  getProductCategories {
                    id
                    name
                    parent
                  }
                }
              `
            : gql`
                query {
                  Categories {
                    id
                    name
                    parent
                  }
                }
              `,
        })

        let categories

        if (this.isProductCategories) {
          categories = data?.getProductCategories.filter((category) => {
            if (!this.excludedParent.includes(category?.parent)) {
              return category
            }
          })
        } else {
          categories = data?.Categories.filter((category) => {
            if (!this.excludedParent.includes(category?.parent)) {
              return category
            }
          })
        }

        this.categories = categories
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>
