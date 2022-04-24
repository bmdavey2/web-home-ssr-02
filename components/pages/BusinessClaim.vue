<template lang="pug">
.xp-business-claim
  .card
    .card-content
      .header
        h2 Congratulations!
        h4 Your business is now a part of the world's healthiest social network
      .contents
        p(v-if="isLoggedIn") Click on the button below to claim your business
        p(v-else) Click any button below to claim your business
        .actions
          template(v-if="isLoggedIn")
            b-button.is-uppercase(type="is-primary", :loading="isSubmitting" @click.prevent="doClaimBusiness()") Go To Business Profile
          template(v-else)
            b-button.is-uppercase(type="is-primary" @click.prevent="doShowLoginModal()") Sign In
            b-button.is-uppercase(type="is-light" @click.prevent="doUserSignup()") Get Started
</template>

<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
export default {
  name: 'XPBusinessClaim',
  data() {
    return {
      isSubmitting: false,
    }
  },
  mounted() {
    this.setBusinessClaimIsClaiming(false)
    this.setBusinessClaimId(null)
  },
  methods: {
    ...mapActions({
      setBusinessClaimIsClaiming: 'business-claim/setBusinessClaimIsClaiming',
      setBusinessClaimId: 'business-claim/setBusinessClaimId',
    }),
    async doClaimBusiness() {
      this.isSubmitting = true
      try {
        const id = this.$route.params?.code

        const { data } = await this.$apollo.mutate({
          variables: {
            id,
          },
          mutation: gql`
            mutation ($id: String!) {
              linkMemberToBusiness(challenge: $id) {
                success
                objectID
                objectType
              }
            }
          `,
        })
        if (data) {
          const business = await this.$apollo.query({
            fetchPolicy: 'no-cache',
            variables: {
              id: data?.linkMemberToBusiness?.objectID,
            },
            query: gql`
              query ($id: String) {
                Business(id: $id) {
                  slug
                }
              }
            `,
          })
          this.isSubmitting = false
          location.href = `/b/${business?.data?.Business?.slug}`
          this.$parent.close()
        }
      } catch (error) {
        error.graphQLErrors.forEach((error) => {
          this.$toast.error(error.message, { duration: 3000, position: 'top-center' })
        })
        this.isSubmitting = false
        this.doTrackSegmentError(error, 'Business Claim')
      }
    },
    async doShowLoginModal() {
      this.setBusinessClaimIsClaiming(true)
      this.setBusinessClaimId(this.$route.params?.code)
      this.$router.push('/')
      await this.$parent.close()
      this.$buefy.modal.open({
        component: require('~/components/pages/LogIn').default,
        parent: this,
        width: 600,
        canCancel: false,
      })
    },
    doUserSignup() {
      this.setBusinessClaimIsClaiming(true)
      this.setBusinessClaimId(this.$route.params?.code)
      this.$router.push({
        path: '/signup/user',
        query: { step: 1 },
      })
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-business-claim::v-deep {
  .card {
    .card-content {
      padding: 0;

      .header {
        background-image: url('~assets/images/SignUp/business-header-badges.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom -50px center;
        padding: 50px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem 0.25rem 0 0;

        h2 {
          font-size: 2.8571rem;
          font-weight: 500;
          line-height: 1.2;
          color: $secondary;
          margin-bottom: 20px;
        }

        h4 {
          font-size: 1.7143rem;
          line-height: 1.2;
          color: $secondary;
        }
      }

      .contents {
        padding: 50px;
        text-align: center;
        font-size: 1.1429rem;
        font-weight: 300;

        .actions {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          button,
          a {
            text-decoration: none;
            margin: 0 5px;
            font-weight: 400;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .card {
      min-height: 100vh;

      .card-content {
        .header {
          background-position: bottom center;
          padding: 50px 10px;
        }

        .contents {
          padding: 50px 30px;
        }
      }
    }
  }
}
</style>
