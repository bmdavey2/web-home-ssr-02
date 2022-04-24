<template lang="pug">
.xm-articles-index-featured-slider
  vue-slick-carousel(v-bind="sliderSettings" ref="carousel")
    .slide-item(v-for="(article, index) in articles", :key="index")
      XMArticlesItem(:char-limit="50", :article="article")
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import XMArticlesItem from '~/components/molecules/Articles/Item'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'XMArticlesIndexFeaturedSlider',
  components: { XMArticlesItem, VueSlickCarousel },
  props: {
    articles: Array,
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '50px',
      }

      return sliderSettings
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-articles-index-featured-slider::v-deep {
  .slick-slider {
    margin: 0 -10px;

    .slick-list {
      padding: 0 1% 0 0 !important;

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

                .contents {
                  .description {
                    display: block;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .slick-slider {
      margin: 0;
    }
  }
}
</style>
