<template lang="pug">
.xo-business-section-more
  video(autoplay loop muted playsinline webkit-playsinline disablePictureInPicture)
    source(
      src="https://firebasestorage.googleapis.com/v0/b/activeplace-production-assets/o/animations%2Fblob-dark-homepage-businesspage.mp4?alt=media&token=52178cf3-d920-4896-ac16-9201f3e3d4cc"
      type="video/mp4")
  .container.is-max-widescreen
    h2 More than just a medal, it's an experience for your event participants!

    .row.justify-between
      .content-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/star-circle.svg"
          alt="Instantly Unique, Personalized"
          width="48"
          height="48")
        h4 Instantly unique, personalized
        p No more getting the exact same medal others got.
        p Every medal you earn is unique and numbered.
        p Each medal also includes your place & additional information.

      .content-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/digital-medal.svg"
          alt="Access Everywhere and Forever"
          width="48"
          height="48")
        h4 Access everywhere and forever
        p Have centralized collection of your sport achievements.
        p Take your medals everywhere you go, having them instantly available via your smartphone.
        p Traditional medals are dead. They take up space, they can be lost, they can be damaged

      .content-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/message.svg"
          alt="Official, Trusted & Certified"
          width="48"
          height="48")
        h4 Celebrate your success with others
        p Anywhere, anytime online. It’s never been easier to share & celebrate your achievements
        p Share directly from your phone right after the race, let your family & friends join you in the celebration

      .content-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/trusted.svg"
          alt="Simply Better for the Environment"
          width="48"
          height="48")
        h4 Official, trusted & certified
        p Once you earn your medal, it’s permanently stored online for anyone and everyone to see, forever.
        p It can never be overwritten, changed or modified and if you choose to, everyone will know it’s yours
</template>

<script>
export default {
  name: 'XOBusinessLandingMore',
}
</script>

<style lang="scss" scoped>
.xo-business-section-more::v-deep {
  background-color: #041013;
  padding: 100px 0;
  background-image: url('assets/images/v2/Business/bg-morethan.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
  position: relative;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    top: 0;
    z-index: 0;
  }

  @include max-width(1023px) {
    background-size: cover;
    background-position: right -160px center;
  }

  @include max-width(767px) {
    padding: 50px 0;
    background-position: bottom center;
  }

  h2 {
    margin-bottom: 80px;

    @include max-width(1023px) {
      width: 100% !important;
      max-width: 455px !important;
    }

    @include max-width(767px) {
      margin-bottom: 50px;
    }
  }

  .content-column {
    width: calc(100% / 4 - 15px);
    background-color: #2a4e55;
    padding: 25px;
    border-radius: 10px;

    @include max-width(1023px) {
      width: calc(100% / 2 - 10px);
      margin-bottom: 20px;
    }

    @include max-width(767px) {
      width: 100%;
    }

    h4 {
      line-height: 1.55;
      margin-bottom: 20px;

      @include max-width(1023px) {
        font-size: 1.5714rem;
      }

      @include max-width(767px) {
        font-size: 1.5714rem;
      }
    }

    p {
      font-size: 16px;
      font-weight: 100;
      line-height: 1.55;
      margin-bottom: 10px;
      color: #bfcacc;
    }
  }
}
</style>
