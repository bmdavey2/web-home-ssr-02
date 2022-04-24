<template lang="pug">
.xo-medals-user-details(:class="!sponsors.length && 'no-sponsors'")
  .container
    .event-user-details.row.justify-between
      .left-event-user.column-details
        .event-title {{ productTitle }}
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
      .right-event-user.flex-column
        .user.column-details.col
          ._title.text-weight-light Medal Owner
          .row
            XAProfileAvatar(:label="$app.getNameInitials(name)", :image="profilePhotoURL" size="64px")
            .ml-3
              .name {{ name }}
              .member-country.row.items-center
                .member-number(v-if="signUpNumber") Member {{ `#${signUpNumber}` }}
                .country(:class="!signUpNumber && 'no-signup-number'"): XAFlag(:country="memberCountry")
        .share.column-details.col
          ._title Share your success with friends:
          .row.justify-between
            .social-media.row.items-center.justify-center.col(@click.prevent="doPostMedal()"): img(
              src="~assets/images/Medals/light-activeplace.svg")

            template(v-for="(socialMedia, index) in socialMedias")
              .social-media.col(:key="index")
                share-network.row.items-center.justify-center(
                  :network="socialMedia.value",
                  :url="url",
                  :title="productTitle",
                  :media="imageURL"
                  style="height: 100%"
                  @open="doTrackMedalShareSegment(socialMedia.label)")
                  img(:src="require(`assets/images/Member/DigitalMedal/light-${socialMedia.value}.svg`)")
            .social-media.row.items-center.justify-center.col(@click="doCopyLink()")
              b-icon(icon="link-variant" custom-size="mdi-24px")
              input(
                type="text",
                :value="url"
                ref="copyLink"
                style="width: 100%; opacity: 0; height: 0; padding: 0; border: 0; position: absolute; top: 0; left: 0")
            .social-media.row.items-center.justify-center.col(@click="doRetrieveMedalLink()")
              .row.items-center.justify-center: b-icon(icon="download" custom-size="mdi-24px")

    .medal-details.row.justify-between
      ._content.column-details.flex-column.justify-between(v-if="place")
        ._icon: img(src="~assets/images/Member/DigitalMedal/place.svg")
        div
          .value {{ place }}
          ._title Overall Finish

      ._content.column-details.flex-column.justify-between(v-if="time")
        ._icon: img(src="~assets/images/Member/DigitalMedal/time.svg")
        div
          .value {{ time }}
          ._title Time

      ._content.column-details.flex-column.justify-between(v-if="distance")
        ._icon: img(src="~assets/images/Medals/distance.svg")
        div
          .value {{ distance }}{{ distanceUnit }}
          ._title Distance

      ._content.column-details.flex-column.justify-between(v-if="overallFinish")
        ._icon: img(src="~assets/images/Member/DigitalMedal/finish.svg")
        div
          .value {{ overallFinish }}
          ._title Age Group Finish

      ._content.column-details.flex-column.justify-between(v-if="ageGroupFinish")
        ._icon: img(src="~assets/images/Member/DigitalMedal/age-group.svg")
        div
          .value {{ ageGroupFinish }}
          ._title Age Group

      ._content.column-details.flex-column.justify-between(v-if="bib")
        ._icon: img(src="~assets/images/Medals/participated.svg")
        div
          .value {{ bib }}
          ._title Bib Number
    XAMedalsDownloadProgress(v-if="showDownloadProgress", :downloadProgress="downloadProgress")
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAMedalsDownloadProgress from '~/components/atoms/Medals/DownloadProgress'
import XAFlag from '~/components/atoms/Flag'

export default {
  name: 'XOMedalsUserDetails',
  components: { XAProfileAvatar, XAMedalsDownloadProgress, XAFlag },
  data() {
    return {
      socialMedias: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
      ],
      showDownloadProgress: false,
      downloadProgress: 0,
    }
  },
  computed: {
    ...mapGetters({
      getUserOwnerDetails: 'user/getUserOwnerDetails',
    }),
    details() {
      return this.$parent?.$parent?.userMedalDetails
    },
    id() {
      return this.details?.id || null
    },
    place() {
      return this.details?.place || null
    },
    time() {
      return this.details?.time || null
    },
    distance() {
      return this.details?.distance || null
    },
    distanceUnit() {
      return this.details?.distanceUnit || null
    },
    overallFinish() {
      return this.details?.overallFinish || null
    },
    ageGroupFinish() {
      return this.details?.ageGroupFinish || null
    },
    peopleParticipated() {
      return this.details?.peopleParticipated || null
    },
    bib() {
      return this.details?.bib || null
    },
    isClaimed() {
      return this.details?.isClaimed || false
    },
    product() {
      return this.details?.Product || null
    },
    productTitle() {
      return this.product?.title || ''
    },
    title() {
      return this.product?.title || ''
    },
    productDescription() {
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
    name() {
      return `${this.details?.firstName} ${this.details?.lastName}` || ''
    },
    profilePhotoURL() {
      return this.details?.profilePhotoURL || null
    },
    signUpNumber() {
      return this.details?.signUpNumber || null
    },
    url() {
      return `${this.baseURL}${this.$route.path}`
    },
    Media() {
      return this.details?.Medal?.Media || ''
    },
    video() {
      return this.Media.filter((x) => x.objectType === 'Video') || []
    },
    imageURL() {
      const imageURL = this.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return imageURL[0]?.VideoThumbnail
    },
    initialMedalMessage() {
      return `I’m competing in the ${this.productTitle} for my chance to earn my very first Digital Medal. See the event details below, I hope to see you there :) — ${this.url}`
    },
    sponsors() {
      return this.product?.Sponsors || []
    },
    member() {
      return this.$parent?.$parent?.userDetails || null
    },
    memberCountry() {
      return this.details?.country || ''
    },
    isMe() {
      if (this.isLoggedIn) {
        return this.getUserOwnerDetails?.id === this.member?.id
      }
      return true
    },
  },
  methods: {
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
.xo-medals-user-details::v-deep {
  background-image: url('~assets/images/Medals/bg-details.webp');
  background-position: top center;
  background-size: cover;
  margin-bottom: -150px;
  position: relative;
  z-index: 2;

  &.no-sponsors {
    margin-bottom: 0;
  }

  @include max-width(767px) {
    margin-bottom: 0;
    padding: 30px 0 0;
  }

  .container {
    position: relative;
    top: -221px;

    @include max-width(767px) {
      top: 0;
    }
  }

  .column-details {
    background-color: $white;
    border-radius: 10px;
    padding: 30px;
  }

  .event-user-details {
    margin-bottom: 20px;

    .left-event-user {
      width: calc(100% / 3 * 2 - 10px);

      @include max-width(768px) {
        width: 100%;
        margin-bottom: 20px;
      }

      .event-title {
        font-size: 5rem;
        line-height: 1.15;
        color: $secondary;
        padding-bottom: 30px;

        @include max-width(768px) {
          font-size: 2.8571rem;
        }

        @include max-width(767px) {
          font-size: 1.7143rem;
        }
      }

      .separator {
        width: calc(100% + 60px);
        height: 1px;
        background-color: #e5e5e5;
        margin-left: -30px;
      }

      .date-location {
        padding-top: 30px;

        .date {
          margin-right: 20px;

          @include max-width(767px) {
            width: 100%;
            margin-bottom: 10px;
          }
        }

        ._title {
          color: #65676b;
          margin-bottom: 3px;
        }

        .value {
          color: $dark;
        }
      }
    }

    .right-event-user {
      width: calc(100% / 3 - 20px);

      @include max-width(768px) {
        width: 100%;
        flex-direction: row;
      }

      .user {
        margin-bottom: 10px;

        @include max-width(768px) {
          margin-bottom: 0;
          margin-right: 10px;
        }

        @include max-width(767px) {
          flex: none;
          width: 100%;
          margin-bottom: 20px;
          margin-right: 0;
        }

        ._title {
          color: #65676b;
          margin-bottom: 15px;
        }

        .name {
          font-size: 1.1429rem;
        }

        .member-country {
          position: relative;

          .member-number {
            // border-right: 1px solid $dark;
            font-size: 0.8571rem;
          }

          .country {
            &.no-signup-number {
              .xa-flag {
                border: 0;
                padding: 0;
                margin: 0;
                left: -10px;
              }
            }
          }
        }
      }

      .share {
        margin-top: 10px;

        @include max-width(768px) {
          margin-top: 0;
          margin-left: 10px;
        }

        @include max-width(767px) {
          flex: none;
          width: 100%;
          margin-left: 0;
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

  .medal-details {
    &::after {
      content: '';
      width: calc(100% / 3 - 20px);
    }

    ._content {
      width: calc(100% / 3 - 20px);
      margin-bottom: 20px;
      min-height: 240px;
      color: $secondary;

      @include max-width(768px) {
        width: calc(100% / 2 - 10px);
      }

      @include max-width(767px) {
        width: 100%;
        min-height: auto;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

      ._icon {
        @include max-width(767px) {
          margin-right: 20px;
        }
      }

      .value {
        font-size: 1.5714rem;
        margin-bottom: 3px;
      }

      ._title {
        font-size: 1.1429rem;
      }
    }
  }
}
</style>
