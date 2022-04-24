<template lang="pug">
//- XPDiscover
XPArticlesIndex
</template>

<script>
import meta from '~/mixins/meta'
import XPDiscover from '~/components/pages/Discover'
import XPArticlesIndex from '~/components/pages/Articles/Index'
export default {
  components: { XPDiscover, XPArticlesIndex },
  mixins: [meta],
  asyncData({ app }) {
    app.$app.setPageLoader()
  },
  mounted() {
    this.getAllExternalLinks()
    if (!this.isLoggedIn) {
      this.trackNonLoggedUser({ page: 'Discover' })
    }
    this.$appClient.segment.trackPageView({ page: 'Discover' })
  },
  created() {
    this.metaTitle = 'Discover'
  },
}
</script>
