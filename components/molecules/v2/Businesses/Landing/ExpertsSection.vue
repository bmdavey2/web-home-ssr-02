<template lang="pug">
.xm-businesses-landing-experts-section.content-section.row.items-center.justify-between
  .left-content
    h3 We are the experts
    h4.text-weight-thin The ActivePlace formula is built on 500+ years of combined experience across Web 3.0 technology, digital marketing, sales, event management, PR management, paid campaigns, content marketing, athlete management and so much more

  .right-content: img(src="~assets/images/v2/Businesses/img-content-experts.webp" width="515" height="391")
</template>

<script>
export default {
  name: 'XMBusinessesLandingExpertsSection',
}
</script>

<style lang="scss" scoped>
.xm-businesses-landing-experts-section::v-deep {
  background-color: #886bf2;
  padding: 70px 50px 0 50px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 50px;

  @include max-width(767px) {
    padding: 50px 30px;
    margin-bottom: 30px;
  }

  .left-content {
    padding-bottom: 110px;

    @include max-width(767px) {
      max-width: 100% !important;
      order: 2;
      padding-bottom: 0;
    }
  }

  .right-content {
    position: absolute;
    bottom: 0;
    right: 50px;

    @include max-width(1215px) {
      right: -17%;
      max-width: 65% !important;
    }

    @include max-width(767px) {
      max-width: 100% !important;
      order: 1;
      position: relative;
      bottom: unset;
      right: unset;
      margin-bottom: 50px;
    }

    &::after {
      content: '';
      background-image: linear-gradient(360deg, #886bf2 -2.75%, rgba(136, 107, 242, 0) 46.65%);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      @include max-width(767px) {
        top: 3px;
      }
    }

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      margin-bottom: -10px;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
