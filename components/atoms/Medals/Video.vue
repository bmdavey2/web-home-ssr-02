<template lang="pug">
.xa-medals-video(:class="orientation" v-if="renderComponent" v-view="onViewportEvent")
  .click-event(
    @click.prevent="doToggleFullscreen($event)"
    @mouseover="doPlayVideoOnHover()"
    @mouseout="doPauseVideOnHoverOut()")
  video.video-js.vjs-default-skin(
    :id="`${convertStringToSlug(title)}-video`"
    ref="video",
    :autoplay="autoplay"
    muted
    playsinline
    loop
    v-touch:tap="doToggleFullscreen"
    @click.prevent)
    //- source(:src="video")
  .sound-button(@click="setSound" v-if="hasControls")
    ._icon: b-icon.has-text-white(:icon="this.muted ? 'volume-mute' : 'volume-high'" custom-size="mdi-18px")
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'XAMedalsVideo',
  props: {
    video: String,
    image: String,
    orientation: String,
    startTime: Number,
    title: { type: String, default: '' },
    hasControls: { type: Boolean, default: false },
    autoplay: { type: Boolean, default: true },
    hasPoster: { type: Boolean, default: true },
    preload: { type: String, default: 'metadata' },
  },
  data() {
    return {
      videoPlayer: null,
      videoStyles: null,
      isPaused: false,
      renderComponent: true,
      currentTime: 0,
      muted: true,
    }
  },
  computed: {
    isFullscreen() {
      if (!this.videoPlayer) return
      return this.videoPlayer.isFullscreen()
    },
  },
  watch: {
    isFullscreen(value) {
      if (value) {
        this.videoPlayer.on('pause', () => {
          this.videoPlayer.play()
        })
      }

      if (this.autoplay) return

      if (!this.videoPlayer.paused() && !value) {
        this.doRenderVideoComponent()
      }
    },
  },
  beforeMount() {
    document.addEventListener('visibilitychange', () => {
      // this.doSoundCheck()
    })
  },
  async mounted() {
    await this.doInitializeVideo()

    if (!this.autoplay) {
      this.doRenderVideoComponent()
    }

    this.videoPlayer.on('loadeddata', () => {
      this.$app?.setPageLoader(false)
    })

    this.videoPlayer.on('error', () => {
      this.$app?.setPageLoader(false)
    })
  },
  beforeDestroy() {
    if (this.videoPlayer) {
      this.videoPlayer.dispose()
    }
  },
  methods: {
    setSound() {
      this.muted = !this.muted
      this.videoPlayer.muted(this.muted)
    },
    doToggleFullscreen() {
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
      if (this.videoPlayer.requestFullscreen) {
        this.videoPlayer.requestFullscreen()
      } else if (this.videoPlayer.webkitRequestFullscreen) {
        this.videoPlayer.webkitRequestFullscreen()
      } else if (this.videoPlayer.msRequestFullscreen) {
        this.videoPlayer.msRequestFullscreen()
      }
    },
    doPlayVideoOnHover() {
      if (this.autoplay) return
      this.videoPlayer.play()
    },
    doPauseVideOnHoverOut() {
      if (this.autoplay) return
      this.videoPlayer.pause()
      this.currentTime = this.videoPlayer.currentTime()
    },
    doInitializeVideo() {
      const { preload, image } = this
      this.videoPlayer = videojs(this.$refs.video, {
        autoplay: false,
        preload,
        html5: {
          vhs: {
            overrideNative: true,
          },
          nativeVideoTracks: true,
          nativeAudioTracks: true,
          nativeTextTracks: true,
        },
        sources: [
          {
            src: this.video,
            type: 'application/x-mpegURL',
          },
        ],
        poster: image,
      })
    },
    doRenderVideoComponent() {
      this.renderComponent = false

      this.$nextTick(() => {
        this.renderComponent = true
        this.videoPlayer.reset()

        this.$nextTick(() => {
          this.doInitializeVideo()
          this.videoPlayer.currentTime(this.currentTime || this.startTime)
        })
      })
    },
    onViewportEvent(e) {
      if (e.type === 'exit') {
        if (this.videoPlayer) {
          this.muted = true
          this.videoPlayer.muted(true)
        }
      }

      if (this.gt('desktop')) return
      if (this.autoplay) return

      if (e.type === 'enter') {
        this.videoPlayer.play()
      }

      if (e.type === 'exit') {
        this.videoPlayer.pause()
      }
    },
    doSoundCheck() {
      if (document.visibilityState === 'hidden') {
        if (this.videoPlayer) {
          this.videoPlayer.muted(true)
          this.muted = true
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-medals-video::v-deep {
  position: relative;

  .click-event {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    cursor: pointer;
  }

  .sound-button {
    position: absolute;
    right: 5px;
    bottom: 5px;
    z-index: 4;
    cursor: pointer;
  }

  .video-js {
    background-color: transparent;
    position: relative;
    z-index: 1;
    width: 100%;

    &.vjs-fullscreen {
      video {
        object-fit: contain;
      }

      .vjs-poster {
        background-size: contain;
      }
    }

    video {
      border-radius: 12px;
      box-shadow: 0 6px 20px 10px rgba(9, 47, 55, 0.6);
      object-fit: cover;
      background-color: $black;
    }

    .vjs-poster {
      border-radius: 12px;
      background-size: cover;
    }
  }
}
</style>
