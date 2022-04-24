<template lang="pug">
.xo-home-section-06
  video(autoplay loop muted playsinline webkit-playsinline disablePictureInPicture)
    source(
      src="https://firebasestorage.googleapis.com/v0/b/activeplace-production-assets/o/animations%2Fblob-dark-homepage-businesspage.mp4?alt=media&token=52178cf3-d920-4896-ac16-9201f3e3d4cc"
      type="video/mp4")
  .container.is-max-widescreen
    h2 Celebrating your sporting achievements will never be the same

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
        p Each race medal also includes your place & additional race information.

      .content-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/digital-medal.svg"
          alt="Access Everywhere and Forever"
          width="48"
          height="48")
        h4 Access everywhere and forever
        p Traditional medals take up space, they can be lost, they can be damaged.
        p Take your medals everywhere you go, having them instantly available via your smartphone.

      .content-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/trusted.svg"
          alt="Official, Trusted & Certified"
          width="48"
          height="48")
        h4 Official, trusted & certified
        p Once you earn your medal, it’s permanently stored online for anyone and everyone to see, forever.
        p It can never be overwritten, changed or modified and if you choose to, everyone will know it’s yours.

      .content-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/hands-with-heart.svg"
          alt="Simply Better for the Environment"
          width="48"
          height="48")
        h4 Simply better for the environment
        p Physical medals are made out of silver, bronze, and sometimes even gold.
        p Obtaining those resources from our planet comes with a cost to the environment; help us save the planet one medal at a time.
</template>

<script>
export default {
  name: 'XOHomeSection06',
}
</script>

<style lang="scss" scoped>
.xo-home-section-06::v-deep {
  position: relative;
  background-color: #0a2a32;
  padding: 100px 0;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    top: 0;
    z-index: 0;
  }

  @include max-width(767px) {
    padding: 50px 0;
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
    width: calc(100% / 4 - 20px);
    background-color: #2a4e55;
    padding: 30px;
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

      @include max-width(767px) {
        font-size: 1.5714rem;
      }
    }

    p {
      font-size: 16px;
      font-weight: 100;
      line-height: 1.55;
      margin-bottom: 10px;
    }
  }
}
</style>
