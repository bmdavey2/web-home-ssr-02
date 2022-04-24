<template lang="pug">
XPSearch
</template>
<script>
import meta from '~/mixins/meta'
import XPSearch from '~/components/pages/Search'
export default {
  components: { XPSearch },
  mixins: [meta],
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Search' })
  },
  created() {
    this.metaTitle = 'Search'
  },
}
</script>
