<template lang="pug">
.xp-articles-category.py-6
  .container
    XMArticlesCategoryBreadcrumbs
    h1 {{ title }} Articles
    XMArticlesCategoryFilter(@DoUpdateSortByFilter="sortBy = $event")
    template(v-if="!isRetrievingArticles")
      XMArticlesCategoryList(:articles="articles")
      .articles-actions(v-if="showMore")
        b-button(
          type="is-primary"
          label="Show more",
          :loading="isRetrievingMoreArticles"
          outlined
          @click.prevent="doLoadNext()")
</template>

<script>
import gql from 'graphql-tag'
import XMArticlesCategoryBreadcrumbs from '~/components/molecules/Articles/Category/Breadcrumbs'
import XMArticlesCategoryFilter from '~/components/molecules/Articles/Category/Filter'
import XMArticlesCategoryList from '~/components/molecules/Articles/Category/List'

export default {
  name: 'XPArticlesCategory',
  components: { XMArticlesCategoryBreadcrumbs, XMArticlesCategoryFilter, XMArticlesCategoryList },
  props: {
    title: String,
  },
  data() {
    return {
      parentCategories: [
        'Endurance Sports',
        'Outdoor & Adventure',
        'Health & Wellness',
        'General Fitness',
        'Technology & Gear',
      ],
      categories: null,
      articles: null,
      isRetrievingArticles: true,
      sortBy: 'trending',
      isRetrievingMoreArticles: false,
      showMore: false,
      offset: 0,
    }
  },
  watch: {
    async sortBy() {
      const loader = this.$buefy.loading.open()
      this.offset = 0
      await this.doRetrieveArticles()
      loader.close()
    },
  },
  created() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  async mounted() {
    await this.doRetrieveCategories()
    this.doRetrieveArticles()
  },
  methods: {
    async doRetrieveCategories() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Categories {
                id
                name
                parent
                PhotoURL
              }
            }
          `,
        })

        const categories = data?.Categories
        if (this.parentCategories.includes(this.title)) {
          this.categories = categories.filter((category) => {
            return category?.parent === this.title
          })
          return
        }
        this.categories = categories
      } catch (error) {
        this.doTrackSegmentError(error, 'Articles Category')
      }
    },
    async doRetrieveArticles() {
      this.isRetrievingArticles = true
      this.isRetrievingMoreArticles = false
      this.showMore = false
      let categories
      if (this.parentCategories.includes(this.title)) {
        const mappedCategories = this.categories.map((category) => {
          return category?.id
        })
        categories = mappedCategories.toString()
      } else {
        categories = this.$route.params?.category
      }

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            categories,
            sortBy: this.sortBy,
            offset: this.offset,
          },
          query: gql`
            query ($categories: String, $sortBy: String, $offset: Int) {
              Articles(sortBy: $sortBy, count: 12, offset: $offset, categories: $categories) {
                count
                next
                items {
                  id
                  slug
                  title
                  coverPhotoURL
                  createdAt
                  excerpt
                  UserID
                  Categories {
                    id
                    name
                  }
                  Aggregates {
                    views
                    highFives
                  }
                  Member {
                    id
                    slug
                    name
                    profilePhotoURL
                  }
                  Business {
                    id
                    slug
                    name
                    profilePhotoURL
                  }
                }
              }
            }
          `,
        })

        this.articles = data?.Articles?.items
        this.isRetrievingArticles = false

        if (this.articles.length >= 12) this.showMore = true
        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: false,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Articles Category')
      }
    },
    async doLoadNext() {
      this.isRetrievingMoreArticles = true
      const count = 24
      let categories
      if (this.parentCategories.includes(this.title)) {
        const mappedCategories = this.categories.map((category) => {
          return category?.id
        })
        categories = mappedCategories.toString()
      } else {
        categories = this.$route.params?.category
      }

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            categories,
            sortBy: this.sortBy,
            offset: (this.offset += count),
            count,
          },
          query: gql`
            query ($categories: String, $sortBy: String, $offset: Int, $count: Int) {
              Articles(sortBy: $sortBy, count: $count, offset: $offset, categories: $categories) {
                count
                next
                items {
                  slug
                  title
                  coverPhotoURL
                  createdAt
                  content
                  FeedItem {
                    Aggregates {
                      likes
                    }
                    actorType
                  }
                  Aggregates {
                    views
                  }
                  Member {
                    id
                    slug
                    name
                    profilePhotoURL
                  }
                  Business {
                    id
                    slug
                    name
                    profilePhotoURL
                  }
                }
              }
            }
          `,
        })

        const items = data?.Articles?.items

        if (items.length > 0) {
          items.forEach((item) => {
            this.articles.push(item)
          })
          if (items.length < 24) return (this.showMore = false)
          this.showMore = true
        } else {
          this.showMore = false
        }
        this.isRetrievingMoreArticles = false
      } catch (error) {
        this.doTrackSegmentError(error, 'Articles Category')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-articles-category::v-deep {
  background-color: $white;
  min-height: calc(100vh - 417px);

  h1 {
    font-size: 2.8571rem;
    line-height: 1.2;
    color: $secondary;
    margin-bottom: 50px;
  }

  .articles-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;

    button {
      text-transform: uppercase;
      font-weight: 500;
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 1.5714rem;
    }

    .articles-actions {
      margin-top: 20px;
    }
  }
}
</style>
