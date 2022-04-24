<template lang="pug">
.xm-marketplace-category-filter-global.action
  .value(@click.prevent="doShowAllFiltersModal()") Filter
</template>

<script>
import XMMarketPlaceAllFilters from '~/components/molecules/MarketPlace/AllFilters'
export default {
  name: 'XMMarketPlaceCategoryFilterGlobal',
  components: { XMMarketPlaceAllFilters },
  methods: {
    doShowAllFiltersModal() {
      this.$buefy.modal.open({
        parent: this,
        component: XMMarketPlaceAllFilters,
        fullScreen: true,
        canCancel: false,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-filter-global::v-deep {
  display: none;

  @media screen and (max-width: 767px) {
    display: block;
  }
}
</style>
