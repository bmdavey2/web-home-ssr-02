<template lang="pug">
.potential-mentor
  .container.is-max-widescreen
    ._content.is-flex.is-flex-wrap-wrap
      .left-content
        h2 How does ActivePlace assess a potential mentor?
        .has-text-weight-light The quality of a Mentor is critical and not all are approved first time around. There are 3 core areas of focus to ensure anyone displaying a Mentor Badge is legitimate as someone who should be risen up.

      .right-content
        .right-content-section
          h3 Reputation:
          .has-text-weight-light Qualification, Certification, Practical Experience and History.
        .right-content-section
          h3 Expertise:
          .has-text-weight-light Prior Engagements, Community Endorsements and Online Reviews.
        .right-content-section
          h3 Personality:
          .has-text-weight-light Energy and Passion, Content delivery skills, willingness to achieve.
</template>

<script>
export default {
  name: 'XMMentorPotentialMentor',
}
</script>

<style lang="scss" scoped>
.potential-mentor::v-deep {
  padding-bottom: 8.5714rem;

  ._content {
    padding: 60px;
    background-color: #f8f8f8;
    font-size: 1.1429rem;

    .left-content {
      padding-right: 2.5rem;

      h2 {
        line-height: 3.5714rem;
        margin-bottom: 2.8571rem;
      }

      @media screen and (min-width: 1024px) {
        flex: 10000 1 0%;
      }

      @media screen and (max-width: 1023px) {
        h2 {
          font-size: 2.1429rem;
          line-height: 2.7143rem;
        }
      }

      @media screen and (max-width: 767px) {
        max-width: 480px;
        margin: 0 auto;
        padding-right: 0;
      }
    }

    .right-content {
      padding-left: 2.5rem;

      @media screen and (min-width: 1024px) {
        flex: 10000 1 0%;
      }

      .right-content-section {
        margin-bottom: 2.1429rem;

        &:last-child {
          margin-bottom: 0;
        }

        h3 {
          font-size: 1.5714rem;
          color: $secondary;
        }
      }

      @media screen and (max-width: 1023px) {
        .right-content-section {
          h3 {
            font-size: 1.1429rem;
          }
        }
      }

      @media screen and (max-width: 767px) {
        max-width: 480px;
        margin: 0 auto;
        padding: 2.1429rem 0 0;
      }
    }

    @media screen and (max-width: 1023px) {
      padding: 60px 30px;
    }

    @media screen and (max-width: 767px) {
      padding: 40px 15px;
    }
  }

  @media screen and (max-width: 767px) {
    padding-bottom: 5rem;
  }
}
</style>
