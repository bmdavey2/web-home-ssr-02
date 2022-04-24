<template lang="pug">
.xp-medals-past
  XOMedalsPastBanner
  .details-results-container
    ._content
      XOMedalsPastDetails
      XOMedalsPastResults(:distances="distances")
  XOMedalsSponsors
</template>

<script>
import XOMedalsPastBanner from '~/components/organisms/Medals/Past/Banner'
import XOMedalsPastDetails from '~/components/organisms/Medals/Past/Details'
import XOMedalsPastResults from '~/components/organisms/Medals/Past/Results'
import XOMedalsSponsors from '~/components/organisms/Medals/Sponsors'

export default {
  name: 'XPMedalsPast',
  components: { XOMedalsPastBanner, XOMedalsPastDetails, XOMedalsPastResults, XOMedalsSponsors },
  computed: {
    eventDetails() {
      return this.$parent?.MedalDetails || null
    },
    distances() {
      return this.eventDetails?.Product?.Distance || []
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-medals-past::v-deep {
  .details-results-container {
    background-image: url('~assets/images/Medals/bg-details.webp');
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    z-index: 2;

    > ._content {
      position: relative;
      top: -180px;
    }
  }

  .xo-medals-sponsors {
    margin-top: -100px;
  }
}
</style>
