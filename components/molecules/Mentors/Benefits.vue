<template lang="pug">
.benefits
  .container.is-max-widescreen
    .is-flex.is-flex-wrap-wrap
      .left-content.is-flex-width-auto
        .has-text-secondary.left-content-1 Mentors form an integral part of the experience for the communities within ActivePlace.
        .has-text-weight-light.left-content-2 Because of this, Mentors are displayed differently and more comprehensively across the platform, across the web and in the physical world.
        .content-image: img(src="~assets/images/Mentors/mentor-benefits.png" width="687" height="725")

      .mobile-left-content.is-flex.is-flex-wrap-wrap.is-align-items-center
        .content-image: img(src="~assets/images/Mentors/mentor-benefits.png" width="687" height="725")
        .content-text
          .has-text-secondary.mb-4 Mentors form an integral part of the experience for the communities within ActivePlace.
          .has-text-weight-light Because of this, Mentors are displayed differently and more comprehensively across the platform, across the web and in the physical world.

      .right-content
        h2 Mentor benefits
        .list.is-flex.is-flex-wrap-wrap
          .benefit
            h3 Elevate your status
            .has-text-weight-light Recognisable badge stamped on Mentor profiles, and Mentor content.

          .benefit
            h3 Amplify your reach
            .has-text-weight-light Publish various types of content on ActivePlace and raise your Google search position (SEO).

          .benefit
            h3 Be a paid mentor
            .has-text-weight-light Mentors who meet specific requirements receive recurring financial incentives for producing quality content and actively engaging with their communities.

          .benefit
            h3 Raise your profile
            .has-text-weight-light We raise Mentor content and profiles in the feed, in addition to its own search.

          .benefit
            h3 Grow your audience
            .has-text-weight-light “Auto Following” Mentor function applied to each new relevant user that registers on ActivePlace. This equals more exposure to the right people.

          .benefit
            h3 Maximize mentor branding
            .has-text-weight-light Promote your mentor badge outside of ActivePlace, on your website and social channels to reinforce your status as a specialist. Receive exclusive Mentor only product to wear.
</template>

<script>
export default {
  name: 'XMMentorBenefits',
}
</script>

<style lang="scss" scoped>
.benefits::v-deep {
  font-size: 1.1429rem;

  .left-content {
    margin-right: 20px;

    .left-content-1 {
      margin-bottom: 15px;
    }

    .left-content-2 {
      margin-bottom: 40px;
    }

    .content-image {
      margin-left: -170px;
    }

    @media screen and (max-width: $BPdesktop) {
      display: none !important;

      .left-content-2 {
        margin-bottom: 60px;
      }

      .content-image {
        margin-left: -185px;
      }
    }
  }

  .right-content {
    width: 100%;
    max-width: 585px;

    h2 {
      margin-bottom: 3.5714rem;
    }

    .list {
      .benefit {
        background-color: #cff1f8;
        padding: 15px;
        min-height: 245px;
        width: 100%;
        max-width: 270px;
        margin-bottom: 20px;
        margin-right: 20px;

        h3 {
          font-size: 1.7143rem;
          color: $secondary;
          text-transform: uppercase;
          margin-bottom: 0.7143rem;
        }
      }
    }

    @media screen and (max-width: 1024px) {
      max-width: 60%;

      h2 {
        margin-bottom: 0;
      }

      .list {
        .benefit {
          max-width: calc(50% - 20px);
          min-height: auto;
        }
      }
    }

    @media screen and (max-width: 1023px) {
      max-width: 100%;

      h2 {
        margin-bottom: 2.1429rem;
      }
    }

    @media screen and (max-width: 767px) {
      h2 {
        font-size: 2.1429rem;
        line-height: 2.7143rem;
      }
    }

    @media screen and (max-width: 427px) {
      .list {
        .benefit {
          max-width: 100%;
          margin-right: 0;
        }
      }
    }
  }

  .mobile-left-content {
    display: none !important;
    margin-bottom: 50px;

    .content-image {
      margin-left: -15px;
      width: 64%;
    }

    .content-text {
      padding-left: 15px;
      width: 36%;
    }

    @media screen and (max-width: $BPdesktop) {
      display: flex !important;
    }

    @media screen and (max-width: 767px) {
      .content-image {
        width: calc(100% + 30px);
        margin: 0 -15px;

        img {
          width: 100%;
        }
      }

      .content-text {
        width: 100%;
        padding: 20px 0 0;
      }
    }
  }
}
</style>
