<template lang="pug">
.xm-article-view-breadcrumbs
  nuxt-link(to="/discover") Home Articles
  nuxt-link(:to="`/articles/${parentCategory}`" v-if="parentCategory") {{ parentTitle }} Articles
  nuxt-link(:to="`/articles/${parentCategory}/${subCategory}`" v-if="subCategory") {{ subTitle }} Articles
  nuxt-link(:to="$route.fullPath") {{ title }}
</template>

<script>
export default {
  name: 'XMArticleViewBreadcrumbs',
  props: {
    item: Object,
  },
  computed: {
    parentCategory() {
      return this.$store.getters['articles/getArticleParentCategory'] || null
    },
    subCategory() {
      return this.$store.getters['articles/getArticleSubCategory'] || null
    },
    parentTitle() {
      const url = this.parentCategory

      switch (url) {
        case 'outdoor-adventure':
          return 'Outdoor & Adventure'
        case 'health-wellness':
          return 'Health & Wellness'
        case 'health-nutrition':
          return 'Health & Nutrition'
        case 'technology-gear':
          return 'Technology & Gear'
        case 'recovery-injuries':
          return 'Recovery & Injuries'
      }

      const words = url.split('-')
      const wordsUppercase = words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1)
        })
        .join(' ')

      return wordsUppercase
    },
    subTitle() {
      const url = this.subCategory

      switch (url) {
        case 'outdoor-adventure':
          return 'Outdoor & Adventure'
        case 'health-wellness':
          return 'Health & Wellness'
        case 'health-nutrition':
          return 'Health & Nutrition'
        case 'technology-gear':
          return 'Technology & Gear'
        case 'recovery-injuries':
          return 'Recovery & Injuries'
      }

      const words = url.split('-')
      const wordsUppercase = words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1)
        })
        .join(' ')

      return wordsUppercase
    },
    title() {
      return this.item?.title || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-article-view-breadcrumbs::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 50px;

  a {
    font-weight: 300;
    color: #65676b;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &:not(:last-child) {
      &::after {
        content: '';
        width: 5px;
        height: 5px;
        border: 1px solid #65676b;
        border-bottom: 0;
        border-left: 0;
        display: block;
        transform: rotate(45deg);
        margin: 0 8px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
