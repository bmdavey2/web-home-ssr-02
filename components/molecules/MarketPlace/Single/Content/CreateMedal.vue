<template lang="pug">
.xm-marketplace-single-content-create-medal.row.items-center
  .left-content
    img(src="~assets/images/MarketPlace/achievement.png")
    h2 Want to see digital medals available for this event?
    b-button.text-uppercase(type="is-primary" tag="router-link" to="/contact" @click.native="doSetEnquiryMessage()") Contact Us
    router-link.text-weight-light.link-digital-medals(to="/digital-medals") Read more about digital medals
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XMMarketPlaceSingleContentCreateMedal',
  props: {
    product: Object,
  },
  methods: {
    ...mapActions({
      setMedalEnquiryMessage: 'medals/setMedalEnquiryMessage',
    }),
    doSetEnquiryMessage() {
      const businessID = this.product?.Business?.id

      if (this.currentBusinessID) {
        if (businessID !== this.currentBusinessID) return
      }

      this.setMedalEnquiryMessage(
        `I'm interested in the ${this.product.title} providing digital medals for their upcoming event..`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-content-create-medal::v-deep {
  min-height: 390px;
  background-image: url('~assets/images/MarketPlace/background-cards.webp');
  background-size: cover;
  background-position: right center;
  background-color: $secondary;
  background-repeat: no-repeat;
  border-radius: 6px;
  margin-bottom: 30px;
  color: $white;
  padding: 30px 50px;
  position: relative;

  @include max-width(767px) {
    padding: 30px 20px;
    background-position: right -220px center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(90deg, $secondary 70%, transparent);
    }
  }

  .left-content {
    width: 100%;
    max-width: 60%;
    position: relative;
    z-index: 2;

    @include max-width(767px) {
      max-width: 100%;
    }

    img {
      margin-bottom: 50px;
    }

    h2 {
      font-size: 2.2857rem;
      margin-bottom: 20px;
    }

    .button {
      width: 100%;
      max-width: 220px;
      margin-bottom: 10px;
    }

    .link-digital-medals {
      color: rgba($white, 0.7);
      display: block;
    }
  }
}
</style>
