<template lang="pug">
.xm-plans-pricing-confirm-upgrade
  .card
    //.card-content
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      h2 {{ details.type }} Plan
      p You are going to purchase a {{ details.type }} plan with {{ details.plan.value === 'year' ? 'Annual' : 'Monthly' }} subscription.
      .actions
        b-button(type="is-primary" outlined @click.prevent="$parent.close()", :disabled="isSubmitting") No Thanks
        b-button(type="is-primary" @click.prevent="doCheckoutPlan()", :loading="isSubmitting") Checkout
    .card-content
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      h2 Switch to Annual & Save
      p Choose annual billing and save 20%
      .actions
        b-button(type="is-primary" outlined @click.prevent="doCheckoutPlan()", :disabled="isSubmitting") GO MONTHLY
        b-button(type="is-primary" @click.prevent="doSwitchAnnual()", :disabled="isSubmitting") SWITCH & SAVE
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'XMPlansPricingConfirmCheckout',
  props: {
    details: Object,
  },
  data() {
    return {
      isSubmitting: false,
    }
  },
  methods: {
    async doCheckoutPlan() {
      this.isSubmitting = true

      try {
        const { data } = await this.$apollo.mutate({
          variables: {
            PriceID: this.details?.selectedPrice[0]?.id,
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
    },
    async doSwitchAnnual() {
      this.isSubmitting = true

      try {
        const { data } = await this.$apollo.mutate({
          variables: {
            PriceID: this.details?.selectedAnnual[0]?.id,
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
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-confirm-upgrade::v-deep {
  .card {
    .card-content {
      position: relative;
      padding: 50px;

      .close {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }

      h2 {
        font-size: 2.2857rem;
        font-weight: 500;
        color: $secondary;
        text-align: center;
      }

      p {
        font-size: 16px;
        font-weight: 300;
        text-align: center;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        button {
          margin: 0 10px;
          text-transform: uppercase;
          min-width: 100px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0;
  }

  @media screen and (max-width: 465px) {
    .card-content {
      padding: 40px 0 !important;
      h2 {
        font-size: 1.8rem !important;
      }
    }
  }
}
</style>
