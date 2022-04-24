<template lang="pug">
.application
  .background.is-flex.is-flex-wrap-wrap
    .left-background
    .right-background
  .container.is-max-widescreen
    ._content.is-flex.is-flex-wrap-wrap
      .left-content
        h2 We're accepting applications #[span.is-uppercase.has-text-primary Now]. Becoming a Mentor is #[span.is-uppercase.has-text-primary Free], but there are #[span.is-uppercase.has-text-primary Limited] badges available.
        .step
          h3 Step 1
          .has-text-weight-light Click on the ‘Start Application’ button.
        .step
          h3 Step 2
          .has-text-weight-light Setup a profile on ActivePlace.
        .step
          h3 Step 3
          .has-text-weight-light Complete the Mentor Application.
        .step
          h3 Step 4
          .has-text-weight-light.mb-3 Complete one Article on ActivePlace.
          .has-text-weight-light.mb-3 * This article should introduce you, talk about your history, what you’re passionate about and obviously needs to be within your area of expertise.
          .has-text-weight-light Written text is important, but be sure to insert imagery, video, a podcast and anything else you have that adds value to your Article.
        .actions
          b-button.has-text-weight-light.is-uppercase(type="is-primary" tag="router-link" to="/signup") Start Application
      .right-content
</template>

<script>
export default {
  name: 'XMMentorApplication',
}
</script>

<style lang="scss" scoped>
.application::v-deep {
  position: relative;
  padding: 8.5714rem 0;
  background-color: #f8f8f8;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 555px;
    z-index: 1;

    .left-background {
      background-color: $primary;
      width: 50%;
    }

    .right-background {
      background-color: #f8f8f8;
      width: 50%;
    }
  }

  ._content {
    position: relative;
    z-index: 2;

    .left-content,
    .right-content {
      width: 50%;
    }

    .left-content {
      background-color: $white;
      padding: 50px;

      h2 {
        font-family: $default-font;
        color: $secondary;
        font-size: 2.2857rem;
        line-height: 1.2;
        margin-bottom: 2.8571rem;
      }

      .step {
        margin-bottom: 1.4286rem;

        h3 {
          font-size: 1.5714rem;
          line-height: 1.2;
          color: $secondary;
          margin-bottom: 0.3571rem;
        }
      }

      .actions {
        a {
          width: 100%;
          max-width: 205px;
        }
      }

      @media screen and (max-width: 1023px) {
        padding: 40px 20px 40px;

        h2 {
          font-size: 1.9286rem;
        }

        .step {
          h3 {
            font-size: 1.1429rem;
          }
        }
      }

      @media screen and (max-width: 767px) {
        width: 100%;

        .actions {
          a {
            max-width: 100%;
          }
        }
      }
    }

    .right-content {
      background-image: url('~assets/images/Mentors/application.png');
      background-size: cover;
      background-position: center;

      @media screen and (max-width: 767px) {
        display: none !important;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    padding-top: 3.5714rem;
  }
}
</style>
