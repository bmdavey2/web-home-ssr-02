<template lang="pug">
.xm-marketplace-single-lightbox
  .close(@click.prevent="doShowLightbox()"): b-icon(icon="close" size="is-medium")
  .slider-container
    vue-slick-carousel(v-bind="sliderSettings" ref="carousel" v-if="medias.length > 0")
      .slider-item(v-for="(media, index) in medias", :key="index")
        XMMarketPlaceSingleLightboxImage(v-if="media.objectType === 'Photo'", :url="media.PhotoURL")
        XMMarketPlaceSingleLightboxVideo(v-if="media.objectType === 'Video'", :url="media.VideoURL")
  .navigation-actions
    .prev(@click.prevent="$refs.carousel.prev()"): b-icon(icon="chevron-left" size="is-medium")
    .next(@click.prevent="$refs.carousel.next()"): b-icon(icon="chevron-right" size="is-medium")
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import XMMarketPlaceSingleLightboxImage from '~/components/molecules/MarketPlace/Single/Lightbox/Image'
import XMMarketPlaceSingleLightboxVideo from '~/components/molecules/MarketPlace/Single/Lightbox/Video'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'XMMarketPlaceSingleGalleryLightBox',
  components: { XMMarketPlaceSingleLightboxImage, XMMarketPlaceSingleLightboxVideo, VueSlickCarousel },
  props: {
    product: Object,
    initialSlide: { type: Number, default: 0 },
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        initialSlide: this.initialSlide,
      }

      return sliderSettings
    },
    medias() {
      return this.product?.Media || []
    },
  },
  methods: {
    doShowLightbox() {
      this.$emit('DoShowLightbox', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-lightbox::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.8);
  z-index: 999;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  .close {
    position: absolute;
    top: 30px;
    right: 30px;
    color: $white;
    cursor: pointer;
    z-index: 1;
  }

  .slider-container {
    width: 100%;
    max-width: 1024px;

    .slick-slider {
      .slick-list {
        .slick-track {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          .slick-slide {
            float: none;
            height: auto;

            > div {
              height: 100%;

              .slider-item {
                padding: 0 10px;
                height: 100%;

                .xm-marketplace-single-lightbox-image {
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: center;

                  img {
                    width: unset;
                    max-height: calc(100vh - 100px);
                    object-fit: unset;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .navigation-actions {
    .prev,
    .next {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      background-color: $white;
      color: $secondary;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .prev {
      left: 20px;
    }

    .next {
      right: 20px;
    }
  }

  @media screen and (max-width: 767px) {
    .close {
      top: 10px;
      right: 10px;

      .icon {
        .mdi {
          &::before {
            font-size: 1.7143rem;
          }
        }
      }
    }

    .navigation-actions {
      .prev,
      .next {
        width: 30px;
        height: 30px;

        .icon {
          .mdi {
            &::before {
              font-size: 1.7143rem;
            }
          }
        }
      }
    }
  }
}
</style>
