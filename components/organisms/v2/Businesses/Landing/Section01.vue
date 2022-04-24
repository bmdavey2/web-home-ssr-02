<template lang="pug">
.xo-businesses-landing-section-01.row.items-center
  .container.is-max-widescreen
    .row.items-center
      .left-content
        h1.mb-6 Digital NFT Medals for your event promotion
        .actions.mobile: b-button.text-uppercase(type="is-primary" tag="router-link" to="/medals/order") Get Started
        h4.mb-6.text-weight-thin Join the growing list of events that are using NFT Medals to grow event revenue through participant engagement.
        .actions.desktop: b-button.text-uppercase(type="is-primary" tag="router-link" to="/medals/order") Get Started

      .right-content.mobile.row.items-center.justify-center
        .medal-container
          img(
            src="~assets/images/v2/Businesses/blue-medal@desktop.png"
            alt="Digital NFT Medals"
            width="609"
            height="546")
          ._box.grow: img(src="~assets/images/v2/Businesses/grow.svg" alt="Grow" width="32" height="32")
          ._box.chat: img(src="~assets/images/v2/Businesses/chat.svg" alt="Chat" width="32" height="32")
          ._box.users: img(src="~assets/images/v2/Businesses/users.svg" alt="Chat" width="32" height="26")

  .right-content.desktop.row.items-center.justify-center
    .medal-container
      img(src="~assets/images/v2/Businesses/blue-medal@desktop.png" alt="Digital NFT Medals" width="609" height="546")
      ._box.grow: img(src="~assets/images/v2/Businesses/grow.svg" alt="Grow" width="32" height="32")
      ._box.chat: img(src="~assets/images/v2/Businesses/chat.svg" alt="Chat" width="32" height="32")
      ._box.users: img(src="~assets/images/v2/Businesses/users.svg" alt="Chat" width="32" height="26")
</template>

<script>
export default {
  name: 'XOBusinessesLandingSection01',
}
</script>

<style lang="scss" scoped>
.xo-businesses-landing-section-01::v-deep {
  background-color: $secondary;
  position: relative;
  overflow: hidden;
  min-height: 780px;

  @include max-width(1023px) {
    min-height: 530px;
  }

  .left-content {
    width: 100%;
    max-width: 50%;
    position: relative;
    z-index: 1;

    @include max-width(767px) {
      max-width: 100%;
      order: 2;
      padding: 30px 0 70px;
    }

    h1 {
      @include max-width(1023px) {
        margin-bottom: 30px !important;
      }
    }

    h4 {
      @include max-width(767px) {
        margin-bottom: 0 !important;
      }
    }

    .actions {
      &.desktop {
        @include max-width(767px) {
          display: none;
        }

        .button {
          width: 100%;
          max-width: 165px;
        }
      }

      &.mobile {
        display: none;
        margin-bottom: 30px;

        @include max-width(767px) {
          display: block;

          .button {
            width: 100%;
            max-width: 165px;
            height: 42px;
          }
        }
      }
    }
  }

  .right-content {
    background-image: url('~assets/images/Medals/bg-circles.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 1110px;

    @include max-width(1023px) {
      background-size: 1000px;
    }

    @include max-width(767px) {
      background-size: 850px;
      background-position: top 34% center;
    }

    &.desktop {
      position: absolute;
      top: 0;
      right: -14%;
      width: 100%;
      height: 100%;

      @include max-width(1440px) {
        right: -20%;
      }

      @include max-width(767px) {
        display: none;
      }
    }

    &.mobile {
      display: none;
      width: calc(100% + 30px);
      margin: 0 -15px;
      position: relative;

      @include max-width(767px) {
        display: flex;
        order: 1;
        min-height: 580px;
      }
    }

    .medal-container {
      position: relative;
      margin-top: -115px;
      margin-left: 18px;
      max-width: 490px;
      width: 100%;

      @include max-width(1023px) {
        max-width: 400px;
        margin-top: -80px;
      }

      @include max-width(767px) {
        margin-top: -15px;
        margin-left: 12px;
        position: absolute;
        width: 450px;
        max-width: unset;
      }

      ._box {
        background-color: $white;
        width: 64px;
        height: 64px;
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        position: absolute;

        @include max-width(1023px) {
          width: 48px;
          height: 48px;
          padding: 12px;
        }

        &.grow {
          top: 6%;
          right: 22%;
        }

        &.chat {
          bottom: 9%;
          right: 25%;
        }

        &.users {
          left: 14%;
          top: 0;
          bottom: -25%;
          margin: auto;
        }
      }
    }
  }
}
</style>
