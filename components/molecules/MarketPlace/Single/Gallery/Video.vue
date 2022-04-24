<template lang="pug">
.xm-marketplace-single-gallery-video(@click="$emit('click', $event)")
  video(ref="video", :controls="false", :poster="thumbnail", :autoplay="false" muted, :playsinline="false")
    source(:src="url" type="application/x-mpegURL")
</template>

<script>
import videojs from 'video.js'
export default {
  name: 'XMMarketPlaceSingleGalleryVideo',
  props: {
    thumbnail: null,
    url: String,
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    this.player = videojs(this.$refs.video, {
      html5: {
        vhs: {
          overrideNative: false,
        },
        nativeVideoTracks: true,
        nativeAudioTracks: true,
        nativeTextTracks: true,
      },
    })
  },
  beforeDestroy() {
    this.player?.dispose()
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-gallery-video::v-deep {
  width: 100%;
  height: 100%;
  background-color: $black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
