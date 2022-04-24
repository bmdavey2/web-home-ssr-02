<template lang="pug">
.xm-marketplace-category-breadcrumbs
  .container
    nuxt-link(to="/" exact) Home
    nuxt-link(to="/marketplace" exact) MarketPlace
    nuxt-link(:to="$route.fullPath" exact) {{ $parent.title }}
</template>

<script>
export default {
  name: 'XMMarketPlaceCategoryBreadcrumbs',
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-breadcrumbs::v-deep {
  padding: 20px 0;
  margin-bottom: 10px;

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    a {
      color: #65676b;
      font-weight: 300;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &:not(:last-child) {
        &::after {
          content: '>';
          display: block;
          margin: 0 10px;
        }
      }

      &.active {
        color: $secondary;
      }
    }
  }
}
</style>
