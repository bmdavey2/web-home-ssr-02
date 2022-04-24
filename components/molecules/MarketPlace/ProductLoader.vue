<template lang="pug">
.xm-marketplace-product-loader
  .img: b-skeleton(width="100%" height="120px")
  .contents
    b-skeleton(v-for="n in 4", :key="n")
</template>

<script>
export default {
  name: 'XMMarketPlaceProductLoader',
}
</script>

<style lang="scss" scoped>
.xm-marketplace-product-loader::v-deep {
  background-color: $white;

  .img {
    .b-skeleton {
      .b-skeleton-item {
        border-radius: 0;
      }
    }
  }

  .contents {
    padding: 20px;
  }
}
</style>
