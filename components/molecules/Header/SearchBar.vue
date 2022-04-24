<template lang="pug">
.xm-header-search-bar.is-flex-width-auto(:class="isMarketplace && 'is-marketplace'")
  b-autocomplete.search-input(
    @focus="doCheckIfHasValue()"
    ref="autocomplete"
    :data="list",
    :loading="loading"
    rounded
    v-model="text"
    @keyup.native.enter.prevent="search"
    icon="magnify",
    :placeholder="isMarketplace ? 'Search Articles, Events, Active Programs, Community...' : 'Search'"
    clearable
    @typing="searchDataAsync"
    @select="onOptionSelected"
    )
    p {{list}}
    template(slot-scope="{ option, index }")
      XAHeaderSearchBarResultItem(:item="option")
    template(#empty) No results found
</template>

<script>
import debounce from 'lodash/debounce'
import gql from 'graphql-tag'
import XAHeaderSearchBarResultItem from '~/components/atoms/Header/SearchBarResultItem'

export default {
  name: 'XMHeaderSearchBar',
  components: { XAHeaderSearchBarResultItem },
  data() {
    return {
      list: [],
      loading: false,
      text: '',
    }
  },
  computed: {
    isMarketplace() {
      return this.$parent?.isMarketplace || false
    },
  },
  watch: {
    text: {
      immediate: true,
      handler(text) {
        this.$emit('input', text)
      },
    },
  },
  methods: {
    searchDataAsync: debounce(function (text) {
      if (text) {
        this.searchData(text)
      }
    }, 500),
    async searchData(text) {
      try {
        const { data } = await this.$apollo.query({
          variables: { text },
          query: gql`
            query ($text: String!) {
              SocialSearchSuggestions(text: $text) {
                objectID
                objectType
                Member {
                  name
                  slug
                  profilePhotoURL(type: "100")
                }
                Business {
                  name
                  slug
                  profilePhotoURL(type: "100")
                }
                Article {
                  title
                  slug
                  coverPhotoURL(type: "100")
                }
                Product {
                  title
                  slug
                  coverPhotoURL(type: "100")
                  Categories {
                    PhotoURL(type: "100")
                  }
                }
              }
            }
          `,
        })
        this.list = data.SocialSearchSuggestions.map((item) => {
          const { objectType } = item
          const current = item[objectType]
          const slug =
            objectType === 'Member'
              ? item.Member?.slug
              : item.Article?.slug || item.Business?.slug || item.Product?.slug
          const CoverPhoto =
            objectType === 'Product'
              ? current?.coverPhotoURL || current?.Categories[0]?.PhotoURL
              : current?.coverPhotoURL

          const name = current?.name || current?.title
          return {
            slug,
            title: name ? name.replace(/&amp;/g, '&') : '',
            type: item.objectType,
            photoURL: current?.profilePhotoURL,
            coverPhotoURL: CoverPhoto,
          }
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Search')
      }
    },
    onOptionSelected(item) {
      if (item) {
        let type
        switch (item.type) {
          case 'Article':
            type = 'a'
            break
          case 'Member':
            type = 'p'
            break
          case 'Business':
            type = 'b'
            break
          case 'Product':
            type = 'marketplace/p'
            break
        }
        this.$router.push({ path: '/' + type + '/' + item.slug })
        this.$emit('closeSearch')
      }
    },
    search(event) {
      this.$refs.autocomplete.isActive = false
      event.target.blur()
      if (!this.text) {
        this.$toast?.error(`Please fill up the field`, {
          duration: 2 * 1000,
          position: 'bottom-right',
        })
      } else if (this.text.length <= 2) {
        this.$toast?.error(`Search Engine: It should contain minimum 3 characters`, {
          duration: 2 * 1000,
          position: 'bottom-right',
        })
      } else {
        this.$router.push({ path: '/search', query: { q: encodeURIComponent(this.text) } })
        this.$emit('closeSearch')
      }
    },
    doCheckIfHasValue() {
      if (this.text) {
        this.$refs.autocomplete.isActive = true
        return
      }
      this.$refs.autocomplete.isActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-header-search-bar::v-deep {
  max-width: 390px;

  @include max-width(767px) {
    display: none;
  }

  .search-input {
    input {
      border: 0;
      box-shadow: 0 2px 5px rgb(10 39 46 / 15%);
    }
  }

  &.is-marketplace {
    width: 100%;
    max-width: 100%;
  }
}
</style>
