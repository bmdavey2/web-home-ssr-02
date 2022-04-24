<template lang="pug">
.xm-articles-index-featured(v-if="!isRetrieving")
  h1 Featured Articles
  .desktop-only
    XMArticlesItem(
      v-for="(article, index) in articles",
      :key="index",
      :article="article",
      :is-column="index === 0 && true",
      :image-position="index === 0 ? 'right' : ''",
      :char-limit="index === 0 ? 500 : 120")
      template(v-slot:title v-if="index === 0"): h2._title: nuxt-link(:to="`/a/${article.slug}`") {{ article.title }}
  .mobile-only
    XMArticlesItem(
      v-for="(article, index) in articles",
      :key="index",
      :article="article",
      :is-column="index === 0 && true",
      :image-position="index === 0 ? 'right' : ''",
      :char-limit="index === 0 ? 150 : 80")
      template(v-slot:title v-if="index === 0"): h2._title: nuxt-link(:to="`/a/${article.slug}`") {{ article.title }}
    .slider
      XMArticlesIndexFeaturedSlider(:articles="articles.slice(1)")
</template>

<script>
import gql from 'graphql-tag'
import XMArticlesItem from '~/components/molecules/Articles/Item'
import XMArticlesIndexFeaturedSlider from '~/components/molecules/Articles/Index/FeaturedSlider'

export default {
  name: 'XMArticlesIndexFeatured',
  components: { XMArticlesItem, XMArticlesIndexFeaturedSlider },
  data() {
    return {
      articles: null,
      isRetrieving: true,
    }
  },
  mounted() {
    this.doRetrieveArticles()
  },
  methods: {
    async doRetrieveArticles() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Articles(sortBy: "trending", count: 4, offset: 0, categories: null) {
                count
                next
                items {
                  id
                  slug
                  title
                  coverPhotoURL(type: "400")
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
                    profilePhotoURL(type: "100")
                  }
                  Business {
                    id
                    slug
                    name
                    profilePhotoURL(type: "100")
                  }
                }
              }
            }
          `,
        })
        this.articles = data?.Articles?.items
        await this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: false,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Discover')
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-articles-index-featured::v-deep {
  h1 {
    font-size: 3rem;
    line-height: 1.45;
    color: #050505;
    margin-bottom: 20px;

    a {
      color: inherit;
    }
  }

  .desktop-only {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #c2c8c9;
    padding-bottom: 50px;
    margin-bottom: 50px;
  }

  .mobile-only {
    display: none;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #c2c8c9;
    padding-bottom: 50px;
    margin-bottom: 50px;

    .slider {
      width: 100%;
      display: none;
    }
  }

  .xm-articles-item {
    width: 100%;
    margin-bottom: 50px;

    .cover-photo {
      height: 380px;
    }

    &:not(:first-child) {
      width: calc(100% / 3 - 15px);
      margin-bottom: 0;

      .cover-photo {
        height: 225px;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .desktop-only {
      display: none;
    }

    .mobile-only {
      display: flex;

      .xm-articles-item {
        .cover-photo {
          height: 260px;
        }

        &:not(:first-child) {
          .cover-photo {
            height: 140px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 2.2857rem;
    }

    .mobile-only {
      .slider {
        display: block;
      }

      .xm-articles-item {
        .cover-photo,
        .contents {
          width: 100%;
        }

        .cover-photo {
          order: 1;
          height: 215px;
        }

        .contents {
          order: 2;

          .description {
            display: none;
          }
        }

        &:not(:first-child) {
          display: none;
        }
      }
    }
  }
}
</style>
