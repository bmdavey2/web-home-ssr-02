<template lang="pug">
.xm-plans-pricing-list-content-business-service(:class="isAccordion && 'is-accordion'")
  .section-title(@click.prevent="doChangeActiveContent()" ref="sectionTitle")
    .value 2. Business Services
    .title-icon
      img.active(
        src="~assets/images/PlansPricing/chevron-up.png"
        width="24"
        height="14"
        v-if="activeContent === 'business-service'")
      img.inactive(src="~assets/images/PlansPricing/chevron-right.png" width="14" height="24" v-else)
  .list-section(v-if="activeContent === 'business-service'")
    .content-section
      .has-description
        .content-row(v-for="(content, index) in businessServices", :key="`${index}-bs`")
          ._label
            ._value {{ content.label }}
            b-tooltip(:label="content.tooltip" type="is-light" square multilined): ._icon: img(
              src="~assets/images/PlansPricing/question.png"
              width="16"
              height="16")
          ._content.warm-up-plan(v-if="showWarmUpPlan") {{ content.warmUpContent }}
          ._content.starter-plan(v-if="showStarterPlan") {{ content.starterContent }}
      .no-description(v-if="!isAccordion")
        .content-row: ._content
</template>

<script>
import businessServices from './business-services.js'

export default {
  name: 'XMPlansPricingListContentBusinessService',
  props: {
    isAccordion: Boolean,
    activeContent: { type: String, default: 'business-service' },
    showWarmUpPlan: { type: Boolean, default: true },
    showStarterPlan: { type: Boolean, default: true },
  },
  data() {
    return {
      businessServices,
    }
  },
  methods: {
    doChangeActiveContent() {
      if (this.activeContent === 'business-service') {
        this.$emit('DoChangeActiveContent', '')
        return
      }
      this.$emit('DoChangeActiveContent', 'business-service')
      this.$refs.sectionTitle.scrollIntoView()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-list-content-business-service::v-deep {
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
