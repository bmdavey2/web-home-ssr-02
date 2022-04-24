<template lang="pug">
.xm-plans-pricing-list-content
  XMPlansPricingListContentBrandAndMarketing
  XMPlansPricingListContentBusinessService
  XMPlansPricingListContentMarketPlace
</template>

<script>
import XMPlansPricingListContentBrandAndMarketing from '~/components/molecules/PlansPricing/ListContent/BrandAndMarketing'
import XMPlansPricingListContentBusinessService from '~/components/molecules/PlansPricing/ListContent/BusinessService'
import XMPlansPricingListContentMarketPlace from '~/components/molecules/PlansPricing/ListContent/MarketPlace'

export default {
  name: 'XMPlansPricingListContent',
  components: {
    XMPlansPricingListContentBrandAndMarketing,
    XMPlansPricingListContentBusinessService,
    XMPlansPricingListContentMarketPlace,
  },
}
</script>
