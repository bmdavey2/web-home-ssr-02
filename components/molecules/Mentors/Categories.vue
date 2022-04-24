<template lang="pug">
.categories
  .container.is-max-widescreen
    .is-flex.is-flex-wrap-wrap.is-align-items-center
      .left-content
        h2 Make the most of your status by standing out in the crowd
        h3 We’re currently accepting applications in these categories
      .right-content
        img.right-img-one(src="~assets/images/Mentors/categories-desktop.png" width="767" height="740")
        img.right-img-two(src="~assets/images/Mentors/categories-mobile.png" width="767" height="740")
</template>

<script>
export default {
  name: 'XMMentorCategories',
}
</script>

<style lang="scss" scoped>
.categories::v-deep {
  padding: 8.5714rem 0;

  .left-content {
    width: 100%;
    max-width: 315px;

    h2 {
      margin-bottom: 2.8571rem;
      line-height: 3.5714rem;
    }

    h3 {
      color: $secondary;
      font-size: 1.5714rem;
      letter-spacing: -0.6px;
    }

    @media screen and (max-width: 1024px) {
      max-width: 225px;
    }

    @media screen and (max-width: 1023px) {
      max-width: 425px;

      h2 {
        font-size: 2.1429rem;
        line-height: 2.7143rem;
        margin-bottom: 1.7857rem;
      }
    }

    @media screen and (max-width: 767px) {
      margin: 0 auto;
    }
  }

  .right-content {
    margin-left: 2.8571rem;

    .right-img-two {
      display: none;
    }

    @media screen and (max-width: 1023px) {
      margin-left: 0;
      margin-top: 2.1429rem;
    }

    @media screen and (min-width: 1024px) {
      flex: 10000 1 0%;
    }

    @media screen and (max-width: $tabletLG) {
      .right-img-one {
        display: none !important;
      }
      .right-img-two {
        display: block !important;
      }
    }

    @media screen and (max-width: 767px) {
      margin: 2.1429rem -15px 0;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 5rem 0;
  }
}
</style>
