<template lang="pug">
.xm-marketplace-single-gallery-5
  .left-gallery
    .gallery-item(v-for="(media, index) in medias.slice(0, 2)")
      XMMarketPlaceSingleGalleryImage(v-if="media.type === 'image'", :url="media.src" @click="doShowLightbox(index)")
      XMMarketPlaceSingleGalleryVideo(
        v-if="media.type === 'video'",
        :url="media.sources[0].src"
        @click="doShowLightbox(index)")
  .center-gallery
    .gallery-item
      XMMarketPlaceSingleGalleryImage(
        v-if="medias[2].type === 'image'",
        :url="medias[2].src"
        @click="doShowLightbox(2)")
      XMMarketPlaceSingleGalleryVideo(
        v-if="medias[2].type === 'video'",
        :url="medias[2].sources[0].src"
        @click="doShowLightbox(2)")
  .right-gallery
    .gallery-item(v-for="(media, index) in medias.slice(3, 5)")
      XMMarketPlaceSingleGalleryImage(v-if="media.type === 'image'", :url="media.src" @click="doShowLightbox(index)")
      XMMarketPlaceSingleGalleryVideo(
        v-if="media.type === 'video'",
        :url="media.sources[0].src"
        @click="doShowLightbox(index)")
</template>

<script>
import XMMarketPlaceSingleGalleryImage from '~/components/molecules/MarketPlace/Single/Gallery/Image'
import XMMarketPlaceSingleGalleryVideo from '~/components/molecules/MarketPlace/Single/Gallery/Video'
export default {
  name: 'XMMarketPlaceSingleGallery5',
  components: { XMMarketPlaceSingleGalleryImage, XMMarketPlaceSingleGalleryVideo },
  props: {
    medias: Array,
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
.xm-marketplace-single-gallery-5::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .left-gallery,
  .right-gallery {
    width: 20%;

    .gallery-item {
      height: calc(465px / 2 - 5px) !important;

      &:first-child {
        margin-bottom: 10px;
      }
    }
  }

  .left-gallery {
    margin-right: 10px;
  }

  .right-gallery {
    margin-left: 10px;
  }

  .center-gallery {
    flex: 10000 1 0;
  }

  @media screen and (max-width: 1023px) {
    .left-gallery,
    .right-gallery {
      .gallery-item {
        height: calc(280px / 2 - 5px) !important;
      }
    }
  }
}
</style>
