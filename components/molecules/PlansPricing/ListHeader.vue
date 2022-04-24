<template lang="pug">
.xm-plans-pricing-list-header
  .plan-item-container.pick-a-plan
    .plan-item
      ._title
      .contents Pick a plan
  .plan-item-container.warm-up-plan
    .plan-item
      ._title Warm-Up Plan
      .contents
        .price Free
        .description Let's get you started on Warm Up today for free!
      .actions
        template(v-if="isLoggedIn")
          template(v-if="currentBusinessID === null")
            b-button.is-uppercase(type="is-primary" tag="router-link" to="/signup/business") Add your Business
          template(v-else)
            // TODO activate this when subscription is ready
            template(v-if="getBusinessSubscription.cancelled")
              .active
                ._icon: img(src="~assets/images/PlansPricing/checked.png")
                ._label.is-flex-width-auto Available From {{ subscriptionEndTime }}
            template(v-else)
              b-button.is-uppercase(
                type="is-primary"
                outlined,
                :loading="isRedirecting"
                v-if="getBusinessSubscription.plan === 'starter'"
                @click.prevent="doDowngradePlan(null)") Downgrade
              .active(v-else)
                ._icon: img(src="~assets/images/PlansPricing/checked.png")
                ._label.is-flex-width-auto Your current plan
              //- .active
                ._icon: img(src="~assets/images/PlansPricing/checked.png")
                ._label.is-flex-width-auto Your current plan
        template(v-else)
          b-button.is-uppercase(type="is-primary" tag="router-link" to="/signup") Get Started
  .plan-item-container.starter-plan
    .plan-item
      //.date-release Coming Oct
      ._title Starter Plan
      .contents
        .price $49/month
        .description $470 annually (20% discount for pre-registered businesses).
      .actions
        // TODO activate this when subscription is ready
        template(v-if="isLoggedIn")
          template(v-if="currentBusinessID === null")
            b-button.is-uppercase(
              type="is-primary",
              :loading="!subscriptionPlans.length"
              @click.prevent="doPurchasePlan('Starter')") Purchase
          template(v-else)
            b-button.is-uppercase(
              type="is-primary",
              :loading="!subscriptionPlans.length"
              v-if="getBusinessSubscription.plan === null"
              @click.prevent="doUpgradePlan('Starter')") Upgrade
            .active(v-else)
              ._icon: img(src="~assets/images/PlansPricing/checked.png")
              ._label.is-flex-width-auto Your current plan
        template(v-else)
          b-button.is-uppercase(
            type="is-primary",
            :loading="!subscriptionPlans.length"
            @click.prevent="doPurchasePlan('Starter')") Purchase
      nuxt-link.view-terms(to="/payment-terms") View Payment Terms
  .plan-item-container.growth-plan(style="background-color: #eaeff3 !important")
    //.plan-item
    //  .date-release Coming Nov
    //  ._title Growth Plan
    //  .contents
    //    .price Coming Soon
  .plan-item-container.accelerate-plan(style="background-color: #eaeff3 !important")
    //.plan-item
    //  .date-release Coming Dec
    //  ._title Accelerate Plan
    //  .contents
    //    .price Coming Soon
</template>

<script>
import moment from 'moment'
import gql from 'graphql-tag'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'XMPlansPricingListHeader',
  props: {
    activePlan: Object,
    subscriptionPlans: Array,
  },
  data() {
    return {
      isSubmitting: false,
      businesses: [],
      profile: null,
      preRegistered: false,
      item: {},
      isRedirecting: false,
    }
  },
  computed: {
    ...mapGetters({
      getBusinessSubscription: 'business/getBusinessSubscription',
    }),
    subscriptionEndTime() {
      return moment(this.getBusinessSubscription?.endTime).format('MMMM Do, YYYY') || null
    },
  },
  mounted() {
    this.doRetrieveBusinesses()
    this.$root.$on('plans-pricing/retrieve/businesses', this.doRetrieveBusinesses)
  },
  methods: {
    ...mapActions({
      setCheckoutItems: 'checkout/setCheckoutItems',
      setIsPreRegistering: 'plans-pricing/setIsPreRegistering',
      setPlansPricingPurchasing: 'plans-pricing/setPlansPricingPurchasing',
    }),
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
    async doUpgradePlan(type) {
      try {
        const selectedPlan = await this.subscriptionPlans.filter((plan) => type === plan.name)
        const selectedPrices = selectedPlan[0].prices.filter((price) => this.activePlan.value === price.interval)
        const selectedAnnualPrices = selectedPlan[0].prices.filter((price) => price.interval === 'year')

        const selectedAnnual = selectedAnnualPrices.filter((selected) => selected.discounted === true)
        const selectedPrice = selectedPrices.filter((selected) => selected.discounted === true)

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
    doDowngradePlan(type) {
      // TODO going to change this code once there's another plans available
      let selectedPrice
      try {
        switch (type) {
          case null:
            selectedPrice = null
            break
          default:
            break
        }
        const details = {
          plan: this.activePlan,
          type,
          selectedPrice,
        }
        this.$buefy.modal.open({
          component: require('~/components/molecules/PlansPricing/ConfirmDowngrade').default,
          parent: this,
          width: 600,
          canCancel: false,
          props: { details },
        })
      } catch (error) {
        if (type === null) type = 'Warm-Up'
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
      await this.setPlansPricingPurchasing(purchasing)
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
    async doRedirectToCustomerPortal() {
      this.isRedirecting = true
      try {
        const { data } = await this.$apollo.mutate({
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation createStripeCustomerPortalSession {
              createStripeCustomerPortalSession {
                objectType
                objectID
                success
              }
            }
          `,
        })
        location.href = data?.createStripeCustomerPortalSession?.objectID
      } catch (error) {
        this.$toast.error(`Looks like we are having a connection problem. Please try again later.`, {
          duration: 3000,
          position: 'top-center',
        })
      } finally {
        this.isRedirecting = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-plans-pricing-list-header::v-deep {
  display: flex;
  flex-wrap: wrap;
  // position: sticky;
  // top: 142px;
  // z-index: 2;
  // background-color: $white;

  .plan-item-container {
    width: 20%;
    padding: 7px 3px 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    flex-wrap: wrap;

    &.pick-a-plan {
      padding-right: 0;
      padding-left: 0;

      .plan-item {
        .contents {
          font-size: 22px;
          line-height: 32px;
          color: #65676b;
          border-top-left-radius: 8px;
          border: 1px solid #e5eaf4;
          border-bottom: 0;
        }
      }
    }

    &.warm-up-plan {
      padding: 7px 0 0;

      .plan-item {
        ._title {
          background-color: #25a9e0;
        }

        .contents {
          .price {
            color: #25a9e0;
          }
        }
      }
    }

    &.starter-plan {
      background-color: #3dc68c;

      .plan-item {
        ._title {
          background-color: #219653;
        }

        .contents {
          .price {
            color: #219653;
          }
        }
      }
    }

    &.growth-plan {
      padding: 7px 0 0;

      .plan-item {
        ._title {
          background-color: #f2c94c;
        }

        .contents {
          .price {
            color: #f2c94c;
          }
        }
      }
    }

    &.accelerate-plan {
      padding: 7px 0 0;

      .plan-item {
        ._title {
          background-color: #f15a29;
        }

        .contents {
          .price {
            color: #f15a29;
          }
        }
      }
    }

    .plan-item {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      width: 100%;

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
      }

      ._title {
        color: $white;
        font-size: 1.4286rem;
        font-weight: 300;
        padding: 10px 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        min-height: 49px;
      }

      .contents {
        background-color: $white;
        padding: 20px 20px 10px;
        border-bottom: 0;
        flex: 10000 1 0%;
        // border: 1px solid #e5eaf4;

        .price {
          font-size: 1.5714rem;
          margin-bottom: 20px;
        }

        .description {
          font-size: 1.0714rem;
          font-weight: 300;
          color: #65676b;
        }
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: $white;
        padding: 15px 20px 40px;
        min-height: 95px;

        .active {
          color: #c2c8c9;
          text-transform: uppercase;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          ._icon {
            opacity: 0.3;
            margin-right: 3px;

            img {
              display: flex;
            }
          }
        }

        button,
        a {
          font-size: 1.1429rem;
        }
      }

      .view-terms {
        font-size: 1rem;
        font-weight: 300;
        color: #65676b;
        display: block;
        text-align: center;
        position: absolute;
        bottom: 10px;
        width: 100%;
        min-height: 21px;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .plan-item-container {
      .plan-item {
        .actions {
          button,
          a {
            font-size: 0.7857rem;
          }
        }
      }
    }
  }
}
</style>
