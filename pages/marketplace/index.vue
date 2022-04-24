<template lang="pug">
XPMarketPlaceIndex(:categories="categories")
</template>

<script>
import meta from '~/mixins/meta'
import XPMarketPlaceIndex from '~/components/pages/MarketPlace/Index'

export default {
  components: { XPMarketPlaceIndex },
  mixins: [meta],
  async asyncData({ app }) {
    const { Categories } = await app.$api.getCategories()
    return { categories: Categories }
  },
  created() {
    this.metaTitle = 'MarketPlace'
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.trackNonLoggedUser({ page: 'MarketPlace Homepage' })
    }
    this.$appClient.segment.trackPageView({ page: 'MarketPlace Homepage' })
  },
}
</script>
