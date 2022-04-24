<template lang="pug">
.home-banner
  .mask-banner
    .container.is-max-widescreen
      .columns
        .column
          .home-hero.has-text-white.is-flex.is-flex-direction-column.is-justify-content-center
            h1.mb-3.home-title.has-text-white The world's healthiest social marketplace
            h2.mt-5.home-subtitle.has-text-white Helping grow your active life by connecting you to health & fitness products, experts, community, information and inspiration.
            .home-button.mt-1: b-button.is-uppercase(type="is-primary" tag="router-link" to="/signup" v-if="!isLoggedIn") GET STARTED FOR FREE
        .column.sign-up
          XOHomeSignUpCard(v-if="!isLoggedIn")
</template>

<script>
import XOHomeSignUpCard from '~/components/organisms/HomePage/SignUpCard'
export default {
  name: 'XOHomeLoginBanner',
  components: { XOHomeSignUpCard },
}
</script>

<style lang="scss" scoped>
.home-banner {
  padding: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('~assets/images/HomePage/homebanner.jpg');
  height: 400px;

  .mask-banner {
    background-color: rgba(0, 0, 0, 0.5);
    height: 400px;
  }

  .home-button {
    display: none;
  }

  .home-hero {
    height: 400px;
    width: 647px;
    margin: 0 auto;

    .home-title {
      font-size: 5rem;
      line-height: 80px;
    }

    .home-subtitle {
      width: 610px !important;
      font-size: 1.4rem;
      line-height: 32px;
    }
  }

  @media (max-width: '1218px') and (min-width: '1024px') {
    .home-hero {
      margin-left: -25px !important;
    }
    .sign-up {
      margin-left: -100px !important;
      margin-right: 20px !important;
    }
  }

  @media (max-width: '1024px') {
    .home-button {
      display: block !important;
    }
    .home-subtitle {
      margin-top: 0.6rem !important;
    }
    .sign-up {
      display: none !important;
    }
  }

  @media (min-width: '1025px') {
    .sign-up {
      display: block !important;
    }
  }

  @media (max-width: '566px') {
    .home-hero {
      width: 100% !important;
      .home-title {
        width: 100% !important;
        font-size: 32px !important;
        line-height: 35px !important;
      }
      .home-subtitle {
        width: 100% !important;
        font-size: 22px !important;
        line-height: 32px !important;
      }
    }
  }
}
</style>
