<template lang="pug">
.xa-video.flex-center(
  v-view="onViewportEvent",
  :class="[isMedal && 'is-medal', orientation, circleColor === 'white' ? 'light' : 'dark']",
  :style="medalBackgroundColor")
  .overlay(v-if="hasOverlay" @click.prevent="$emit('click', $event); doToggleFullscreen()")
  video.video-js.vjs-default-skin.vjs-4-3.vjs-big-play-centered(
    ref="video",
    :controls="videoControls",
    :poster="thumbnail",
    :loop="isMedal"
    autoplay
    muted
    playsinline
    v-touch:tap="doToggleFullscreen")
    source(:src="value" type="application/x-mpegURL")
  .sound-button(@click="setSound" v-if="isMedal")
    ._icon: b-icon.has-text-white(:icon="this.muted ? 'volume-mute' : 'volume-high'" custom-size="mdi-18px")
</template>

<script>
import videojs from 'video.js'
export default {
  name: 'XAVideo',
  props: {
    thumbnail: null,
    value: String,
    hasOverlay: Boolean,
    controls: { type: Boolean, default: true },
    isMedal: Boolean,
    orientation: String,
    medalTheme: Object,
  },
  data() {
    return {
      player: null,
      muted: true,
    }
  },
  computed: {
    videoControls() {
      if (this.isMedal) {
        return false
      }
      return this.controls
    },
    medalBackgroundColor() {
      const medalBackgroundColor = {
        'background-color': this.medalTheme?.backgroundColor || '#0c353e',
      }

      return medalBackgroundColor
    },
    medalFontColor() {
      const medalFontColor = {
        color: this.medalTheme?.fontColor || '#ffffff',
      }

      return medalFontColor
    },
    medalButtonColor() {
      const medalButtonColor = {
        'background-color': this.medalTheme?.buttonColor || '#f85454',
        'border-color': this.medalTheme?.buttonColor || '#f85454',
        color: this.medalTheme?.fontColor || '#ffffff',
      }

      return medalButtonColor
    },
    circleColor() {
      return this.medalTheme?.circleColor || 'white'
    },
    isFullscreen() {
      if (!this.player) return
      return this.player.isFullscreen()
    },
  },
  watch: {
    isFullscreen(value) {
      if (value) {
        this.player.on('pause', () => {
          this.player.play()
        })
      }
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
  beforeDestroy() {
    this.player?.dispose()
  },
  methods: {
    setSound() {
      this.muted = !this.muted
      this.player.muted(this.muted)
    },
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
        this.player.muted(true)
        this.muted = true
      }
    },
    doToggleFullscreen() {
      if (!this.isMedal) return
      if (this.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        return
      }
      if (this.player.requestFullscreen) {
        this.player.requestFullscreen()
      } else if (this.player.webkitRequestFullscreen) {
        this.player.webkitRequestFullscreen()
      } else if (this.player.msRequestFullscreen) {
        this.player.msRequestFullscreen()
      }
    },
  },
}
</script>

<style lang="sass" scoped>
/* stylelint-disable no-descending-specificity */
.xa-video::v-deep
  background-color: black
  position: relative

  &.landscape
    .video-js
      video
        max-width: 90% !important
        height: auto
        margin: auto !important
        bottom: 0

  &.is-medal
    background-image: url('~assets/images/Medals/bg-circles.png')
    background-repeat: no-repeat
    background-position: center
    background-size: 1000px

    &.dark
      background-image: url('~assets/images/Medals/bg-circles-dark.png')

    .video-js
      background-color: transparent

      &.vjs-fullscreen
        video
          object-fit: contain !important
          height: 100% !important
          width: 100%
          max-width: none !important
          box-shadow: none !important
          border-radius: 0 !important

  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: transparent
    z-index: 1

  video
    width: 100%
    height: 100%

.sound-button
    position: absolute
    right: 5px
    bottom: 5px
    z-index: 4
    cursor: pointer
</style>
