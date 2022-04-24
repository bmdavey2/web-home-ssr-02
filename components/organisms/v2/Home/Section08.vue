<template lang="pug">
.xo-home-section-08.row.items-center
  .container.is-max-widescreen
    .row
      .left-content
        h2.mb-6 Find your next sports event
        h4.text-weight-thin.mb-6 Find your next endurance event, and “Move-to-Earn” your achievements as an Digital NFT Medal

        .actions: b-button.text-uppercase(type="is-primary" label="Explore Events" tag="router-link" to="/marketplace")

      .right-content.mobile.row.items-center.justify-center: img(
        src="~assets/images/v2/Home/runner.svg"
        alt="Find Your Next Sports Event"
        width="368"
        height="404")
  .right-content.desktop.row.items-center.justify-center: img(
    src="~assets/images/v2/Home/runner.svg"
    alt="Find Your Next Sports Event"
    width="368"
    height="404")
</template>

<script>
export default {
  name: 'XOHomeSection08',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-home-section-08::v-deep {
  background-color: $secondary;
  position: relative;
  min-height: 700px;
  overflow: hidden;

  h2 {
    @include max-width(767px) {
      margin-bottom: 30px !important;
    }
  }

  > .container {
    z-index: 3;

    .left-content {
      width: 510px;

      @include max-width(1024px) {
        width: 100%;
        max-width: 50%;
      }

      @include max-width(767px) {
        max-width: 100%;
        order: 2;
        padding: 20px 0 50px;
      }

      .actions {
        .button {
          width: 225px;
          height: 82px;

          @include max-width(767px) {
            width: 100%;
          }
        }
      }
    }

    .right-content {
      display: none;
      order: 1;
      background-image: url('~assets/images/Medals/bg-circles.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1120px;
      padding: 50px 0;
      margin: 0 -15px;
      width: calc(100% + 30px);
      position: relative;
      overflow: hidden;

      @include max-width(767px) {
        display: flex;
        background-size: 760px;
      }

      &::before {
        content: '';
        background-color: $secondary;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
      }

      &::after {
        content: '';
        background-image: linear-gradient(rgba(12, 53, 62, 0), $secondary);
        position: absolute;
        bottom: 30px;
        left: 0;
        width: 100%;
        height: 150px;
      }

      img {
        margin-left: 50px;
        position: relative;
        top: 20px;
      }
    }
  }

  > .right-content {
    background-image: url('~assets/images/Medals/bg-circles.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1120px;
    position: absolute;
    top: 0;
    right: -20%;
    width: 100%;
    height: 100%;

    @include max-width(767px) {
      display: none;
    }

    img {
      margin-left: 50px;
    }
  }
}
</style>
