<template lang="pug">
.xp-search.py-6
  .container
    .search-tabs
      nuxt-link.tab-item(
        v-for="(tab, index) in tabs",
        :key="index",
        :to="{ query: { q: $route.query.q, type: tab.value } }",
        :class="[$route.query.type === undefined && tab.label === 'All' && 'active']"
        exact) {{ tab.label }}
    .results-container(
      v-infinite-scroll="doLoadNext"
      infinite-scroll-disabled="nextLoading",
      :infinite-scroll-distance="500")
      div(v-if="isRetrieving") Loading...
      template(v-else)
        .results
          template(v-if="searchItems.length > 0")
            .item(v-for="({ Member, Business, Article, Product }, index) in searchItems")
              XMSearchArticle(:details="Article" v-if="Article")
              XMSearchProduct(:details="Product" v-else-if="Product")
              XMSearchProfile(:details="Member || Business", :objectType="searchItems[index].objectType" v-else)
          template(v-else): XANoResultFound
    transition(name="fade"): .infinite-loader(v-show="nextLoading"): img(
      src="~assets/icons/infinite-scroll.svg"
      width="150"
      height="150")
</template>

<script>
import gql from 'graphql-tag'
import XMSearchProfile from '~/components/molecules/Search/Profile'
import XMSearchArticle from '~/components/molecules/Search/Article'
import XMSearchProduct from '~/components/molecules/Search/Product'
import XANoResultFound from '~/components/atoms/NoResultFound'

export default {
  name: 'XPSearch',
  components: { XMSearchProfile, XMSearchArticle, XMSearchProduct, XANoResultFound },
  data() {
    return {
      tabs: [
        { value: undefined, label: 'All' },
        { value: 'articles', label: 'Articles' },
        // { value: 'mentors', label: 'Mentors' },
        { value: 'people', label: 'People' },
        { value: 'businesses', label: 'Businesses' },
        { value: 'products', label: 'MarketPlace' },
      ],
      isRetrieving: true,
      searchItems: null,
      offset: 0,
      nextLoading: false,
      infiniteScroll: true,
    }
  },
  watch: {
    $route() {
      this.offset = 0
      this.infiniteScroll = true
      this.doRetrieveSearchResults()
    },
    searchItems(value) {
      if (value.length <= 0) {
        this.doRetrieveSearchResults('')
      }
    },
  },
  mounted() {
    this.doRetrieveSearchResults()
  },
  methods: {
    async doRetrieveSearchResults(text = this.$route.query?.q) {
      this.isRetrieving = true
      const type = this.$route.query?.type
      let objectTypes
      switch (type) {
        case 'articles':
          objectTypes = ['Article']
          break
        // case 'mentors':
        //   objectTypes = ['Mentor']
        //   break
        case 'people':
          objectTypes = ['Member']
          break
        case 'businesses':
          objectTypes = ['Business']
          break
        case 'products':
          objectTypes = ['Product']
          break
        default:
          break
      }

      try {
        const result = await this.$apollo.query({
          variables: {
            text,
            objectTypes,
            offset: this.offset,
          },
          query: gql`
            query ($text: String!, $objectTypes: [String!], $offset: Int) {
              SocialSearchResult(count: 12, offset: $offset, text: $text, objectTypes: $objectTypes) {
                items {
                  objectID
                  objectType
                  tags
                  Article {
                    id
                    Business {
                      id
                      name
                      slug
                      profilePhotoURL(type: "100")
                    }
                    Member {
                      id
                      name
                      slug
                      profilePhotoURL(type: "100")
                    }
                    Categories {
                      name
                    }
                    coverPhotoURL(type: "300")
                    title
                    slug
                  }
                  Business {
                    id
                    name
                    personalStatus
                    slug
                    profilePhotoURL(type: "100")
                    coverPhotoURL(type: "300")
                    isFollowed
                    statement
                    plan
                  }
                  Member {
                    id
                    name
                    personalStatus
                    slug
                    profilePhotoURL(type: "100")
                    coverPhotoURL(type: "300")
                    isFollowed
                  }
                  Product {
                    id
                    title
                    slug
                    coverPhotoURL(type: "300")
                    Categories {
                      id
                      name
                      PhotoURL(type: "300")
                    }
                    Business {
                      id
                      name
                      slug
                      profilePhotoURL(type: "100")
                    }
                  }
                }
              }
            }
          `,
        })

        this.searchItems = result?.data?.SocialSearchResult?.items
      } catch (error) {
        this.doTrackSegmentError(error, 'Search')
      } finally {
        this.isRetrieving = false
      }
    },
    async doLoadNext() {
      if (this.isRetrieving) return
      const type = this.$route.query?.type
      let objectTypes
      switch (type) {
        case 'articles':
          objectTypes = ['Article']
          break
        // case 'mentors':
        //   objectTypes = ['Mentor']
        //   break
        case 'people':
          objectTypes = ['Member']
          break
        case 'businesses':
          objectTypes = ['Business']
          break
        case 'products':
          objectTypes = ['Product']
          break
        default:
          break
      }
      if (this.infiniteScroll) {
        this.nextLoading = true
        const count = 12

        try {
          const result = await this.$apollo.query({
            variables: {
              text: this.$route.query?.q,
              objectTypes,
              offset: (this.offset += count),
            },
            query: gql`
              query ($text: String!, $objectTypes: [String!], $offset: Int) {
                SocialSearchResult(count: 12, offset: $offset, text: $text, objectTypes: $objectTypes) {
                  items {
                    objectID
                    objectType
                    tags
                    Article {
                      id
                      Business {
                        id
                        name
                        slug
                        profilePhotoURL(type: "100")
                      }
                      Member {
                        id
                        name
                        slug
                        profilePhotoURL(type: "100")
                      }
                      Categories {
                        name
                      }
                      coverPhotoURL(type: "300")
                      title
                      slug
                    }
                    Business {
                      id
                      name
                      personalStatus
                      slug
                      profilePhotoURL(type: "100")
                      coverPhotoURL(type: "300")
                      isFollowed
                      statement
                      plan
                    }
                    Member {
                      id
                      name
                      personalStatus
                      slug
                      profilePhotoURL(type: "100")
                      coverPhotoURL(type: "300")
                      isFollowed
                    }
                    Product {
                      id
                      title
                      slug
                      coverPhotoURL(type: "300")
                      Categories {
                        id
                        name
                        PhotoURL(type: "300")
                      }
                      Business {
                        id
                        name
                        slug
                        profilePhotoURL(type: "100")
                      }
                    }
                  }
                }
              }
            `,
          })

          const items = result?.data?.SocialSearchResult?.items

          if (items.length > 0) {
            items.forEach((item) => {
              this.searchItems.push(item)
            })
          } else {
            this.infiniteScroll = false
          }

          this.nextLoading = false
        } catch (error) {
          this.doTrackSegmentError(error, 'Search')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-search::v-deep {
  min-height: calc(100vh - 505px);

  .search-tabs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;

    .tab-item {
      cursor: pointer;
      background-color: #eef1f1;
      font-weight: 300;
      padding: 6px 15px;
      border-radius: 100px;
      color: inherit;

      &:not(:last-child) {
        margin-right: 15px;
      }

      &.active {
        background-color: $secondary;
        color: $white;
      }
    }
  }

  .results {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: calc(100% / 3 - 15px);
      margin-bottom: 20px;
    }

    &::after {
      content: '';
      width: calc(100% / 3 - 20px);
    }

    .no-results-found {
      width: 100%;
    }
  }

  .infinite-loader {
    margin-top: -10px;
    text-align: center;

    img {
      max-height: 80px;
    }
  }

  @media screen and (max-width: 1023px) {
    .results {
      .item {
        width: calc(100% / 2 - 15px);
      }
    }
  }

  @media screen and (max-width: 767px) {
    .search-tabs {
      flex-wrap: nowrap;
      overflow-x: auto;
    }

    .results {
      .item {
        width: 100%;
      }
    }
  }
}
</style>
