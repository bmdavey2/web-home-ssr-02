<template lang="pug">
.featured-article
  .featured-article-loader(v-if="isRetrieving")
    .loader-container(v-for="n in 3", :key="n")
      XOArticleIndexLoader
  template(v-else)
    XOArticleIndexArticle(v-for="(article, index) in articles", :key="index", :article="article")
</template>

<script>
import XOArticleIndexLoader from '~/components/organisms/Article/Index/ArticleLoader'
import XOArticleIndexArticle from '~/components/organisms/Article/Index/Article'

export default {
  name: 'XOArticleIndexFeaturedArticle',
  components: { XOArticleIndexLoader, XOArticleIndexArticle },
  props: {
    isRetrieving: { type: Boolean, default: true },
  },
  computed: {
    articles() {
      return [
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
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.featured-article::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #c2c8c9;
  padding-bottom: 50px;
  margin-bottom: 50px;

  .featured-article-loader {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    .loader-container {
      width: calc(100% / 3 - 20px);
    }
  }

  .article {
    width: calc(100% / 3 - 20px);

    h3 {
      font-size: 1.5714rem !important;
      line-height: 2rem !important;
    }
  }

  &::after {
    width: calc(100% / 3 - 20px);
    content: '';
    display: block;
  }
}
</style>
