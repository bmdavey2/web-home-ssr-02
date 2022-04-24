<template lang="pug">
.xo-layouts-header-medal-order.row.items-center
  .container
    .row.justify-between.items-center
      .left-header.row.items-center.col
        .logo
          nuxt-link(to="/" exact)
            img.desktop(src="~assets/images/v2/Layouts/activeplace.svg" alt="ActivePlace" width="168" height="18")
            img.mobile(
              src="~assets/images/v2/Layouts/activeplace-min-no-text.svg"
              width="62"
              height="56"
              alt="ActivePlace")
        ._title.text-weight-thin.col Book appointment with one of our experts

      .right-header
        a.book-appointment.desktop.row.items-center.justify-center.text-weight-thin(
          href="https://calendly.com/damien-56/30min"
          target="_blank") Book appointment

        a.book-appointment.mobile.row.items-center.justify-center.text-weight-thin(
          href="https://calendly.com/damien-56/30min"
          target="_blank") Book
</template>

<script>
export default {
  name: 'XOLayoutsHeaderMedalOrder',
}
</script>

<style lang="scss" scoped>
.xo-layouts-header-medal-order::v-deep {
  background-color: #2a4e55;
  box-shadow: 0 2px 20px rgba(39, 85, 96, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 90px;
  color: $white;
  z-index: 8;

  @include max-width(767px) {
    min-height: 65px;
  }

  .left-header {
    .logo {
      img {
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
    }

    ._title {
      font-size: 1.5714rem;
      line-height: 2.8571rem;
      letter-spacing: -0.66px;
      color: rgba(255, 255, 255, 0.5);
      padding-left: 50px;

      @include max-width(1023px) {
        font-size: 1.1429rem;
        line-height: 1.7143rem;
        padding-left: 20px;
      }

      @include max-width(767px) {
        font-size: 0.9286rem;
        line-height: 1.3571rem;
        padding-left: 5px;
      }
    }
  }

  .right-header {
    @include max-width(767px) {
      padding-left: 20px;
    }

    .book-appointment {
      width: 170px;
      height: 42px;
      background-color: $secondary;
      font-size: 1.1429rem;
      line-height: 2rem;
      border-radius: 5px;
      cursor: pointer;
      color: $white;

      &.desktop {
        @include max-width(767px) {
          display: none;
        }
      }

      &.mobile {
        display: none;
        width: 70px;

        @include max-width(767px) {
          display: flex;
        }
      }
    }
  }
}
</style>
