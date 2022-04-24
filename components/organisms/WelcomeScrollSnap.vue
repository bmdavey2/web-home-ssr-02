<template lang="pug">
div
  .welcome-container
    .welcome-fp
      .section-fp.page-1
        XMWelcomeFirstSection
      .section-fp.page-2
        XMWelcomeSecondSection
      .section-fp.page-3
        XMWelcomeThirdSection
      .section-fp.page-4
        XMWelcomeFourthSection
      .section-fp.page-5
        XMWelcomeFifthSection
</template>

<script>
import XMWelcomeFirstSection from '~/components/molecules/Welcome/FirstSection'
import XMWelcomeSecondSection from '~/components/molecules/Welcome/SecondSection'
import XMWelcomeThirdSection from '~/components/molecules/Welcome/ThirdSection'
import XMWelcomeFourthSection from '~/components/molecules/Welcome/FourthSection'
import XMWelcomeFifthSection from '~/components/molecules/Welcome/FifthSection'

export default {
  name: 'XOWelcomeScrollSnap',
  components: {
    XMWelcomeFifthSection,
    XMWelcomeFourthSection,
    XMWelcomeThirdSection,
    XMWelcomeSecondSection,
    XMWelcomeFirstSection,
  },
}
</script>

<style lang="scss">
html {
  overflow: hidden;
}

.welcome-fp {
  overflow-y: scroll;
  overflow-x: hidden !important;
  height: 100vh;
  scroll-snap-points-y: repeat(100vh);
  scroll-snap-type: y mandatory;
}

.section-fp {
  scroll-snap-align: start;
  position: relative;
  height: 100vh;
  padding: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &.page-1 {
    background-image: url('~assets/images/Welcome/index-bg-first.jpg');
  }

  &.page-2 {
    background-image: url('~assets/images/Welcome/index-bg-second-app.jpg');
  }

  &.page-3 {
    background-image: url('~assets/images/Welcome/index-bg-second.jpg');
  }

  &.page-4 {
    background-image: url('~assets/images/Welcome/index-bg-third.jpg');
  }

  &.page-5 {
    background-image: url('~assets/images/Welcome/index-bg-last.jpg');
  }

  img {
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
