<template lang="pug">
.xm-plans-pricing-accordion-starter-plan.accordion-item
  .header(ref="accordionHeader")
    //.date-release Coming Oct
    ._title Starter Plan
    ._content
      ._icon(@click.prevent="doChangeActiveAccordion()")
        img(src="~assets/images/PlansPricing/chevron-up.png" v-if="activeAccordion === 'starter-plan'")
        img(src="~assets/images/PlansPricing/chevron-right.png" v-else)
      .price $49/month
      .description $470 annually (20% discount for pre-registered businesses).
      .current-plan
        // TODO activate this when subscription is ready
        template(v-if="isLoggedIn")
          template(v-if="currentBusinessID === null")
            b-button.is-uppercase(
              type="is-primary",
              :loading="!subscriptionPlans.length"
              @click.prevent="doPurchasePlan('Starter')") Purchase
          template(v-else)
            b-button.is-uppercase(
              type="is-primary"
              v-if="getBusinessSubscription.plan === null",
              :loading="!subscriptionPlans.length"
              @click.prevent="doCheckoutPlan('Starter')") Upgrade
            .active(v-else)
              .active-icon: img(src="~assets/images/PlansPricing/checked.png")
              ._label.is-flex-width-auto Your current plan
        template(v-else): b-button.is-uppercase(
          type="is-primary",
          :loading="!subscriptionPlans.length"
          @click.prevent="doPurchasePlan('Starter')") Purchase
      nuxt-link.view-terms(to="/payment-terms") View Payment Terms
  .contents(v-if="activeAccordion === 'starter-plan'")
    XMPlansPricingListContentBrandAndMarketing(
      is-accordion,
      :show-warm-up-plan="false",
      :active-content="activeContent"
      @DoChangeActiveContent="activeContent = $event")
    XMPlansPricingListContentBusinessService(
      is-accordion,
      :show-warm-up-plan="false",
      :active-content="activeContent"
      @DoChangeActiveContent="activeContent = $event")
    XMPlansPricingListContentMarketPlace(
      is-accordion,
      :show-warm-up-plan="false",
      :active-content="activeContent"
      @DoChangeActiveContent="activeContent = $event")
    .content-bottom
      .description Want to reach a larger audience, be more discoverable online, increase the visibility of their products and generate more sales leads...
      .description-bottom ......without having to find 40 hours a week to do it.
    .discount Pre-register to get 20% off when payed annually.
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import XMPlansPricingListContentBrandAndMarketing from '~/components/molecules/PlansPricing/ListContent/BrandAndMarketing'
import XMPlansPricingListContentBusinessService from '~/components/molecules/PlansPricing/ListContent/BusinessService'
import XMPlansPricingListContentMarketPlace from '~/components/molecules/PlansPricing/ListContent/MarketPlace'

export default {
  name: 'XMPlansPricingAccordionStarterPlan',
  components: {
    XMPlansPricingListContentBrandAndMarketing,
    XMPlansPricingListContentBusinessService,
    XMPlansPricingListContentMarketPlace,
  },
  props: {
    activeAccordion: String,
    subscriptionPlans: Array,
    activePlan: Object,
  },
  data() {
    return {
      activeContent: 'brand-and-marketing',
      isSubmitting: false,
      preRegistered: false,
      businesses: [],
    }
  },
  computed: {
    ...mapGetters({
      getBusinessSubscription: 'business/getBusinessSubscription',
    }),
  },
  mounted() {
    this.doRetrieveBusinesses()
    this.$root.$on('plans-pricing/retrieve/businesses', this.doRetrieveBusinesses)
  },
  methods: {
    doChangeActiveAccordion() {
      if (this.activeAccordion === 'starter-plan') {
        this.$emit('DoChangeActiveAccordion', '')
        return
      }
      this.$emit('DoChangeActiveAccordion', 'starter-plan')
      this.$refs.accordionHeader.scrollIntoView()
    },
    async doRetrieveBusinesses() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Me {
                BusinessRoles {
                  BusinessID
                  Business {
                    name
                    website
                  }
                }
                Profile {
                  Member {
                    id
                    firstName
                    lastName
                    preRegistered
                  }
                }
              }
            }
          `,
        })
        const { Profile } = data?.Me
        this.businesses = data?.Me?.BusinessRoles
        this.profile = Profile?.Member
        this.preRegistered = Profile?.Member?.preRegistered
      } catch (error) {
        this.doTrackSegmentError(error, 'Plans and Pricing')
      } finally {
        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: false,
        })
      }
    },
    async doShowStarterPlanPreRegisterModal() {
      this.isSubmitting = true
      if (this.businesses.length > 0) {
        await this.businesses.forEach(async (business) => {
          const input = {
            firstName: this.profile?.firstName,
            lastName: this.profile?.lastName,
            businessName: business?.Business?.name,
            website: business?.Business?.website,
            emailAddress: this.$store.state.auth?.email,
            memberID: this.profile?.id,
          }
          try {
            await this.$apollo.mutate({
              variables: {
                input,
              },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($input: InputBusinessPlanPreRegistration!) {
                  createBusinessPlanPreRegistration(input: $input) {
                    success
                  }
                }
              `,
            })
            await this.doRetrieveBusinesses()
          } catch (error) {
            this.doTrackSegmentError(error, 'Plans and Pricing')
          }
        })
        this.$buefy.modal.open({
          component: require('~/components/pages/PreRegisterSuccess').default,
          parent: this,
          width: 600,
        })
        this.isSubmitting = false
      } else {
        this.$router.push({
          path: '/signup/business',
        })
      }
    },
    async doCheckoutPlan(type) {
      try {
        const selectedPlan = await this.subscriptionPlans.filter((plan) => type === plan.name)
        const selectedPrices = selectedPlan[0].prices.filter((price) => this.activePlan.value === price.interval)
        const selectedAnnualPrices = selectedPlan[0].prices.filter((price) => price.interval === 'year')

        let selectedPrice
        let selectedAnnual
        if (type === 'Starter') {
          selectedAnnual = selectedAnnualPrices.filter((selected) => selected.discounted === true)
          selectedPrice = selectedPrices.filter((selected) => selected.discounted === true)
        } else {
          selectedAnnual = selectedAnnualPrices.filter((selected) => selected.discounted === true)
          selectedPrice = selectedPrices.filter((selected) => selected.discounted === false)
        }
        const details = {
          plan: this.activePlan,
          type,
          selectedPrice,
          selectedAnnual,
        }
        // direct push on checkout page related to ticket AW-1445
        if (this.activePlan?.value === 'year') {
          try {
            const { data } = await this.$apollo.mutate({
              variables: {
                PriceID: details.selectedPrice[0]?.id,
              },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($PriceID: String!) {
                  createStripeCheckoutSession(PriceID: $PriceID) {
                    success
                    objectID
                  }
                }
              `,
            })
            location.href = data?.createStripeCheckoutSession?.objectID
          } catch (error) {
            this.$toast.error(`Looks like we are having a connection problem. Please try again later.`, {
              duration: 3000,
              position: 'top-center',
            })
            this.doTrackSegmentError(error, 'Plans and Pricing')
          } finally {
            this.isSubmitting = false
          }
        } else {
          this.$buefy.modal.open({
            component: require('~/components/molecules/PlansPricing/ConfirmUpgrade').default,
            parent: this,
            width: 490,
            canCancel: false,
            props: { details },
          })
        }
      } catch (error) {
        this.$toast.error(`No ${type} plan at the moment. Please try again later.`, {
          duration: 3000,
          position: 'top-center',
        })
      }
    },
    async doPurchasePlan(type) {
      const selectedPlan = this.subscriptionPlans.filter((plan) => type === plan.name)
      const selectedPrices = selectedPlan[0].prices.filter((price) => this.activePlan.value === price.interval)
      const selectedPrice = selectedPrices[0]

      // if (type === 'Starter') {
      //   selectedPrice = selectedPrices.filter((selected) => selected.discounted === true)
      // } else {
      //   selectedPrice = selectedPrices.filter((selected) => selected.discounted === false)
      // }

      const purchasing = {
        plan: this.activePlan,
        type,
        selectedPrice,
      }

      await this.$store.dispatch('plans-pricing/setPlansPricingPurchasing', purchasing)
      if (this.isLoggedIn) {
        return this.$router.push({
          path: '/signup/business',
        })
      }
      this.$router.push({
        path: '/signup/business',
        query: { step: 1 },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-accordion-starter-plan::v-deep {
  .header {
    border: 3px solid #3dc68c;
    background-color: #3dc68c;
    border-top-width: 5px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
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
      background-color: #219653;
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
      text-align: center;
      padding: 20px 20px 10px;
      position: relative;
      background-color: $white;

      ._icon {
        position: absolute;
        top: 20px;
        right: 30px;
      }

      .price {
        font-size: 1.7143rem;
        line-height: 2rem;
        color: #219653;
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

  .view-terms {
    font-size: 1rem;
    font-weight: 300;
    color: #65676b;
    display: block;
    text-align: center;
    width: 100%;
    padding-top: 10px;
  }
}
</style>
