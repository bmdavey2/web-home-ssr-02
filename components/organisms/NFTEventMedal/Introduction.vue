<template lang="pug">
.xo-nft-medals-introduction.row.items-center(
  :style="[medalBackgroundColor]",
  :class="[orientation, circleColor === 'white' ? 'light' : 'dark']")
  .container
    .row.items-center
      .left-content.col(:class="orientation")
        h1(:style="[medalFontColor]") Earn your Digital NFT Medal at {{ title }}
        p(:style="[medalFontColor]") All successful race participants will obtain their unique and personalised Digital NFT Medal at completion of the event

        .actions.row.items-center
          .btn-interested.mr-4(
            :style="[medalButtonColor]"
            v-html="externalURL"
            v-linkified:options="{defaultProtocol: 'https', format() { return 'Go to Event Page'}}")
          b-dropdown(aria-role="list" append-to-body)
            template(#trigger="{ active }")
              b-button.btn-not-interested(:style="[medalButtonColor]" size="is-medium")
                .items-center.justify-center.is-flex
                  .row.items-center.justify-center._icon.mr-2: img(src="~assets/icons/light/share.svg")
                  ._label SHARE
            b-dropdown-item.has-text-weight-medium.has-text-secondary.is-size-6(aria-role="listitem" custom) SHARE TO:
            b-dropdown-item(aria-role="listitem")
              .is-flex.is-align-items-center(@click="sharetoFeed()")
                img(src="~assets/icons/social/nft/activeplace.svg")
                .has-text-secondary.has-text-weight-medium ActivePlace
            b-dropdown-item(aria-role="listitem")
              share-network.is-flex.is-align-items-center(
                style="padding: 0 !important"
                network="facebook",
                :url="url",
                :title="title",
                :media="imageURL"
                @open="doTrackMedalShareSegment('Facebook')")
                img(src="~assets/icons/social/nft/facebook.svg")
                .has-text-secondary.has-text-weight-medium Facebook
            b-dropdown-item(aria-role="listitem")
              share-network.is-flex.is-align-items-center(
                style="padding: 0 !important"
                network="twitter",
                :url="url",
                :title="title",
                :media="imageURL"
                @open="doTrackMedalShareSegment('Twitter')")
                img(src="~assets/icons/social/nft/twitter.svg")
                .has-text-secondary.has-text-weight-medium Twitter
            b-dropdown-item.copy-link(aria-role="listitem" @click="copyLink()")
              .is-flex.is-align-items-center
                ._icon.row.items-center.justify-center: b-icon(icon="link-variant" custom-size="mdi-18px")
                ._label.has-text-secondary.has-text-weight-medium Copy link
            b-dropdown-item.download-link(aria-role="listitem" @click="doDownloadMedal()")
              .is-flex.is-align-items-center
                ._icon.row.items-center.justify-center: b-icon(icon="download" custom-size="mdi-18px")
                ._label.has-text-secondary.has-text-weight-medium Download Medal

      .right-content.row.justify-center(:class="orientation")
        XAMedalsVideo(
          :video="videoURL",
          :image="imageURL",
          :orientation="orientation",
          :has-poster="false"
          preload="auto"
          hasControls)

  XAMedalsDownloadProgress(v-if="showDownloadProgress", :downloadProgress="downloadProgress")
</template>

<script>
import XPAddUpdate from '~/components/pages/AddUpdate'
import XAMedalsVideo from '~/components/atoms/Medals/Video'
import XAMedalsDownloadProgress from '~/components/atoms/Medals/DownloadProgress'

export default {
  name: 'XONFTEventMedalIntroduction',
  components: { XAMedalsVideo, XAMedalsDownloadProgress },
  props: {
    voteStatus: String,
  },
  data() {
    return {
      active: false,
      player: '',
      player2: '',
      videoElementCurrentTime: 0,
      medalFileDownload: null,
      videoID: null,
      showDownloadProgress: false,
      downloadProgress: 0,
    }
  },
  computed: {
    details() {
      return this.$parent?.$parent?.MedalDetails || null
    },
    product() {
      return this.details?.Product || null
    },
    productID() {
      return this.product?.id || null
    },
    title() {
      return this.product?.title || ''
    },
    description() {
      return this.product?.description || ''
    },
    slug() {
      return this.product?.slug || ''
    },
    externalURL() {
      return this.product?.externalURL || null
    },
    media() {
      return this.details?.Media || ''
    },
    videoURL() {
      const videoURL = this.media.filter((x) => x.objectType === 'Video') || []
      return videoURL[0]?.VideoURL
    },
    imageURL() {
      const imageURL = this.media.filter((x) => x.objectType === 'Video') || []
      return imageURL[0]?.VideoThumbnail
    },
    orientation() {
      const orientation = this.media.filter((x) => x.objectType === 'Video') || []
      return orientation[0]?.orientation
    },
    video() {
      return this.media.filter((x) => x.objectType === 'Video') || []
    },
    url() {
      return `${this.baseURL}${this.$route.path}`
    },
    isFullscreenPlayer() {
      if (!this.player) return
      return this.player.isFullscreen()
    },
    isFullscreenPlayer2() {
      if (!this.player2) return
      return this.player2.isFullscreen()
    },
    initialMedalMessage() {
      return `Hi there! Take a look at this awesome medal you can earn. Join me at ${this.title} and earn an awesome digital medal. Find out more about medals and the event — ${this.url}`
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
  watch: {
    isFullscreenPlayer() {
      this.player.on('pause', () => {
        this.player.play()
      })
    },
    isFullscreenPlayer2() {
      this.player2.on('pause', () => {
        this.player2.play()
      })
    },
  },
  beforeMount() {
    document.addEventListener('visibilitychange', () => {
      this.doPlayVideo()
    })
  },
  mounted() {
    this.getAllExternalLinks()
  },
  methods: {
    sharetoFeed() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }

      this.doTrackMedalShareSegment('ActivePlace')

      const fullscreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: XPAddUpdate,
        width: 600,
        canCancel: !fullscreen,
        fullScreen: fullscreen,
        props: {
          isFullscreen: fullscreen,
          isMedal: true,
          productID: this.productID,
          medalTheme: {
            backgroundColor: this.product?.ProductTheme?.backgroundColor,
            fontColor: this.product?.ProductTheme?.fontColor,
            buttonColor: this.product?.ProductTheme?.buttonColor,
            circleColor: this.product?.ProductTheme?.circleColor,
          },
        },
      })
    },
    copyLink() {
      this.doTrackMedalShareSegment('Custom')
      const clipBoardElem = document.createElement('input')
      document.body.appendChild(clipBoardElem)
      clipBoardElem.value = this.url
      clipBoardElem.select()
      document.execCommand('copy')
      this.$toast.success('Link copied to clipboard', { duration: 2000, position: 'bottom-right' })
      document.body.removeChild(clipBoardElem)
    },
    doPlayVideo() {
      const video = document.getElementById('video_html5_api')
      if (!video) return
      if (document.visibilityState === 'visible') {
        video.currentTime = this.videoElementCurrentTime
        video.play()
      } else {
        video.pause()
        this.videoElementCurrentTime = video.currentTime
      }
    },
    doFullScreenPlayer() {
      if (this.isFullscreenPlayer) {
        this.player.exitFullscreen()
      } else {
        this.player.requestFullscreen()
      }
      // this.$root.$emit('show/modal/medal', true)
    },
    doFullScreenPlayer2() {
      if (this.isFullscreenPlayer2) {
        this.player2.exitFullscreen()
      } else {
        this.player2.requestFullscreen()
      }
    },
    async doRetrieveMedalLink() {
      this.doTrackMedalShareSegment('Custom')
      const media = this.details?.Media.filter((media) => {
        return media?.objectType === 'Medal'
      })

      const objectID = media[0]?.objectID
      const objectType = media[0]?.objectType
      this.videoID = media[0]?.objectID
      try {
        const { downloadMedal } = await this.$api.downloadMedal({ objectID, objectType })
        this.medalFileDownload = downloadMedal?.objectID
      } catch (error) {
        this.doTrackSegmentError(error, 'Download Medal')
      }
    },
    async doDownloadMedal() {
      this.doTrackMedalShareSegment('Custom')
      const media = await this.details?.Media.filter((media) => {
        return media?.objectType === 'Medal'
      })

      const objectID = media[0]?.objectID
      // this.showDownloadProgress = true

      try {
        const url =
          this.getAPIURL() +
          `/downloadMedal?objectID=${objectID}&fileName=${this.convertStringToSlug(this.title)}-digital-medal`

        console.log(url)
        this.$toast?.success(`Downloading Medal Please Wait.`, {
          duration: 7000,
          position: 'bottom-right',
        })

        const link = document.createElement('a')

        console.log(link)

        link.href = url
        await link.click()
        URL.revokeObjectURL(link.href)

        // this.showDownloadProgress = false
        // this.downloadProgress = 0
      } catch (error) {
        this.doTrackSegmentError(error, 'Download Medal')
      }
    },
    async doTrackMedalShareSegment(sharePlatform) {
      await this.$appClient.segment.trackMedalShare({ medalType: 'event', sharePlatform })
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-nft-medals-introduction::v-deep {
  background-color: #0c353e;
  color: $white;
  padding: 80px 0 150px;
  position: relative;
  min-height: 600px;
  // background-image: url('~/assets/images/NFTMedals/event-introduction.webp');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  overflow: hidden;

  @include max-width(1125px) {
    min-height: 500px;
  }

  @include max-width(1024px) {
    padding: 30px 0 80px;
  }

  @include max-width(767px) {
    min-height: auto;
    background-image: none;
    padding-top: 0;
    padding-bottom: 50px;
  }

  &.portrait {
    &::before {
      top: -35px;
      left: 355px;
      background-size: 1150px;

      @include max-width(1215px) {
        left: 261px;
      }

      @include max-width(1024px) {
        background-size: 850px;
      }

      @include max-width(1023px) {
        left: 28.7%;
      }
    }
  }

  &.dark {
    &::before {
      background-image: url('~assets/images/Medals/bg-circles-dark.png');
    }
  }

  &::before {
    background-image: url('~assets/images/Medals/bg-circles.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1320px;
    position: absolute;
    top: 0;
    left: 360px;
    width: 100%;
    height: 100%;
    z-index: 0;
    content: '';

    @include max-width(1407px) {
      left: 257px;
    }

    @include max-width(1024px) {
      left: 200px;
      background-size: 1100px;
    }

    @include max-width(768px) {
      left: 165px;
      background-size: 930px;
    }

    @include max-width(767px) {
      content: none;
    }
  }

  .container {
    position: relative;
    z-index: 2;

    .row {
      .left-content {
        position: relative;
        z-index: 3;
        padding-right: 30px;

        @include min-width(1920px) {
          max-width: 945px;
        }

        @include max-width(1216px) {
          max-width: 55%;
        }

        @include max-width(1024px) {
          max-width: 50%;
        }

        @include max-width(767px) {
          flex: none;
          width: 100%;
          max-width: 100%;
          order: 2;
          padding-top: 30px;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
        }

        &.portrait {
          max-width: 100%;
        }

        h1 {
          letter-spacing: -2.1px;
          line-height: 5.7143rem;
          margin-bottom: 50px;

          @include max-width(1215px) {
            margin-bottom: 30px;
            letter-spacing: -0.8px;
            line-height: 1.2;
            font-size: 2.8571rem;
          }
        }

        p {
          font-size: 1.5714rem;
          font-weight: 300;
          margin-bottom: 30px;

          @include max-width(1215px) {
            font-size: 1.1429rem;
          }

          @include max-width(767px) {
            order: 3;
            margin-bottom: 0;
          }
        }

        .actions {
          position: relative;

          @include max-width(767px) {
            margin-bottom: 30px;
          }

          .btn-interested {
            text-transform: uppercase;
            font-size: 1.25rem;
            padding: calc(0.5em - 1px) 1em;
            border-radius: 4px;

            @include max-width(427px) {
              font-size: 1rem;
            }

            a {
              color: $white;
              display: block;
            }
          }

          .button {
            @include max-width(427px) {
              font-size: 1rem;
            }

            &.faded {
              opacity: 0.5;
            }
          }

          .xo-nft-medals-feedback {
            top: 45px;

            &.up {
              left: 0;
            }

            &.down {
              left: 180px;

              @include max-width(1214px) {
                left: 0;
              }
            }
          }
        }
      }

      .right-content {
        width: 100%;
        max-width: 600px;

        &.portrait {
          @include max-width(1407px) {
            max-width: 405px;
          }

          @include max-width(1000px) {
            max-width: 40.7%;
          }

          @include max-width(767px) {
            width: calc(100% + 30px);
            max-width: inherit;
            margin: 0 -15px;
            order: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(var(--vh, 1vh) * 100 - 63px);
            position: relative;
            padding: 0 5px;
            overflow: hidden;

            &::before {
              background-image: url('~/assets/images/Medals/bg-circles.png');
              background-size: 1000px;
              background-position: center;
              background-repeat: no-repeat;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              content: '';
            }
          }
        }

        @include max-width(1215px) {
          max-width: 400px;
        }

        @include max-width(768px) {
          max-width: 330px;
        }

        @include max-width(767px) {
          width: calc(100% + 30px);
          max-width: inherit;
          margin: 0 -15px;
          order: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(var(--vh, 1vh) * 100 - 63px);
          position: relative;
          padding: 0 5px;
          overflow: hidden;

          &::before {
            background-image: url('~/assets/images/Medals/bg-circles.png');
            background-size: 1000px;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            content: '';
          }
        }

        .xa-medals-video {
          position: relative;
          z-index: 2;

          &.landscape {
            width: 100%;

            .video-js {
              width: 100%;
              height: 400px;

              @include max-width(1024px) {
                height: 350px;
              }

              @include max-width(768px) {
                height: 270px;
              }

              @include max-width(767px) {
                height: 400px;
              }
            }
          }

          &.portrait {
            @include max-width(767px) {
              width: 100%;
              max-width: 320px;
            }

            .video-js {
              @include max-width(1024px) {
                width: 220px;
              }

              @include max-width(767px) {
                width: 100%;
                height: 500px;
              }
            }
          }

          .video-js {
            width: 265px;
            height: 480px;

            @include max-width(1024px) {
              width: 200px;
              height: 360px;
            }

            @include max-width(767px) {
              width: 265px;
              height: 480px;
            }
          }
        }

        .video-wrapper {
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          height: 550px;
          position: relative;

          &.is-fullscreen {
            .video-js {
              video {
                width: 100%;
                height: 100% !important;
              }
            }
          }

          .click-event {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            z-index: 2;
          }

          .video-js {
            background-color: unset !important;
            width: 230px;
            height: auto;
            z-index: 1;
            position: absolute;
            top: 70px;
            margin-left: 10px;

            video {
              width: unset;
              height: 400px !important;
              border-radius: 12px !important;
              position: relative;
            }
          }
        }
      }
    }
  }
}

.dropdown-content {
  a {
    padding: 0 1rem !important;
    font-size: 1rem;
    width: 250px;
    background-color: transparent !important;
  }

  .copy-link,
  .download-link {
    padding-left: 23px !important;
    padding-bottom: 10px !important;
    height: 45px;
    background-color: transparent !important;
    display: flex;
    align-items: center;

    ._icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
      color: #65676b;
    }

    ._label {
      margin-left: 15px;
    }
  }
}
</style>
