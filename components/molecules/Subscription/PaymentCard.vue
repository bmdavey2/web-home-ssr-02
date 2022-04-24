<template lang="pug">
.card
  .card-content
    .is-flex.mb-4
      .border.mr-3(style="border-right: 4px solid #219653")
      p.is-size-3.has-text-secondary(v-if="type === 'default'") Warm-up
      p.is-size-3.has-text-secondary.is-capitalized(v-else) {{ type }}
      .ml-auto(v-if="type === 'default'")
        b-button.is-uppercase.show-desktop(type="is-primary" tag="router-link" to="/businesses/plans-pricing") UPGRADE
      .ml-auto(v-else)
        b-button.is-uppercase(type="is-primary", :loading="isSubmitting" outlined @click="redirectCustomerPortal") Manage
    div(v-if="type !== 'default'")
      p.is-uppercase.mb-3.is-grey Payment Schedule: {{ interval }}
      p.is-grey(v-if="cancelled" style="font-weight: 300") Plan was canceled. Renew to enjoy Starter plan privileges.
      p.is-uppercase.is-grey(v-else) Next payment {{ periodEndTime }}
    div(v-else)
      p.is-grey Unlock new platform features helping grow your business. Starting from only $49 a month
</template>

<script>
import moment from 'moment'
import gql from 'graphql-tag'

export default {
  name: 'XMSubscriptionPayment',

  props: {
    subscription: { type: Object, default: () => {} },
  },
  data() {
    return {
      isSubmitting: false,
    }
  },
  computed: {
    schedule() {
      return this.subscription || null
    },
    periodEndTime() {
      return moment(this.subscription?.periodEndTime).format('MMM DD YYYY')
      // return this.subscription?.periodEndTime || null
    },
    interval() {
      return this.subscription?.interval || null
    },
    type() {
      return this.subscription?.type || 'default'
    },
    cancelled() {
      return this.subscription?.canceled || false
    },
  },
  methods: {
    async redirectCustomerPortal() {
      this.isSubmitting = true
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
        // this.doTrackSegmentError(error, 'Plans and Pricing')
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
