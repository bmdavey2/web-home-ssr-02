<template lang="pug">
.nft-section-5
  .container
    .row.items-center
      .left-content
        img(src="~assets/images/NFTMedals/bragging-rights.png")
      .right-content
        h3 Bragging rights are yours
        p It’s never been easier to share your medal and talk about your achievement. Share directly from your phone right after the race, let your family & friends join you in the celebration
</template>

<script>
export default {
  name: 'XONFTMedalsSection5',
}
</script>

<style lang="scss" scoped>
.nft-section-5::v-deep {
  background-color: white;
  padding: 80px 0;

  @include max-width(767px) {
    padding: 50px 0;
  }

  .container {
    .row {
      .left-content {
        width: 50%;

        @include max-width(768px) {
          width: 100%;
          order: 2;
          text-align: center;
        }
      }

      .right-content {
        width: 50%;
        padding-left: 50px;

        @include max-width(768px) {
          width: 100%;
          order: 1;
          padding-left: 0;
        }

        p {
          font-size: 1.5714rem;
          line-height: 40px;
          font-weight: 300;

          @include max-width(767px) {
            font-size: 1.1429rem;
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style>
