<template lang="pug">
.xo-nft-medals-partners.row.items-center
  .container
    h3.has-text-secondary A growing list of partnerships
    p.has-text-secondary ActivePlace has partnered with leading endurance events providing the world’s first digital race medal backed and secured by Blockchain technology

    .partners.row.items-center.justify-between
      .partner(v-for="(partner, index) in partners", :key="index"): img(
        :src="require(`~/assets/images/NFTMedals/partners/${partner}.png`)")
</template>

<script>
export default {
  name: 'XONFTMedalsPartners',
  data() {
    return {
      partners: [
        'super-trail',
        // 'fisiocrem',
        'launceston',
        'the-heritage-burnie',
        'real-insurance',
        'sydney-running-festival',
        'run-bridge',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.xo-nft-medals-partners::v-deep {
  background-color: $white;
  padding: 80px 0;

  @include max-width(767px) {
    padding: 50px 0;
  }

  p {
    font-weight: 300;
    font-size: 1.5714rem;
    width: 100%;
    max-width: 795px;

    @include max-width(767px) {
      font-size: 1.1429rem;
    }
  }

  .partners {
    margin-top: 40px;

    @include max-width(1023px) {
      justify-content: flex-start;
    }

    .partner {
      @include max-width(1023px) {
        width: 25%;
        margin-top: 10px;
      }

      @include max-width(767px) {
        width: calc(100% / 3);
      }

      @include max-width(427px) {
        padding-right: 15px;
      }
    }
  }
}
</style>
