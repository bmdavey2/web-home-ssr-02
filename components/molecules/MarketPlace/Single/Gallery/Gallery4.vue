<template lang="pug">
.xm-marketplace-single-gallery-4
  .left-gallery
    .gallery-item
      XMMarketPlaceSingleGalleryImage(
        v-if="medias[0].type === 'image'",
        :url="medias[0].src"
        @click="doShowLightbox(0)")
      XMMarketPlaceSingleGalleryVideo(
        v-if="medias[0].type === 'video'",
        :url="medias[0].sources[0].src"
        @click="doShowLightbox(0)")
  .center-gallery
    .gallery-item
      XMMarketPlaceSingleGalleryImage(
        v-if="medias[1].type === 'image'",
        :url="medias[1].src"
        @click="doShowLightbox(2)")
      XMMarketPlaceSingleGalleryVideo(
        v-if="medias[1].type === 'video'",
        :url="medias[1].sources[0].src"
        @click="doShowLightbox(1)")
  .right-gallery
    .gallery-item(v-for="(media, index) in medias.slice(2, 4)")
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
  name: 'XMMarketPlaceSingleGallery4',
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
.xm-marketplace-single-gallery-4::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .left-gallery,
  .center-gallery {
    flex: 10000 1 0;
  }

  .left-gallery {
    margin-right: 10px;
  }

  .right-gallery {
    width: 20%;
    margin-left: 10px;

    .gallery-item {
      height: calc(465px / 2 - 5px) !important;

      &:first-child {
        margin-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .right-gallery {
      .gallery-item {
        height: calc(280px / 2 - 5px) !important;
      }
    }
  }
}
</style>
