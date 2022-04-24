<template lang="pug">
.xp-pre-register-no-business-success.card
  .card-content
    .header
      h2 Congratulations!
      h4 Your business is now a part of the world's healthiest social network
    .contents
      h3 Starter Plan
      p Want to reach a larger audience, be more discoverable online, increase the visibility of your products and generate more sales leads...
      .actions: b-button.is-uppercase(
        type="is-primary"
        @click.prevent="doStarterPlanPreRegister()",
        :loading="isSubmitting") Pre-Register
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XPPreRegisterNoBusinessSuccess',
  data() {
    return {
      isSubmitting: false,
      profile: null,
      businesses: null,
    }
  },
  mounted() {
    this.doRetrieveProfile()
  },
  methods: {
    async doStarterPlanPreRegister() {
      this.isSubmitting = true
      const input = {
        firstName: this.profile?.firstName,
        lastName: this.profile?.lastName,
        businessName: this.businesses[0]?.Business?.name,
        website: this.businesses[0]?.Business?.website,
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
        await this.$root.$emit('plans-pricing/retrieve/businesses')
        this.$parent.close()
        this.$buefy.modal.open({
          component: require('~/components/pages/PreRegisterSuccess').default,
          parent: this,
          width: 600,
        })
      } catch (error) {
      } finally {
        this.isSubmitting = false
      }
    },
    async doRetrieveProfile() {
      const loader = this.$buefy.loading.open()
      const { data } = await this.$apollo.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            Me {
              Profile {
                Member {
                  firstName
                  lastName
                  id
                }
              }
              BusinessRoles {
                Business {
                  name
                  website
                }
              }
            }
          }
        `,
      })
      this.profile = data?.Me?.Profile?.Member
      this.businesses = data?.Me?.BusinessRoles
      loader.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-pre-register-no-business-success::v-deep {
  .card-content {
    padding: 0;

    h2 {
      font-size: 2.8571rem;
      font-weight: 500;
      margin-bottom: 20px;
      line-height: 1.2;
      color: $secondary;
    }

    h3 {
      font-size: 2.2857rem;
      line-height: 1.2;
      color: $success;
    }

    h4 {
      font-size: 1.7143rem;
      line-height: 1.2;
      color: #050505;
    }

    p {
      font-size: 1.1429rem;
      font-weight: 300;
      line-height: 1.2;
      color: #050505;
      margin: 30px 0;
    }

    .header {
      background-image: url('~assets/images/SignUp/business-header-badges.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: bottom -50px center;
      padding: 50px;
      text-align: center;
    }

    .contents {
      padding: 50px;
      text-align: center;
    }
  }

  @media screen and (max-width: 427px) {
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
</style>
