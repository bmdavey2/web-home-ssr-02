<template lang="pug">
.section
  .second-middle-content(style="max-width: 1071px", :style="{ top: '50%' }")
    .columns.download-container.pt-5(style="max-height: 558px")
      .column.download-content.is-one-third
        h2.middle-text.is-mobile.is-size-1.is-size-3-mobile.has-text-left-desktop.is-family-secondary Download our App.
        h2.pt-4.has-text-weight-light.has-text-black-bis.has-text-left.sub-text We worked hard building it to ensure you'll love using it.
        .download-buttons.is-flex
          a(href="https://apps.apple.com/us/app/activeplace/id1543314003" target="_blank"): img.mr-5.is-clickable(
            src="~/assets/images/Welcome/apple-store.svg"
            alt="App Store"
            loading="lazy")
          a(href="https://play.google.com/store/apps/details?id=com.activeplace.androidApp" target="_blank"): img.ml-2.is-clickable(
            src="~/assets/images/Welcome/play-store.png"
            alt="Google Play"
            loading="lazy")
      .column.page-welcome-hidden-landscape
        img.preview-lg-image(
          src="~/assets/images/Welcome/application.png"
          width="255.45px"
          height="430.72px"
          loading="lazy")

    .columns.download-sm-container.pt-5(style="max-height: 558px")
      .is-flex.is-justify-content-center.is-align-content-center
        .download-sm-content.d-md-content.pt-5.ml-5.mr-5
          h2.middle-text.is-mobile.is-size-1.is-size-3-mobile.has-text-left-desktop.is-family-secondary Download our App.
          h2.pt-4.has-text-weight-light.has-text-black-bis.has-text-left.sub-text We worked hard building it to ensure you'll love using it.
        .download-sm-content.d-sm-content
          h2.middle-text.is-mobile.is-size-1.is-size-3-mobile.has-text-left-desktop.is-family-secondary
            | Download
            | our App.
          h2.pt-4.has-text-weight-light.has-text-black-bis.has-text-left.sub-text
            | We worked hard
            | building it to ensure
            | you'll love using it.
        img.preview-sm-image(src="~/assets/images/Welcome/application.png" width="179px" height="302px" loading="lazy")
      .download-buttons.is-flex.is-justify-content-center.is-align-content-center
        a(href="https://apps.apple.com/us/app/activeplace/id1543314003" target="_blank"): img.mr-4.is-clickable(
          src="~/assets/images/Welcome/apple-store.svg")
        a(href="https://play.google.com/store/apps/details?id=com.activeplace.androidApp" target="_blank"): img.is-clickable(
          src="~/assets/images/Welcome/play-store.png")
</template>

<script>
export default {
  name: 'XMWelcomeSecondSection',
}
</script>

<style lang="scss" scoped>
.section::v-deep {
  font-weight: 300;

  .download-content {
    width: 35% !important;
    margin-left: 15% !important;
    margin-top: 80px;

    p {
      word-break: break-all;
    }
  }

  .download-sm-content {
    margin-top: 25px;
    margin-left: 10px;
    width: 250px;
  }

  .preview-sm-image {
    margin-right: -20px;
    max-width: 179.57px !important;
    max-height: 302.45px !important;
  }

  .preview-lg-image {
    width: 255.45px !important;
    height: 430.72px !important;
  }

  .download-buttons {
    width: 100%;
    margin-top: 40px;

    img {
      width: 150px;
      height: 45px;
    }
  }

  .download-sm-container {
    display: none !important;
  }

  .d-md-content {
    display: none !important;
  }

  .d-sm-content {
    display: none !important;
  }

  @media screen and (max-width: $mobileLG) {
    .sub-text {
      white-space: pre !important;
    }
    .d-sm-content {
      display: block !important;
    }
  }
  @media screen and (max-width: $tabletLG) {
    .download-container {
      display: none !important;
    }
    .download-sm-container {
      display: block !important;
    }
  }
  @media screen and (max-width: $tabletLG) and (min-width: $mobileLG) {
    .d-md-content {
      display: block !important;
    }
  }
}

.second-middle-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  text-align: center;
}

.middle-text {
  white-space: pre;
  color: #f15a29;
}

.sub-text {
  font-size: 16px;
}

@media screen and (max-width: 768px) {
  .sub-text {
    text-align: center !important;
    padding: 0 5px;
  }
}
</style>
