<template lang="pug">
.xo-profile-upcoming-events.box(:style="[medalBackgroundColor]")
  XAMedalsVideo(:video="videoURL", :image="imageURL", :orientation="orientation" v-if="videoURL" hasControls)
  ._title(:style="[medalFontColor]") Earn your Digital NFT Medal at the {{ title }}
  .actions
    b-button.text-uppercase(:style="[medalButtonColor]" tag="router-link", :to="`/medals/${slug}`") See Details
    router-link.link-digital-medals(to="/digital-medals", :style="[medalFontColor]") Read more about digital medals
</template>

<script>
import XAMedalsVideo from '~/components/atoms/Medals/Video'

export default {
  name: 'XOProfileUpcomingEvents',
  components: { XAMedalsVideo },
  props: {
    event: Object,
  },
  computed: {
    media() {
      return this.event?.Media || null
    },
    videoURL() {
      if (!this.media) return
      const videoURL = this.media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return videoURL[0]?.VideoURL
    },
    imageURL() {
      if (!this.media) return
      const imageURL = this.media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return imageURL[0]?.VideoThumbnail
    },
    orientation() {
      if (!this.media) return
      const orientation = this.media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return orientation[0]?.orientation
    },
    product() {
      return this.event?.Product || null
    },
    title() {
      return this.product?.title || ''
    },
    slug() {
      return this.product?.slug || ''
    },
    medalBackgroundColor() {
      const medalBackgroundColor = {
        'background-color': this.product?.ProductTheme?.backgroundColor || '#0c353e',
      }

      return medalBackgroundColor
    },
    medalFontColor() {
      const medalFontColor = {
        color: this.product?.ProductTheme?.fontColor || '#ffffff',
      }

      return medalFontColor
    },
    medalButtonColor() {
      const medalButtonColor = {
        'background-color': this.product?.ProductTheme?.buttonColor || '#f85454',
        'border-color': this.product?.ProductTheme?.buttonColor || '#f85454',
        color: this.product?.ProductTheme?.fontColor || '#ffffff',
      }

      return medalButtonColor
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-profile-upcoming-events::v-deep {
  color: $white;
  padding: 25px;

  @include max-width(768px) {
    display: none;
  }

  @include max-width(599px) {
    display: block;
  }

  .xa-medals-video {
    margin-bottom: 20px;

    &.landscape {
      background-color: $black;
      border-radius: 12px;

      .video-js {
        &.vjs-fullscreen {
          video {
            object-fit: contain;
          }
        }

        video {
          object-fit: none;
        }

        .vjs-poster {
          background-size: contain;
        }
      }
    }

    .video-js {
      height: 450px;

      @include max-width(1215px) {
        height: 350px;
      }

      @include max-width(599px) {
        height: 480px;
      }

      video {
        box-shadow: none;
      }
    }
  }

  ._title {
    font-size: 1.5714rem;
  }

  .actions {
    margin-top: 20px;

    .button {
      width: 100%;
    }

    .link-digital-medals {
      font-weight: 300;
      opacity: 0.7;
      margin-top: 10px;
      display: block;
    }
  }
}
</style>
