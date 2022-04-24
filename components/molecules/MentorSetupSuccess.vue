<template lang="pug">
.xm-mentor-setup-success
  .card
    .header
      .close(@click.prevent="doCloseSetupSuccess()"): b-icon(icon="close")
      h2 Submission Confirmed!
    .card-content
      h3 You've just applied to become a Mentor on the world’s healthiest social network.
      h4 What happens next?
    .tips
      .tip.is-flex.is-flex-wrap-wrap.is-align-items-center
        ._label Step #1
        .details.is-flex-width-auto
          ._icon: img(src="~assets/icons/secondary/comment.svg" width="16" height="16")
          ._content
            ._title We're reviewing your application.
            .text Keep an eye out for an email within the next 5 days.
      .tip.is-flex.is-flex-wrap-wrap.is-align-items-center
        ._label Step #2
        .details.is-flex-width-auto
          ._icon: img(src="~assets/icons/secondary/account.svg" width="16" height="16")
          ._content
            ._title Complete your personal profile page to present yourself completely on ActivePlace.
      .tip.is-flex.is-flex-wrap-wrap.is-align-items-center
        ._label Step #3
        .details.is-flex-width-auto
          ._icon: img(src="~assets/icons/secondary/article.svg" width="16" height="16")
          ._content
            ._title Publish at least one Article or Update within the next 5 days.
            .text This content counts towards your application. The email we send you has a link to help you with an Article.
</template>

<script>
export default {
  name: 'XMMentorSetupSuccess',
  props: {
    fullScreen: Boolean,
  },
  methods: {
    doCloseSetupSuccess() {
      this.$parent.close()
      this.$store.dispatch('signup/setSignupAsMentor', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-mentor-setup-success::v-deep {
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
      font-size: 2.8571rem;
      line-height: 1.2;
      color: $secondary;
      text-align: center;
    }
  }

  .card-content {
    padding: 30px 50px;

    h3 {
      font-size: 1.5714rem;
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
        font-size: 2rem;
      }
    }

    .card-content {
      padding: 20px;

      h3 {
        font-size: 1.2857rem;
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
