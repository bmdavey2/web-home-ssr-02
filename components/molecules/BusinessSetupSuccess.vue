<template lang="pug">
.xm-business-setup-success
  .card
    .header
      .close(@click.prevent="doCloseSetupSuccess()"): b-icon(icon="close")
      h2 Congratulations!
    .card-content
      h3 You’ve just joined the world’s healthiest social network.
      h4 Turn up your volume by inviting your community:

      .social-media
        .facebook: img(src="~assets/icons/social/facebook-circle.svg")
        .twitter: img(src="~assets/icons/social/twitter-circle.svg")
        .pinterest: img(src="~assets/icons/social/pinterest-circle.svg")
        .linkedin: img(src="~assets/icons/social/linkedin-circle.svg")

    .tips
      .tip.is-flex.is-flex-wrap-wrap.is-align-items-center
        ._label Pro tip #1
        .details.is-flex-width-auto
          ._icon: img(src="~assets/icons/secondary/account.svg" width="16" height="16")
          ._content
            ._title Complete your Profile Page
            .text Build community, engagement and trust by presenting your business completely.
      .tip.is-flex.is-flex-wrap-wrap.is-align-items-center
        ._label Pro tip #2
        .details.is-flex-width-auto
          ._icon: img(src="~assets/icons/secondary/updates.svg" width="16" height="16")
          ._content
            ._title Publish your first Update
            .text Updates are fast and fun and perfect for easily keeping your business in front of the right people.
      .tip.is-flex.is-flex-wrap-wrap.is-align-items-center
        ._label Pro tip #3
        .details.is-flex-width-auto
          ._icon: img(src="~assets/icons/secondary/article.svg" width="16" height="16")
          ._content
            ._title Publish an Article
            .text Amplify your voice on ActivePlace and across the web by posting Articles.
</template>

<script>
export default {
  name: 'XMBusinessSetupSuccess',
  props: {
    fullScreen: Boolean,
  },
  methods: {
    doCloseSetupSuccess() {
      this.$parent.close()
      this.$store.dispatch('signup/setSignupAsBusiness', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-business-setup-success::v-deep {
  .header {
    background-image: url('~assets/images/SignUp/business-header-badges.png');
    background-size: cover;
    background-position: bottom center;
    height: 240px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }

    h2 {
      font-size: 5rem;
      line-height: 1.2;
      color: $secondary;
      text-align: center;
    }
  }

  .card-content {
    padding: 30px 50px;

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

  .tips {
    background-color: #e5e9f0;
    padding: 20px 50px;
    border-radius: 20px 20px 0 0;

    .tip {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;

      ._label {
        font-size: 22px;
        color: #050505;
        width: 150px;
      }

      .details {
        position: relative;
        background-color: $white;
        border-radius: 5px;

        ._icon {
          background-color: $white;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
          width: 32px;
          height: 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto 0;
          left: -16px;
        }

        ._content {
          padding: 10px 30px;

          ._title {
            color: #050505;
            margin-bottom: 5px;
          }

          .text {
            font-size: 0.8571rem;
            font-weight: 300;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .header {
      h2 {
        font-size: 2.2857rem;
      }
    }

    .card-content {
      padding: 20px;

      h3 {
        font-size: 1.7143rem;
      }
    }

    .tips {
      padding: 20px 20px 20px 35px;

      .tip {
        margin-bottom: 20px;

        ._label {
          width: 100%;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
