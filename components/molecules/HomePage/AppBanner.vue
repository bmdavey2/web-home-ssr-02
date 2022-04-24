<template lang="pug">
.app-banner
  .app-content.container
    p.app-title.has-text-primary Download our App.
    p.sub-title.my-5 We worked hard building it to ensure you'll love using it.
    .download-buttons.is-flex.is-align-content-center
      a(href="https://apps.apple.com/us/app/activeplace/id1543314003" target="_blank"): img.mr-4.is-clickable(
        src="~/assets/images/HomePage/apple-store.svg")
      a(href="https://play.google.com/store/apps/details?id=com.activeplace.androidApp" target="_blank"): img.is-clickable(
        src="~/assets/images/HomePage/play-store.png")

  img.app-preview(src="~assets/images/HomePage/app-preview.png")
</template>

<script>
export default {
  name: 'XMHomeAppBanner',
}
</script>

<style lang="scss" scoped>
.app-banner {
  margin: 0 auto;
  background: linear-gradient(98.96deg, #e1f0fd 5.48%, #c4caea 79%);
  position: relative;
  height: 269px;

  .app-preview {
    z-index: 0;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .app-content {
    z-index: 1;
    position: absolute;
    left: 20px;
    top: 40px;

    .app-title {
      font-size: 32px;
      line-height: 35px;
    }

    .sub-title {
      color: black;
      width: 281px;
      font-size: 16px;
      line-height: 20px;
    }

    .download-buttons {
      width: 100%;
      margin-top: 40px;

      img {
        width: 123px;
        height: 37px;
      }
    }
  }
}

@media (max-width: '425px') {
  .mentor-banner {
    height: 310px;
  }
  .app-title {
    width: 100% !important;
  }
  .sub-title {
    width: 100% !important;
  }
}

@media (max-width: '546px') {
  .app-preview {
    display: none !important;
  }
}
</style>
