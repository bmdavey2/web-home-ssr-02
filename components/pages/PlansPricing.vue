<template lang="pug">
.xp-plans-pricing.py-6(v-if="!isRetrieving")
  .container
    ._breadcrumbs
      ._breadcrumb: nuxt-link(to="/businesses" exact) Businesses
      ._breadcrumb: nuxt-link(to="/businesses/plans-pricing") Plans and Pricing
    XMPlansPricingList(:subscription-plans="subscriptionPlans" @DoSelectActivePlan="activePlan = $event")
    .accordions
      XMPlansPricingAccordionWarmUpPlan(
        :active-accordion="activeAccordion"
        @DoChangeActiveAccordion="activeAccordion = $event")
      XMPlansPricingAccordionStarterPlan(
        :active-accordion="activeAccordion"
        @DoChangeActiveAccordion="activeAccordion = $event",
        :subscription-plans="subscriptionPlans",
        :active-plan="activePlan")
      //XMPlansPricingAccordionGrowthPlan(
      //  :active-accordion="activeAccordion"
      //  @DoChangeActiveAccordion="activeAccordion = $event")
      //XMPlansPricingAccordionAcceleratePlan(
      //  :active-accordion="activeAccordion"
      //  @DoChangeActiveAccordion="activeAccordion = $event")
    XMPlansPricingTestimonials
</template>

<script>
import gql from 'graphql-tag'
import XMPlansPricingList from '~/components/molecules/PlansPricing/List'
import XMPlansPricingTestimonials from '~/components/molecules/PlansPricing/Testimonials'
import XMPlansPricingAccordionWarmUpPlan from '~/components/molecules/PlansPricing/Accordion/WarmUpPlan'
import XMPlansPricingAccordionStarterPlan from '~/components/molecules/PlansPricing/Accordion/StarterPlan'
import XMPlansPricingAccordionGrowthPlan from '~/components/molecules/PlansPricing/Accordion/GrowthPlan'
import XMPlansPricingAccordionAcceleratePlan from '~/components/molecules/PlansPricing/Accordion/AcceleratePlan'

export default {
  name: 'XPPlansPricing',
  components: {
    XMPlansPricingList,
    XMPlansPricingTestimonials,
    XMPlansPricingAccordionWarmUpPlan,
    XMPlansPricingAccordionStarterPlan,
    XMPlansPricingAccordionGrowthPlan,
    XMPlansPricingAccordionAcceleratePlan,
  },
  data() {
    return {
      activeAccordion: '',
      subscriptionPlans: [],
      activePlan: null,
      isRetrieving: true,
    }
  },
  created() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  mounted() {
    this.doRetrieveSubscriptionPlans()
  },
  methods: {
    async doRetrieveSubscriptionPlans() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          context: this.getGraphQLContext(),
          query: gql`
            query {
              getBusinessSubscriptionPlans {
                id
                description
                name
                type
                prices {
                  id
                  amount
                  currency
                  interval
                  discounted
                }
              }
            }
          `,
        })

        this.subscriptionPlans = data?.getBusinessSubscriptionPlans
      } catch (error) {
        this.doRetrieveSubscriptionPlans()
        this.doTrackSegmentError(error, 'Plans and Pricing')
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-plans-pricing::v-deep {
  color: #050505;
  background-color: $white;
  min-height: calc(100vh - 533px);

  h1 {
    font-size: 2.2857rem;
    line-height: 2.8571rem;
  }

  ._breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 30px;

    ._breadcrumb {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &::after {
        content: '';
        width: 5px;
        height: 5px;
        border: 1px solid #65676b;
        display: block;
        transform: rotate(45deg);
        border-bottom: 0;
        border-left: 0;
        margin: 0 8px;
      }

      &:last-child {
        &::after {
          content: none;
        }
      }

      a {
        color: #65676b;
        font-weight: 300;
        display: block;

        &.active {
          color: $secondary;
        }
      }
    }
  }

  .xm-plans-pricing-list-content,
  .accordions {
    .section-title {
      background-color: #dfecff;
      color: #007ab9;
      text-transform: uppercase;
      padding: 15px 20px;
      font-weight: 500;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .title-icon {
        display: none;

        img {
          display: flex;

          &.active {
            width: 15px;
            height: auto;
          }

          &.inactive {
            height: 15px;
            width: auto;
          }
        }
      }
    }

    .list-section {
      .content-section {
        display: flex;
        flex-wrap: wrap;

        .has-description {
          width: 60%;

          ._title {
            background-color: #f7f9fa;
            font-size: 1.1429rem;
            line-height: 1.4286rem;
            color: $secondary;
            padding: 10px 20px;
            min-height: 55px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            border: 1px solid #eaeff3;
          }

          .content-row {
            display: flex;

            ._label {
              width: calc(100% / 3);
              padding: 10px 10px 10px 20px;
              border: 1px solid #eaeff3;
              min-height: 52px;
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              ._value {
                flex: 10000 1 0%;
                padding-right: 10px;
              }

              .b-tooltip {
                align-self: flex-start;
                cursor: pointer;
              }
            }

            ._content {
              width: calc(100% / 3);
              min-height: 52px;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              padding: 10px 20px;
              border: 1px solid #eaeff3;
            }
          }
        }

        .no-description {
          width: 40%;
          background-color: #f8f8f8;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;

          ._title {
            background-color: #f3f5f6;
            font-size: 1.1429rem;
            line-height: 1.4286rem;
            min-height: 55px;
            border: 1px solid #eaeff3;
          }

          .content-row {
            flex: 10000 1 0%;

            ._content {
              border-right: 2px solid #eaeff3;
              width: 50%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .accordions {
    display: none;
    padding: 0 50px;

    .accordion-item {
      margin-bottom: 30px;
    }
  }

  @media screen and (max-width: 1023px) {
    .accordions {
      display: block;
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 1.7143rem;
      line-height: 2rem;
    }

    .accordions {
      padding: 0;
    }
  }
}
</style>
