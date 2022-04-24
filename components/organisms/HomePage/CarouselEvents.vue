<template lang="pug">
.popular-content
  .popular-header.is-flex.is-align-items-center
    h1.popular-title.is-visible-desktop {{ title }}
    h1.popular-title.is-visible-mobile.is-clickable(v-if="link" @click="redirectTo") {{ title }}

    XASliderAction(:link="link" @Prev="$refs.carousel.prev()" @Next="$refs.carousel.next()" v-if="items.length")

  VueSlickCarousel(v-bind="sliderSettings" ref="carousel" v-if="items.length")
    .slide-item(v-for="(item, index) in items", :key="index")
      template(v-if="type === 'event'")
        XMMarketPlaceProduct(:product="item")
      template(v-if="type === 'article'")
        XMHomeArticle(:article="item")
      template(v-if="type === 'suggested'")
        XMHomeSuggested(:item="item", :itemType="itemType")
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import XASliderAction from '~/components/atoms/SliderAction'
import XMMarketPlaceProduct from '~/components/molecules/MarketPlace/Product'
import XMHomeArticle from '~/components/molecules/HomePage/FeaturedArticle'
import XMHomeSuggested from '~/components/molecules/HomePage/Suggested'

export default {
  name: 'XOHomeCarousel',
  components: { XMHomeSuggested, XMHomeArticle, XMMarketPlaceProduct, XASliderAction, VueSlickCarousel },
  props: {
    title: { type: String, default: '' },
    type: { type: String, default: 'event' },
    itemType: { type: String, default: '' },
    link: { type: String, default: '' },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        arrows: false,
        dots: false,
        slidesToShow: this.type === 'article' ? 2 : 4,
        slidesToScroll: 1,
        centerMode: this.type === 'article',
        responsive: [
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: this.type === 'suggested' ? 3 : 2,
              slidesToScroll: 2,
              centerMode: true,
              centerPadding: '30px',
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: this.type === 'article' ? 1 : 2,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '30px',
            },
          },
          {
            breakpoint: 510,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '30px',
            },
          },
        ],
      }
      return sliderSettings
    },
  },
  methods: {
    redirectTo() {
      this.$router.push(this.link)
    },
  },
}
</script>

<style lang="scss" scoped>
.popular-content::v-deep {
  .slick-slider {
    margin: 0 -10px;

    .slick-list {
      padding-bottom: 30px;

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
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .slick-slider {
      .slick-list {
        padding: 0 1% 30px 0 !important;
      }
    }
  }
}

.popular-header.is-flex {
  margin-top: 50px;
  margin-bottom: 20px;
  width: 100%;

  .popular-title {
    color: #0c353e;
    font-size: 2.286rem;
    line-height: 35px;
  }
}

.is-visible-mobile {
  display: none;
}

@media (max-width: '768px') {
  .popular-title {
    font-size: 24px !important;
    line-height: 27px;
  }
  .is-visible-desktop {
    display: none !important;
  }

  .is-visible-mobile {
    display: flex !important;
  }

  .popular-header {
    margin-top: 50px !important;
  }
}
</style>
