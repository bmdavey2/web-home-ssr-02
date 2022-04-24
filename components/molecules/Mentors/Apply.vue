<template lang="pug">
.apply
  .is-flex.is-flex-wrap-wrap
    .left-content
      .why
        h2 Who should apply
        ul
          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Any person who believes they fit the criteria.

          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Any person who wants to help others.

          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Any person who wants to be a part of a likeminded community.

          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Any person who is looking to build their brand across the health, wellness and active industry.

      .slogan.is-flex.is-flex-wrap-wrap.is-justify-content-center “When it comes to achieving your goals, grit and confidence play leading roles. The grit is up to you, but confidence can come from those around you. Mentors make a massive difference when it comes to confidence.”

    .right-content: img.d-img-sm(src="~assets/images/Mentors/apply.png" width="767" height="820")
    .mobile-slogan.is-flex.is-flex-wrap-wrap.is-justify-content-center “When it comes to achieving your goals, grit and confidence play leading roles. The grit is up to you, but confidence can come from those around you. Mentors make a massive difference when it comes to confidence.”
</template>

<script>
export default {
  name: 'XMMentorApply',
}
</script>

<style lang="scss" scoped>
.apply::v-deep {
  background-color: #f8f8f8;
  padding-top: 80px;

  .left-content {
    font-size: 1.1429rem;
    font-weight: 300;

    @media screen and (min-width: 767px) {
      flex: 10000 1 0%;
    }

    .why {
      margin-bottom: 75px;
      padding: 0 80px;

      h2 {
        margin-bottom: 2.8571rem;
      }

      ul {
        li {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 15px;
        }
      }
    }

    .slogan {
      background-color: $primary;
      color: $white;
      font-style: italic;
      font-size: 1.5714rem;
      font-family: $secondary-font;
      padding: 120px 80px;
    }

    @media screen and (max-width: $tabletLG) {
      .slogan {
        display: none !important;
      }
    }

    @media screen and (max-width: 1023px) {
      .why {
        padding: 0 20px;
        margin-bottom: 45px;

        h2 {
          font-size: 2.1429rem;
          margin-bottom: 1.7857rem;
        }
      }

      .slogan {
        padding: 60px 30px;
        font-size: 1rem;
      }
    }

    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }

  .d-img-sm {
    display: none;
  }

  .right-content {
    background-image: url('~assets/images/Mentors/apply.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    max-width: 685px;

    @media screen and (max-width: 1024px) {
      max-width: 50%;
    }

    @media screen and (max-width: 767px) {
      max-width: 100%;
      background-image: none;
    }
  }

  .mobile-slogan {
    background-color: $primary;
    color: $white;
    font-style: italic;
    font-family: $secondary-font;
    padding: 60px 30px;
    font-size: 1rem;
    margin-top: -7px;
    display: none !important;
  }

  @media screen and (max-width: $tabletLG) {
    .d-img-sm {
      display: block !important;
    }
    .mobile-slogan {
      display: block !important;
    }
  }

  @media screen and (max-width: 1023px) {
    padding-top: 60px;
  }
}
</style>
