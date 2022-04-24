<template lang="pug">
.featured-article-slider(v-if="!isRetrieving")
  vue-slick-carousel(v-bind="sliderSettings" ref="carousel")
    .slide-item(v-for="(article, index) in articles.slice(1)", :key="index")
      XOArticleIndexArticle(:article="article")
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import XOArticleIndexArticle from '~/components/organisms/Article/Index/Article'

export default {
  name: 'XOArticleIndexFeatureArticleSlider',
  components: {
    XOArticleIndexArticle,
    VueSlickCarousel,
  },
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
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '30px',
      }

      return sliderSettings
    },
  },
}
</script>

<style lang="scss" scoped>
.featured-article-slider::v-deep {
  padding-bottom: 50px;
  margin-bottom: 50px;
  border-bottom: 1px solid #c2c8c9;

  .slick-slider {
    .slick-list {
      padding: 0 1% 0 0 !important;

      .slick-slide {
        .slide-item {
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
