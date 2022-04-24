<template lang="pug">
.xm-marketplace-single-content-medal.row.items-center(
  :style="[medalBackgroundColor]",
  :class="[orientation, circleColor === 'white' ? 'light' : 'dark']")
  .left-content.col(:class="orientation")
    h2(:style="[medalFontColor]") Earn your Digital NFT Medal at the {{ title }}
    p.text-weight-light.description.desktop(:style="[medalFontColor]") All successful race participants will obtain their unique and personalised medal at completion of the event
    b-button.text-uppercase(:style="[medalButtonColor]" tag="router-link", :to="`/medals/${slug}`") See Details
    p.text-weight-light.description.mobile All successful race participants will obtain their unique and personalised Digital NFT Medal at completion of the event

  .right-content(:class="orientation")
    .video-container
      template(v-for="(medal, index) in medals")
        template(v-for="(media, index) in medal.Media")
          XAMedalsVideo(
            :video="media.VideoURL"
            v-if="media.objectType === 'Video' && media.isNFTMedal && media.VideoURL"
            hasControls)
</template>

<script>
import XAMedalsVideo from '~/components/atoms/Medals/Video'

export default {
  name: 'XMMarketPlaceSingleContentMedal',
  components: { XAMedalsVideo },
  props: {
    product: Object,
  },
  computed: {
    title() {
      return this.product?.title || ''
    },
    slug() {
      return this.product?.slug || ''
    },
    medals() {
      return this.product?.NFTMedals?.items || []
    },
    orientation() {
      let orientation
      this.medals[0]?.Media.forEach((media) => {
        orientation = media?.orientation
      })

      return orientation
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
    circleColor() {
      return this.product?.ProductTheme?.circleColor || 'white'
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-single-content-medal::v-deep {
  min-height: 390px;
  border-radius: 6px;
  color: $white;
  padding: 30px 50px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;

  &.dark {
    &::before {
      background-image: url('~assets/images/Medals/bg-circles-dark.png');
    }
  }

  &::before {
    content: '';
    background-image: url('~assets/images/Medals/bg-circles.png');
    background-position: center;
    background-size: 900px;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 188px;
    width: 100%;
    height: 100%;
    z-index: 0;

    @include max-width(1215px) {
      left: 0;
      top: -107px;
    }

    @include max-width(767px) {
      top: -150px;
    }
  }

  &.portrait {
    &::before {
      left: 24.7%;
      background-size: 750px;
      top: 0;

      @include max-width(767px) {
        left: 0;
        top: -115px;
      }
    }
  }

  @include max-width(767px) {
    padding: 30px 20px;
  }

  .left-content {
    padding-right: 50px;

    &.landscape {
      @include max-width(1215px) {
        order: 2;
        padding: 0;
        flex: none;
      }
    }

    @include max-width(767px) {
      order: 2;
      flex: none;
      width: 100%;
    }

    h2 {
      font-size: 2.2857rem;
      line-height: 1.25;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.1429rem;
      margin-bottom: 30px;

      &.description {
        &.desktop {
          @include max-width(767px) {
            display: none;
          }
        }

        &.mobile {
          display: none;
          margin-top: 30px;
          margin-bottom: 0;

          @include max-width(767px) {
            display: block;
          }
        }
      }
    }
  }

  .right-content {
    width: 100%;
    max-width: 250px;

    &.landscape {
      max-width: 350px;

      @include max-width(1215px) {
        max-width: 100%;
        order: 1;
        min-height: 350px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      .video-container {
        width: 100%;

        .xa-medals-video {
          @include max-width(767px) {
            width: 100%;
            max-width: 100%;
          }

          .video-js {
            width: 100%;
            height: 220px;

            @include max-width(1215px) {
              height: 300px;
            }
          }
        }
      }
    }

    &.portrait {
      @include max-width(1215px) {
        max-width: 200px;
      }

      @include max-width(1023px) {
        max-width: 32.5%;
      }

      @include max-width(900px) {
        max-width: 33.5%;
      }

      @include max-width(850px) {
        max-width: 34.2%;
      }

      @include max-width(768px) {
        max-width: 35.5%;
      }

      @include max-width(767px) {
        max-width: 100%;
      }

      .video-container {
        .xa-medals-video {
          max-width: 180px;

          @include max-width(767px) {
            max-width: 320px;

            .video-js {
              height: 500px;
            }
          }
        }
      }
    }

    @include max-width(767px) {
      order: 1;
      max-width: 100%;
      margin-bottom: 30px;
    }

    .video-container {
      @include max-width(767px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .xa-medals-video {
        width: 100%;

        &:not(:first-child) {
          display: none;
        }

        .video-js {
          height: 330px;

          @include max-width(767px) {
            height: 400px;
          }
        }
      }
    }
  }
}
</style>
