<template lang="pug">
.xm-businesses-landing-access-digital-network
  ._box.bike: img(src="~assets/images/v2/Businesses/bike.svg" width="27" height="16" alt="Bike")
  ._box.running-shoes: img(
    src="~assets/images/v2/Businesses/running-shoes.svg"
    width="24"
    height="18"
    alt="Running Shoes")
  ._box.community
    ._box.grow: img(src="~assets/images/v2/Businesses/grow.svg" width="32" height="32" alt="Community Grow")
    img(src="~assets/images/v2/Businesses/community-user-01.svg" width="32" height="32" alt="Community User")
    img(src="~assets/images/v2/Businesses/community-user-02.svg" width="32" height="32" alt="Community User")
    img(src="~assets/images/v2/Businesses/community-user-03.svg" width="32" height="32" alt="Community User")
    img(src="~assets/images/v2/Businesses/community-user-04.svg" width="32" height="32" alt="Community User")
    img(src="~assets/images/v2/Businesses/community-user-05.svg" width="32" height="32" alt="Community User")
    img(src="~assets/images/v2/Businesses/community-user-06.svg" width="32" height="32" alt="Community User")
    img(src="~assets/images/v2/Businesses/community-user-07.svg" width="32" height="32" alt="Community User")
    img(src="~assets/images/v2/Businesses/community-user-08.svg" width="32" height="32" alt="Community User")
</template>

<script>
export default {
  name: 'XMBusinessesLandingAccessDigitalNetwork',
}
</script>

<style lang="scss" scoped>
.xm-businesses-landing-access-digital-network::v-deep {
  background-image: url('~assets/images/v2/Businesses/access-digital-network.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 315px;
  border-radius: 10px;
  position: relative;

  @include max-width(1023px) {
    min-height: 230px;
  }

  @include max-width(767px) {
    min-height: 160px;
  }

  ._box {
    background: linear-gradient(0deg, #fcfcfc, #fcfcfc), #fff;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 4px 30px rgba(12, 53, 62, 0.15));
    position: absolute;
    width: 48px;
    height: 48px;

    @include max-width(1215px) {
      padding: 10px;
    }

    @include max-width(1023px) {
      width: 35px;
      height: 35px;
      padding: 8px;
    }

    &.bike {
      top: 30px;
      right: -15px;
    }

    &.running-shoes {
      top: 95px;
      right: -15px;

      @include max-width(1023px) {
        top: 80px;
      }
    }

    &.community {
      background-color: $white;
      height: 64px;
      width: 410px;
      justify-content: space-evenly;
      padding: 0 15px;
      left: 0;
      right: 0;
      bottom: -40px;
      margin: 0 auto;

      @include max-width(1215px) {
        width: 355px;
      }

      @include max-width(1023px) {
        width: 260px;
        padding: 0 10px;
      }

      @include max-width(767px) {
        height: 45px;
        bottom: -30px;
      }

      ._box {
        position: unset;
        margin-right: 10px;

        @include max-width(1023px) {
          margin-right: 5px;
        }
      }

      > img {
        margin-left: 8px;

        @include max-width(1215px) {
          width: 28px;
          margin-left: 5px;
        }

        @include max-width(1023px) {
          width: 20px;
        }
      }
    }
  }
}
</style>
