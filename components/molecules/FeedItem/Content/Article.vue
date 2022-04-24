<template lang="pug">
.xm-feed-item-content-article.py-4
  nuxt-link(:to="`/a/${slug}`"): img(
    :src="coverPhotoURL"
    style="display: block; object-fit: cover; max-height: 528px; object-position: center; width: 100%")
  .flex
    .flex-grow
    .flex-auto
      .content-tag.flex-center.px-2.py-1(
        style="box-shadow: 0 0 8px rgba(0, 0, 0, 0.15); border-radius: 0 0 6px 6px; background: #f85454; color: white")
        img.mr-1(src="~assets/icons/articles-white.svg" style="width: 12px; height: 12px" loading="lazy")
        span(style="font-size: 12px") Article
  h2.article-title: nuxt-link(:to="`/a/${slug}`") {{ title }}
  .article-excerpt.my-4(style="font-weight: 300; font-size: 14px; word-break: break-word") {{ excerpt }}
</template>

<script>
export default {
  name: 'XMFeedItemContentArticle',
  props: {
    value: Object,
  },
  computed: {
    title() {
      return this.value?.title ? this.value?.title.replace(/&amp;/g, 'and') : ''
    },
    slug() {
      return this.value?.slug || ''
    },
    excerpt() {
      return this.value?.excerpt ? this.value?.excerpt.replace(/&amp;/g, 'and') : ''
    },
    coverPhotoURL() {
      return this.value?.coverPhotoURL || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-feed-item-content-article::v-deep {
  h2 {
    font-size: 2rem;
    font-family: 'Georgia', sans-serif;

    a {
      color: inherit;
    }
  }
}
</style>
