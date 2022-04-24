<template lang="pug">
.xm-articles-category-list
  template(v-if="articles.length > 0")
    XMArticlesItem(v-for="(article, index) in articles", :article="article", :key="index")
  template(v-else): XANoResultFound
</template>

<script>
import XMArticlesItem from '~/components/molecules/Articles/Item'
import XANoResultFound from '~/components/atoms/NoResultFound'

export default {
  name: 'XMArticlesCategoryList',
  components: { XMArticlesItem, XANoResultFound },
  props: {
    articles: Array,
  },
}
</script>

<style lang="scss" scoped>
.xm-articles-category-list::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .xm-articles-item {
    width: calc(100% / 3 - 20px);
    margin-bottom: 50px;
  }

  &::after {
    content: '';
    width: calc(100% / 3 - 20px);
  }

  .no-results-found {
    width: 100%;
  }

  @media screen and (max-width: 767px) {
    .xm-articles-item {
      width: 100%;
      flex-direction: row;
      margin-bottom: 10px;

      .cover-photo {
        width: 40%;
        height: 120px;
      }

      .contents {
        padding-left: 10px;

        .aggregates {
          order: 2;
          font-size: 0.8571rem;
        }

        h2 {
          order: 1;
          font-size: 1rem;
        }

        .description {
          display: none;
        }

        .user-details {
          order: 3;
          font-size: 0.8571rem;
        }
      }
    }
  }
}
</style>
