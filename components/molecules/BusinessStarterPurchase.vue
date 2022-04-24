<template lang="pug">
.xm-business-setup-success
  .card
    .header.is-flex
      .close(@click.prevent="doCloseSetupSuccess()"): b-icon(icon="close")
      .has-text-centered(style="width: 472px")
        h1.has-text-secondary Congratulations!
        h2 You’ve just joined the world’s healthiest social network.
    .card-content.has-text-centered
      .mt-5(style="width: 400px")
        h2(style="color: #219653; font-size: 28px") Upgrade to the Starter Plan
        p.mt-3.has-text-weight-light Access our centralized business tools that make it easier and faster to find the right customers and manage your business online
        b-button.mt-5.mb-3.is-uppercase(type="is-primary" @click.prevent="doCloseSetupSuccess()") See Plans & Pricing
</template>

<script>
export default {
  name: 'XMBusinessStarterPurchase',
  props: {
    fullScreen: Boolean,
  },
  methods: {
    doCloseSetupSuccess() {
      this.$parent.close()
      this.$store.dispatch('signup/setPurchaseBusiness', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-business-setup-success::v-deep {
  .header {
    background-image: url('~assets/images/SignUp/expanded-bg.png');
    background-size: cover;
    background-position: bottom center;
    height: 200px;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
    h1 {
      font-size: 40px;
      text-align: center;
    }
    h2 {
      font-size: 24px;
      text-align: center;
    }
  }

  .card-content {
    padding: 30px 50px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 2.2857rem;
      line-height: 1.3;
      color: #050505;
      text-align: center;
      margin-bottom: 20px;
    }

    h4 {
      font-size: 16px;
      text-align: center;
      margin-bottom: 15px;
    }

    .social-media {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      > div {
        margin: 0 7px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .header {
      h1 {
        font-size: 37px;
      }
      h2 {
        font-size: 20px;
      }
    }

    .card-content {
      padding: 20px;

      h3 {
        font-size: 1.7143rem;
      }
    }
  }
}
</style>
