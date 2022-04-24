<template lang="pug">
.xm-businesses-landing-expand-event-community.row.justify-between
  .left-content.flex-column
    .increase-partner-roi.flex-column.justify-between.col
      ._icon: img(src="~assets/images/v2/Businesses/partner-roi.svg")
      .contents
        h3 Increase partner ROI
        p.text-weight-thin Grow your event partners value and exposure through our Digital NFT Medal packages

    .simply-better-environment.flex-column.justify-between
      ._icon: img(src="~assets/images/v2/Businesses/simply-better-environment.svg")
      .contents
        h3 Simply better for the environment
        p.text-weight-thin Physical medals are made out of silver, bronze, and sometimes even gold. Obtaining those resources from our planet comes with a cost to the environment; help us save the planet one medal at a time

  .right-content.flex-column.justify-between
    XMBusinessesLandingRunningFestival
    .contents
      h3 Expand your event community
      h4.text-weight-thin It’s never been easier for participants to take their personalized digital medal anywhere they go ensuring your event, and your event partners are an ongoing talking point. Whether it's the excitement of pre-event chatter, or the elevation experienced right after the race, family & friends can now join in the celebration anywhere & anytime
</template>

<script>
import XMBusinessesLandingRunningFestival from '~/components/molecules/v2/Businesses/Landing/RunningFestival'

export default {
  name: 'XMBusinessesLandingExpandEventCommunity',
  components: { XMBusinessesLandingRunningFestival },
}
</script>

<style lang="scss" scoped>
.xm-businesses-landing-expand-event-community::v-deep {
  margin-bottom: 50px;

  .left-content {
    width: 375px;
    color: $secondary;

    @include max-width(1215px) {
      width: 100%;
    }

    .increase-partner-roi,
    .simply-better-environment {
      background-color: $white;
      border-radius: 10px;
      padding: 50px 40px;

      @include max-width(1215px) {
        margin-bottom: 50px;
      }

      @include max-width(767px) {
        margin-bottom: 30px;
      }

      ._icon {
        margin-bottom: 100px;

        @include max-width(767px) {
          margin-bottom: 80px;
        }
      }

      .contents {
        h3 {
          margin-bottom: 25px;
        }

        p {
          font-size: 1.1429rem;
          line-height: 1.75;
          letter-spacing: -0.28px;
        }
      }
    }

    .increase-partner-roi {
      margin-bottom: 30px;

      @include max-width(1215px) {
        display: none;
      }
    }
  }

  .right-content {
    width: calc(100% - 405px);
    background-color: #886bf3;
    border-radius: 10px;
    padding: 50px 50px 110px;
    min-height: 1015px;

    @include max-width(1215px) {
      width: 100%;
      min-height: unset;
      padding: 50px 50px 70px;
    }

    @include max-width(767px) {
      padding: 50px 30px;
    }
  }
}
</style>
