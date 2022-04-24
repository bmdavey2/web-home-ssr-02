<template lang="pug">
.nft-section-7
  .container
    .row.items-center
      .left-content
        img(src="~assets/images/NFTMedals/who-is-activeplace-lg.png")
      .right-content
        h3 Who is ActivePlace?
        p ActivePlace is the official creator of digital medals via Non-Fungible-Tokens (NFTs) on the #[a.has-text-weight-medium(href="https://www.stacks.co/" target="_blank") Stacks Blockchain.]
        p We create them this way for one simple reason:
        p It allows people to have a permanent and decentralized digital memory of their event, while making it extremely easy to celebrate and share anytime, anywhere...
</template>

<script>
export default {
  name: 'XONFTMedalsSection7',
}
</script>

<style lang="scss" scoped>
.nft-section-7 {
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
          margin-top: 50px;
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

          &:not(:last-child) {
            margin-bottom: 42px;

            @include max-width(767px) {
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
