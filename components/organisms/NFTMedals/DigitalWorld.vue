<template lang="pug">
.xo-nft-medals-digital-world
  .container
    h3.has-text-secondary Our entire lives are moving to a digital world…..and fast
    p.has-text-secondary Photo’s, professional resumes, books, music, art and many more things all now have an online home and are available within the touch of a button. It’s time your greatest race results and memories have a home to celebrate and share anywhere, anytime.

    .img-container: img(src="~assets/images/NFTMedals/img-digital-world.webp")
</template>

<script>
export default {
  name: 'XONFTMedalsDigitalWorld',
}
</script>

<style lang="scss" scoped>
.xo-nft-medals-digital-world::v-deep {
  padding: 80px 0;

  @include max-width(767px) {
    padding: 50px 0;
  }

  p {
    font-size: 1.5714rem;
    font-weight: 300;

    @include max-width(767px) {
      font-size: 1.1429rem;
    }
  }

  .img-container {
    text-align: center;
    margin-top: 50px;
  }
}
</style>
