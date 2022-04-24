<template lang="pug">
.xm-marketplace-single-gallery-image(@click="$emit('click', $event)")
  img(:src="url" @error="doCheckIfImageIsLoaded" v-if="imageLoaded")
  XAImageNotLoaded(v-else)
</template>

<script>
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMMarketPlaceSingleGalleryImage',
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
.xm-marketplace-single-gallery-image::v-deep {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #f8f8f8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
