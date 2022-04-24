<template lang="pug">
.xp-marketplace-index
  XMMarketPlaceIndexBanner
  XMMarketPlaceIndexBreadcrumb
  .container.is-max-widescreen
    XMMarketPlaceProductSlider(
      v-for="(category, index) in categories",
      :category="category.name",
      :key="index"
      has-tag)
    h1.browse-title Browse by type
    XMMarketPlaceProductSlider(type="Event")
    XMMarketPlaceProductSlider(type="Experience")
    //- XMMarketPlaceProductSlider(type="Active Program")
</template>

<script>
import XMMarketPlaceIndexBanner from '~/components/molecules/MarketPlace/Index/Banner'
import XMMarketPlaceIndexBreadcrumb from '~/components/molecules/MarketPlace/Index/Breadcrumb'
import XMMarketPlaceProductSlider from '~/components/molecules/MarketPlace/ProductSlider'

export default {
  name: 'XPMarketPlaceIndex',
  components: { XMMarketPlaceIndexBanner, XMMarketPlaceIndexBreadcrumb, XMMarketPlaceProductSlider },
  props: {
    categories: Array,
  },
}
</script>

<style lang="scss" scoped>
.xp-marketplace-index::v-deep {
  min-height: calc(100vh - 533px);

  h1 {
    font-size: 2.8571rem;
    line-height: 1.2;

    &.browse-title {
      font-size: 2.2857rem;
      margin-top: 70px;
      margin-bottom: 30px;
      color: $secondary;
    }
  }

  h2 {
    font-size: 2rem;
    line-height: 1.2;
  }

  .separator {
    border-bottom: 1px solid #c2c8c9;
    display: block;
    width: 100%;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 767px) {
    h2 {
      font-size: 1.5714rem;
    }
  }
}
</style>
