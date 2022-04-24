<template lang="pug">
.xp-businesses-landing
  transition(name="fade"): LazyHydrate(when-idle v-if="showFixedHeader"): XOBusinessesLandingHeader
  LazyHydrate(never): XOBusinessesLandingSection01
  LazyHydrate(never): XOBusinessesLandingSection02
  LazyHydrate(:when-visible="{ rootMargin: '1000px' }"): XOBusinessesLandingSection03
  LazyHydrate(never): XOBusinessLandingMore
  LazyHydrate(when-idle): XOBusinessCustomerSaying
  LazyHydrate(never): XOBusinessSimplyComparison
  LazyHydrate(never): XOBusinessHowitWorks
  LazyHydrate(never): XOBusinessesLandingSection08
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import XOBusinessesLandingHeader from '~/components/organisms/v2/Businesses/Landing/Header'
import XOBusinessesLandingSection01 from '~/components/organisms/v2/Businesses/Landing/Section01'
import XOBusinessesLandingSection02 from '~/components/organisms/v2/Businesses/Landing/Section02'
import XOBusinessesLandingSection03 from '~/components/organisms/v2/Businesses/Landing/Section03'
import XOBusinessLandingMore from '~/components/organisms/v2/Businesses/Landing/Morethan'
import XOBusinessCustomerSaying from '~/components/organisms/v2/Businesses/Landing/CustomerSaying'
import XOBusinessSimplyComparison from '~/components/organisms/v2/Businesses/Landing/SimplyComparison'
import XOBusinessHowitWorks from '~/components/organisms/v2/Businesses/Landing/HowitWorks'
import XOBusinessesLandingSection08 from '~/components/organisms/v2/Businesses/Landing/Section08'

export default {
  name: 'XPBusinessLanding',
  components: {
    LazyHydrate,
    XOBusinessesLandingHeader,
    XOBusinessesLandingSection01,
    XOBusinessesLandingSection02,
    XOBusinessesLandingSection03,
    XOBusinessCustomerSaying,
    XOBusinessSimplyComparison,
    XOBusinessLandingMore,
    XOBusinessHowitWorks,
    XOBusinessesLandingSection08,
  },
  data() {
    return {
      showFixedHeader: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.doShowFixedMenu)
  },
  methods: {
    doShowFixedMenu() {
      const scrollPosition = window.top.scrollY
      if (scrollPosition >= 90) {
        this.showFixedHeader = true
        return
      }
      this.showFixedHeader = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-businesses-landing::v-deep {
  color: $white;

  h1,
  h2 {
    font-size: 5rem;
    line-height: 1.15;
    letter-spacing: -2.1px;

    @include max-width(1023px) {
      font-size: 2.8571rem;
      line-height: 1.41;
    }

    @include max-width(767px) {
      font-size: 2.2857rem;
      line-height: 1.41;
    }
  }

  h3 {
    font-size: 2.2857rem;
    line-height: 1.2;
    letter-spacing: -0.8px;

    @include max-width(767px) {
      font-size: 1.7143rem;
      line-height: 2.4286rem;
    }
  }

  h4 {
    font-size: 1.5714rem;
    line-height: 1.82;
    letter-spacing: -0.66px;

    @include max-width(1023px) {
      font-size: 1.1429rem;
      line-height: 1.75;
    }
  }

  img {
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
