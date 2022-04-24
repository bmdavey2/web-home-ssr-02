<template lang="pug">
.xo-medals-past-details
  .container
    .row.justify-between
      .left-details.column-details
        .past-event.row.items-center.justify-center
          ._icon.mr-2.row.items-center: img(src="~assets/images/Medals/past-event.svg")
          ._label Past Event
        h1.event-title {{ title }}
        .separator
        .date-location.row
          .date
            ._title.text-weight-light Date
            .value.row
              b-icon(icon="calendar-month" custom-size="mdi-18px")
              .text-weight-light.col.ml-1 {{ date }}
          .location.col
            ._title.text-weight-light Location
            .value.row
              b-icon(icon="map-marker-outline" custom-size="mdi-18px")
              .text-weight-light.col.ml-1
                span.address.mr-1(v-if="address") {{ address }},
                span.suburb.mr-1(v-if="suburb") {{ suburb }},
                span.city.mr-1(v-if="city") {{ city }},
                span.state.mr-1(v-if="state") {{ state }},
                span.country(v-if="country") {{ country }}
      .right-details.flex-column
        .business.column-details.col
          ._title.text-weight-light Organizer
          .row.items-center
            XAProfileAvatar(:label="$app.getNameInitials(businessName)", :image="businessProfilePhotoURL" size="64px")
            .ml-3.col
              .name {{ businessName }}
              .website(v-html="businessWebsite" v-linkified:options="{defaultProtocol: 'https'}" v-if="businessWebsite" @click="doTrackSegmentClickedExternalLink($event)")
        .share.column-details.col
          ._title Share
          .row.justify-between
            .social-media.row.items-center.justify-center.col(@click.prevent="doPostMedal()"): img(
              src="~assets/images/Medals/light-activeplace.svg")

            template(v-for="(socialMedia, index) in socialMedias")
              .social-media.col(:key="index")
                share-network.row.items-center.justify-center(
                  :network="socialMedia.value",
                  :url="url",
                  :title="title",
                  :description="description",
                  :media="imageURL"
                  style="height: 100%"
                  @open="doTrackMedalShareSegment(socialMedia.label)")
                  img(:src="require(`assets/images/Medals/light-${socialMedia.value}.svg`)")
            .social-media.row.items-center.justify-center.col(@click.prevent="doCopyLink()")
              .row.items-center.justify-center: b-icon(icon="link-variant" custom-size="mdi-24px")
              input(
                type="text",
                :value="url"
                ref="copyLink"
                style="width: 100%; opacity: 0; height: 0; padding: 0; border: 0; position: absolute; top: 0; left: 0")
            .social-media.row.items-center.justify-center.col(@click.prevent="doDownloadMedal()")
              .row.items-center.justify-center: b-icon(icon="download" custom-size="mdi-24px")
</template>

<script>
import moment from 'moment'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XOMedalsPastDetails',
  components: { XAProfileAvatar },
  data() {
    return {
      socialMedias: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
      ],
      activeRaceDistance: null,
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
    startDate() {
      return this.product?.startDate || new Date()
    },
    endDate() {
      return this.product?.endDate || new Date()
    },
    date() {
      const startYear = moment(this.startDate).format('YYYY')
      const endYear = moment(this.endDate).format('YYYY')

      if (startYear === endYear) {
        return `${moment(this.startDate).format('MMM DD')} - ${moment(this.endDate).format('MMM DD, YYYY')}`
      }
      return `${moment(this.startDate).format('MMM DD, YYYY')} - ${moment(this.endDate).format('MMM DD, YYYY')}`
    },
    address() {
      return this.product?.address1 || null
    },
    suburb() {
      return this.product?.suburb || null
    },
    city() {
      return this.product?.city || null
    },
    state() {
      return this.product?.state || null
    },
    country() {
      return this.product?.country || ''
    },
    business() {
      return this.product?.Business || null
    },
    businessName() {
      return this.business?.name || ''
    },
    businessProfilePhotoURL() {
      return this.business?.profilePhotoURL || ''
    },
    businessWebsite() {
      return this.business?.website || ''
    },
    video() {
      if (!this.activeRaceDistance) return
      return this.activeRaceDistance?.Media.filter((x) => x.objectType === 'Video') || []
    },
    videoURL() {
      if (!this.activeRaceDistance) return
      const videoURL = this.activeRaceDistance?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return videoURL[0]?.VideoURL
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
      const orientation = this.activeRaceDistance?.Media.filter((media) => {
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
    async doTrackMedalShareSegment(sharePlatform) {
      await this.$appClient.segment.trackMedalShare({ medalType: 'user', sharePlatform })
    },
    doSetActiveRaceDistance(value) {
      this.activeRaceDistance = value
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-medals-past-details::v-deep {
  margin-bottom: 20px;

  .column-details {
    background-color: $white;
    border-radius: 10px;
    padding: 30px;
  }

  ._title {
    color: #65676b;
  }

  .left-details {
    width: calc(100% / 3 * 2 - 10px);

    @include max-width(1023px) {
      width: 100%;
      margin-bottom: 20px;
    }

    .past-event {
      font-weight: 300;
      color: $secondary;
      background-color: #eef1f1;
      width: 115px;
      height: 32px;
      border-radius: 100px;
      margin-bottom: 30px;
    }

    h1 {
      font-size: 5rem;
      font-weight: 400;
      line-height: 1.15;
      color: $secondary;

      @include max-width(767px) {
        font-size: 1.7143rem;
      }
    }

    .separator {
      width: calc(100% + 60px);
      height: 1px;
      background-color: #e5e5e5;
      margin: 20px 0 30px -30px;
    }

    .date-location {
      .date {
        margin-right: 20px;

        @include max-width(767px) {
          width: 100%;
          margin: 0 0 15px;
        }
      }

      .location {
        @include max-width(767px) {
          flex: none;
          width: 100%;
        }
      }

      ._title {
        margin-bottom: 10px;

        @include max-width(767px) {
          margin-bottom: 5px;
        }
      }
    }
  }

  .right-details {
    width: calc(100% / 3 - 20px);

    @include max-width(1023px) {
      width: 100%;
      flex-direction: row;
    }

    .website {
      word-break: break-all;
    }

    .business {
      margin-bottom: 10px;

      @include max-width(1023px) {
        margin-bottom: 0;
        margin-right: 10px;
      }

      @include max-width(767px) {
        width: 100%;
        flex: none;
        margin: 0 0 20px;
      }

      ._title {
        margin-bottom: 15px;
      }
    }

    .share {
      @include max-width(1023px) {
        margin-left: 10px;
      }

      @include max-width(767px) {
        width: 100%;
        flex: none;
        margin: 0;
      }

      ._title {
        font-size: 1.5714rem;
        color: $secondary;
        margin-bottom: 20px;
      }

      .social-media {
        background-color: $primary;
        height: 42px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        color: $white;
        margin: 0 5px;

        a {
          width: 100%;
          height: 100%;
          color: inherit;
        }
      }
    }
  }
}
</style>
