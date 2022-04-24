<template lang="pug">
.xm-marketplace-single-lightbox-image(@click="$emit('click', $event)")
  img(:src="url" @error="doCheckIfImageIsLoaded" v-if="imageLoaded")
  XAImageNotLoaded(v-else)
</template>

<script>
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMMarketPlaceSingleLightboxImage',
  components: { XAImageNotLoaded },
  props: {
    url: String,
  },
  data() {
    return {
      imageLoaded: true,
    }
  },
  methods: {
    doCheckIfImageIsLoaded() {
      this.imageLoaded = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-lightbox-image::v-deep {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-not-loaded {
    padding: 100px;

    img {
      width: 50% !important;
    }
  }
}
</style>
