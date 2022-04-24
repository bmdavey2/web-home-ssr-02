<template lang="pug">
.article-slider
  .article-slider-loader(v-if="isRetrieving")
    .loader-container(v-for="n in 3", :key="n")
      XOArticleIndexLoader(is-mobile-column)
  template(v-else)
    ._header
      h2 {{ categoryTitle }}
      .actions
        nuxt-link.see-all(:to="`/articles/${DO_SLUGGABLE(categoryTitle)}`") See all
        .slider-nav-button
          .btn-prev.btn-nav(@click.prevent="$refs.carousel.prev()"): b-icon(icon="chevron-left")
          .btn-next.btn-nav(@click.prevent="$refs.carousel.next()"): b-icon(icon="chevron-right")
    vue-slick-carousel(v-bind="sliderSettings" ref="carousel")
      .slide-item(v-for="(article, index) in articles", :key="index")
        XOArticleIndexArticle(:article="article" is-mobile-column)
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import XOArticleIndexArticle from '~/components/organisms/Article/Index/Article'
import XOArticleIndexLoader from '~/components/organisms/Article/Index/ArticleLoader'

export default {
  name: 'XOArticleIndexArticleSlider',
  components: {
    XOArticleIndexLoader,
    XOArticleIndexArticle,
    VueSlickCarousel,
  },
  props: {
    categoryTitle: String,
    articles: Array,
    isRetrieving: { type: Boolean, default: true },
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
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
  methods: {
    DO_SLUGGABLE(value) {
      value = value.toLowerCase()
      value = value.replace(/[á|ã|â|à]/gi, 'a')
      value = value.replace(/[é|ê|è]/gi, 'e')
      value = value.replace(/[í|ì|î]/gi, 'i')
      value = value.replace(/[õ|ò|ó|ô]/gi, 'o')
      value = value.replace(/[ú|ù|û]/gi, 'u')
      value = value.replace(/[ç]/gi, 'c')
      value = value.replace(/[ñ]/gi, 'n')
      value = value.replace(/[á|ã|â]/gi, 'a')
      value = value.replace(/\W/gi, '-')

      /* eslint-disable-next-line */
      value = value.replace(/(\-)\1+/gi, '-')

      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.article-slider::v-deep {
  margin: 0 -10px 50px;

  .article-slider-loader {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    .loader-container {
      width: calc(100% / 4 - 20px);
    }
  }

  ._header {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    h2 {
      font-size: 2.2857rem;
      line-height: 2.5714rem;
      color: $secondary;
      margin-bottom: 0 !important;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      a {
        color: #65676b;
        display: block;
        padding-top: 3px;
      }

      .slider-nav-button {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-left: 15px;

        .btn-nav {
          width: 32px;
          height: 32px;
          background-color: transparent;
          color: $secondary;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          transition: 0.3s;
          margin: 0 5px;

          &:hover {
            background-color: $secondary;
            color: $white;
          }
        }
      }
    }
  }

  .slick-slider {
    .slick-list {
      .slide-item {
        padding: 0 10px;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .article-slider-loader {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;

      .loader-container {
        width: calc(100% / 3 - 20px);
      }
    }
  }

  @media screen and (max-width: 767px) {
    .article-slider-loader {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;

      .loader-container {
        width: calc(100% / 2 - 20px);
      }
    }

    h2 {
      font-size: 16px !important;
    }
  }

  @media screen and (max-width: 472px) {
    margin-bottom: 10px;

    .article-slider-loader {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;

      .loader-container {
        width: 100%;
      }
    }

    ._header {
      .actions {
        a {
          font-size: 0.8571rem;
        }

        .slider-nav-button {
          margin-left: 10px;

          .btn-nav {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
