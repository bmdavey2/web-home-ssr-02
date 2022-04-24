<template lang="pug">
XPLandingBusinesses
</template>

<script>
import meta from '~/mixins/meta'
// import XPLandingBusinesses from '~/components/pages/Landing/Businesses'
import XPLandingBusinesses from '~/components/pages/v2/Businesses/Landing'
export default {
  components: { XPLandingBusinesses },
  mixins: [meta],
  created() {
    this.metaTitle = 'Businesses'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Businesses' })
  },
}
</script>
