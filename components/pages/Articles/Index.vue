<template lang="pug">
.xp-articles-index
  .container.py-6
    XMArticlesIndexFeatured
    XMArticlesArticleSlider(v-for="(category, index) in categories", :category="category", :key="index")
</template>

<script>
import gql from 'graphql-tag'
import XMArticlesIndexFeatured from '~/components/molecules/Articles/Index/Featured'
import XMArticlesArticleSlider from '~/components/molecules/Articles/ArticleSlider'

export default {
  name: 'XPArticlesIndex',
  components: {
    XMArticlesIndexFeatured,
    XMArticlesArticleSlider,
  },
  data() {
    return {
      categories: [],
    }
  },
  mounted() {
    this.doRetrieveCategories()
  },
  methods: {
    async doRetrieveCategories() {
      const { data } = await this.$apollo.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            Categories {
              id
              name
            }
          }
        `,
      })

      this.categories = data?.Categories
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-articles-index::v-deep {
  background-color: $white;

  .xm-articles-article-slider {
    margin-bottom: 100px;
  }

  @media screen and (max-width: 767px) {
    .xm-articles-article-slider {
      margin-bottom: 20px;
    }
  }
}
</style>
