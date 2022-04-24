<template lang="pug">
.xo-home-section-05
  .container.is-max-widescreen
    h2.mb-5 How to get the most out of ActivePlace

    .content-section.explore-events.row.items-center
      .left-content
        h3.mb-5 Search events and sports tours
        h4.text-weight-thin Head over to our marketplace to find your next awesome experience

        .actions: b-button.text-uppercase.has-text-primary(
          type="is-white"
          label="Explore Events"
          tag="router-link"
          to="/marketplace")

      .right-content
        img.desktop(
          src="~assets/images/v2/Home/img-content-explore-events@desktop.png"
          style="max-height: 450px"
          alt="Search Events and Sports Tours Desktop")
        img.mobile(
          src="~assets/images/v2/Home/img-content-explore-events@mobile.png"
          alt="Search Events and Sports Tours Mobile")

    .content-section.claim-medal.row.items-center
      .left-content
        h3.mb-5 Claim your official Digital NFT Medal
        h4.text-weight-thin Own your sporting achievements online with the world's first Digital NFT Medals

        .actions: b-button.text-uppercase(
          type="is-white"
          label="See Examples"
          tag="router-link"
          to="/businesses"
          outlined)

      .right-content.col.row.items-center.justify-center: XAMedalsVideo(:video="videoURL" title="Claim")

    .content-section.celebrate.row.items-center
      .left-content
        h3.mb-5 Celebrate with friends and family
        h4.text-weight-thin It’s never been easier to share your medal and talk about your achievement. Share directly from your phone right after the race, let your family & friends join you in the celebration

      .right-content.col
        //- img.desktop(src="~assets/images/v2/Home/img-content-celebrate.svg")
        XMHomeCelebrate
</template>

<script>
import XAMedalsVideo from '~/components/atoms/Medals/Video'
import XMHomeCelebrate from '~/components/molecules/v2/Home/Celebrate'

export default {
  name: 'XOHomeSection05',
  components: { XAMedalsVideo, XMHomeCelebrate },
  data() {
    return {
      videoURL: 'https://api.activeplace.com/videos/nftmedal.m3u8/Final%20with%20BG.m3u8',
    }
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-home-section-05::v-deep {
  background-color: $secondary;
  padding: 100px 0;

  @include max-width(768px) {
    padding: 50px 0;
  }

  h2 {
    width: 100%;
    max-width: 750px;

    @include max-width(768px) {
      max-width: 400px;
    }
  }

  h4 {
    @include max-width(768px) {
      font-size: 1.1429rem !important;
    }
  }

  .content-section {
    position: relative;
    padding: 30px 50px;
    border-radius: 10px;
    margin-top: 100px;
    margin-bottom: 130px;
    min-height: 450px;

    @include max-width(767px) {
      padding: 30px 20px;
    }

    &::before {
      content: '';
      border-bottom: 70px solid transparent;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      width: calc(100% - 10px);
      position: absolute;
      top: -69px;
      left: 5px;

      @include max-width(767px) {
        border-bottom-width: 50px;
        border-left-width: 70px;
        border-right-width: 70px;
        top: -49px;
      }
    }

    &::after {
      content: '';
      background-image: linear-gradient($secondary, rgba(12, 53, 62, 0));
      position: absolute;
      top: -70px;
      left: 0;
      width: 100%;
      height: 70px;

      @include max-width(767px) {
        height: 50px;
        top: -50px;
      }
    }
  }

  .explore-events {
    background-color: $primary;

    &::before {
      border-bottom-color: $primary;
    }

    .left-content {
      width: calc(100% - 650px);

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(767px) {
        width: 100%;
        position: relative;
        z-index: 1;
        padding-top: 350px;
      }

      .actions {
        margin-top: 80px;

        a {
          span {
            font-weight: bold;
          }
        }

        @include max-width(767px) {
          margin-top: 50px;
        }

        .button {
          width: 100%;
          max-width: 190px;

          @include max-width(767px) {
            max-width: 100%;
            height: 42px;
          }
        }
      }
    }

    .right-content {
      position: absolute;
      top: 0;
      right: 0;
      width: 700px;
      height: 100%;
      border-top-right-radius: 10px;
      overflow: hidden;

      @include max-width(1215px) {
        width: 100%;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;

        &.desktop {
          @include max-width(767px) {
            display: none;
          }
        }

        &.mobile {
          display: none;

          @include max-width(767px) {
            display: block;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
        }

        @include max-width(1215px) {
          object-fit: unset;
          position: absolute;
          top: 0;
          right: -30%;
        }

        @include max-width(800px) {
          right: -35%;
        }

        @include max-width(767px) {
          right: 0;
          object-fit: cover;
        }
      }
    }
  }

  .claim-medal {
    background-color: #886bf2;

    &::before {
      border-bottom-color: #886bf2;
    }

    .left-content {
      width: calc(100% - 580px);

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(767px) {
        width: 100%;
        padding-top: 400px;
      }

      .actions {
        margin-top: 80px;

        a {
          span {
            font-weight: 500;
          }
        }

        @include max-width(767px) {
          margin-top: 50px;
        }

        .button {
          width: 100%;
          max-width: 190px;

          @include max-width(767px) {
            max-width: 100%;
            height: 42px;
          }
        }
      }
    }

    .right-content {
      background-image: url('~assets/images/Medals/bg-circles.png');
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 650px;
      overflow: hidden;
      background-size: 950px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        background-size: 760px;
      }

      @include max-width(767px) {
        width: 100%;
        height: 420px;
      }

      .xa-medals-video {
        .video-js {
          width: 205px;
          height: 350px;
        }
      }
    }
  }

  .celebrate {
    background-color: #ffaf23;

    &::before {
      border-bottom-color: #ffaf23;
    }

    .left-content {
      width: 100%;
      max-width: 500px;
      padding-right: 100px;

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(768px) {
        padding-right: 80px;
      }

      @include max-width(767px) {
        width: 100%;
        order: 2;
      }

      h3 {
        width: 100%;
        max-width: 350px;
      }
    }

    .right-content {
      @include max-width(767px) {
        flex: none;
        width: 100%;
        order: 1;
      }
    }
  }
}
</style>
