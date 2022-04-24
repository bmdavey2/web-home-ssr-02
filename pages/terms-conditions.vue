<template lang="pug">
XPTerms
</template>

<script>
import meta from '~/mixins/meta'
import XPTerms from '~/components/pages/Terms'
export default {
  components: { XPTerms },
  mixins: [meta],
  created() {
    this.metaTitle = 'Terms + Conditions'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Terms + Conditions' })
  },
}
</script>
