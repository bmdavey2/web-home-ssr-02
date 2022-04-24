<template lang="pug">
.xm-plans-pricing-accordion-warmup-plan.accordion-item
  .header(ref="accordionHeader")
    ._title Warm Up Plan
    ._content
      ._icon(@click.prevent="doChangeActiveAccordion()")
        img(src="~assets/images/PlansPricing/chevron-up.png" v-if="activeAccordion === 'warm-up-plan'")
        img(src="~assets/images/PlansPricing/chevron-right.png" v-else)
      .price Free
      .description Let's get you started on Warm Up today for free!
      .current-plan
        template(v-if="isLoggedIn")
          // TODO activate this when subscription is ready
          template(v-if="currentBusinessID === null")
            b-button.is-uppercase(type="is-primary" tag="router-link" to="/signup/business") Add your Business
          template(v-else)
            // TODO activate this when subscription is ready
            template(v-if="getBusinessSubscription.cancelled")
              .active
                .active-icon: img(src="~assets/images/PlansPricing/checked.png")
                ._label.is-flex-width-auto Available From {{ subscriptionEndTime }}
            template(v-else)
              b-button.is-uppercase(
                type="is-primary"
                outlined
                v-if="getBusinessSubscription.plan === 'starter'"
                @click.prevent="doDowngradePlan(null)") Downgrade
              .active(v-else)
                .active-icon: img(src="~assets/images/PlansPricing/checked.png")
                ._label.is-flex-width-auto Your current plan
              //- .active
                .active-icon: img(src="~assets/images/PlansPricing/checked.png")
                ._label.is-flex-width-auto Your current plan
        template(v-else)
          b-button.is-uppercase(type="is-primary" tag="router-link" to="/signup") Get Started
  .contents(v-if="activeAccordion === 'warm-up-plan'")
    XMPlansPricingListContentBrandAndMarketing(
      is-accordion,
      :show-starter-plan="false",
      :active-content="activeContent"
      @DoChangeActiveContent="activeContent = $event")
    XMPlansPricingListContentBusinessService(
      is-accordion,
      :show-starter-plan="false",
      :active-content="activeContent"
      @DoChangeActiveContent="activeContent = $event")
    XMPlansPricingListContentMarketPlace(
      is-accordion,
      :show-starter-plan="false",
      :active-content="activeContent"
      @DoChangeActiveContent="activeContent = $event")
    .content-bottom
      .description Want to increase their visibility and develop trust by publishing unlimited content and showcasing products to the right audience...
      .description-bottom ...easily and without needing a phd.
</template>

<script>
import moment from 'moment'
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import XMPlansPricingListContentBrandAndMarketing from '~/components/molecules/PlansPricing/ListContent/BrandAndMarketing'
import XMPlansPricingListContentBusinessService from '~/components/molecules/PlansPricing/ListContent/BusinessService'
import XMPlansPricingListContentMarketPlace from '~/components/molecules/PlansPricing/ListContent/MarketPlace'

export default {
  name: 'XMPlansPricingAccordionWarmUpPlan',
  components: {
    XMPlansPricingListContentBrandAndMarketing,
    XMPlansPricingListContentBusinessService,
    XMPlansPricingListContentMarketPlace,
  },
  props: {
    activeAccordion: String,
  },
  data() {
    return {
      activeContent: 'brand-and-marketing',
      businesses: [],
      profile: null,
      preRegistered: false,
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
    doChangeActiveAccordion() {
      if (this.activeAccordion === 'warm-up-plan') {
        this.$emit('DoChangeActiveAccordion', '')
        return
      }
      this.$emit('DoChangeActiveAccordion', 'warm-up-plan')
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
    doDowngradePlan(type) {
      // TODO going to change this code on there's another plans available
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
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-accordion-warmup-plan::v-deep {
  .header {
    ._title {
      background-color: #25a9e0;
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

      ._icon {
        position: absolute;
        top: 20px;
        right: 30px;
      }

      .price {
        font-size: 1.7143rem;
        line-height: 2rem;
        color: #25a9e0;
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

            img {
              display: flex;
            }
          }
        }
      }
    }
  }

  .contents {
    .content-bottom {
      border: 1px solid #e5eaf4;
      border-bottom: 0;
      padding: 20px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background-color: #25a9e0;
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
  }
}
</style>
