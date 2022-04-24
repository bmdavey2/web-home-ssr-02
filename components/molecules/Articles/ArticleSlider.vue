<template lang="pug">
.xm-articles-article-slider(v-if="!isRetrieving")
  template(v-if="articles.length > 0")
    .desktop-only
      .header
        h2 {{ category.name }}
        .slider-actions
          nuxt-link(:to="`/articles/${convertStringToSlug(category.id)}`") See all
          .navigations
            .btn-nav.btn-prev(@click.prevent="$refs.carouselDesktop.prev()"): b-icon(icon="chevron-left")
            .btn-nav.btn-next(@click.prevent="$refs.carouselDesktop.next()"): b-icon(icon="chevron-right")
      vue-slick-carousel(v-bind="sliderSettings" ref="carouselDesktop")
        .slide-item(v-for="(article, index) in articles", :key="index")
          XMArticlesItem(:article="article")
    .mobile-only
      .header
        h2 {{ category.name }}
        .slider-actions
          nuxt-link(:to="`/articles/${convertStringToSlug(category.id)}`") See all
          .navigations
            .btn-nav.btn-prev(@click.prevent="$refs.carouselMobile.prev()"): b-icon(icon="chevron-left")
            .btn-nav.btn-next(@click.prevent="$refs.carouselMobile.next()"): b-icon(icon="chevron-right")
      vue-slick-carousel(v-bind="sliderSettings" ref="carouselMobile")
        .slide-item(v-for="(article, index) in articles", :key="index")
          XMArticlesItem(:article="article", :char-limit="80")
</template>

<script>
import gql from 'graphql-tag'
import VueSlickCarousel from 'vue-slick-carousel'
import XMArticlesItem from '~/components/molecules/Articles/Item'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'XMArticlesArticleSlider',
  components: { XMArticlesItem, VueSlickCarousel },
  props: {
    title: String,
    category: Object,
  },
  data() {
    return {
      categories: null,
      selectedCategories: null,
      isRetrieving: true,
      articles: null,
    }
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 427,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 3,
              adaptiveHeight: true,
            },
          },
        ],
      }
      return sliderSettings
    },
  },
  watch: {
    categories(value) {
      const categories = value.filter((category) => {
        return category?.parent === this.title
      })

      const subCategories = categories.map((category) => {
        return category.id
      })
      this.selectedCategories = subCategories.toString()
    },
  },
  mounted() {
    this.doRetrieveArticles()
  },
  methods: {
    async doRetrieveArticles() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            // categories: this.selectedCategories || null,
            categories: this.category?.id,
          },
          query: gql`
            query ($categories: String) {
              Articles(sortBy: "trending", count: 8, offset: 0, categories: $categories) {
                count
                next
                items {
                  id
                  slug
                  title
                  coverPhotoURL(type: "300")
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
.xm-articles-article-slider::v-deep {
  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;

    h2 {
      font-size: 2.2857rem;
      line-height: 1.2;
      color: $secondary;
    }

    .slider-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      a {
        color: inherit;
      }

      .navigations {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .btn-nav {
          width: 32px;
          height: 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          margin-left: 10px;

          &:hover {
            background-color: $secondary;
            color: $white;
          }
        }
      }
    }
  }

  .slick-slider {
    margin: 0 -10px;

    .slick-list {
      .slick-track {
        display: flex;
        flex-wrap: wrap;

        .slick-slide {
          float: none;
          height: auto;

          > div {
            height: 100%;

            .slide-item {
              padding: 0 10px;
              height: 100%;

              .xm-articles-item {
                height: 100%;
              }
            }
          }
        }
      }
    }
  }

  .mobile-only {
    display: none;
  }

  @media screen and (max-width: 1023px) {
    .desktop-only {
      display: none;

      .slick-slider {
        margin: 0;
      }
    }

    .mobile-only {
      display: block;

      .slick-slider {
        .xm-articles-item {
          .cover-photo {
            height: 140px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .header {
      align-items: center;

      h2 {
        font-size: 1.1429rem;
      }
    }

    .mobile-only {
      .slick-slider {
        margin: 0;

        .slick-slide {
          height: 100% !important;

          .slide-item {
            height: auto !important;

            .xm-articles-item {
              height: auto !important;
              flex-direction: row;
              margin-bottom: 10px;

              .cover-photo {
                width: 40%;
                height: 120px;
              }

              .contents {
                padding-left: 10px;

                .description {
                  display: none;
                }

                .aggregates {
                  font-size: 0.8571rem;
                  order: 2;
                }

                h2 {
                  order: 1;
                  font-size: 1rem;
                }

                .user-details {
                  order: 3;
                  font-size: 0.8571rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
