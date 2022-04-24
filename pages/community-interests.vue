<template lang="pug">
XPDiscover
</template>

<script>
import meta from '~/mixins/meta'
import XPDiscover from '~/components/pages/Discover'
export default {
  components: { XPDiscover },
  mixins: [meta],
  middleware: ['registeredOnly'],
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Community Interests' })
  },
  created() {
    this.metaTitle = 'Community Interests'
  },
}
</script>
