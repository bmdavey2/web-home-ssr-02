<template lang="pug">
XPMedalsOrderLanding
</template>

<script>
import meta from '~/mixins/meta'
import XPMedalsOrderLanding from '~/components/pages/Medals/Order/Landing'

export default {
  components: { XPMedalsOrderLanding },
  mixins: [meta],
  created() {
    this.metaTitle = 'Digital NFT Medals ordering form'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Digital NFT Medals ordering form' })
  },
}
</script>
