<template lang="pug">
.xm-plans-pricing-list-content-brand-and-marketing(:class="isAccordion && 'is-accordion'")
  .section-title(@click.prevent="doChangeActiveContent()" ref="sectionTitle")
    .value 1. Brand & Marketing
    .title-icon
      img.active(
        src="~assets/images/PlansPricing/chevron-up.png"
        width="24"
        height="14"
        v-if="activeContent === 'brand-and-marketing'")
      img.inactive(src="~assets/images/PlansPricing/chevron-right.png" width="14" height="24" v-else)
  .list-section(v-if="activeContent === 'brand-and-marketing'")
    .content-section
      .has-description
        ._title ActivePlace Profile
        .content-row(v-for="(content, index) in activePlaceProfile", :key="`${index}-app`")
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
        ._title Content Creation
        .content-row(v-for="(content, index) in contentCreation", :key="`${index}-cc`")
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
        ._title Search - Brand & Content
        .content-row(v-for="(content, index) in searchBrandContent", :key="`${index}-cc`")
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
        ._title Community
        .content-row(v-for="(content, index) in community", :key="`${index}-c`")
          template(v-if="content.label === 'Follow limits'")
            ._label
              ._value {{ content.label }}
              b-tooltip(:label="content.tooltip" type="is-light" square multilined): ._icon: img(
                src="~assets/images/PlansPricing/question.png"
                width="16"
                height="16")
            ._content.warm-up-plan(v-if="showWarmUpPlan") {{ content.warmUpLimitCount }}
            ._content.starter-plan(v-if="showStarterPlan") {{ content.starterLimitCount }}
          template(v-else)
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
import activePlaceProfile from './activeplace-profile.js'
import contentCreation from './content-creation.js'
import searchBrandContent from './search-brand-content.js'
import community from './community.js'

export default {
  name: 'XMPlansPricingListContentBrandAndMarketing',
  props: {
    isAccordion: Boolean,
    activeContent: { type: String, default: 'brand-and-marketing' },
    showWarmUpPlan: { type: Boolean, default: true },
    showStarterPlan: { type: Boolean, default: true },
  },
  data() {
    return {
      activePlaceProfile,
      contentCreation,
      searchBrandContent,
      community,
    }
  },
  methods: {
    doChangeActiveContent() {
      if (this.activeContent === 'brand-and-marketing') {
        this.$emit('DoChangeActiveContent', '')
        return
      }
      this.$emit('DoChangeActiveContent', 'brand-and-marketing')
      this.$refs.sectionTitle.scrollIntoView()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-list-content-brand-and-marketing::v-deep {
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
