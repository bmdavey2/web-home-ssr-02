<template lang="pug">
.nft-event-details
  .container
    .columns.is-multiline.is-mobile
      .column.is-7-desktop.is-7-tablet.is-12-mobile
        .card.main-card
          .card-content
            .columns.is-multiline.is-mobile
              .column.is-3-desktop.is-3-tablet.is-12-mobile(v-if="startDate")
                .has-text-weight-light.mb-3.has-text-grey Date
                .is-flex.is-flex-wrap-nowrap
                  .row.mr-2.is-align-items-center: img(src="~assets/icons/light/calendar.svg"  style="min-width: 18px; min-height: 18px; height: 18px; width: 18px")
                  p(v-if="startDate && endDate") {{ convertDate(startDate) + '-' + convertDate('', endDate) }}
                  p(v-else) {{ convertDate('', '', startDate) }}
              .column.is-3-desktop.is-3-tablet.is-12-mobile(v-if="startTime")
                .has-text-weight-light.mb-3.has-text-grey Time
                .is-flex.is-flex-wrap-nowrap
                  .row.mr-2.is-align-items-center: img(src="~assets/icons/light/clock.svg"  style="min-width: 18px; min-height: 18px; height: 18px; width: 18px")
                  p {{ startTime ? convert12(startTime) : '' }} {{  endTime ? "-" : ''  }} {{ endTime ? convert12(endTime) : '' }}
              .column.is-6-desktop.is-6-tablet.is-12-mobile
                .has-text-weight-light.mb-3.has-text-grey Location
                .is-flex.is-flex-wrap-nowrap
                  .row.mr-2.is-align-items-center: img(src="~assets/icons/light/navigation.svg"  style="min-width: 18px; min-height: 18px; height: 18px; width: 18px")
                  p #[span(v-if="address1 && address1 !== 'null'") {{ address1 }},] #[span(v-if="state && state !== 'null'") {{ state }},] #[span(v-if="postcode && postcode !== 'null'") {{ postcode }},] #[span(v-if="country && country !== 'null'") {{ country }}]
      .column.is-5-desktop.is-5-tablet.is-12-mobile
        .card.mb-4
          .card-content                    
            .columns.is-multiline.is-mobile
              .column.is-4-desktop.is-4-tablet.is-12-mobile(style="min-height: 89px;")
                .has-text-weight-light.mb-3.has-text-grey Price
                .is-flex.is-flex-wrap-nowrap
                  .row.mr-2.is-align-items-center
                    img(src="~assets/icons/success/price.svg" style="min-width: 100%" v-if="pricing != 'Paid'")
                    img(
                      v-else
                      src="~assets/images/MarketPlace/price.webp"
                      style="min-width: 15px; min-height: 15px; height: 15px; width: 15px")
                  p.has-text-weight-medium.has-text-success(v-if="pricing != 'Paid'") FREE
                  p(v-else) &dollar;{{ viewerPrice }} #[span(v-if="viewerPriceMax") - &dollar;{{ viewerPriceMax }}]
              .column.is-8-desktop.is-8-tablet.is-12-mobile(style="min--height: 89px;")
                .has-text-weight-light.mb-2.has-text-grey Organizer
                .is-flex.is-flex-wrap-nowrap
                  XAProfileAvatar.mr-3(:label="initials", :image="profilePhotoURL" size="40px")
                  .data-card
                    p {{name}}
                    p(v-html="website" v-linkified:options="{defaultProtocol: 'https'}" v-if="website" @click="doTrackSegmentClickedExternalLink($event)")
</template>

<script>
import moment from 'moment'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
export default {
  name: 'XONFTEventMedalDetails',
  components: { XAProfileAvatar },
  computed: {
    details() {
      return this.$parent?.$parent?.MedalDetails || null
    },
    product() {
      return this.details?.Product || null
    },
    title() {
      return this.product?.title || ''
    },
    slug() {
      return this.product?.slug || ''
    },
    address1() {
      return this.product?.address1 || ''
    },
    state() {
      return this.product?.state || ''
    },
    postcode() {
      return this.product?.postcode || ''
    },
    country() {
      return this.product?.country || ''
    },
    startTime() {
      return this.product?.startTime || new Date()
    },
    endTime() {
      return this.product?.endTime || new Date()
    },
    startDate() {
      return this.product?.startDate || new Date()
    },
    endDate() {
      return this.product?.endDate || new Date()
    },
    pricing() {
      return this.product?.pricing || ''
    },
    viewerCurrency() {
      return this.product?.viewerCurrency || ''
    },
    viewerPrice() {
      return this.product?.viewerPrice || ''
    },
    viewerPriceMax() {
      return this.product?.viewerPriceMax || ''
    },
    website() {
      return this.product?.Business?.website || ''
    },
    profilePhotoURL() {
      return this.product?.Business?.profilePhotoURL || ''
    },
    name() {
      return this.product?.Business?.name || ''
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
  },
  methods: {
    convert12(time) {
      return moment(time, 'hh:mm').format('LT')
    },
    convertDate(first, last, full) {
      if (first) {
        return moment(first).format('MMM D')
      } else if (full) {
        return moment(last).format('MMM D, YYYY')
      } else {
        return moment(last).format('D, YYYY')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.nft-event-details::v-deep {
  min-height: 185px;
  background-color: #f8f8f8 !important;
  position: relative;

  @include max-width(768px) {
    .card {
      margin-top: unset !important;
    }
    .main-card {
      margin-top: -60px !important;
    }
  }
  @include max-width(767px) {
    .main-card {
      margin-top: -45px !important;
    }
  }

  .card {
    margin-top: -60px;
    border-radius: 10px;

    .columns {
      min-height: 130px;
      .column {
        margin: auto;
        .data-card {
          word-break: break-word;
        }
        .xa-profile-avatar {
          min-width: 40px !important;
        }
      }
    }
  }
}
</style>
