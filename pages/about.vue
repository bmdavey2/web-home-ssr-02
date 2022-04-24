<template lang="pug">
XPAbout
</template>

<script>
import meta from '~/mixins/meta'
import XPAbout from '~/components/pages/About'
export default {
  components: { XPAbout },
  mixins: [meta],
  created() {
    this.metaTitle = 'About'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'About' })
  },
}
</script>
