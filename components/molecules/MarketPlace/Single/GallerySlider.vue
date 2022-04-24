<template lang="pug">
.xm-marketplace-single-gallery-slider
  template(v-if="medias.length > 0")
    .navigation-actions
      .prev(@click.prevent="$refs.carousel.prev()"): b-icon(icon="chevron-left")
      .next(@click.prevent="$refs.carousel.next()"): b-icon(icon="chevron-right")
    vue-slick-carousel(v-bind="sliderSettings" ref="carousel", :asNavFor="navigation")
      .slider-item(v-for="(media, index) in medias", :key="index")
        XMMarketPlaceSingleGalleryImage(v-if="media.objectType === 'Photo'", :url="media.PhotoURL")
        XMMarketPlaceSingleGalleryVideo(v-if="media.objectType === 'Video'", :url="media.VideoURL")
    vue-slick-carousel.slider-navigation(v-bind="sliderNavigationSettings" ref="navigation", :asNavFor="carousel")
      .slider-dots(v-for="(media, index) in medias")
    .gallery-count(@click.prevent="doShowLightbox(0)") {{ medias.length }} #[b-icon(icon="image-outline")]
  template(v-else): .slider-item: XMMarketPlaceSingleGalleryImage(:url="require('~/assets/images/cover-default.jpg')")
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import XMMarketPlaceSingleGalleryImage from '~/components/molecules/MarketPlace/Single/Gallery/Image'
import XMMarketPlaceSingleGalleryVideo from '~/components/molecules/MarketPlace/Single/Gallery/Video'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'XMMarketPlaceSingleGallerySlider',
  components: { XMMarketPlaceSingleGalleryImage, XMMarketPlaceSingleGalleryVideo, VueSlickCarousel },
  props: {
    product: Object,
  },
  data() {
    return {
      carousel: undefined,
      navigation: undefined,
    }
  },
  computed: {
    medias() {
      if (this.product?.Media !== null) {
        return this.product?.Media
      }
      return []
    },
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      }

      return sliderSettings
    },
    sliderNavigationSettings() {
      const sliderNavigationSettings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
      }
      return sliderNavigationSettings
    },
  },
  mounted() {
    this.carousel = this.$refs.carousel
    this.navigation = this.$refs.navigation
  },
  methods: {
    doShowLightbox() {
      this.$root.$emit('marketplace/lightbox/show', true)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-gallery-slider::v-deep {
  position: relative;
  display: none;
  margin-bottom: 30px;

  .navigation-actions {
    .prev,
    .next {
      background-color: $white;
      color: $secondary;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin: auto 0;
    }

    .prev {
      left: 10px;
    }

    .next {
      right: 10px;
    }
  }

  .slick-slider {
    .slider-item {
      height: 210px;
    }

    .slick-dots {
      bottom: -25px;

      li {
        border: 1px solid $secondary;
        width: 12px;
        height: 12px;
        border-radius: 50%;

        &.slick-active {
          background-color: $secondary;
        }

        button {
          &::before {
            content: none;
          }
        }
      }
    }
  }

  .slider-navigation {
    width: 150px;
    margin: 10px auto 0;

    .slick-slide {
      text-align: center;

      .slider-dots {
        width: 12px !important;
        height: 12px;
        border-radius: 50%;
        display: block;
        border: 1px solid $secondary;
      }

      &.slick-current {
        .slider-dots {
          background-color: $secondary;
        }
      }
    }
  }

  .gallery-count {
    position: absolute;
    bottom: 45px;
    right: 10px;
    z-index: 2;
    background-color: $white;
    color: $secondary;
    border-radius: 3px;
    padding: 8px 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: 1;
    cursor: pointer;

    .icon {
      margin-left: 5px;
    }
  }

  @media screen and (max-width: 767px) {
    display: block;
  }
}
</style>
