<template lang="pug">
.xm-businesses-header
  ._content-container
    ._contents.is-flex-width-auto
      .container
        .columns.is-multiline.is-mobile
          .column.is-7-desktop.is-7-tablet.is-12-mobile
            ._content
              h1 ActivePlace makes it easier to find the perfect audience, and grow your business
              h3 Your customers are all here. Reach them more effectively by investing your time and energy in a platform that is built with purpose, for businesses in 30+ health and fitness categories.
              .actions
                b-button.is-uppercase(
                  type="is-primary"
                  size="is-medium"
                  tag="router-link"
                  to="/businesses/plans-pricing") CREATE A FREE BUSINESS PROFILE
                .text Activate your business today
          .column.is-5-desktop.is-5-tablet.is-12-mobile
            XMBusinessVideo
  .banner
    img.img-banner(src="~assets/images/Businesses/banner-v2.webp" width="1440" height="800")
    img.img-overlay(src="~assets/images/Businesses/banner-overlay.webp" width="1440" height="800")
</template>

<script>
import XMBusinessVideo from '~/components/molecules/Businesses/WistaVideo'
export default {
  name: 'XMBusinessesHeader',
  components: { XMBusinessVideo },
}
</script>

<style lang="scss" scoped>
.xm-businesses-header::v-deep {
  position: relative;
  min-height: 800px;

  .business-video {
    top: 20%;
    position: relative;
  }

  ._content-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    .navigation {
      padding-top: 30px;
      width: 100%;

      .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        .logo {
          img {
            display: flex;
          }

          .logo-minified {
            display: none;
          }
        }

        .actions {
          .btn-mobile {
            display: none;
          }
        }
      }
    }

    ._contents {
      color: $white;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      ._content {
        width: 100%;
        max-width: 680px;

        h3 {
          font-weight: 300;
          margin: 50px 0;
        }

        .text {
          font-family: 'Georgia', sans-serif;
          font-style: italic;
        }

        .actions {
          width: 256px;
          text-align: center;

          .text {
            margin-top: 10px;
          }
        }
      }
    }
  }

  .banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    .img-banner,
    .img-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .img-banner {
      z-index: 1;
    }

    .img-overlay {
      z-index: 2;
    }
  }

  @media screen and (max-width: 1023px) {
    ._content-container {
      ._contents {
        ._content {
          max-width: 100%;
          padding: 0 20px;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    min-height: auto;

    .business-video {
      top: 0 !important;
      position: relative;
    }

    ._content-container {
      flex-direction: row;
      position: relative;

      .navigation {
        .container {
          align-items: flex-start;

          .logo {
            margin-top: -6px;

            .logo-full {
              display: none;
            }

            .logo-minified {
              display: flex;
            }
          }

          .actions {
            .btn-desktop {
              display: none;
            }

            .btn-mobile {
              display: block;
            }
          }
        }
      }

      ._contents {
        padding: 50px 0;

        ._content {
          padding: 0;

          .actions {
            a {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
