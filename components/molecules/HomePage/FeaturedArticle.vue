<template lang="pug">
.article-item(v-view="doSegmentImpression")
  img.lozad(
    :src="coverPhotoURL"
    v-if="coverPhotoURL"
    data-placeholder-background="lightgrey"
    style="object-fit: cover"
    width="473px"
    height="322px")
  img.lozad(
    src="~assets/icons/image-not-loaded.svg"
    data-placeholder-background="lightgrey"
    style="object-fit: cover"
    v-else)
  .mask-gradient
    .feed-categories.mb-5.is-flex.is-flex-wrap-wrap
      XMFeedItemCategories(:item="article")

    .title.has-text-white.is-family-secondary.has-text-weight-light {{ title }}

    a.has-text-white.has-text-weight-light(@click="redirectPage") Read Now
</template>

<script>
import lozad from 'lozad'
import XMFeedItemCategories from '~/components/molecules/FeedItem/Categories'
export default {
  name: 'XMHomeArticle',
  components: { XMFeedItemCategories },
  props: {
    article: Object,
  },
  data() {
    return {
      item: {
        Categories: [
          { id: 'combat-sports', name: 'Combat Sports' },
          { id: 'running', name: 'Running' },
        ],
      },
    }
  },
  computed: {
    coverPhotoURL() {
      return this.article?.coverPhotoURL || null
    },
    title() {
      return this.article?.title || ''
    },
    slug() {
      return this.article?.slug || null
    },
  },
  mounted() {
    const observer = lozad('.lozad', {
      rootMargin: '10px 0px',
      threshold: 0.1,
      enableAutoReload: true,
    })
    observer.observe()
  },
  methods: {
    redirectPage() {
      if (!this.slug) {
        return false
      } else {
        this.$router.push({ path: '/a/' + this.slug })
      }
    },
    doSegmentImpression(e) {
      if (e.scrollPercent === 0) return
      if (this.article) {
        if (e.type === 'exit') {
          this.article.objectType = 'Article'
          this.$appClient.segment.trackArticleImpression(this.article)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.article-item {
  position: relative;
  border-radius: 6px;
  min-width: 473px !important;
  max-width: 473px !important;
  min-height: 322px !important;
  max-height: 322px !important;

  img {
    width: 100%;
    min-height: 322px !important;
    max-height: 322px !important;
    border-radius: 6px;
  }

  .mask-gradient {
    background: linear-gradient(4.88deg, rgba(12, 53, 62, 0.29) 41.66%, rgba(12, 53, 62, 0) 96.91%);
    border-radius: 6px;
    position: absolute;
    top: 0;
    width: 473px !important;
    height: 322px !important;

    .title {
      position: absolute;
      left: 6.77%;
      right: 7.19%;
      top: 64.29%;
      bottom: 16.15%;
      font-size: 22px;
      line-height: 32px;
    }

    a {
      position: absolute;
      right: 20px;
      bottom: 16px;
      font-size: 16px;
      line-height: 20px;
    }

    .feed-categories {
      right: 10px;
      top: 24px;
      position: absolute;
      padding-left: 20px;

      .category {
        display: block;
        background-color: #eef1f1;
        border-radius: 30px;
        padding: 6px 12px;
        text-transform: capitalize;
        font-weight: 300;
        font-size: 0.8571rem;
        color: $secondary;
        line-height: 1;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 1215px) {
  .article-item,
  img,
  .mask-gradient {
    max-width: 400px !important;
  }
}
@media screen and (max-width: 891px) {
  .article-item,
  img,
  .mask-gradient {
    max-width: 345px !important;
  }
}

@media screen and (max-width: 767px) {
  .article-item,
  img,
  .mask-gradient {
    max-width: 473px !important;
  }
}

@media (max-width: '547px') {
  .article-item {
    min-width: 293px !important;
    min-height: 200px !important;
    max-width: 293px !important;
    max-height: 200px !important;

    img {
      max-width: 293px !important;
      max-height: 200px !important;
      min-height: 200px !important;
    }
    .mask-gradient {
      max-width: 293px !important;
      max-height: 200px !important;

      .title {
        font-size: 18px;
        line-height: 22px;
      }

      a {
        font-size: 14px;
        line-height: 20px;
      }

      .feed-categories {
        top: 5px;
      }
    }
  }
}
</style>
