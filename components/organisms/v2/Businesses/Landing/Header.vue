<template lang="pug">
.xo-businesses-landing-header.row.items-center
  .container.is-max-widescreen
    .row.items-center.justify-between
      .left-header.row.items-center.col
        .logo: nuxt-link.row(to="/" exact): img(
          src="~assets/images/v2/Layouts/activeplace-min-no-text.svg"
          width="62"
          height="56"
          alt="ActivePlace")
        .description.col Start using digital medals at your next event
      .right-header
        .actions: b-button.text-uppercase(type="is-primary" tag="router-link" to="/medals/order") Get Started
</template>

<script>
export default {
  name: 'XOBusinessesLandingHeader',
}
</script>

<style lang="scss" scoped>
.xo-businesses-landing-header::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: #2a4e55;
  z-index: 8;

  .left-header {
    .description {
      font-size: 1.5714rem;
      line-height: 2.4286rem;
      letter-spacing: -0.66px;
      color: $white;
      padding-left: 40px;
      font-weight: 100;

      @include max-width(1023px) {
        font-size: 1.1429rem;
        line-height: 1.7143rem;
        padding-left: 20px;
      }

      @include max-width(767px) {
        padding-left: 5px;
        font-size: 0.9286rem;
        line-height: 1.3571rem;
      }
    }
  }

  .right-header {
    padding-left: 10px;

    .actions {
      .button {
        @include max-width(767px) {
          height: 42px;
        }
      }
    }
  }
}
</style>
