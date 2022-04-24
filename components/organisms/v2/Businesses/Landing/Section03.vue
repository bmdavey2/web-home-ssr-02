<template lang="pug">
.xo-businesses-landing-section-03
  .container.is-max-widescreen
    h3.mobile.mb-5 A sample of our amazing Digital NFT Medals
    .row.items-center.description
      .contents.col.pr-6
        h3.desktop.mb-5 A sample of our amazing Digital NFT Medals
        h4.text-weight-thin.sub-paragraph We have a range of different Digital NFT Medals for your event. From replicating your physical medal, to custom design, and our Standard Digital NFT Medal package. Contact us to know more about what suits your event

      .actions.pl-6: b-button.text-uppercase(type="is-primary" label="Contact Us" tag="router-link" to="/medals/order")

    .row.justify-between
      .standard-medal
        .medal-container.row.justify-center: XAMedalsVideo(
          :video="standardMedal"
          title="Standard Medal",
          :autoplay="false")
        .contents
          h4 Standard Digital NFT Medal
          p.sub-text Digital medal

      .digital-medal
        .medal-container.row.justify-center.items-center
          img(src="~assets/images/v2/Businesses/physical-medal.svg" alt="Physical Medal" v-show="isPhysicalMedal")
          XAMedalsVideo(:video="digitalMedal" title="Digital Medal" v-show="!isPhysicalMedal", :autoplay="false")
        .contents
          h4 Premium design. Replication of physical medal
          .row.items-center
            span.sub-text(:style="{ opacity: !isPhysicalMedal ? '1' : '0.6' }") Digital medal
            .toggle
              input.toggle-input(type="checkbox" v-model="isPhysicalMedal")
              .active-color
              .circle
            span.sub-text(:style="{ opacity: isPhysicalMedal ? '1' : '0.6' }") Physical medal
      .premium-design
        .medal-container.row.justify-center: XAMedalsVideo(
          :video="premiumDesign"
          title="Premium Design",
          :autoplay="false"
          has-controls)
        .contents
          h4 Premium design
          p.sub-text Digital medal
</template>

<script>
import XAMedalsVideo from '~/components/atoms/Medals/Video'

export default {
  name: 'XOBusinessesLandingSection03',
  components: { XAMedalsVideo },
  data() {
    return {
      standardMedal: 'https://api.activeplace.com/videos/standardnftmedal.m3u8/standardnftmedal.m3u8',
      digitalMedal: 'https://api.activeplace.com/videos/nftmedal.m3u8/Final%20with%20BG.m3u8',
      premiumDesign: 'https://api.activeplace.com/videos/premium.m3u8/premium.m3u8',
      isPhysicalMedal: false,
    }
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-businesses-landing-section-03::v-deep {
  background-color: $secondary;
  padding: 100px 0;

  h3 {
    &.desktop {
      @include max-width(1023px) {
        display: none;
      }
    }

    &.mobile {
      display: none;

      @include max-width(1023px) {
        display: block;
      }
    }
  }

  .description {
    margin-bottom: 70px;

    .contents {
      @include max-width(767px) {
        flex: none;
        padding: 0 !important;
      }

      .sub-paragraph {
        opacity: 0.8;
      }
    }

    .actions {
      @include max-width(767px) {
        padding: 0 !important;
        margin-top: 30px;
      }

      .button {
        width: 160px;
        height: 42px;
      }
    }
  }

  .standard-medal,
  .digital-medal,
  .premium-design {
    .medal-container {
      background-image: url('~assets/images/Medals/bg-circles.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1130px;
      background-color: #1d4750;
      padding: 80px 0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      min-height: 545px;

      @include max-width(767px) {
        background-size: 950px;
        padding: 80px 15px;
      }

      img {
        border-radius: 10px;
        height: 100%;
      }
    }

    .contents {
      background-color: #2a4e55;
      padding: 15px 30px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      min-height: 125px;

      h4 {
        margin-bottom: 8px;
      }

      .sub-text {
        color: $white;
        opacity: 0.6;
        font-size: 1.1429rem;
        line-height: 1.5;
        letter-spacing: -0.28px;
        font-weight: 100;
      }
    }
  }

  .standard-medal,
  .digital-medal {
    width: calc(100% / 2 - 10px);
    margin-bottom: 20px;

    @include max-width(767px) {
      width: 100%;
    }

    .medal-container {
      .xa-medals-video {
        .video-js {
          width: 245px;
          height: 385px;
        }
      }
    }
  }

  .digital-medal {
    .toggle {
      position: relative;
      margin: 0 10px;

      .toggle-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 35px;
        height: 15px;
        opacity: 0;
        z-index: 2;
        cursor: pointer;

        &:checked {
          + .active-color {
            + .circle {
              left: calc(100% - 20px);
            }
          }
        }
      }

      .active-color {
        width: 35px;
        height: 15px;
        border-radius: 50px;
        background-color: #886bf2;
        transition: 0.3s;
      }

      .circle {
        background-color: $white;
        box-shadow: 0 1px 2px rgba(48, 79, 254, 0.54);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 1;
        transition: 0.3s;
      }
    }
  }

  .premium-design {
    width: 100%;

    .medal-container {
      @include max-width(767px) {
        padding: 30px 20px;
        min-height: auto;
      }

      .xa-medals-video {
        @include max-width(767px) {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        .video-js {
          width: 680px;
          height: 385px;

          @include max-width(767px) {
            width: 100%;
          }

          @include max-width(427px) {
            height: 250px;
          }
        }
      }
    }
  }
}
</style>
