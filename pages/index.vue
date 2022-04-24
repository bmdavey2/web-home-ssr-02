<template lang="pug">
//- XPNewHomePage
XPHome
</template>

<script>
import meta from '~/mixins/meta'
import XPNewHomePage from '~/components/pages/NewHomePage'
import XPHome from '~/components/pages/v2/Home.vue'

export default {
  components: { XPNewHomePage, XPHome },
  mixins: [meta],
  layout: 'v2/default',
  watch: {
    isLoggedIn(value) {
      if (!value) {
        this.$store.commit('app/clearCurrentBusiness')
      }
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$store.commit('app/clearCurrentBusiness')
      this.trackNonLoggedUser({ page: 'Welcome' })
    }
    this.$appClient.segment.trackPageView({ page: 'Welcome' })
    this.getAllExternalLinks()
  },
  created() {
    this.metaTitle = `The World's Active Community`
  },
}
</script>
