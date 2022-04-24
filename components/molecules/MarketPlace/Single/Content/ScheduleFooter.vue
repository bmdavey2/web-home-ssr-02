<template lang="pug">
.xm-marketplace-single-schedule-footer
  .header
    .left-header
      h3 {{ title }}
    .right-header
      // TODO activate this wnen subscription is ready
      .actions(v-if="plan !== null")
        .external-url(
          v-if="inquiryType === 'External URL'"
          v-html="externalURL"
          @click="onClickExternalURL"
          v-linkified:options="{defaultProtocol: 'https', format() { return 'Go To Site'}}")
        template(v-else)
          template(v-if="isClosed")
            b-button.is-closed Register Interest
            .registration-closed Registration Closed
          template(v-else)
            b-button(type="is-primary" @click.prevent="doShowRegisterInterest()") Register Interest
  .contents
    .left-content
      .date.schedule-section(v-if="startDate")
        .start.is-flex-width-auto.pr-2
          ._title Start Day
          .value
            img(src="~assets/images/MarketPlace/calendar.webp")
            | {{ startDate }}
        .end.is-flex-width-auto.pl-2
          ._title End Day
          .value {{ endDate }}
    .right-content
      .view-details(@click.prevent="showDetails = !showDetails")
        | View all details
        b-icon(:icon="showDetails ? 'chevron-up' : 'chevron-down'" custom-size="mdi-24px")
  template(v-if="showDetails")
    .expanded-details
      .date.schedule-section(v-if="startDate")
        .end.is-flex-width-auto
          ._title End Day
          .value {{ endDate }}
      .time.schedule-section(v-if="startTime")
        .start.is-flex-width-auto.pr-2
          ._title Start Time
          .value
            img(src="~assets/images/MarketPlace/clock.webp")
            | {{ startTime }}
        .end.is-flex-width-auto.pl-2(v-if="endTime")
          ._title End Time
          .value {{ endTime }}
        .timezone(v-if="timezone") Timezone {{ timezone }}
      .location.schedule-section
        ._title Location
        .value(style="width: 100%")
          img(src="~assets/images/MarketPlace/navigations.webp")
          span.is-flex-width-auto #[span(v-if="address1 && address1 !== 'null'") {{ address1 }},] #[span(v-if="state && state !== 'null'") {{ state }},] #[span(v-if="postcode && postcode !== 'null'") {{ postcode }},] #[span(v-if="country && country !== 'null'") {{ country }}]
      //.repeats.schedule-section
        ._title Repeats
      // TODO activate this wnen subscription is ready
      template(v-if="plan === null")
        .price.schedule-section(v-if="!['Unknown', 'Free'].includes(pricing)")
          ._title Price
          .value(style="width: 100%")
            img(src="~assets/images/MarketPlace/price.webp")
            span {{ currency }} {{ priceAmount }} #[span(v-if="priceAmountMax !== '0.00'") &mdash; {{ priceAmountMax }}]
        .actions
          template(v-if="isClosed")
            b-button.is-closed Register Interest
            .registration-closed Registration Closed
      template(v-else)
        .price.schedule-section
          ._title Price
          .value(style="width: 100%")
            template(v-if="pricing === 'Unknown' || pricing === 'Free'")
              span.unknown(v-if="inquiryType === 'External URL'") Click "Go To Site" for more information.
              span.unknown(v-else) Click "Register Interest" for inquries.
            template(v-else)
              img(src="~assets/images/MarketPlace/price.webp")
              //span.free(v-if="pricing === 'Free'") Free
              span {{ currency }} {{ priceAmount }} #[span(v-if="priceAmountMax !== '0.00'") &mdash; {{ priceAmountMax }}]
</template>

<script>
import moment from 'moment'

export default {
  name: 'XMMarketPlaceSingleSchedule',
  props: {
    product: Object,
  },
  data() {
    return {
      showDetails: false,
    }
  },
  computed: {
    title() {
      return this.product?.title || null
    },
    startDate() {
      return moment(this.product?.startDate).format('MMM DD, YYYY') || null
    },
    endDate() {
      return moment(this.product?.endDate).format('MMM DD, YYYY') || null
    },
    startTime() {
      return this.product?.startTime || null
    },
    endTime() {
      return this.product?.endTime || null
    },
    timezone() {
      return this.product?.timezone
    },
    address1() {
      return this.product?.address1 || null
    },
    address2() {
      return this.product?.address2 || null
    },
    city() {
      return this.product?.city || null
    },
    country() {
      return this.product?.country || null
    },
    state() {
      return this.product?.state || null
    },
    postcode() {
      return this.product?.postcode || null
    },
    repeats() {
      return this.product?.repeats || null
    },
    pricing() {
      return this.product?.pricing || null
    },
    currency() {
      return this.product?.viewerCurrency || null
    },
    priceAmount() {
      return parseFloat(this.product?.viewerPrice || 0).toFixed(2)
    },
    priceAmountMax() {
      return parseFloat(this.product?.viewerPriceMax || 0).toFixed(2)
    },
    inquiryType() {
      return this.product?.inquiryType || null
    },
    externalURL() {
      return this.product?.externalURL || null
    },
    isClosed() {
      return new Date(this.endDate) < new Date()
    },
    plan() {
      return this.product?.Business?.plan || null
    },
  },
  mounted() {
    if (!this.lt) return
    if (this.lt('tabletLG')) {
      this.$zendesk.hide()
    }
  },
  methods: {
    doShowRegisterInterest() {
      this.$buefy.modal.open({
        component: require('~/components/pages/RegisterInterest').default,
        parent: this,
        width: 490,
        canCancel: false,
        customClass: 'register-interest',
        props: {
          product: this.product,
        },
      })
    },
    onClickExternalURL() {
      if (this.product) {
        let groupId, userId
        if (this.isLoggedIn) {
          if (this.currentBusinessID) {
            groupId = this.currentBusinessID
          } else {
            userId = this.$store.state.auth?.uid
          }
        }
        this.$appClient.segment.trackProductExternalClick({
          id: this.product.id,
          title: this.product.title,
          ownerName: this.product.Business?.name || this.product.Member?.name || '',
          groupId,
          userId,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-single-schedule-footer::v-deep {
  box-shadow: 0 6px 20px rgba(6, 28, 32, 0.3);
  border-radius: 6px 6px 0 0;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: $white;
  display: none;

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: 20px;

    .left-header {
      flex: 10000 1 0;

      h3 {
        font-size: 1.7143rem;
        line-height: 1.2;
        color: #050505;
        text-transform: uppercase;
      }
    }

    .right-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

      .external-url {
        width: 100%;
        max-width: 110px;

        a {
          display: block;
          background-color: $primary;
          color: $white;
          text-transform: uppercase;
          padding: calc(0.5em - 1px) 1rem;
          text-align: center;
          border-radius: 4px;
        }
      }

      .actions {
        button,
        a {
          text-transform: uppercase;
          width: 100%;

          &.is-closed {
            background-color: #c2c8c9;
            color: $white;
            text-transform: uppercase;
            box-shadow: none;
            outline: none;
            border: 0;
          }
        }

        .registration-closed {
          text-align: center;
          color: $primary;
          margin-top: 10px;
          font-size: 1.1429rem;
          user-select: none;
        }
      }
    }
  }

  .contents {
    display: flex;
    flex-wrap: wrap;

    .left-content {
      flex: 10000 1 0;

      .schedule-section {
        margin-bottom: 0;
      }
    }

    .right-content {
      padding-left: 30px;

      .actions {
        margin-bottom: 20px;

        button,
        a {
          text-transform: uppercase;
          width: 100%;

          &.is-closed {
            background-color: #c2c8c9;
            color: $white;
            text-transform: uppercase;
            box-shadow: none;
            outline: none;
            border: 0;
            margin-bottom: 3px;
          }
        }

        .registration-closed {
          text-align: center;
          color: $primary;
          margin-top: 10px;
          font-size: 1.1429rem;
          user-select: none;
        }
      }

      .view-details {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;

        .icon {
          margin-left: 3px;
        }
      }
    }
  }

  .expanded-details {
    margin-top: 20px;

    .date {
      display: none;
    }
  }

  .schedule-section {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    ._title {
      font-weight: 300;
      color: #65676b;
      margin-bottom: 5px;
    }

    .value {
      color: #050505;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;

      img {
        margin-right: 7px;
      }
    }

    &.date,
    &.time {
      width: 100%;
      max-width: 270px;
    }

    &.time {
      .timezone {
        font-size: 0.8571rem;
        color: #65676b;
        margin-top: 5px;
        width: 100%;
      }
    }

    &.price {
      margin-bottom: 0;

      .free {
        font-weight: 500;
        color: #219653;
        text-transform: uppercase;
      }

      .unknown {
        font-weight: 300;
        font-style: italic;
        letter-spacing: -0.6px;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    display: block;
  }

  @media screen and (max-width: 767px) {
    .header {
      .left-header {
        display: none;
      }

      .right-header {
        width: 100%;
        text-align: right;
      }
    }

    .contents {
      .left-content {
        .date {
          .end {
            display: none;
          }
        }
      }
    }

    .expanded-details {
      .date {
        display: flex;
      }
    }
  }
}
</style>
