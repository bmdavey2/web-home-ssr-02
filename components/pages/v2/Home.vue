<template lang="pug">
.xp-home
  LazyHydrate(never): XOHomeSection01
  .after-banner-container
    .after-banner-section
      LazyHydrate(never): XOHomeSection02
      XOHomeSection03(v-if="upcomingEvent")
      XOHomeSection04
  LazyHydrate(:when-visible="{ rootMargin: '700px' }"): XOHomeSection05
  LazyHydrate(never): XOHomeSection06
  LazyHydrate(:when-visible="{ rootMargin: '700px' }"): XOHomeSection07
  LazyHydrate(never): XOHomeSection08
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import XOHomeSection01 from '~/components/organisms/v2/Home/Section01'
import XOHomeSection02 from '~/components/organisms/v2/Home/Section02'
import XOHomeSection03 from '~/components/organisms/v2/Home/Section03'
import XOHomeSection04 from '~/components/organisms/v2/Home/Section04'
import XOHomeSection05 from '~/components/organisms/v2/Home/Section05'
import XOHomeSection06 from '~/components/organisms/v2/Home/Section06'
import XOHomeSection07 from '~/components/organisms/v2/Home/Section07'
import XOHomeSection08 from '~/components/organisms/v2/Home/Section08'

export default {
  name: 'XPHome',
  components: {
    LazyHydrate,
    XOHomeSection01,
    XOHomeSection02,
    XOHomeSection03,
    XOHomeSection04,
    XOHomeSection05,
    XOHomeSection06,
    XOHomeSection07,
    XOHomeSection08,
  },
  data() {
    return {
      upcomingEvent: null,
    }
  },
  mounted() {
    this.doRetrieveUpcomingEvents()
  },
  methods: {
    async doRetrieveUpcomingEvents() {
      try {
        const params = {
          coverPhotoSize: '1200',
        }

        const { getHomepagePopularAndUpcomingProduct } = await this.$api.getHomepagePopularAndUpcomingProduct(params)
        this.upcomingEvent = getHomepagePopularAndUpcomingProduct
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-home::v-deep {
  color: $white;

  h1,
  h2 {
    font-size: 5rem;
    line-height: 1.15;
    letter-spacing: -2.1px;

    @include max-width(1215px) {
      font-size: 2.8571rem;
      line-height: 1.4;
    }

    @include max-width(767px) {
      font-size: 2.2857rem;
    }
  }

  h3 {
    font-size: 2.2857rem;
    line-height: 1.26;

    @include max-width(767px) {
      font-size: 1.7143rem;
      line-height: 1.42;
    }
  }

  h4 {
    font-size: 1.5714rem;
    line-height: 1.82;
    letter-spacing: -0.66px;

    @include max-width(767px) {
      font-size: 1.1429rem;
    }
  }

  .after-banner-container {
    background-color: #08252c;

    .after-banner-section {
      position: relative;
      top: -100px;
      z-index: 4;

      @include max-width(767px) {
        top: -80px;
      }
    }
  }

  img {
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
