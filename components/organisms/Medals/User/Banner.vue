<template lang="pug">
.xo-medals-user-banner(
  :style="[medalBackgroundColor]",
  :class="[orientation, circleColor === 'white' ? 'light' : 'dark']")
  .container
    .row.justify-between.actions
      .left-action
        nuxt-link.btn-action.all-medals.row.items-center(
          v-if="!hasClaim",
          :to="`/p/${userSlug}`"
          @click.native="doShowAllMedals()",
          :style="[medalFontColor]",
          :class="[circleColor === 'white' ? 'light' : 'dark']")
          ._icon.mr-3
            img(src="~assets/images/Medals/arrow-left.svg" v-if="circleColor === 'white'")
            img(src="~assets/images/Medals/arrow-left-dark.svg" v-else)
          ._label.desktop All Medals
          ._label.mobile All
      .center-action
        .btn-action.high-five.row.items-center(
          @click.prevent="doToggleHighFive()",
          :style="[medalFontColor]",
          :class="[circleColor === 'white' ? 'light' : 'dark']")
          ._icon.mr-2.row
            template(v-if="circleColor === 'white'")
              img(src="~assets/images/Medals/high-five.svg" v-if="isHighFived")
              img(src="~assets/images/Medals/high-five-outline.svg" v-else)
            template(v-else)
              img(src="~assets/images/Medals/high-five-dark.svg" v-if="isHighFived")
              img(src="~assets/images/Medals/high-five-outline-dark.svg" v-else)
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

          ._title.text-uppercase.text-weight-medium.mb-4 Share To:

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

          b-dropdown-item(aria-role="listitem" @click="doRetrieveMedalLink()")
            .row.items-center
              ._icon.row.items-center.justify-center: b-icon(icon="download" custom-size="mdi-18px")
              ._label.col Download Medal

    .digital-medal.row.justify-center
      XAMedalsVideo(
        :video="videoURL",
        :image="imageURL",
        :orientation="orientation",
        :has-poster="false"
        preload="auto"
        hasControls)

    .aggregates.row.justify-end.items-end
      //- .left-aggregate
        ._title Blockchain Hash:
        .hash.row.items-center.justify-center # {{ blockchainHash }}
      .right-aggregate.row.items-center.justify-center(
        @click.prevent="doToggleHighFive()",
        :style="[medalFontColor]",
        :class="circleColor === 'white' ? 'light' : 'dark'")
        ._icon.mr-2.row.items-center
          template(v-if="circleColor === 'white'")
            img(src="~assets/images/Medals/high-five.svg" v-if="isHighFived")
            img(src="~assets/images/Medals/high-five-outline.svg" v-else)
          template(v-else)
            img(src="~assets/images/Medals/high-five-dark.svg" v-if="isHighFived")
            img(src="~assets/images/Medals/high-five-outline-dark.svg" v-else)
        .value {{ highFives }}

    XAMedalsDownloadProgress(v-if="showDownloadProgress", :downloadProgress="downloadProgress")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import XAMedalsVideo from '~/components/atoms/Medals/Video'
import XAMedalsDownloadProgress from '~/components/atoms/Medals/DownloadProgress'

export default {
  name: 'XOMedalsUserBanner',
  components: { XAMedalsVideo, XAMedalsDownloadProgress },
  data() {
    return {
      videoPlayer: null,
      socialMedias: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
      ],
      isHighFived: this.$parent?.$parent?.userMedalDetails?.isHighFived || false,
      highFives: this.$parent?.$parent?.userMedalDetails?.highFives || 0,
      showDownloadProgress: false,
      downloadProgress: 0,
    }
  },
  computed: {
    ...mapGetters({
      getUserOwnerDetails: 'user/getUserOwnerDetails',
    }),
    hasClaim() {
      return this.$route.query?.claim || false
    },
    details() {
      return this.$parent?.$parent?.userMedalDetails
    },
    blockchainHash() {
      return this.details?.blockchainHash || null
    },
    medal() {
      return this.details?.Medal || null
    },
    video() {
      return this.medal?.Media.filter((x) => x.objectType === 'Video') || []
    },
    videoURL() {
      const videoURL = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return videoURL[0]?.VideoURL
    },
    imageURL() {
      const imageURL = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return imageURL[0]?.VideoThumbnail
    },
    orientation() {
      const orientation = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return orientation[0]?.orientation
    },
    url() {
      return `${this.baseURL}${this.$route.path}`
    },
    product() {
      return this.details?.Product || null
    },
    title() {
      return this.product?.title || ''
    },
    description() {
      return this.product?.description || ''
    },
    isFullscreen() {
      if (!this.videoPlayer) return
      return this.videoPlayer.isFullscreen()
    },
    initialMedalMessage() {
      return `I’m competing in the ${this.title} for my chance to earn my very first Digital Medal. See the event details below, I hope to see you there :) — ${this.url}`
    },
    member() {
      return this.$parent?.$parent?.userDetails || null
    },
    userSlug() {
      return this.member?.slug
    },
    isMe() {
      if (this.isLoggedIn) {
        return this.getUserOwnerDetails?.id === this.member?.id
      }
      return true
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
    '$parent.$parent.userMedalDetails': {
      deep: true,
      handler(value) {
        this.isHighFived = value?.isHighFived || false
        this.highFives = value?.highFives || 0
      },
    },
    isDownloadingMedal(value) {
      let loader
      if (value) {
        loader = this.$buefy.loading.open
      } else {
        loader.close()
      }
    },
  },
  methods: {
    ...mapActions({
      setMedalActiveTab: 'medals/setMedalActiveTab',
    }),
    async doToggleHighFive() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      const id = this.details?.id
      this.isHighFived = !this.isHighFived

      if (this.isHighFived) {
        this.highFives++
        await this.$api.highFiveNFTUserMedal({ id })
      } else {
        this.highFives--
        await this.$api.unhighFiveNFTUserMedal({ id })
      }
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
            productID: this.product?.id,
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

      this.$root.$emit('set/click/popup', true)
      const claimID = this.$route?.query?.claim
      if (claimID) {
        this.$buefy.modal.open({
          parent: this,
          component: require('~/components/dialogs/Medals/Claim').default,
          width: 700,
          canCancel: false,
        })
      } else {
        this.showSignUpNagDialog()
      }
    },
    doShowAllMedals() {
      this.setMedalActiveTab('medals')
    },
    async doRetrieveMedalLink() {
      if (this.isLoggedIn) {
        this.doTrackMedalShareSegment('Custom')
        const media = this.details?.Medal?.Media.filter((media) => {
          return media?.objectType === 'Medal'
        })

        const objectID = media[0]?.objectID

        try {
          const url =
            this.getAPIURL() +
            `/downloadMedal?objectID=${objectID}&fileName=${this.convertStringToSlug(this.title)}-digital-medal`

          this.$toast?.success(`Downloading Medal Please Wait.`, {
            duration: 7000,
            position: 'bottom-right',
          })

          const link = document.createElement('a')
          link.href = url
          await link.click()
          URL.revokeObjectURL(link.href)

          // this.showDownloadProgress = true
          //
          // const storage = this.$fire.storage
          // const pathRef = storage.ref(`/nft/${objectID}.mp4`)
          // await pathRef
          //   .getDownloadURL()
          //   .then(async (url) => {
          //     await this.$axios
          //       .get(url, {
          //         responseType: 'blob',
          //         onDownloadProgress: (progressEvent) => {
          //           const total = parseFloat(progressEvent.total)
          //           const current = progressEvent.loaded
          //           const percentCompleted = Math.floor((current / total) * 100)
          //           this.downloadProgress = percentCompleted
          //         },
          //       })
          //       .then((response) => {
          //         const blob = new Blob([response.data], { type: 'video/mp4' })
          //         const link = document.createElement('a')
          //         link.href = URL.createObjectURL(blob)
          //         link.download = `${this.convertStringToSlug(this.title)}-digital-medal.mp4`
          //         link.click()
          //         URL.revokeObjectURL(link.href)
          //       })
          //       .catch((error) => {
          //         console.log(error)
          //       })
          //
          //     this.showDownloadProgress = false
          //     this.downloadProgress = 0
          //   })
          //   .catch((error) => {
          //     console.log(error)
          //   })
        } catch (error) {
          this.doTrackSegmentError(error, 'Download Medal')
        } finally {
          this.showDownloadProgress = false
          this.downloadProgress = 0
        }

        return
      }

      this.$root.$emit('set/click/popup', true)
      const claimID = this.$route?.query?.claim
      if (claimID) {
        this.$buefy.modal.open({
          parent: this,
          component: require('~/components/dialogs/Medals/Claim').default,
          width: 700,
          canCancel: false,
        })
      } else {
        this.showSignUpNagDialog()
      }
    },
    async doTrackMedalShareSegment(sharePlatform) {
      await this.$appClient.segment.trackMedalShare({ medalType: 'user', sharePlatform })
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-medals-user-banner::v-deep {
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
      top: 35px;
    }
  }

  @include max-width(767px) {
    min-height: calc(var(--vh, 1vh) * 100 - 63px);
    padding-bottom: 0;
    overflow: hidden;
  }

  .actions {
    position: relative;
    z-index: 3;

    .center-action {
      display: none;

      @include max-width(767px) {
        display: block;
      }
    }

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

      .desktop {
        @include max-width(767px) {
          display: none;
        }
      }

      .mobile {
        display: none;

        @include max-width(767px) {
          display: block;
        }
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
    padding: 50px 0 20px;
    position: relative;
    z-index: 2;

    @include max-width(785px) {
      padding: 50px 15px 20px;
    }

    @include max-width(767px) {
      padding: 0 5px;
      margin: 0 -15px;
      min-height: calc(var(--vh, 1vh) * 100 - 135px);
      display: flex;
      align-items: center;
    }

    .xa-medals-video {
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

      .video-js {
        height: 480px;
        width: 265px;
      }
    }
  }

  .aggregates {
    color: $white;

    .left-aggregate {
      ._title {
        font-size: 1.5714rem;
      }

      .hash {
        background-color: $white;
        color: $dark;
        min-height: 40px;
        padding: 8px 10px;
        border-radius: 5px;
        font-size: 1.1429rem;

        @include max-width(767px) {
          font-size: 1rem;
          word-break: break-all;
        }
      }
    }

    .right-aggregate {
      border: 1px solid rgba($white, 0.15);
      height: 42px;
      border-radius: 5px;
      padding: 0 10px;
      font-weight: 300;
      font-size: 0.8571rem;
      cursor: pointer;
      user-select: none;

      &.dark {
        border: 1px solid rgba($black, 0.15);
      }

      @include max-width(767px) {
        display: none;
      }
    }
  }
}
</style>
