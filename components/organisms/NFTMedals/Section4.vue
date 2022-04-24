<template lang="pug">
.nft-section-4
  .container
    .row.items-center
      .left-content
        h3 Instantly unique, personalised
        p.mb-6 No more getting the exact same medal others got. Every medal you earn is unique and numbered.
        p Each race medal also includes your place & additional race information

      .right-content
        img(src="~assets/images/NFTMedals/Instantly_unique_img.png")
</template>

<script>
export default {
  name: 'XONFTMedalsSection4',
}
</script>

<style lang="scss" scoped>
.nft-section-4::v-deep {
  background-color: white;
  padding: 80px 0;
  border-bottom: 1px solid #e5e5e5;

  @include max-width(767px) {
    padding: 50px 0;
  }

  .container {
    .row {
      .left-content {
        width: 50%;

        @include max-width(768px) {
          width: 100%;
        }

        p {
          font-size: 1.5714rem;
          line-height: 2.8571rem;
          font-weight: 300;

          @include max-width(767px) {
            font-size: 1.1429rem;
            line-height: 1.5;

            &:nth-child(2) {
              margin-bottom: 20px !important;
            }
          }
        }
      }

      .right-content {
        width: 50%;

        @include max-width(768px) {
          width: 100%;
          text-align: center;
          margin-top: 50px;
        }

        @include max-width(767px) {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
