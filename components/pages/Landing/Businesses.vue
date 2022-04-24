<template lang="pug">
.xp-landing-businesses
  XMBusinessesHeader
  XMBusinessesBusinessList
  XMBusinessesSpecialisedHome
  XMBusinessesPlans
  XMBusinessesDiscover
  XMBusinessesSupercharge
  XMBusinessesPromote
  XMBusinessesTestimonials
  XMBusinessesBenefits
  XMBusinessesBusinessGrow
  XMBusinessesActivateBusiness
  XMBusinessesAnyQuestions
</template>

<script>
import XMBusinessesHeader from '~/components/molecules/Businesses/Header'
import XMBusinessesBusinessList from '~/components/molecules/Businesses/BusinessList'
import XMBusinessesSpecialisedHome from '~/components/molecules/Businesses/SpecialisedHome'
import XMBusinessesPlans from '~/components/molecules/Businesses/Plans'
import XMBusinessesDiscover from '~/components/molecules/Businesses/Discover'
import XMBusinessesSupercharge from '~/components/molecules/Businesses/Supercharge'
import XMBusinessesPromote from '~/components/molecules/Businesses/Promote'
import XMBusinessesTestimonials from '~/components/molecules/Businesses/Testimonials'
import XMBusinessesBenefits from '~/components/molecules/Businesses/Benefits'
import XMBusinessesBusinessGrow from '~/components/molecules/Businesses/BusinessGrow'
import XMBusinessesActivateBusiness from '~/components/molecules/Businesses/ActivateBusiness'
import XMBusinessesAnyQuestions from '~/components/molecules/Businesses/AnyQuestions'

export default {
  components: {
    XMBusinessesHeader,
    XMBusinessesBusinessList,
    XMBusinessesSpecialisedHome,
    XMBusinessesPlans,
    XMBusinessesDiscover,
    XMBusinessesSupercharge,
    XMBusinessesPromote,
    XMBusinessesTestimonials,
    XMBusinessesBenefits,
    XMBusinessesBusinessGrow,
    XMBusinessesActivateBusiness,
    XMBusinessesAnyQuestions,
  },
}
</script>

<style lang="scss" scoped>
.xp-landing-businesses::v-deep {
  background-color: $white;

  h1 {
    font-size: 2.8571rem;
    line-height: 3.5714rem;
  }

  h2 {
    font-size: 2.2857rem;
    line-height: 2.8571rem;
  }

  h3 {
    font-size: 1.7143rem;
    line-height: 2.2857rem;
  }

  img {
    image-rendering: auto;
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 2.2857rem;
      line-height: 2.8571rem;
    }

    h2 {
      font-size: 1.5714rem;
      line-height: 2.2857rem;
    }

    h3 {
      font-size: 1.5714rem;
      line-height: 2.2857rem;
    }
  }
}
</style>
