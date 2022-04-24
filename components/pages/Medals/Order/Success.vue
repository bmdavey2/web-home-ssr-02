<template lang="pug">
.xp-medals-order-success.row.items-center
  .background-video
    video(autoplay loop muted playsinline webkit-playsinline disablePictureInPicture)
      source(
        src="https://firebasestorage.googleapis.com/v0/b/activeplace-production-assets/o/animations%2Fblob-dark-homepage-businesspage.mp4?alt=media&token=52178cf3-d920-4896-ac16-9201f3e3d4cc"
        type="video/mp4")
  .container.is-max-widescreen
    .text-contents
      img(src="~assets/images/Medals/success-checked.svg" alt="Medal Order Success" width="116" height="116")
      h1 Your enquiry was sent
      h4 One of our friendly experts will be in touch with you
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XPMedalsOrderSuccess',
  computed: {
    ...mapFields('medals', [
      'order.name',
      'order.email',
      'order.phoneNumber',
      'order.eventWebsite',
      'order.medalDesign',
      'order.marketingActivation',
      'order.eventName',
      'order.companyName',
      'order.eventType',
      'order.eventParticipants',
      'order.eventDate',
      'order.eventLocation',
      'order.eventFrequency',
      'order.eventAnnualParticipants',
      'order.isSuccess',
    ]),
  },
  mounted() {
    this.clearMedalOrder()
  },
  methods: {
    ...mapActions({
      clearMedalOrder: 'medals/clearMedalOrder',
    }),
  },
}
</script>

<style lang="scss" scoped>
.xp-medals-order-success::v-deep {
  min-height: calc(var(--vh, 1vh) * 100 - 90px);
  position: relative;
  overflow: hidden;
  padding: 100px 0;

  @include max-width(1023px) {
    align-items: flex-start;
  }

  @include max-width(767px) {
    min-height: calc(var(--vh, 1vh) * 100 - 70px);
  }

  .background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text-contents {
    position: relative;
    z-index: 1;
    color: $white;

    img {
      margin-bottom: 80px;

      @include max-width(1023px) {
        margin-bottom: 20px;
      }

      @include max-width(767px) {
        width: 80px;
      }
    }

    h1 {
      font-size: 5rem;
      line-height: 5.7143rem;
      letter-spacing: -2.1px;
      margin-bottom: 30px;

      @include max-width(1023px) {
        font-size: 2.8571rem;
        line-height: 4rem;
        margin-bottom: 15px;
      }
    }

    h4 {
      font-size: 1.5714rem;
      font-weight: 100;
      line-height: 2.8571rem;
      letter-spacing: -0.66px;
      opacity: 0.8;

      @include max-width(1023px) {
        font-size: 1.1429rem;
        line-height: 2rem;
      }
    }
  }
}
</style>
