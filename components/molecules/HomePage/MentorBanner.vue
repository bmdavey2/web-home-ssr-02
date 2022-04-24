<template lang="pug">
.mentor-banner
  img.p-3(src="~assets/icons/light/logo.svg")
  .mentor-content.container
    p.mentor-title.has-text-primary Apply to become a Mentor.
    p.sub-title.has-text-white.my-3 Get the badge that raises you up, introduces you to more people and helps your community grow.
    b-button.apply-btn(type="is-primary" tag="router-link" to="/mentors") APPLY NOW
</template>

<script>
export default {
  name: 'XMHomeMentorBanner',
}
</script>

<style lang="scss" scoped>
.mentor-banner {
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('~assets/images/HomePage/MentorBlack.jpg');
  max-width: 575px;
  height: 269px;

  .mentor-content {
    margin-left: 20px;

    .mentor-title {
      font-size: 32px;
      line-height: 35px;
      width: 320px;
    }

    .sub-title {
      width: 355px;
      font-size: 16px;
      line-height: 20px;
    }

    .apply-btn {
      width: 204px;
    }
  }
}
@media (max-width: '425px') {
  .mentor-banner {
    height: 310px;
  }
  .mentor-title {
    width: 100% !important;
  }
  .sub-title {
    width: 100% !important;
  }
}
</style>
