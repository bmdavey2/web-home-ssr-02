<template lang="pug">
.xp-nft-event-medal
  XONFTEventMedalIntroduction
  XONFTEventMedalDetails
  XONFTMedalsSection4
  XONFTMedalsSection5
  XONFTMedalsSection6(:isVote="false")
  XOMedalsSponsors
  XONFTEventMedalIntroduction
</template>

<script>
import XONFTEventMedalIntroduction from '~/components/organisms/NFTEventMedal/Introduction'
import XONFTEventMedalDetails from '~/components/organisms/NFTEventMedal/Details'
import XONFTMedalsSection5 from '~/components/organisms/NFTMedals/Section5'
import XONFTMedalsSection4 from '~/components/organisms/NFTMedals/Section4'
import XONFTMedalsSection6 from '~/components/organisms/NFTMedals/Section6'
import XOMedalsSponsors from '~/components/organisms/Medals/Sponsors'

export default {
  name: 'XPEventMedal',
  components: {
    XONFTMedalsSection6,
    XONFTMedalsSection4,
    XONFTMedalsSection5,
    XONFTEventMedalDetails,
    XONFTEventMedalIntroduction,
    XOMedalsSponsors,
  },
}
</script>

<style lang="scss" scoped>
.xp-nft-event-medal::v-deep {
  // overflow: hidden;

  h1 {
    font-size: 5rem;

    @include max-width(1024px) {
      font-size: 2.8571rem;
    }

    @include max-width(767px) {
      font-size: 2.2857rem;
    }
  }

  h3 {
    font-size: 2.2857rem;
    letter-spacing: -0.8px;
    margin-bottom: 20px;
    color: $secondary;

    @include max-width(767px) {
      font-size: 1.7143rem;
    }
  }

  img {
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
