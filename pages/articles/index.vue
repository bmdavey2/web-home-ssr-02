<template lang="pug">
XPArticlesIndex
</template>

<script>
import meta from '~/mixins/meta'
import XPArticlesIndex from '~/components/pages/Articles/Index'

export default {
  components: { XPArticlesIndex },
  mixins: [meta],
  asyncData({ app }) {
    app.$app.setPageLoader()
  },
  mounted() {
    this.getAllExternalLinks()
    if (!this.isLoggedIn) {
      this.trackNonLoggedUser({ page: 'Discover' })
    }
    this.$appClient.segment.trackPageView({ page: 'Articles' })
  },
  created() {
    this.metaTitle = 'Articles'
  },
}
</script>
