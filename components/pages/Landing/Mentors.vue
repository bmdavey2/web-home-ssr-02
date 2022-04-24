<template lang="pug">
.page-content
  XMMentorBanner
  XMMentorWhatisMentor
  XMMentorLevels
  XMMentorBenefits
  XMMentorCategories
  XMMentorPotentialMentor
  XMMentorApply
  XMBecomeMentor
  XMMentorDescription
  XMMentorApplication
  XOFooter
</template>

<script>
import XMMentorBanner from '~/components/molecules/Mentors/Banner'
import XMMentorWhatisMentor from '~/components/molecules/Mentors/WhatIsMentor'
import XMMentorLevels from '~/components/molecules/Mentors/Levels'
import XMMentorBenefits from '~/components/molecules/Mentors/Benefits'
import XMMentorCategories from '~/components/molecules/Mentors/Categories'
import XMMentorPotentialMentor from '~/components/molecules/Mentors/PotentialMentor'
import XMMentorApply from '~/components/molecules/Mentors/Apply'
import XMBecomeMentor from '~/components/molecules/Mentors/BecomeMentor'
import XMMentorDescription from '~/components/molecules/Mentors/Description'
import XMMentorApplication from '~/components/molecules/Mentors/Application'
import XOFooter from '~/components/organisms/Footer'

export default {
  name: 'XPLandingMentors',
  components: {
    XOFooter,
    XMMentorApplication,
    XMMentorDescription,
    XMBecomeMentor,
    XMMentorApply,
    XMMentorPotentialMentor,
    XMMentorCategories,
    XMMentorBenefits,
    XMMentorLevels,
    XMMentorWhatisMentor,
    XMMentorBanner,
  },
}
</script>

<style lang="scss" scoped>
.page-content::v-deep {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #fff;

  h2 {
    font-family: $secondary-font;
    font-size: 3rem;
    color: $primary;
  }
}
</style>
