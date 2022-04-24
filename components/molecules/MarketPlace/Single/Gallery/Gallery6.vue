<template lang="pug">
.xm-marketplace-single-gallery-6
  .left-gallery
    .gallery-item(v-for="(media, index) in medias.slice(0, 3)")
      XMMarketPlaceSingleGalleryImage(v-if="media.type === 'image'", :url="media.src" @click="doShowLightbox(index)")
      XMMarketPlaceSingleGalleryVideo(
        v-if="media.type === 'video'",
        :url="media.sources[0].src"
        @click="doShowLightbox(index)")
  .right-gallery
    .gallery-item(v-for="(media, index) in medias.slice(3, 6)")
      XMMarketPlaceSingleGalleryImage(
        v-if="media.type === 'image'",
        :url="media.src"
        @click="doShowLightbox(index + 3)")
      XMMarketPlaceSingleGalleryVideo(
        v-if="media.type === 'video'",
        :url="media.sources[0].src"
        @click="doShowLightbox(index + 3)")
</template>

<script>
import XMMarketPlaceSingleGalleryImage from '~/components/molecules/MarketPlace/Single/Gallery/Image'
import XMMarketPlaceSingleGalleryVideo from '~/components/molecules/MarketPlace/Single/Gallery/Video'
export default {
  name: 'XMMarketPlaceSingleGallery6',
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
.xm-marketplace-single-gallery-6::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .left-gallery,
  .right-gallery {
    width: calc(50% - 5px);

    .gallery-item {
      width: calc(50% - 5px);
      height: calc(465px / 2 - 5px);
      float: right;

      &:first-child {
        height: 465px;
        float: left;
      }

      &:nth-child(2) {
        margin-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .left-gallery,
    .right-gallery {
      .gallery-item {
        height: calc(280px / 2 - 5px);

        &:first-child {
          height: 280px;
        }
      }
    }
  }
}
</style>
