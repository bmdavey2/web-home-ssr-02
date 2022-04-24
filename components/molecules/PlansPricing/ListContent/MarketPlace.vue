<template lang="pug">
.xm-plans-pricing-list-content-marketplace(:class="isAccordion && 'is-accordion'")
  .section-title(@click.prevent="doChangeActiveContent()" ref="sectionTitle")
    .value 3. Marketplace
    .title-icon
      img.active(
        src="~assets/images/PlansPricing/chevron-up.png"
        width="24"
        height="14"
        v-if="activeContent === 'marketplace'")
      img.inactive(src="~assets/images/PlansPricing/chevron-right.png" width="14" height="24" v-else)
  .list-section(v-if="activeContent === 'marketplace'")
    .content-section
      .has-description
        ._title Products
        .content-row(v-for="(content, index) in products", :key="`${index}-app`")
          ._label
            ._value {{ content.label }}
            b-tooltip(:label="content.tooltip" type="is-light" square multilined): ._icon: img(
              src="~assets/images/PlansPricing/question.png"
              width="16"
              height="16")
          ._content.warm-up-plan(v-if="showWarmUpPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isWarmUpPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
          ._content.starter-plan(v-if="showStarterPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isStarterPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
      .no-description(v-if="!isAccordion")
        ._title
        .content-row: ._content
    .content-section
      .has-description
        ._title Lead Management
        .content-row(v-for="(content, index) in leadManagement", :key="`${index}-app`")
          ._label
            ._value {{ content.label }}
            b-tooltip(:label="content.tooltip" type="is-light" square multilined): ._icon: img(
              src="~assets/images/PlansPricing/question.png"
              width="16"
              height="16")
          ._content.warm-up-plan(v-if="showWarmUpPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isWarmUpPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
          ._content.starter-plan(v-if="showStarterPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isStarterPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
      .no-description(v-if="!isAccordion")
        ._title
        .content-row: ._content
    .content-section
      .has-description
        ._title Search
        .content-row(v-for="(content, index) in search", :key="`${index}-app`")
          ._label
            ._value {{ content.label }}
            b-tooltip(:label="content.tooltip" type="is-light" square multilined): ._icon: img(
              src="~assets/images/PlansPricing/question.png"
              width="16"
              height="16")
          ._content.warm-up-plan(v-if="showWarmUpPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isWarmUpPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
          ._content.starter-plan(v-if="showStarterPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isStarterPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
      .no-description(v-if="!isAccordion")
        ._title
        .content-row: ._content
    .content-section
      .has-description
        ._title Booking & Payments
        .content-row(v-for="(content, index) in bookingAndPayments", :key="`${index}-app`")
          ._label
            ._value {{ content.label }}
            b-tooltip(:label="content.tooltip" type="is-light" square multilined): ._icon: img(
              src="~assets/images/PlansPricing/question.png"
              width="16"
              height="16")
          ._content.warm-up-plan(v-if="showWarmUpPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isWarmUpPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
          ._content.starter-plan(v-if="showStarterPlan")
            img(src="~assets/images/PlansPricing/checked.png" width="24" height="24" v-if="content.isStarterPlan")
            img(src="~assets/images/PlansPricing/line.png" width="12" height="2" v-else)
      .no-description(v-if="!isAccordion")
        ._title
        .content-row: ._content
</template>

<script>
import products from './products.js'
import leadManagement from './lead-management.js'
import search from './search.js'
import bookingAndPayments from './booking-and-payments.js'

export default {
  name: 'XMPlansPricingListContentMarketPlace',
  props: {
    isAccordion: Boolean,
    activeContent: { type: String, default: 'marketplace' },
    showWarmUpPlan: { type: Boolean, default: true },
    showStarterPlan: { type: Boolean, default: true },
  },
  data() {
    return {
      products,
      leadManagement,
      search,
      bookingAndPayments,
    }
  },
  methods: {
    doChangeActiveContent() {
      if (this.activeContent === 'marketplace') {
        this.$emit('DoChangeActiveContent', '')
        return
      }
      this.$emit('DoChangeActiveContent', 'marketplace')
      this.$refs.sectionTitle.scrollIntoView()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-list-content-marketplace::v-deep {
  &.is-accordion {
    .section-title {
      .title-icon {
        display: block !important;
      }
    }

    .list-section {
      .content-section {
        .has-description {
          width: 100% !important;

          .content-row {
            ._label {
              width: 60% !important;
            }

            ._content {
              width: 40% !important;
            }
          }
        }
      }
    }
  }
}
</style>
