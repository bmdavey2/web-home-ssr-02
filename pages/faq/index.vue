<template lang="pug">
XPFAQ
</template>

<script>
import meta from '~/mixins/meta'
import XPFAQ from '~/components/pages/FAQ'

export default {
  components: { XPFAQ },
  mixins: [meta],
  created() {
    this.metaTitle = 'FAQ'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'FAQ' })
  },
}
</script>
