<template lang="pug">
.xm-marketplace-single-schedule
  h3 {{ title }}
  .date.schedule-section(v-if="startDate")
    .start.is-flex-width-auto.pr-2
      ._title Start Day
      .value
        img(src="~assets/images/MarketPlace/calendar.webp")
        | {{ startDate }}
    .end.is-flex-width-auto.pl-2
      ._title End Day
      .value {{ endDate }}
  .time.schedule-section(v-if="startTime")
    .start.is-flex-width-auto.pr-2
      ._title Start Time
      .value
        img(src="~assets/images/MarketPlace/clock.webp")
        | {{ startTime }}
    .end.is-flex-width-auto.pl-2
      ._title End Time
      .value {{ endTime }}
    .timezone(v-if="timezone") Timezone {{ timezone }}
  .location.schedule-section
    ._title Location
    .value(style="width: 100%")
      img(src="~assets/images/MarketPlace/navigations.webp")
      .is-flex-width-auto #[span(v-if="address1 && address1 !== 'null'") {{ address1 }},] #[span(v-if="state && state !== 'null'") {{ state }},] #[span(v-if="postcode && postcode !== 'null'") {{ postcode }},] #[span(v-if="country && country !== 'null'") {{ country }}]
  //.repeats.schedule-section
    ._title Repeats
  // TODO activate this when subscription is ready
  template(v-if="plan === null")
    .price.schedule-section(v-if="!['Unknown', 'Free'].includes(pricing)")
      ._title Price
      .value(style="width: 100%")
        img(src="~assets/images/MarketPlace/price.webp")
        span {{ viewerCurrency }} &dollar;{{ viewerPrice }} #[span(v-if="viewerPriceMax !== '0.00'") &mdash; &dollar;{{ viewerPriceMax }}]
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
          span {{ viewerCurrency }} &dollar;{{ viewerPrice }} #[span(v-if="viewerPriceMax !== '0.00'") &mdash; &dollar;{{ viewerPriceMax }}]
    // TODO remove Warm-Up on array once business subscription has been deployed
    .actions
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
</template>

<script>
import moment from 'moment'

export default {
  name: 'XMMarketPlaceSingleSchedule',
  props: {
    product: Object,
  },
  computed: {
    title() {
      return this.product?.title || null
    },
    startDate() {
      if (this.product?.startDate) {
        return moment(this.product?.startDate).format('MMM DD, YYYY')
      }
      return null
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
    state() {
      return this.product?.state || null
    },
    country() {
      return this.product?.country || null
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
      return this.product?.currency || null
    },
    viewerCurrency() {
      return this.product?.viewerCurrency || null
    },
    priceAmount() {
      return parseFloat(this.product?.priceAmount || 0).toFixed(2)
    },
    priceAmountMax() {
      return parseFloat(this.product?.priceAmountMax || 0).toFixed(2)
    },
    viewerPrice() {
      return parseFloat(this.product?.viewerPrice || 0).toFixed(2)
    },
    viewerPriceMax() {
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
  methods: {
    doShowRegisterInterest() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      this.$buefy.modal.open({
        component: require('~/components/pages/RegisterInterest').default,
        parent: this,
        width: 490,
        canCancel: false,
        props: {
          product: this.product,
        },
      })
    },
    onClickExternalURL() {
      if (this.product) {
        this.$appClient.segment.trackProductExternalClick({
          id: this.product.id,
          title: this.product.title,
          Business: this.product?.Business,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-schedule::v-deep {
  box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;

  h3 {
    font-size: 1.7143rem;
    line-height: 1.2;
    color: $secondary;
    text-transform: uppercase;
    margin-bottom: 20px;
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

    &.time {
      .timezone {
        font-size: 0.8571rem;
        color: #65676b;
        margin-top: 5px;
        width: 100%;
      }
    }

    &.price {
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

    .external-url {
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

    .registration-closed {
      text-align: center;
      color: $primary;
      margin-top: 10px;
      font-size: 1.1429rem;
      user-select: none;
    }
  }
}
</style>
