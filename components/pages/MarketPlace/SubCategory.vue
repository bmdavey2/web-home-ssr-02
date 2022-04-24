<template lang="pug">
.xp-marketplace-sub-category
  XMMarketPlaceSubCategoryBanner
  XMMarketPlaceCategoryFilter
  XMMarketPlaceSubCategoryBreadcrumbs
  .container
    .contents
      .left-content
        XMMarketPlaceCategorySidebar
      .right-content
        XMMarketPlaceSubCategoryList
</template>

<script>
import XMMarketPlaceSubCategoryBanner from '~/components/molecules/MarketPlace/SubCategory/Banner'
import XMMarketPlaceCategoryFilter from '~/components/molecules/MarketPlace/Category/Filter'
import XMMarketPlaceSubCategoryBreadcrumbs from '~/components/molecules/MarketPlace/SubCategory/Breadcrumbs'
import XMMarketPlaceCategorySidebar from '~/components/molecules/MarketPlace/Category/Sidebar'
import XMMarketPlaceSubCategoryList from '~/components/molecules/MarketPlace/SubCategory/List'

export default {
  name: 'XPMarketPlaceSubCategory',
  components: {
    XMMarketPlaceSubCategoryBanner,
    XMMarketPlaceCategoryFilter,
    XMMarketPlaceSubCategoryBreadcrumbs,
    XMMarketPlaceCategorySidebar,
    XMMarketPlaceSubCategoryList,
  },
  props: {
    parentTitle: String,
    title: String,
  },
  beforeCreate() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
}
</script>

<style lang="scss" scoped>
.xp-marketplace-sub-category::v-deep {
  h1 {
    font-size: 3.5714rem;
    line-height: 1.2;
  }

  .contents {
    display: flex;
    flex-wrap: wrap;

    .left-content {
      width: 275px;
    }

    .right-content {
      flex: 10000 1 0;
      padding-left: 20px;
    }
  }

  @media screen and (max-width: 1023px) {
    .contents {
      .left-content {
        display: none;
      }

      .right-content {
        padding-left: 0;
      }
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 2.2857rem;
    }

    .contents {
      margin: 0 -15px;
    }
  }
}
</style>
