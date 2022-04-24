<template lang="pug">
.xo-home-section-04
  LazyHydrate(when-idle)
    .container.is-max-widescreen
      XMProductSlider(v-for="(category, index) in categories", :key="index", :category="category")
      nuxt-link.explore-more-events.row.items-center.justify-between(to="/marketplace")
        ._label Explore more events
        ._icon: b-icon(icon="chevron-right")
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import XMProductSlider from '~/components/molecules/v2/ProductSlider'

export default {
  name: 'XOHomeSection04',
  components: { LazyHydrate, XMProductSlider },
  data() {
    return {
      categories: ['Running', 'Cycling', 'Triathlon', 'Swimming'],
    }
  },
}
</script>

<style lang="scss" scoped>
.xo-home-section-04::v-deep {
  .explore-more-events {
    border: 1px solid #1c3e45;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    color: $white;
    font-size: 22px;
    line-height: 1.55;
    letter-spacing: -0.66px;
    padding: 10px 20px;
  }
}
</style>
