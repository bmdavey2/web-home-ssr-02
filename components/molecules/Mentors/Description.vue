<template lang="pug">
.description.is-flex.is-flex-wrap-wrap.is-align-items-flex-end
  .content-image: img(src="~assets/images/Mentors/become-mentor.png" width="767" height="480")
  .content: .text "Mentors are held in high regard because they're trusted. They've spent years sharpening the tools they carry as athletes, coaches, or specialists. They're not 'social influencers' they don't publish in the name of engagement or frequency, they publish for the sake of quality, and this makes a difference to the people who are receiving their content."
</template>

<script>
export default {
  name: 'XMMentorDescription',
}
</script>

<style lang="scss" scoped>
.description::v-deep {
  background-image: url('~assets/images/Mentors/become-mentor.png');
  background-size: cover;
  background-position: bottom center;
  min-height: 890px;

  .content-image {
    margin-bottom: -7px;
    display: none;

    @media screen and (max-width: 767px) {
      display: block !important;
    }
  }

  .content {
    background-color: rgba(#cff1f8, 0.8);
    padding: 80px 0;
    width: 100%;

    .text {
      width: 100%;
      max-width: 805px;
      margin: 0 auto;
      font-size: 1.5714rem;
      font-style: italic;
      font-family: $secondary-font;
      text-align: center;

      @media screen and (max-width: 767px) {
        font-size: 1.1429rem;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    background-position: right -220px center;

    .content {
      padding: 60px 20px;
    }
  }

  @media screen and (max-width: 767px) {
    background-image: none;
    min-height: auto;
  }
}
</style>
