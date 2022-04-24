<template lang="pug">
.xm-feed-item-medias(:class="mediaClass")
  .media-item(
    v-for="(media, index) in medias.slice(0, 4)",
    :key="index",
    :class="[media.objectType, isMedal && 'is-medal']")
    XAVideo(
      :value="media.VideoURL"
      v-if="media.objectType === 'Video'",
      :controls="false",
      :is-medal="isMedal",
      :orientation="media.orientation"
      has-overlay
      @click="doShowMediaLightbox(index)",
      :medal-theme="medalTheme")
    XAFeedImage(:url="media.PhotoURL", :pins="media.Pin" @click.prevent="doShowMediaLightbox(index)" v-else)
    .count(v-if="index === 3 && countExcludedMedias > 0" @click.prevent="doShowMediaLightbox(3)") +{{ countExcludedMedias }}
  b-button.pin-toggle(type="is-light" size="is-small" @click.prevent="setPins" v-if="hasTags")
    img(
      src="~assets/icons/secondary-pin.svg"
      style="height: 16px; width: 16px; margin-left: -4px; margin-bottom: -4px")
    span {{ showPins ? 'Hide' : 'Show' }} Pins
</template>

<script>
import XAVideo from '~/components/atoms/Video'
import XAFeedImage from '~/components/atoms/Feed/Image'

export default {
  name: 'XMFeedItemMedias',
  components: { XAVideo, XAFeedImage },
  props: {
    medias: Array,
    isMedal: Boolean,
    medalTheme: Object,
  },
  computed: {
    mediaClass() {
      const sliceMedias = this.medias.slice(0, 4)
      const count = sliceMedias.length
      return `media-${count}`
    },
    countExcludedMedias() {
      const countExcludedMedias = this.medias.slice(4)
      return countExcludedMedias.length
    },
    carousel() {
      const carousel = this.medias.map((media) => {
        const mediaURL = this.getFullPhotoURL(media?.PhotoURL) || media?.VideoURL
        return { url: mediaURL, pins: media?.Pin, objectType: media?.objectType, isNFTMedal: this.isMedal }
      })

      return carousel
    },
    hasTags() {
      const tags = this.medias.map((media) => {
        return media?.Pin?.Tags
      })

      return tags.some((tag) => tag !== undefined)
    },
    showPins() {
      return this.$store.state.media.showPins
    },
  },
  methods: {
    doShowMediaLightbox(slide) {
      if (this.isMedal) return
      this.$buefy.modal.open({
        component: require('~/components/dialogs/FeedItem/Medias').default,
        parent: this,
        props: {
          carousel: this.carousel,
          slide,
        },
        width: '100%',
      })
    },
    setPins() {
      this.$store.commit('media/setPinStatus', !this.$store.state.media.showPins)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-feed-item-medias::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;

  .pin-toggle {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 2;
    background-color: rgba($white, 0.6);
  }

  .media-item {
    display: block;
    width: 100%;
    max-height: 500px;
    position: relative;
    cursor: pointer;

    &.Video {
      background-color: $black;
    }

    &.is-medal {
      background-color: transparent;
      max-height: none;

      .xa-video {
        padding: 50px 0;

        &.landscape {
          .video-js {
            video {
              height: 330px;
            }
          }
        }

        .video-js {
          video {
            border-radius: 12px;
            max-width: 250px;
            margin: 0 auto;
            right: 0;
            box-shadow: 0 6px 20px 10px rgb(9 47 55 / 60%);
            object-fit: cover;
          }
        }
      }
    }

    .count {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba($black, 0.8);
      color: $white;
      font-size: 3rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  }

  &.media-2 {
    .media-item {
      width: calc(50% - 5px);
      max-height: 250px;
    }
  }

  &.media-3 {
    .media-item {
      margin-bottom: 10px;

      &:not(:first-child) {
        width: calc(50% - 5px);
        max-height: 200px;
        margin-bottom: 0;
      }
    }
  }

  &.media-4 {
    .media-item {
      margin-bottom: 10px;

      &:not(:first-child) {
        width: calc(100% / 3 - 5px);
        max-height: 200px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
