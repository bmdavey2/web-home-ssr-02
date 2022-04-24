<template lang="pug">
.xo-home-section-01.row.items-center
  .plain-background
    video(autoplay loop muted playsinline webkit-playsinline disablePictureInPicture)
      source(
        src="https://firebasestorage.googleapis.com/v0/b/activeplace-production-assets/o/animations%2Fbg-runner-dark-plain.mp4?alt=media&token=0b0344e3-8f07-41f0-9a0b-45c68e6c2b72"
        type="video/mp4")
  .container.is-max-widescreen
    .row
      .left-section
        h1.mb-6 Your home of officially licensed NFT's for endurance sports
        h4.text-weight-thin.mb-6 Find your next endurance event, and “Move-to-Earn” your achievements as a Digital NFT Medal

        .actions.row.mb-5
          b-button.text-uppercase.btn-explore-events(
            type="is-primary"
            label="Explore Events"
            tag="router-link"
            to="/marketplace")
          b-button.text-uppercase.btn-signup(
            type="is-primary"
            label="Sign Up"
            outlined
            tag="router-link"
            to="/signup/user?step=1")

        .actions-subtext #[strong Sign Up] to join our healthy community

      .right-section.mobile.row.items-center.justify-center
        video(autoplay loop muted playsinline webkit-playsinline disablePictureInPicture)
          source(
            src="https://firebasestorage.googleapis.com/v0/b/activeplace-production-assets/o/animations%2Fbg-runner-dark-mobile.mp4?alt=media&token=cdadf9f2-1617-4627-84db-55efaa98fbde"
            type="video/mp4")
        //: img(
        //src="~assets/images/v2/Home/runner.svg"
        //alt="Running Man"
        //width="500"
        //height="549")

  .right-section.desktop.row.items-center.justify-center
    video(autoplay loop muted playsinline webkit-playsinline disablePictureInPicture)
      source(
        src="https://firebasestorage.googleapis.com/v0/b/activeplace-production-assets/o/animations%2Fbg-runner-black-prod.mp4?alt=media&token=39883bb8-4dec-495e-95f4-0f4f84e4f426"
        type="video/mp4")
    //src="https://firebasestorage.googleapis.com/v0/b/activeplace-staging.appspot.com/o/animations%2Fbg-plain-darker-runner.mp4?alt=media&token=4e09c970-4cbb-4b11-9815-10b6f2a8c640"
    //src="https://firebasestorage.googleapis.com/v0/b/activeplace-staging.appspot.com/o/animations%2Fbg-main-runner.mp4?alt=media&token=394b8b54-aca6-48df-9f14-0b982fc63542"
    //: img(
    //src="~assets/images/v2/Home/runner.svg"
    //alt="Running Man"
    //width="655"
    //height="720")
</template>

<script>
export default {
  name: 'XOHomeSection01',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-home-section-01::v-deep {
  background-color: $secondary;
  position: relative;
  min-height: 840px;
  padding-bottom: 100px;
  overflow: hidden;

  .plain-background {
    @include max-width(767px) {
      display: none;
    }

    video {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
      top: 0;
      z-index: 0;
    }
  }

  @include max-width(1215px) {
    min-height: 630px;
    padding-top: 70px;
    padding-bottom: 160px;
  }

  @include max-width(767px) {
    padding: 0 0 100px;
  }

  .left-section {
    width: 100%;
    max-width: 700px;
    position: relative;
    z-index: 3;

    @include max-width(1215px) {
      max-width: 55%;
    }

    @include max-width(767px) {
      max-width: 100%;
      order: 2;
      padding: 30px 0;
    }

    h1 {
      @include max-width(767px) {
        margin-bottom: 30px !important;
      }
    }

    h4 {
      @include max-width(767px) {
        display: none;
      }
    }

    .actions {
      .btn-explore-events {
        width: 100%;
        max-width: 200px;
        margin-right: 20px;

        @include max-width(767px) {
          max-width: 140px;
        }
      }

      .btn-signup {
        width: 100%;
        max-width: 125px;
      }
    }

    .actions-subtext {
      color: #cad3d4;
      font-weight: 300;

      strong {
        color: $white;
      }
    }
  }

  .right-section {
    //background-image: url('~assets/images/Medals/bg-circles.png');
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 0;
    right: -20%;
    width: 100%;
    height: 100%;

    &.mobile {
      display: none;
      order: 1;
      margin: 0 -15px;
      width: calc(100% + 30px);
      padding: 50px 0;
      background-size: 750px;
      min-height: 500px;
      overflow: hidden;
      position: relative;
      right: 0;
      // min-height: calc(var(--vh, 1vh) * 100 - 63px); add this if Damien requested for full screen view

      @include max-width(767px) {
        display: flex;
      }

      video {
        position: absolute;
        top: -70px;
        right: -320px;
        @media screen and (max-width: 767px) and (min-width: 553px) {
          right: -150px;
        }

        max-width: unset;
        height: auto;
      }

      &::after {
        content: '';
        background-image: linear-gradient(rgba(12, 53, 62, 0), $secondary);
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 150px;
      }

      img {
        position: absolute;
        top: 70px;
        left: 12%;
        right: 0;
        margin: 0 auto;
        width: 500px;
        max-width: unset;
        height: auto;

        @include max-width(510px) {
          left: 9%;
        }

        @include max-width(475px) {
          left: 0;
        }

        @include max-width(375px) {
          left: -6%;
        }
      }
    }

    &.desktop {
      @include max-width(767px) {
        display: none;
      }

      video {
        position: absolute;
        //background-color: #11333b;
        max-width: 100%;
        //max-width: unset;
        height: auto;
        //margin-left: 10%;
      }
    }

    @include max-width(1440px) {
      right: -25%;
    }

    @include max-width(1215px) {
      background-size: 1150px;
    }

    @include max-width(768px) {
      background-size: 1050px;
    }

    img {
      height: 720px;
      margin-left: 90px;

      @include max-width(1215px) {
        height: 550px;
      }

      @include max-width(767px) {
        height: 100%;
        margin-left: 50px;
      }
    }
  }
}
</style>
