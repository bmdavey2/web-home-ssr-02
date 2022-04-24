<template lang="pug">
.xm-articles-category-breadcrumbs
  nuxt-link(to="/discover") Home Articles
  nuxt-link(:to="$route.fullPath") {{ title }} Articles
</template>

<script>
export default {
  name: 'XMArticlesCategoryBreadcrumbs',
  computed: {
    title() {
      return this.$parent?.title || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-articles-category-breadcrumbs::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 30px;

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
}
</style>
