<template lang="pug">
.xd-medal.row.items-center.justify-center(@click.self="doShowModalMedal()")
  .close(@click.prevent="doShowModalMedal()"): b-icon(icon="close")
  video.video-js.vjs-default-skin(ref="video" autoplay muted playsinline loop type="application/x-mpegURL")
    source(:src="videoURL")
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'XDMedal',
  props: {
    url: String,
  },
  data() {
    return {
      player: '',
    }
  },
  computed: {
    videoURL() {
      return this.url || 'https://api.activeplace.com/videos/nftmedal.m3u8/Final%20with%20BG.m3u8'
    },
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
  methods: {
    doShowModalMedal() {
      this.$root.$emit('show/modal/medal', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-medal::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba($black, 0.8);

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    color: $white;
    cursor: pointer;
  }

  .video-js {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
}
</style>
