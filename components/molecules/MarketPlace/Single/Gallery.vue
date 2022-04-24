<template lang="pug">
.xm-marketplace-single-gallery(:class="`gallery-${medias.length}`")
  template(v-if="medias.length > 0")
    XMMarketPlaceSingleGallery4(:medias="medias" v-if="medias.length === 4")
    XMMarketPlaceSingleGallery5(:medias="medias" v-else-if="medias.length === 5")
    XMMarketPlaceSingleGallery6(:medias="medias" v-else-if="medias.length >= 6")
    template(v-else)
      .gallery-item(v-for="(media, index) in medias.slice(0, 6)")
        XMMarketPlaceSingleGalleryImage(v-if="media.type === 'image'", :url="media.src" @click="doShowLightbox(index)")
        XMMarketPlaceSingleGalleryVideo(
          v-if="media.type === 'video'",
          :url="media.sources[0].src"
          @click="doShowLightbox(index)")
    .gallery-count(v-if="medias.length > 6" @click.prevent="doShowLightbox(6)") See all {{ medias.length }} photos #[b-icon(icon="image-outline")]
  template(v-else): .gallery-item: XMMarketPlaceSingleGalleryImage(:url="categoryPhotoURL")
</template>

<script>
import XMMarketPlaceSingleGalleryImage from '~/components/molecules/MarketPlace/Single/Gallery/Image'
import XMMarketPlaceSingleGalleryVideo from '~/components/molecules/MarketPlace/Single/Gallery/Video'
import XMMarketPlaceSingleGallery4 from '~/components/molecules/MarketPlace/Single/Gallery/Gallery4'
import XMMarketPlaceSingleGallery5 from '~/components/molecules/MarketPlace/Single/Gallery/Gallery5'
import XMMarketPlaceSingleGallery6 from '~/components/molecules/MarketPlace/Single/Gallery/Gallery6'

export default {
  name: 'XMMarketPlaceSingleGallery',
  components: {
    XMMarketPlaceSingleGalleryImage,
    XMMarketPlaceSingleGalleryVideo,
    XMMarketPlaceSingleGallery4,
    XMMarketPlaceSingleGallery5,
    XMMarketPlaceSingleGallery6,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      showLightbox: false,
    }
  },
  computed: {
    medias() {
      if (this.product?.Media !== null) {
        const medias = this.product?.Media.map((media) => {
          // eslint-disable-next-line no-constant-condition

          if (media.objectType === 'Photo') {
            return { type: 'image', thumb: null, src: media.PhotoURL }
          } else if (media.VideoURL.includes('activeplace.com')) {
            return {
              type: 'video',
              thumb: null,
              sources: [{ src: media.VideoURL, type: 'application/x-mpegURL' }],
              width: 800,
              heigh: 600,
              autoplay: true,
            }
          }
        })
        return medias.filter(Boolean)
      }
      return []
    },
    categoryPhotoURL() {
      return this.product?.Categories[0]?.PhotoURL || null
    },
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
      }

      return sliderSettings
    },
  },
  methods: {
    doShowLightbox(value) {
      this.$root.$emit('marketplace/lightbox/show', true)
      this.$root.$emit('marketplace/lightbox/active', value)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-single-gallery::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;

  .gallery-count {
    position: absolute;
    bottom: 15px;
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

  .gallery-item {
    width: 100%;
    height: 465px;
  }

  &.gallery-2 {
    .gallery-item {
      width: calc(50% - 5px);
    }
  }

  &.gallery-3 {
    display: block;
    height: 465px;

    .gallery-item {
      width: calc(25% - 10px);
      height: calc(465px / 2 - 5px);
      float: right;

      &:first-child {
        width: 75%;
        height: 465px;
        float: left;
      }

      &:nth-child(2) {
        margin-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .gallery-item {
      height: calc(280px / 2 - 5px);

      &:first-child {
        height: 280px;
      }
    }

    &.gallery-2 {
      .gallery-item {
        height: 280px;
      }
    }

    &.gallery-3 {
      height: 280px;

      .gallery-item {
        height: calc(280px / 2 - 5px);

        &:first-child {
          height: 280px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
