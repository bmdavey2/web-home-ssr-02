<template lang="pug">
.xo-businesses-landing-section-02
  .container.is-max-widescreen
    h2.mb-6 More than just a medal, it’s a completely new channel for your event
    h4.text-weight-thin.faded NFT Medals are here to become your number one online marketing and engagement tool. It’s the competitive edge you’ve been searching for.

    .content-section.access.row.items-center.justify-between
      .left-content
        h3 Access to our 250 000+ user digital network
        h4.text-weight-thin ActivePlace has built a growing digital network focused around sports and fitness. We elevate your event and its Digital NFT Medal to more of the right people growing sales and brand exposure

      .right-content: XMBusinessesLandingAccessDigitalNetwork

    XMBusinessesLandingExpertsSection
    XMBusinessesLandingRevenueSection
    XMBusinessesLandingExpandEventCommunitySection

    .content-section.claim-rate.row.items-center.justify-between
      .claim-left-content
        h2 100% Digital NFT Medal Claim Rate

      .claim-right-content
        h4.text-weight-thin Participants have claimed their Digital NFT Medals and shared it at least 4 times per participant with their community
</template>

<script>
import XMBusinessesLandingAccessDigitalNetwork from '~/components/molecules/v2/Businesses/Landing/AccessDigitalNetwork'
import XMBusinessesLandingExpertsSection from '~/components/molecules/v2/Businesses/Landing/ExpertsSection'
import XMBusinessesLandingRevenueSection from '~/components/molecules/v2/Businesses/Landing/RevenueSection'
import XMBusinessesLandingExpandEventCommunitySection from '~/components/molecules/v2/Businesses/Landing/ExpandEventCommunitySection'

export default {
  name: 'XOBusinessesLandingSection02',
  components: {
    XMBusinessesLandingAccessDigitalNetwork,
    XMBusinessesLandingExpertsSection,
    XMBusinessesLandingRevenueSection,
    XMBusinessesLandingExpandEventCommunitySection,
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-businesses-landing-section-02::v-deep {
  background-color: #08252c;
  padding: 100px 0 200px;

  @include max-width(1023px) {
    padding: 80px 0 150px;
  }

  @include max-width(767px) {
    padding-bottom: 120px;
  }

  h2 {
    width: 100%;
    max-width: 850px;
  }

  h3 {
    margin-bottom: 25px;
  }

  h4 {
    &.faded {
      opacity: 0.8;
    }
  }

  .content-section {
    &.access {
      background-color: $primary;
      min-height: 450px;
      border-radius: 10px;
      position: relative;
      margin-top: 170px;
      padding: 70px 50px 110px 50px;
      margin-bottom: 50px;

      @include max-width(1023px) {
        margin-top: 130px;
        min-height: 400px;
      }

      @include max-width(767px) {
        padding: 50px 30px;
        margin-top: 110px;
        margin-bottom: 30px;
      }

      &::before {
        content: '';
        border-bottom: 70px solid $primary;
        border-left: 100px solid transparent;
        border-right: 100px solid transparent;
        width: calc(100% - 10px);
        position: absolute;
        top: -69px;
        left: 5px;

        @include max-width(767px) {
          border-bottom-width: 50px;
          border-left-width: 70px;
          border-right-width: 70px;
          top: -49px;
        }
      }

      &::after {
        content: '';
        background-image: linear-gradient(#08252c, rgba(8, 37, 44, 0));
        position: absolute;
        top: -70px;
        left: 0;
        width: 100%;
        height: 70px;

        @include max-width(767px) {
          top: -50px;
          height: 50px;
        }
      }

      .left-content {
        @include max-width(830px) {
          max-width: calc(55% - 10px);
        }

        @include max-width(767px) {
          max-width: 100%;
          order: 2;
        }
      }

      .right-content {
        @include max-width(830px) {
          max-width: calc(45% - 10px);
        }

        @include max-width(767px) {
          max-width: 100%;
          order: 1;
          margin-bottom: 80px;
        }
      }
    }

    &.claim-rate {
      background-color: #2a4e55;
      border-radius: 10px;
      position: relative;
      padding: 50px;
      min-height: 290px;

      @include max-width(767px) {
        padding: 50px 30px;
      }

      &::before {
        content: '';
        border-top: 70px solid #2a4e55;
        border-left: 100px solid transparent;
        border-right: 100px solid transparent;
        width: calc(100% - 10px);
        position: absolute;
        bottom: -69px;
        left: 5px;

        @include max-width(767px) {
          border-top-width: 50px;
          border-left-width: 70px;
          border-right-width: 70px;
          bottom: -49px;
        }
      }

      &::after {
        content: '';
        background-image: linear-gradient(rgba(8, 37, 44, 0), #08252c);
        position: absolute;
        bottom: -70px;
        left: 0;
        width: 100%;
        height: 70px;

        @include max-width(767px) {
          height: 50px;
          bottom: -50px;
        }
      }

      .claim-left-content {
        width: 60%;

        @include max-width(1023px) {
          width: 50%;
        }

        @include max-width(767px) {
          width: 100%;
        }

        h2 {
          @include max-width(767px) {
            margin-bottom: 20px;
          }
        }
      }

      .claim-right-content {
        width: calc(40% - 20px);

        @include max-width(1023px) {
          width: calc(50% - 20px);
        }

        @include max-width(767px) {
          width: 100%;
        }
      }
    }

    .left-content,
    .right-content {
      width: 100%;
      max-width: calc(50% - 50px);

      @include max-width(1215px) {
        max-width: calc(50% - 10px);
      }
    }
  }
}
</style>
