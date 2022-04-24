<template lang="pug">
.xm-plans-pricing-confirm-downgrade
  .card
    .card-content
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      h2 {{ type }} Plan
      p You are going to downgrade your plan from #[span.is-capitalized.text-secondary {{ activeSubscription }}] to #[span.text-secondary {{ type }}].
      p Are you sure you want to continue?
      .actions
        b-button(type="is-primary" outlined @click.prevent="$parent.close()", :disabled="isSubmitting") No Thanks
        b-button(type="is-primary" @click.prevent="doCheckoutPlan()", :loading="isSubmitting") Downgrade
</template>

<script>
import gql from 'graphql-tag'
export default {
  props: {
    details: Object,
  },
  data() {
    return {
      isSubmitting: false,
    }
  },
  computed: {
    type() {
      return this.details?.type || 'Warm-Up'
    },
    activeSubscription() {
      return this.$store.getters['business/getBusinessSubscription']?.plan || null
    },
    selectedPrice() {
      return this.details?.selectedPrice
    },
  },
  methods: {
    async doCheckoutPlan() {
      this.isSubmitting = true
      try {
        await this.$apollo.mutate({
          variables: {
            PriceID: this.selectedPrice,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($PriceID: String) {
              changeBusinessSubscription(PriceID: $PriceID) {
                success
              }
            }
          `,
        })
        location.href = '/me/subscription-plan'
        this.$parent.close()
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
.xm-plans-pricing-confirm-downgrade::v-deep {
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
          margin: 0 10px 10px;
          text-transform: uppercase;
          min-width: 100px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;
  }
}
</style>
