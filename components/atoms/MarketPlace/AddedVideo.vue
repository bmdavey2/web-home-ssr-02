<template lang="pug">
.xa-marketplace-added-video.flex-center(@click="$emit('click', $event)")
  .video-actions: .delete-video(@click.prevent="$emit('delete', $event)"): b-icon(icon="close" size="is-small")
  video.video-js.vjs-default-skin.vjs-4-3.vjs-big-play-centered(
    ref="video",
    :controls="false",
    :poster="thumbnail",
    :autoplay="false"
    muted,
    :playsinline="false")
    source(:src="url" type="application/x-mpegURL")
</template>

<script>
import videojs from 'video.js'
export default {
  name: 'XAMarketPlaceAddedVideo',
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
.xa-marketplace-added-video::v-deep {
  width: calc(100% / 3 - 10px);
  height: 145px;
  margin-bottom: 10px;
  position: relative;
  background-color: $black;

  .video-actions {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;

    .delete-video {
      cursor: pointer;
      background-color: $white;
      color: $secondary;
      box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
      width: 24px;
      height: 24px;
      border-radius: 100px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
