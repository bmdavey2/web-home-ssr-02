<template lang="pug">
.xm-businesses-landing-revenue-section.row.justify-between
  .left-content.row.items-center
    .contents
      h3 A brand new revenue line to grow your event
      h4.text-weight-thin ActivePlace has developed a unique formula helping events grow across the world. Digital NFT Medals can be packed with many things

    .img-container
      img.desktop(src="~assets/images/v2/Businesses/img-content-revenue.webp")
      img.mobile(src="~assets/images/v2/Businesses/img-content-revenue@mobile.png")

  .center-content.flex-column.justify-between
    ._icon: img(src="~assets/images/v2/Businesses/grow.svg" width="48px" height="48px" alt="Tangible ROI")
    .contents
      h3 Tangible ROI
      p.text-weight-thin Our proven formula has delivered a combined 655% ROI for our events

      .roi.row.items-center
        img.mr-2(src="~assets/images/v2/Businesses/triangle-up.svg" width="12" height="8" alt="Green Triangle Up")
        .percentage.mr-3 655% ROI
        .col: img(src="~assets/images/v2/Businesses/roi-chart.svg" width="132" height="24" alt="ROI Chart")

  .right-content.flex-column.justify-between
    ._icon: img(src="~assets/images/v2/Businesses/partner-roi.svg")
    .contents
      h3 Increase partner ROI
      p.text-weight-thin Grow your event partners value and exposure through our Digital NFT Medal packages
</template>

<script>
export default {
  name: 'XMBusinessesLandingRevenueSection',
}
</script>

<style lang="scss" scoped>
.xm-businesses-landing-revenue-section::v-deep {
  margin-bottom: 50px;

  @include max-width(767px) {
    margin-bottom: 30px;
  }

  .left-content {
    background-color: #ffaf23;
    border-radius: 10px;
    width: calc(100% - 405px);
    padding: 30px 50px;
    min-height: 450px;
    position: relative;
    overflow: hidden;

    @include max-width(1215px) {
      width: 100%;
      margin-bottom: 50px;
    }

    @include max-width(767px) {
      padding: 0;
      margin-bottom: 30px;
    }

    &::after {
      content: '';
      background-image: linear-gradient(to right, #ffaf23, rgba(255, 175, 35, 0));
      position: absolute;
      top: 0;
      left: 0;
      width: 80%;
      height: 100%;
      z-index: 0;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;

      @include max-width(767px) {
        content: none;
      }
    }

    .contents {
      width: 100%;
      max-width: 60%;
      position: relative;
      z-index: 1;

      @include max-width(767px) {
        max-width: 100%;
        order: 2;
        padding: 0 30px 50px;
        margin-top: -20px;
      }
    }

    .img-container {
      position: absolute;
      top: 0;
      right: -30px;
      width: 100%;
      height: 100%;
      text-align: right;

      @include max-width(767px) {
        position: relative;
        top: unset;
        right: unset;
        height: 300px;
        order: 1;
        text-align: center;
        margin-bottom: 50px;

        &::after {
          content: '';
          background-image: linear-gradient(to top, #ffaf23, rgba(255, 175, 35, 0));
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
      }

      img {
        height: 100%;

        @include max-width(767px) {
          height: auto;
        }

        &.desktop {
          @include max-width(767px) {
            display: none;
          }
        }

        &.mobile {
          display: none;
          object-fit: cover;
          width: 100%;
          height: 100%;

          @include max-width(767px) {
            display: block;
          }
        }
      }
    }
  }

  .center-content {
    background-color: $white;
    width: 375px;
    border-radius: 10px;
    color: $secondary;
    padding: 50px 40px;

    @include max-width(1215px) {
      width: calc(50% - 10px);
    }

    @include max-width(767px) {
      width: 100%;
      margin-bottom: 30px;
      padding: 50px 30px;
    }

    ._icon {
      @include max-width(1215px) {
        margin-bottom: 100px;
      }

      @include max-width(767px) {
        margin-bottom: 80px;
      }
    }

    .contents {
      @include max-width(1215px) {
        flex: 10000 1 0%;
      }

      p {
        font-size: 1.1429rem;
        line-height: 1.75;
        letter-spacing: -0.28px;
      }

      .roi {
        background-color: #f8f8f8;
        height: 50px;
        border-radius: 5px;
        padding: 0 15px;
        margin-top: 30px;
      }
    }
  }

  .right-content {
    background-color: $white;
    width: calc(50% - 10px);
    border-radius: 10px;
    color: $secondary;
    padding: 50px 40px;
    display: none;

    @include max-width(1215px) {
      display: flex;
    }

    @include max-width(767px) {
      width: 100%;
      padding: 50px 30px;
    }

    ._icon {
      @include max-width(1215px) {
        margin-bottom: 100px;
      }

      @include max-width(767px) {
        margin-bottom: 80px;
      }
    }

    .contents {
      @include max-width(1215px) {
        flex: 10000 1 0%;
      }

      p {
        font-size: 1.1429rem;
        line-height: 1.75;
        letter-spacing: -0.28px;
      }
    }
  }
}
</style>
