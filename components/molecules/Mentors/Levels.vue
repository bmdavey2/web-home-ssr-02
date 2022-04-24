<template lang="pug">
.levels
  .container.is-max-widescreen
    h2 There are 3 levels
    .is-flex.is-flex-wrap-wrap.is-justify-content-center
      ._level
        .logo: img(src="~assets/images/Mentors/certified-mentor.png" width="80" height="80")
        h3.sub-heading A Certified Mentor is represented by a black badge.
        .has-text-weight-light Within their chosen field, this Mentor is a certified specialist, a provider of the highest quality knowledge and advice.
      ._level
        .logo: img(src="~assets/images/Mentors/apex-mentor.png" width="80" height="80")
        h3.sub-heading An Apex Mentor is represented by a pink badge.
        .has-text-weight-light Within their field of expertise, an Apex Mentor is within the top percentile globally, and remains active within the industry they specialise in.
      ._level
        .logo: img(src="~assets/images/Mentors/certified-business.png" width="80" height="80")
        h3.sub-heading A Certified Business is represented by a white badge.
        .has-text-weight-light Businesses with this badge have one or more approved Mentors within their ownership or operational team.
</template>

<script>
export default {
  name: 'XMMentorLevels',
}
</script>

<style lang="scss" scoped>
.levels::v-deep {
  padding: 8.5714rem 0;

  h2 {
    margin-bottom: 3.9286rem;
  }

  ._level {
    background-color: #f8f8f8;
    width: 100%;
    max-width: 25%;
    margin: 0 12px 24px;
    padding: 25px;
    min-height: 350px;
    font-size: 1.1429rem;

    img {
      max-width: 80px;
    }

    .sub-heading {
      color: $secondary;
      margin: 1.0714rem 0;
    }
  }

  @media screen and (max-width: 1023px) {
    ._level {
      max-width: calc(50% - 24px);
    }
  }

  @media screen and (max-width: 767px) {
    padding: 5rem 0;

    h2 {
      text-align: center;
      font-size: 2.1429rem;
      line-height: 2.7143rem;
    }

    ._level {
      max-width: 100%;
    }
  }
}
</style>
