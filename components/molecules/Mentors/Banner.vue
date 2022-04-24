<template lang="pug">
.banner.is-flex.is-flex-wrap-wrap.is-flex-direction-column
  .container.is-max-widescreen
    .is-flex.is-flex-wrap-wrap.is-justify-content-flex-end
      .header-actions.is-flex.is-flex-wrap-wrap.is-align-items-center
        .logo.is-flex.is-flex-wrap-wrap.is-align-items-center: img(
          src="~assets/images/logo-light-min.svg"
          width="42"
          height="36")
        .signin.ml-5: b-button.is-uppercase(type="is-primary" outlined @click.prevent="doShowLoginModal()") Sign In
        .join-now.ml-5: b-button.is-uppercase(type="is-primary" tag="router-link" to="/signup") Join Now
  .is-flex.is-flex-wrap-wrap.is-justify-content-center.is-align-items-center.is-flex-width-auto
    ._content
      h1.is-uppercase.has-text-primary.has-text-weight-light Being a #[span.has-text-white Mentor] makes a difference on #[img(src="~assets/images/logo-light.svg" width="445" height="47")]
      h3.has-text-white Get the badge that raises you up, introduces you to more people and helps your community grow.
      .actions.is-flex.is-flex-wrap-wrap.is-align-items-center
        b-button.btn-fixed-width.is-uppercase.signup-btn(type="is-primary" tag="router-link" to="/signup/mentor") Apply
        b-button.btn-learn-more.btn-fixed-width.is-uppercase(
          type="is-light"
          outlined
          @click.prevent="doSlideToWhatIsMentor()") Learn More
</template>

<script>
export default {
  name: 'XMMentorBanner',
  methods: {
    doShowLoginModal() {
      // this.$buefy.modal.open({
      //   parent: this,
      //   component: require('~/components/modals/Login').default,
      //   width: 600,
      // })
    },
    doSlideToWhatIsMentor() {
      const content = document.getElementById('what-is-mentor')
      content.scrollIntoView({ behavior: 'smooth' })
    },
  },
}
</script>

<style lang="scss" scoped>
.banner::v-deep {
  background-image: url('~assets/images/Mentors/banner.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 800px;
  padding-top: 1.7857rem;

  .container {
    width: 100%;
  }

  ._content {
    width: 100%;
    max-width: 685px;
    padding: 0 10px;

    h1 {
      font-size: 4.6429rem;
      line-height: 5.7143rem;

      img {
        position: relative;
        top: 2px;
      }
    }

    h3 {
      font-size: 1.5714rem;
      margin-top: 3.5714rem;
      margin-bottom: 5rem;
    }

    .btn-fixed-width {
      width: 100%;
      max-width: 205px;
    }

    .signup-btn {
      margin-right: 1.5rem !important;
    }

    @media screen and (max-width: 767px) {
      max-width: 330px;

      .actions {
        justify-content: center;

        .signup-btn {
          margin-right: 0 !important;
        }
      }

      h1 {
        font-size: 2.2143rem;
        line-height: 3.1429rem;

        img {
          width: 215px;
          top: 0;
        }
      }

      h3 {
        margin-top: 2.2857rem;
        margin-bottom: 3.9286rem;
        font-size: 1.2143rem;
      }

      .btn-learn-more {
        margin-top: 2.2857rem;
      }
    }
  }

  @media screen and (max-width: $tabletLG) {
    min-height: 660px;

    .header-actions {
      width: 100%;
    }

    .logo {
      flex: 10000 1 0%;
    }
  }
}
</style>
