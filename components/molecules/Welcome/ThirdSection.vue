<template lang="pug">
.section
  .third-content(style="max-width: 1071px")
    .columns.d-flex-sm
      .column
        .columns.is-multiline.page-welcome-container-tablet
          div
            .column.p-0.is-12
              h2.middle-text.is-size-3-mobile.is-mobile.is-size-1.has-text-left-desktop.pl-5.is-family-secondary.d-text-md.is-hidden
                | Your active lifestyle
                | lives here.
              h2.middle-text.is-mobile.is-size-1.has-text-left.pl-5.is-family-secondary.d-text-md-tablet.is-hidden(
                style="padding-left: 40px !important; line-height: 1.2 !important; padding-top: 10px !important")
                | Your active
                | lifestyle lives
                | here.
            .column.p-0.is-12.user-avatars
              img(
                src="~/assets/images/Welcome/user-avatars.png"
                alt="Your Active Lifestyle Lives here."
                width="415"
                height="220"
                loading="lazy")

      .column.border-left
        .columns.has-text-left.block-list.is-multiline.is-mobile
          .column.is-12.py-0
            h3.is-size-4.is-family-secondary Discover
            ul.has-text-weight-light.has-text-black-bis.discover-list
              li
                span.ap-sign-icon
                  img(src="~/assets/images/Welcome/AP_sign.svg" width="12" height="12")
                |
                | Your health, wellness and active community.
              li
                span.ap-sign-icon
                  img(src="~/assets/images/Welcome/AP_sign.svg" width="12" height="12")
                |
                | Beginners, brands, and experts to help you grow.
              li
                span.ap-sign-icon
                  img(src="~/assets/images/Welcome/AP_sign.svg" width="12" height="12")
                |
                | A world of active experiences, training, virtual and more.
              li
                span.ap-sign-icon
                  img(src="~/assets/images/Welcome/AP_sign.svg" width="12" height="12")
                |
                | Content to inspire, inform and engage you.

          .column.is-12.py-0
            ul.has-text-weight-light.has-text-black-bis
              p.is-size-4.is-family-secondary Grow
                li
                  span
                    img(src="~/assets/images/Welcome/AP_sign.svg" width="12" height="12")
                  |
                  | Your unique and inspiring active lifestyle.
                li
                  span
                    img(src="~/assets/images/Welcome/AP_sign.svg" width="12" height="12")
                  |
                  | Your personalised ActivePlace Profile Page.
</template>

<script>
export default {
  name: 'XMWelcomeThirdSection',
}
</script>

<style lang="scss" scoped>
.section::v-deep {
  .third-content {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    text-align: center;
  }

  .user-avatars {
    display: none !important;

    img {
      width: 100%;
      height: auto;
    }
  }

  .border-left {
    border-left: 1px solid #f15a29;
    height: 329px;
  }

  .middle-text {
    white-space: pre;
    color: #f15a29;
  }

  .block-list {
    margin-left: 15px;
    font-weight: 400px;
    line-height: 50px;

    p {
      color: #0c353e;
    }

    ul {
      padding-left: 15px;
    }

    li {
      line-height: 30px;
      letter-spacing: -0.28px;
      font-size: 16px;
      color: #050505;
      margin: 8px 0;
    }

    h3 {
      padding-left: 15px;
    }
  }

  @media screen and (max-width: $tabletLG) {
    .middle-text {
      margin: 0 !important;
      padding: 0 !important;
      padding-top: 30px !important;
      line-height: 40px !important;
    }
    .block-list {
      margin: 0 auto;

      li {
        line-height: 20px;
      }

      ul {
        padding: 0 5px;
      }
    }
  }

  @media screen and (max-width: $tabletSM) {
    .border-left {
      border-left: none !important;
    }
  }

  @media screen and (min-width: $tabletSM) {
    .d-flex-sm {
      display: flex !important;
    }
    .user-avatars {
      display: block !important;
    }
  }

  @media screen and (max-width: $tabletLG) and (min-width: $BPdesktop) {
    .page-welcome-container-tablet {
      margin-left: 50px;

      p {
        text-align: left !important;
      }
    }
  }

  @media screen and (min-width: 769px), (max-width: $tabletSM) {
    .d-text-md {
      display: block !important;
    }
  }
  @media screen and (max-width: 768px) and (min-width: $tabletSM) {
    .d-text-md-tablet {
      display: block !important;
    }
  }
}
</style>
