<template lang="pug">
.xm-plans-pricing-list
  h1.has-text-centered Plans and Pricing
  // TODO activate this when subscription is ready
  .choose-a-plan
    ._title Choose your Plan
    .plans
      .plan(
        v-for="(plan, index) in plans",
        :class="activePlan.value === plan.value && 'active'"
        @click.prevent="doSelectActivePlan(plan)") {{ plan.label }}
  .plans-table
    XMPlansPricingListHeader(:active-plan="activePlan", :subscription-plans="subscriptionPlans")
    XMPlansPricingListContent
    XMPlansPricingListFooter
</template>

<script>
import XMPlansPricingListHeader from '~/components/molecules/PlansPricing/ListHeader'
import XMPlansPricingListContent from '~/components/molecules/PlansPricing/ListContent'
import XMPlansPricingListFooter from '~/components/molecules/PlansPricing/ListFooter'

export default {
  name: 'XMPlansPricingList',
  components: { XMPlansPricingListHeader, XMPlansPricingListContent, XMPlansPricingListFooter },
  props: {
    subscriptionPlans: Array,
  },
  data() {
    return {
      activePlan: { label: 'Annual', value: 'year' },
      plans: [
        { label: 'Monthly', value: 'month' },
        { label: 'Annual', value: 'year' },
      ],
    }
  },
  mounted() {
    this.$emit('DoSelectActivePlan', this.activePlan)
  },
  methods: {
    doSelectActivePlan(plan) {
      this.activePlan = plan
      this.$emit('DoSelectActivePlan', this.activePlan)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-list::v-deep {
  h1 {
    margin-bottom: 30px;
  }

  .choose-a-plan {
    text-align: center;
    margin-bottom: 30px;

    ._title {
      text-transform: uppercase;
      color: $black;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .plans {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .plan {
        text-transform: uppercase;
        color: #65676b;
        margin: 0 15px;
        cursor: pointer;
        border-bottom: 2px solid transparent;

        &.active {
          color: $secondary;
          border-color: $secondary;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .plans-table {
      display: none;
    }
  }
}
</style>
