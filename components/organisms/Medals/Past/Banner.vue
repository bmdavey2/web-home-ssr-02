<template lang="pug">
.xo-medals-past-banner(
  :style="[medalBackgroundColor]",
  :class="[orientation, circleColor === 'white' ? 'light' : 'dark']")
  .container
    .row.justify-between.actions
      .left-action
        nuxt-link.btn-action.all-medals.row.items-center(
          :to="`/b/${businessSlug}`"
          @click.native="doShowAllMedals()",
          :style="[medalFontColor]",
          :class="[circleColor === 'white' ? 'light' : 'dark']")
          ._icon.mr-3
            img(src="~assets/images/Medals/arrow-left.svg" v-if="circleColor === 'white'")
            img(src="~assets/images/Medals/arrow-left-dark.svg" v-else)
          ._label.desktop All Medals
          ._label.mobile All

      //- .center-action
        .btn-action.row
          ._icon.mr-2.row.items-center
            img(src="~assets/images/Medals/high-five.svg" v-if="isHighFived")
            img(src="~assets/images/Medals/high-five-outline.svg" v-else)
          .value {{ highFives }}

      .right-action
        b-dropdown(aria-role="list" position="is-bottom-left")
          template(#trigger="{ active }")
            .btn-action.share.row.items-center(
              :style="[medalFontColor]",
              :class="[circleColor === 'white' ? 'light' : 'dark']")
              ._icon.mr-3
                img(src="~assets/images/Medals/share.svg" v-if="circleColor === 'white'")
                img(src="~assets/images/Medals/share-dark.svg" v-else)
              ._label Share

          b-dropdown-item(aria-role="listitem" @click="doPostMedal()")
            .row.items-center
              ._icon.row.items-center.justify-center: img(src="~assets/images/Medals/activeplace.svg")
              ._label.col ActivePlace
          template(v-for="(socialMedia, index) in socialMedias")
            b-dropdown-item(aria-role="listitem", :key="index")
              share-network(
                :network="socialMedia.value",
                :url="url",
                :title="title",
                :description="description",
                :media="imageURL"
                @open="doTrackMedalShareSegment(socialMedia.label)")
                .row.items-center
                  ._icon.row.items-center.justify-center: img(
                    :src="require(`assets/images/Medals/${socialMedia.value}.svg`)")
                  ._label.col {{ socialMedia.label }}
          b-dropdown-item(aria-role="listitem" @click="doCopyLink()")
            .row.items-center
              ._icon.row.items-center.justify-center: b-icon(icon="link-variant" custom-size="mdi-18px")
              ._label.col Copy Link
              input(
                type="text",
                :value="url"
                ref="copyLink"
                style="width: 100%; opacity: 0; height: 0; padding: 0; border: 0")

          b-dropdown-item(aria-role="listitem" @click="doDownloadMedal()")
            .row.items-center
              ._icon.row.items-center.justify-center: b-icon(icon="download" custom-size="mdi-18px")
              ._label.col Download Medal

    .digital-medal.row.justify-center
      XAMedalsVideo(
        :video="videoURL",
        :image="imageURL",
        :orientation="orientation"
        has-controls
        v-if="activeRaceDistance && isActiveChange")

    //- .aggregates.row.justify-end
      .right-aggregate.row(@click.prevent="doToggleHighFive()")
        ._icon.mr-2.row.items-center
          img(src="~assets/images/Medals/high-five.svg" v-if="isHighFived")
          img(src="~assets/images/Medals/high-five-outline.svg" v-else)
        .value {{ highFives }}
</template>

<script>
import XAMedalsVideo from '~/components/atoms/Medals/Video'

export default {
  name: 'XOMedalsPastBanner',
  components: { XAMedalsVideo },
  data() {
    return {
      isHighFived: this.$parent?.pastEventDetails?.isHighFived,
      highFives: this.$parent?.pastEventDetails?.highFives || 0,
      socialMedias: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
      ],
      activeRaceDistance: null,
      isActiveChange: true,
    }
  },
  computed: {
    details() {
      return this.$parent?.eventDetails || null
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
    business() {
      return this.product?.Business || null
    },
    businessSlug() {
      return this.business?.slug || '/'
    },
    video() {
      if (!this.activeRaceDistance) return
      return this.activeRaceDistance?.Media.filter((x) => x.objectType === 'Video') || []
    },
    videoURL() {
      if (!this.activeRaceDistance) return

      const activeVideoURL = this.activeRaceDistance?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return activeVideoURL[0]?.VideoURL
    },
    imageURL() {
      if (!this.activeRaceDistance) return

      const imageURL = this.activeRaceDistance?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return imageURL[0]?.VideoThumbnail
    },
    orientation() {
      if (!this.activeRaceDistance) return

      const orientation = this.details?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return orientation[0]?.orientation
    },
    url() {
      return `${this.baseURL}${this.$route.path}`
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
  mounted() {
    this.$root.$on('set/active/raceDistance', (value) => {
      this.doSetActiveRaceDistance(value)
    })
  },
  methods: {
    doShowAllMedals() {
      this.setMedalActiveTab('medals')
    },
    doPostMedal() {
      if (this.isLoggedIn) {
        this.doTrackMedalShareSegment('ActivePlace')

        const fullscreen = this.lt('tabletLG')
        this.$buefy.modal.open({
          parent: this,
          component: require('~/components/pages/AddUpdate').default,
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
        return
      }

      this.showSignUpNagDialog()
    },
    doCopyLink() {
      this.doTrackMedalShareSegment('Custom')
      const clipBoardElem = document.createElement('input')
      document.body.appendChild(clipBoardElem)
      clipBoardElem.value = this.url
      clipBoardElem.select()
      document.execCommand('copy')
      this.$toast.success('Link copied to clipboard', { duration: 2000, position: 'bottom-right' })
      document.body.removeChild(clipBoardElem)
    },
    async doDownloadMedal() {
      if (this.isLoggedIn) {
        this.doTrackMedalShareSegment('Custom')
        const media = this.activeRaceDistance?.Media.filter((media) => {
          return media?.objectType === 'Medal'
        })

        const objectID = media[0]?.objectID

        try {
          const url =
            this.getAPIURL() +
            `/downloadMedal?objectID=${objectID}&fileName=${this.convertStringToSlug(this.title)}-${
              this.activeRaceDistance?.currentRaceDistance
            }-digital-medal`

          this.$toast?.success(`Downloading Medal Please Wait.`, {
            duration: 7000,
            position: 'bottom-right',
          })

          const link = document.createElement('a')
          link.href = url
          await link.click()
          URL.revokeObjectURL(link.href)
        } catch (error) {
          this.doTrackSegmentError(error, 'Download Medal')
        } finally {
          this.showDownloadProgress = false
          this.downloadProgress = 0
        }

        return
      }

      this.showSignUpNagDialog()
    },
    async doToggleHighFive() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      const id = this.details?.id
      this.isHighFived = !this.isHighFived

      if (this.isHighFived) {
        this.highFives++
        await this.$api.highFiveNFTMedal({ id })
      } else {
        this.highFives--
        await this.$api.unhighFiveNFTMedal({ id })
      }
    },
    async doTrackMedalShareSegment(sharePlatform) {
      await this.$appClient.segment.trackMedalShare({ medalType: 'user', sharePlatform })
    },
    doSetActiveRaceDistance(value) {
      this.isActiveChange = false

      this.$nextTick(() => {
        this.activeRaceDistance = value
        this.isActiveChange = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-medals-past-banner::v-deep {
  padding: 30px 0 250px;
  position: relative;

  &.dark {
    &::before {
      background-image: url('~assets/images/Medals/bg-circles-dark.png');
    }
  }

  &.portrait {
    &::before {
      background-size: 1150px;
      top: -60px;
    }
  }

  &::before {
    content: '';
    background-image: url('~assets/images/Medals/bg-circles.png');
    background-position: center;
    background-size: 1400px;
    background-repeat: no-repeat;
    position: absolute;
    top: -90px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    @include max-width(767px) {
      background-size: 1300px;
      top: -88px;
    }

    @include max-width(427px) {
      background-size: 1100px;
    }
  }

  .actions {
    .btn-action {
      border: 1px solid rgba($white, 0.15);
      color: $white;
      text-transform: uppercase;
      padding: 8.5px 15px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;

      &.dark {
        border: 1px solid rgba($black, 0.15);
      }

      .mobile {
        display: none;
      }
    }

    .center-action {
      display: none;

      @include max-width(767px) {
        display: flex;
      }
    }

    .right-action {
      .dropdown {
        .dropdown-menu {
          width: 240px;

          .dropdown-content {
            padding: 20px;

            > ._title {
              color: $secondary;
            }

            .dropdown-item,
            .has-link {
              background-color: transparent;
              padding: 10px 0;

              a {
                padding: 0;
                display: flex;
                background-color: transparent;
              }

              ._icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
                color: #65676b;
              }

              ._label {
                font-size: 1.1429rem;
                color: $secondary;
                margin-left: 15px;
              }
            }
          }
        }
      }
    }
  }

  .digital-medal {
    padding: 60px 0 0;

    @include max-width(767px) {
      padding: 0 5px;
      margin: 0 -15px;
      min-height: calc(var(--vh, 1vh) * 100 - 135px);
      display: flex;
      align-items: center;
    }

    .xa-medals-video {
      &.portrait {
        @include max-width(767px) {
          width: 100%;
          max-width: 320px;
        }

        .video-js {
          width: 265px;
          height: 480px;

          @include max-width(767px) {
            width: 100%;
            height: 500px;
          }
        }
      }

      &.landscape {
        @include max-width(785px) {
          width: 100%;
        }

        .video-js {
          width: 785px;
          height: 445px;

          @include max-width(785px) {
            width: 100%;
          }

          @include max-width(767px) {
            height: 400px;
          }
        }
      }
    }
  }

  .aggregates {
    @include max-width(767px) {
      display: none;
    }

    .right-aggregate {
      border: 1px solid rgba($white, 0.15);
      color: $white;
      text-transform: uppercase;
      padding: 8.5px 15px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
