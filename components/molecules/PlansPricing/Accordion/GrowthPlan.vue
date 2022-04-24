<template lang="pug">
.xm-plans-pricing-accordion-growth-plan.accordion-item
  .header
    .date-release Coming Nov
    ._title Growth Plan
    ._content
      ._icon.disabled(@click.prevent="doChangeActiveAccordion()")
        img(src="~assets/images/PlansPricing/chevron-up.png" v-if="activeAccordion === 'growth-plan'")
        img(src="~assets/images/PlansPricing/chevron-right.png" v-else)
      .price Coming Soon
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'XMPlansPricingAccordionGrowthPlan',
  props: {
    activeAccordion: String,
  },
  data() {
    return {
      activeContent: 'brand-and-marketing',
    }
  },
  // computed: {
  //   ...mapGetters({
  //     getBusinesses: 'user/getBusinesses',
  //   }),
  // },
  methods: {
    doChangeActiveAccordion() {
      // if (this.activeAccordion === 'growth-plan') {
      //   this.$emit('DoChangeActiveAccordion', '')
      //   return
      // }
      // this.$emit('DoChangeActiveAccordion', 'growth-plan')
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-accordion-growth-plan::v-deep {
  .header {
    position: relative;
    overflow: hidden;

    .date-release {
      background-color: #050505;
      color: #f2c94c;
      text-transform: uppercase;
      position: absolute;
      top: 23px;
      right: -29px;
      text-align: center;
      font-size: 0.8571rem;
      line-height: 0.8571rem;
      width: 130px;
      height: 25px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      transform: rotate(45deg);
      z-index: 1;
    }

    ._title {
      background-color: #f2c94c;
      font-size: 22px;
      line-height: 32px;
      padding: 8px 20px;
      font-weight: 300;
      color: $white;
      text-align: center;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }

    ._content {
      border: 1px solid #e5eaf4;
      text-align: center;
      padding: 20px;
      position: relative;
      background-color: $white;
      min-height: 120px;

      ._icon {
        position: absolute;
        top: 20px;
        right: 30px;

        &.disabled {
          opacity: 0.3;
        }
      }

      .price {
        font-size: 1.7143rem;
        line-height: 2rem;
        color: #f2c94c;
      }

      .description {
        font-weight: 300;
        color: #65676b;
        margin: 20px 0;
      }

      .current-plan {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .active {
          color: #c2c8c9;
          text-transform: uppercase;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          .active-icon {
            opacity: 0.3;
            margin-right: 3px;
          }
        }
      }
    }
  }

  .contents {
    .content-bottom {
      border: 3px solid #3dc68c;
      padding: 20px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: -10px;
        width: calc(100% + 20px);
        height: 5px;
        background-color: #219653;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      .description {
        font-weight: 300;
        margin-bottom: 10px;
      }

      .description-bottom {
        font-family: 'Georgia', sans-serif;
        font-style: italic;
      }
    }

    .discount {
      background-color: #3dc68c;
      text-align: center;
      padding: 10px 20px;
      color: $white;
      font-weight: 300;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin-top: -7px;
    }
  }
}
</style>
