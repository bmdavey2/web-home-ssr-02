<template lang="pug">
.xp-sign-up-business.fill.flex-center
  .contents.py-6
    XOSignUpBusinessCategories(
      v-model="form"
      v-if="step === 2"
      @back="step = 1",
      :submitting="submitting"
      @next="onSubmit")
    XOSignUpBusinessDetails(v-model="form" v-else @back="onClickExit" @next="step = 2")
</template>

<script>
import isArray from 'lodash/isArray'
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import XOSignUpBusinessDetails from '~/components/organisms/SignUpBusinessDetails'
import XOSignUpBusinessCategories from '~/components/organisms/SignUpBusinessCategories'

export default {
  name: 'XPSignUpBusiness',
  components: { XOSignUpBusinessDetails, XOSignUpBusinessCategories },
  data() {
    return {
      step: 1,
      submitting: false,
      form: {
        name: '',
        website: '',
        email: '',
        country: null,
        postalCode: '',
        profileType: null,
        nonProfitBusiness: false,
        serviceProvided: [],
        CategoryIDs: [],
      },
      businessID: null,
    }
  },
  computed: {
    ...mapGetters({
      getPlansPricingPurchasing: 'plans-pricing/getPlansPricingPurchasing',
    }),
  },
  methods: {
    onClickExit() {
      this.$router.back()
    },
    async onSubmit() {
      try {
        this.submitting = true
        if (this.form.serviceProvided && !isArray(this.form.serviceProvided)) {
          this.form.serviceProvided = [this.form.serviceProvided]
        }
        const {
          data: {
            createBusiness: { objectID },
          },
          errors,
        } = await this.$apollo.mutate({
          variables: {
            input: this.form,
          },
          // context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($input: InputBusiness!) {
              createBusiness(input: $input) {
                objectID
                success
              }
            }
          `,
        })
        this.currentBusinessID = objectID
        this.businessID = objectID
        // TODO: check error
        if (errors) {
          this.$toast.error(errors, { duration: 5000, position: 'top-center' })
        }
        // await this.$appClient.segment.trackUserSignUp(this.$store.state.auth.uid)
        if (this.getPlansPricingPurchasing !== null) {
          this.doCheckoutPlan()
          return
        }
        this.doRetrieveBusinessDetails()
      } catch (error) {
        this.$toast.error(error, { duration: 5000, position: 'top-center' })
        this.doTrackSegmentError(error, 'Business Profile Signup')
      } finally {
        this.submitting = false
      }
    },
    async doCheckoutPlan() {
      const details = this.getPlansPricingPurchasing
      try {
        const { data } = await this.$apollo.mutate({
          variables: {
            PriceID: details?.selectedPrice?.id,
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
        await this.doRetrieveBusinessDetails()
        this.$toast.error(`Looks like we are having a connection problem. Please try again later.`, {
          duration: 3000,
          position: 'top-center',
        })
        this.doTrackSegmentError(error, 'Business Profile Signup')
      }
    },
    async doRetrieveBusinessDetails() {
      await this.$apollo.query({
        variables: {
          id: this.businessID,
        },
        query: gql`
          query ($id: String!) {
            Business(id: $id) {
              slug
            }
          }
        `,
      })

      // for plans and pricing modal
      this.$store.dispatch('signup/setPurchaseBusiness', true)
      location.href = '/businesses/plans-pricing'
      // location.href = `/b/${slug}`
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-sign-up-business::v-deep {
  .contents {
    width: 100%;
    max-width: 400px;
    max-height: 100%;
    height: 100%;

    .control {
      textarea,
      input,
      select {
        background-color: rgba($white, 0.8);
      }
    }

    .agree {
      background-color: rgba($white, 0.8);
      font-weight: 300;
      display: flex;
    }
  }

  @media screen and (max-width: 767px) {
    .contents {
      padding: 0 15px;
    }
  }
}
</style>
