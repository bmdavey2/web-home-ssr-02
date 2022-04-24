<template lang="pug">
XPTrendingFeed(:categories="categories")
</template>

<script>
import gql from 'graphql-tag'
import meta from '~/mixins/meta'
import XPTrendingFeed from '~/components/pages/TrendingFeed'
export default {
  components: { XPTrendingFeed },
  mixins: [meta],
  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient
    const result = await client.query({
      query: gql`
        query {
          Categories {
            id
            name
            PhotoURL
          }
        }
      `,
    })
    const categories = result.data.Categories
    return { categories }
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.trackNonLoggedUser({ page: 'Trending' })
    }
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Trending' })
  },
  created() {
    this.metaTitle = 'Trending'
  },
}
</script>
