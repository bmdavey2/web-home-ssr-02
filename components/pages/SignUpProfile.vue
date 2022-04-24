<template lang="pug">
.xp-sign-up-profile.fill.flex-center
  .contents.py-6
    XOSignUpProfileCategories(
      v-model="form"
      v-if="step === 2"
      @back="step = 1",
      :submitting="submitting"
      @next="onSubmit")
    XOSignUpProfileDetails(v-model="form" v-else @back="onClickExit" @next="step = 2")
</template>

<script>
import gql from 'graphql-tag'
import XOSignUpProfileDetails from '~/components/organisms/SignUpProfileDetails'
import XOSignUpProfileCategories from '~/components/organisms/SignUpProfileCategories'
export default {
  name: 'XPSignUpProfile',
  components: { XOSignUpProfileDetails, XOSignUpProfileCategories },
  props: {
    redirectOnCompletion: Boolean,
  },
  data() {
    return {
      step: 1,
      submitting: false,
      form: {
        firstName: '',
        lastName: '',
        country: null,
        postalCode: '',
        gender: null,
        birthDate: null,
        personalStatus: 'Getting Started',
        CategoryIDs: [],
        followMentors: true,
      },
    }
  },
  methods: {
    async onClickExit() {
      this.$parent.close()
      await this.$store.dispatch('auth/logOut')
      await this.$router.push('/')
    },
    async onSubmit() {
      if (['signup-mentor', 'signup-business'].includes(this.$route.name)) {
        this.$buefy.modal.open({
          parent: this,
          component: require('~/components/molecules/ProfileSetupLoader').default,
          width: 405,
          canCancel: false,
          customClass: 'bg-white',
        })
      }
      try {
        this.submitting = true
        const { errors } = await this.$apollo.mutate({
          variables: {
            input: this.form,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($input: InputProfile!) {
              createProfile(input: $input) {
                success
              }
            }
          `,
        })
        // TODO: check error
        if (errors) {
          this.$toast.error(errors, { duration: 5000, position: 'top-center' })
        }
        const details = {
          userId: this.$store.state.auth.uid,
        }
        await this.$appClient.segment.identifyProfile()
        await this.$appClient.segment.trackUserSignUp(details)
        if (['signup-mentor', 'signup-business'].includes(this.$route.name)) {
          this.$root.$emit('setup/loader/close')
        }
        if (this.$store.getters['business-claim/getBusinessClaimIsClaiming']) {
          try {
            const claimResult = await this.$apollo.mutate({
              variables: {
                id: this.$store.getters['business-claim/getBusinessClaimId'],
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
            if (claimResult?.data) {
              const business = await this.$apollo.query({
                fetchPolicy: 'no-cache',
                variables: {
                  id: claimResult?.data?.linkMemberToBusiness?.objectID,
                },
                query: gql`
                  query ($id: String) {
                    Business(id: $id) {
                      slug
                    }
                  }
                `,
              })
              location.href = `/b/${business?.data?.Business?.slug}`
            }
          } catch (error) {
            error.graphQLErrors.forEach((error) => {
              this.$toast.error(error.message, {
                duration: 3000,
                position: 'top-center',
                onComplete: () => {
                  location.href = '/my-feed'
                },
              })
            })
          }
          return
        }

        if (this.$store.getters['team-management/getTeamManagementInvite']?.isInviting) {
          try {
            await this.$apollo.mutate({
              variables: {
                action: 'responseInvite',
                status: 'Active',
                inactiveReason: undefined,
                id: this.$store.getters['team-management/getTeamManagementInvite']?.id,
              },
              mutation: gql`
                mutation ($action: String!, $status: String, $inactiveReason: String, $id: String!) {
                  editBusinessTeamMember(action: $action, status: $status, inactiveReason: $inactiveReason, id: $id) {
                    success
                    objectID
                  }
                }
              `,
            })

            location.href = '/my-feed'
          } catch (error) {
            error.graphQLErrors.forEach((error) => {
              this.doShowAcceptInvitationModal('error', error.message)
            })
            this.doTrackSegmentError(error, 'Team Invitation')
            return
          }
        }

        if (this.redirectOnCompletion) {
          location.href = '/my-feed'
        }
        this.$parent.close()
      } catch (error) {
        this.doTrackSegmentError(error, 'User Profile Signup')
      } finally {
        this.submitting = false
      }
    },
    doShowAcceptInvitationModal(status, message) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/Team/AcceptInvitation').default,
        parent: this,
        canCancel: false,
        width: 600,
        props: {
          status,
          message,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-sign-up-profile::v-deep {
  background-image: url('~assets/images/SignUp/background-inner.jpg');
  background-size: cover;
  background-position: bottom center;

  .contents {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    max-height: 100%;
    height: 100%;

    .control {
      textarea,
      input,
      select {
        background-color: rgba($white, 0.8);
      }
    }
  }

  @media screen and (max-width: 767px) {
    .contents {
      padding: 0 15px;
    }
  }
}
</style>
