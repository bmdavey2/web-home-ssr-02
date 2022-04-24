<template lang="pug">
.xm-marketplace-sub-category-banner(:class="`${bannerFileName}`")
  img(:src="require(`~/assets/images/MarketPlace/Category/${bannerFileName}.webp`)")
  h1 {{ $parent.title }}
</template>

<script>
export default {
  name: 'XMMarketPlaceSubCategoryBanner',
  computed: {
    bannerFileName() {
      return this.$route.params?.category
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-sub-category-banner::v-deep {
  width: 100%;
  min-height: 200px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  &.general-wellness,
  &.running {
    img {
      object-position: bottom;
    }
  }

  &.swimming {
    img {
      object-position: top;
    }
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
  }

  h1 {
    position: relative;
    z-index: 2;
    color: $white;
    text-align: center;
  }
}
</style>
