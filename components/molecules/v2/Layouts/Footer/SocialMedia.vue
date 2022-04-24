<template lang="pug">
.xm-layouts-footer-social-media
  .row.justify-between
    .download-app
      h4 Download our App
      p Available for both iOS and Android

      .store.row
        a.row.items-center(href="https://apps.apple.com/us/app/activeplace/id1543314003" target="_blank")
          img.desktop.mr-4(src="~assets/images/v2/Layouts/app-store.svg" alt="App Store" width="160" height="56")
          img.mobile.mr-4(src="~assets/images/v2/Layouts/app-store@mobile.svg" alt="App Store" width="100" height="39")
        a.row.items-center(
          href="https://play.google.com/store/apps/details?id=com.activeplace.androidApp"
          target="_blank")
          img.desktop(src="~assets/images/v2/Layouts/playstore.svg" alt="Playstore" width="187" height="56")
          img.mobile(src="~assets/images/v2/Layouts/playstore@mobile.svg" alt="Playstore" width="126" height="39")

    .contact
      h4 Let's Connect
      p Find us on the most popular socials

      .social-apps.row
        a.app.row.items-center.justify-center(href="https://www.facebook.com/theactiveplaceofficial" target="_blank"): img(
          src="~assets/images/v2/Layouts/light-facebook.svg"
          alt="Facebook"
          width="16"
          height="17")
        a.app.row.items-center.justify-center(
          href="https://www.instagram.com/theactiveplaceofficial/?hl=en"
          target="_blank"): img(
          src="~assets/images/v2/Layouts/light-instagram.svg"
          alt="Instagram"
          width="16"
          height="17")
        a.app.row.items-center.justify-center(href="https://www.linkedin.com/company/activeplace" target="_blank"): img(
          src="~assets/images/v2/Layouts/light-linkedin.svg"
          alt="LinkedIn"
          width="16"
          height="16")
        //- a.app.row.items-center.justify-center(href="#" target="_blank"): img(
          src="~assets/images/v2/Layouts/light-discord.svg")
</template>

<script>
export default {
  name: 'XMLayoutsFooterSocialMedia',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-layouts-footer-social-media::v-deep {
  padding: 80px 0 50px;
  border-bottom: 1px solid #2a4e55;

  h4 {
    font-size: 1.5714rem;
    line-height: 1.82;
    letter-spacing: -0.66px;
    margin-bottom: 5px;
    color: $white;
  }

  p {
    color: #909da0;
    font-weight: 100;
  }

  .download-app,
  .contact {
    padding: 30px;
    width: calc(100% / 2 - 15px);
    border-radius: 10px;

    @include max-width(901px) {
      width: 100%;
    }
  }

  .download-app {
    background-color: $secondary;

    @include max-width(901px) {
      margin-bottom: 30px;
    }

    .store {
      a {
        img {
          &.mobile {
            display: none;

            @include max-width(450px) {
              display: block;
            }
          }

          &.desktop {
            @include max-width(450px) {
              display: none;
            }
          }
        }
      }
    }
  }

  .contact {
    border: 1px solid #1c3e45;
  }

  .store,
  .social-apps {
    margin-top: 30px;

    @include max-width(767px) {
      margin-top: 15px;
    }
  }

  .social-apps {
    .app {
      background-color: $secondary;
      width: 80px;
      height: 42px;
      border-radius: 5px;

      @include max-width(441px) {
        width: 50px;
      }

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>
