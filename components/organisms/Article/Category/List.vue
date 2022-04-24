<template lang="pug">
.article-list
  .list-loader(v-if="isRetrieving")
    .loader-container(v-for="n in 3", :key="n")
      XOArticleIndexLoader(is-mobile-column)
  template(v-else)
    template(v-if="articles.length > 0")
      .list-container
        XOArticleIndexArticle(v-for="(article, index) in articles", :key="index", :article="article" is-mobile-column)
      .show-more(v-if="showMore")
        b-button(
          label="Show more"
          type="is-primary",
          :loading="isRetrievingMoreArticles"
          outlined
          @click.prevent="doShowMoreArticles()")
    XANoResultFound(v-else)
</template>

<script>
import XOArticleIndexLoader from '~/components/organisms/Article/Index/ArticleLoader'
import XOArticleIndexArticle from '~/components/organisms/Article/Index/Article'
import XANoResultFound from '~/components/atoms/NoResultFound'

export default {
  name: 'XOArticleCategoryList',
  components: { XANoResultFound, XOArticleIndexArticle, XOArticleIndexLoader },
  props: {
    selectedCategories: { type: Array, default: null },
    sortBy: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      articles: [
        {
          Aggregates: { views: 1 },
          Business: null,
          Categories: [{ id: 'combat-sports', name: 'Combat Sports' }],
          FeedItem: { Aggregates: { likes: 3 }, actorType: 'Member' },
          Member: { id: '60b45db71cafdb5745dd0170', name: 'Trevor Philips', slug: 'tphilips2', Mentor: null },
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          coverPhotoURL:
            'https://firebasestorage.googleapis.com/v0/b/activeplace-staging.appspot.com/o/photos%2F745b0a3a-cf75-443d-a190-ebb18cebeabc.jpg?alt=media',
          createdAt: 1623404345758,
          excerpt:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit ame',
          id: '60c32f3987e5570010b03f0b',
          slug: 'test-article-for-notifications-grouping',
          title: 'Test article for notifications grouping',
        },
        {
          Aggregates: { views: 1 },
          Business: null,
          Categories: [{ id: 'combat-sports', name: 'Combat Sports' }],
          FeedItem: { Aggregates: { likes: 3 }, actorType: 'Member' },
          Member: { id: '60b45db71cafdb5745dd0170', name: 'Trevor Philips', slug: 'tphilips2', Mentor: null },
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          coverPhotoURL:
            'https://firebasestorage.googleapis.com/v0/b/activeplace-staging.appspot.com/o/photos%2F745b0a3a-cf75-443d-a190-ebb18cebeabc.jpg?alt=media',
          createdAt: 1623404345758,
          excerpt:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit ame',
          id: '60c32f3987e5570010b03f0b',
          slug: 'test-article-for-notifications-grouping',
          title: 'Test article for notifications grouping',
        },
        {
          Aggregates: { views: 1 },
          Business: null,
          Categories: [{ id: 'combat-sports', name: 'Combat Sports' }],
          FeedItem: { Aggregates: { likes: 3 }, actorType: 'Member' },
          Member: { id: '60b45db71cafdb5745dd0170', name: 'Trevor Philips', slug: 'tphilips2', Mentor: null },
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          coverPhotoURL:
            'https://firebasestorage.googleapis.com/v0/b/activeplace-staging.appspot.com/o/photos%2F745b0a3a-cf75-443d-a190-ebb18cebeabc.jpg?alt=media',
          createdAt: 1623404345758,
          excerpt:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit ame',
          id: '60c32f3987e5570010b03f0b',
          slug: 'test-article-for-notifications-grouping',
          title: 'Test article for notifications grouping',
        },
      ],
      isRetrieving: false,
      isRetrievingMoreArticles: false,
      offset: 0,
      showMore: true,
    }
  },
  watch: {
    selectedCategories() {
      this.doRetrieveArticles()
    },
    sortBy() {
      this.doRetrieveArticles()
    },
  },
  methods: {
    async doRetrieveArticles() {
      await alert('sort')
    },
    async doShowMoreArticles() {
      await alert('show more')
    },
  },
}
</script>

<style lang="scss" scoped>
.article-list::v-deep {
  .list-loader {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    .loader-container {
      width: calc(100% / 3 - 20px);
      margin-bottom: 50px;
    }
  }

  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &::after {
      content: '';
      width: calc(100% / 3 - 20px);
    }

    .article {
      width: calc(100% / 3 - 20px);
      margin-bottom: 50px;
      min-height: 0;

      h3 {
        font-size: 1.5714rem !important;
        line-height: 2.2857rem !important;
      }
    }
  }

  .show-more {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media screen and (max-width: 767px) {
    .list-loader {
      .loader-container {
        width: calc(100% / 2 - 20px);
      }
    }

    .list-container {
      .article {
        width: calc(50% - 20px);
      }
    }
  }

  @media screen and (max-width: 427px) {
    .list-loader {
      .loader-container {
        width: 100%;
        margin-bottom: 20px;
      }
    }

    .list-container {
      .article {
        width: 100%;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
