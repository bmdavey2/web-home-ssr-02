<template lang="pug">
XPPrivacy
</template>

<script>
import meta from '~/mixins/meta'
import XPPrivacy from '~/components/pages/Privacy'
export default {
  components: { XPPrivacy },
  mixins: [meta],
  created() {
    this.metaTitle = 'Privacy Policy'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Privacy Policy' })
  },
}
</script>
