<template lang="pug">
.xm-marketplace-index-breadcrumb
  .container.is-max-widescreen
    nuxt-link(to="/") Home
    nuxt-link(to="/marketplace" exact) MarketPlace
</template>

<script>
export default {
  name: 'XMMarketPlaceIndexBreadcrumb',
}
</script>

<style lang="scss" scoped>
.xm-marketplace-index-breadcrumb::v-deep {
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
          color: $secondary;
          display: block;
          margin: 0 10px;
          font-weight: 400;
        }
      }

      &.active {
        color: $secondary;
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
