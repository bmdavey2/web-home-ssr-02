<template lang="pug">
.xm-marketplace-single-lightbox-video.flex-center(v-view="onViewportEvent" @click="$emit('click', $event)")
  video.video-js.vjs-default-skin.vjs-4-3.vjs-big-play-centered(
    ref="video"
    controls,
    :poster="thumbnail",
    :autoplay="false"
    muted
    playsinline)
    source(:src="url" type="application/x-mpegURL")
</template>

<script>
import videojs from 'video.js'
export default {
  name: 'XMMarketPlaceSingleLightboxVideo',
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
  methods: {
    onViewportEvent(e) {
      const video = this.$refs.video
      if (e.type === 'enter') {
        const promise = video.play()
        if (promise !== undefined) {
          promise
            .catch(() => {
              // Auto-play was prevented
              // Show a UI element to let the user manually start playback
            })
            .then(() => {
              // Auto-play started
            })
        }
      }
      if (e.type === 'exit') {
        video.pause()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-lightbox-video::v-deep {
  width: 100%;
  height: 100%;
  background-color: $black;
}
</style>
