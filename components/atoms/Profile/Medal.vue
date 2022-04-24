<template lang="pug">
.xa-profile-medal.card
  .card-content
    .details.flex-column
      //- .is-finished.row.items-center.justify-center(v-if="isFinished")
        ._icon.row.items-center.mr-2: img(src="~assets/images/MarketPlace/clock.svg")
        ._label Past Event
      XAMedalsVideo(:video="videoURL", :image="imageURL", :orientation="orientation", :autoplay="false" v-if="details")
      b-skeleton(height="200px" v-else)
      .content.flex-column.col
        ._header.row.items-center
          .logo.mr-3(v-if="type === 'Business'")
            XAProfileAvatar(
              size="42px",
              :image="businessProfilePhotoURL",
              :label="$app.getNameInitials(businessName)"
              v-if="details")
            b-skeleton(width="42px" height="42px" circle v-else)
          router-link._title.col(:to="`/marketplace/p/${productSlug}`" v-if="details") {{ productTitle }}
          .col(v-else): b-skeleton
        template(v-if="type === 'Member'")
          .medal.justify-between.col(:class="distanceType ? 'has-distance-type flex-column' : 'row'")
            template(v-if="details")
              .place.row(v-if="place")
                ._icon: img(src="~assets/images/MarketPlace/medal-place.svg")
                .value {{ place }}
              .time.row(v-if="time")
                ._icon: img(src="~assets/images/MarketPlace/medal-time.svg")
                .value {{ time }}
              .distance.row
                ._icon: img(src="~assets/images/MarketPlace/medal-distance.svg")
                .value {{ distance }}{{ distanceUnit }} #[span(v-if="distanceType") &mdash; {{ distanceType }}]
            b-skeleton(v-else)
          b-button.text-uppercase(
            type="is-primary"
            tag="router-link",
            :to="`/medals/${slug}/${memberSlug}`"
            v-if="details") See Details
          .mt-3(v-else): b-skeleton(height="35px")
        template(v-else)
          .product.col
            template(v-if="details")
              .date.row(v-if="productDate")
                ._icon.mr-3: img(src="~assets/images/MarketPlace/calendar.svg")
                .value.col {{ productDate }}
              .time.row(v-if="productTime")
                ._icon.mr-3: img(src="~assets/images/MarketPlace/clock.svg")
                .value.col {{ productTime }}
              .location.row(v-if="productCountry")
                ._icon.mr-3: img(src="~assets/images/MarketPlace/navigations.svg")
                .value.col
                  span.mr-1(v-if="productAddress") {{ productAddress }},
                  span(v-if="productCountry") {{ productCountry }}
              .price.row(v-if="productPricing")
                ._icon.mr-3: img(src="~assets/images/MarketPlace/price.svg")
                .value.col
                  template(v-if="productPricing === 'Free'")
                    span Free
                  template(v-else)
                    span {{ productCurrency }} &dollar;{{ productAmount }}
            template(v-else)
              .mb-2(v-for="n in 3"): b-skeleton
          b-button.text-uppercase(type="is-primary" tag="router-link", :to="`/medals/${productSlug}`" v-if="details") See Details
          .mt-3(v-else): b-skeleton(height="35px")
</template>

<script>
import moment from 'moment'
import XAMedalsVideo from '~/components/atoms/Medals/Video'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XAProfileMedal',
  components: { XAMedalsVideo, XAProfileAvatar },
  props: {
    details: Object,
    type: String,
  },
  computed: {
    slug() {
      return this.details?.slug || ''
    },
    medal() {
      return this.details?.Medal || this.details || null
    },
    isFinished() {
      return this.medal?.isFinished || false
    },
    videoURL() {
      if (!this.medal) return
      const video = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return video[0]?.VideoURL
    },
    imageURL() {
      if (!this.medal) return
      const image = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return image[0]?.VideoThumbnail
    },
    orientation() {
      if (!this.medal) return
      const orientation = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return orientation[0]?.orientation
    },
    place() {
      return this.details?.place || null
    },
    time() {
      return this.details?.time || null
    },
    distance() {
      return Math.round(this.details?.distance) || 0
    },
    distanceUnit() {
      return this.details?.distanceUnit || ''
    },
    distanceType() {
      return this.details?.distanceType || null
    },
    product() {
      return this.details?.Product || null
    },
    productTitle() {
      return this.product?.title || ''
    },
    productSlug() {
      return this.product?.slug || '/'
    },
    productDate() {
      return moment(this.product?.startDate || new Date()).format('MMM DD, YYYY') || null
    },
    productTime() {
      return this.product?.startTime || null
    },
    productAddress() {
      return this.product?.city || this.product?.state || null
    },
    productCountry() {
      return this.product?.country || null
    },
    productPricing() {
      return this.product?.pricing || null
    },
    productCurrency() {
      return this.product?.viewerCurrency || null
    },
    productAmount() {
      return parseFloat(this.product?.priceAmount || 0).toFixed(2)
    },
    memberSlug() {
      return this.details?.userSlug || '/'
    },
    business() {
      return this.product?.Business || null
    },
    businessName() {
      return this.business?.name || ''
    },
    businessProfilePhotoURL() {
      return this.business?.profilePhotoURL || null
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-profile-medal::v-deep {
  height: 100%;
  border-radius: 6px;

  .card-content {
    padding: 15px;
    height: 100%;

    .details {
      height: 100%;
      position: relative;

      .is-finished {
        position: absolute;
        z-index: 9;
        top: 10px;
        left: 10px;
        background-color: #eef1f1;
        min-width: 115px;
        height: 32px;
        padding: 5px 10px;
        border-radius: 100px;
      }

      .xa-medals-video {
        width: 100%;
      }

      .content {
        margin-top: 15px;

        ._header {
          margin-bottom: 15px;

          ._title {
            font-size: 1.1429rem;
            line-height: 1.25;
            color: $secondary;
            display: block;
          }
        }

        .medal {
          &.has-distance-type {
            .place,
            .time,
            .distance {
              margin-bottom: 10px;

              ._icon {
                margin-right: 10px;
              }
            }
          }

          .place,
          .time,
          .distance {
            font-weight: 300;

            ._icon {
              margin-right: 3px;
            }
          }
        }

        .product {
          > div {
            margin-bottom: 10px;
            font-weight: 300;
          }
        }

        .button {
          margin-top: 15px;
          width: 100%;
        }
      }
    }
  }
}
</style>
