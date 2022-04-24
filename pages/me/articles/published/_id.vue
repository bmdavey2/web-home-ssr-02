<template lang="pug">
client-only
  XPArticleCreate(:categories="categories" status="Published")
</template>

<script>
import gql from 'graphql-tag'
import XPArticleCreate from '~/components/pages/ArticleCreate'

export default {
  components: { XPArticleCreate },
  middleware: ['registeredOnly'],
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
}
</script>
