<template lang="pug">
.login.card(:class="fullScreen && 'full-height'")
  b-loading(v-model="isLoggingInSocialMedia", :is-full-page="false")
  .card-content
    .close(v-if="fullScreen" @click.prevent="$parent.close()"): b-icon(icon="close")
    template(v-if="showLoginForm")
      .section
        .login-form
          p.is-size-4.mb-5.has-text-centered Log in to your account
            .social-login-btn
              .social-buttons.has-text-weight-regular.is-flex.is-align-items-center(@click="onClickLogInGoogle")
                .left-icon.mr-3.is-flex.is-flex-wrap-wrap
                  img(src="~assets/images/Social/google.svg" width="18" height="18")
                .btn-label LOG IN WITH GOOGLE

            .social-login-btn.mt-2
              .social-buttons.has-text-weight-regular.is-flex.is-align-items-center(@click="onClickLogInFacebook")
                .left-icon.mr-3.is-flex.is-flex-wrap-wrap
                  img(src="~assets/images/Social/facebook.svg" width="18" height="18")
                .btn-label LOG IN WITH FACEBOOK

          .or-container.is-flex.is-align-items-center
            .section-hr: hr.border-hr
            p OR
            .section-hr: hr.border-hr

          .mb-3
            FormInput(
              v-model="emailAddress"
              type="email"
              placeholder="E-mail Address",
              :disabled="isLoggingIn"
              @enter="onClickLogIn()")

          .mb-3
            FormInput(
              v-model="password"
              type="password"
              placeholder="Enter Password",
              :disabled="isLoggingIn"
              @enter="onClickLogIn()")

          .links-label
            p.underline-label(@click="showForgotPassword") Forgot Password?
            p.signin-label
              span New to Activeplace?
              //- nuxt-link.has-text-primary.has-text-weight-bold.underline-label.ml-2(
                to="/signup"
                @click.native="doAcceptInvitation(); closeModal()") Sign Up
              span.has-text-primary.has-text-weight-bold.underline-label.ml-2(@click.prevent="doGoToSignUp()") Sign Up

          b-button(type="is-primary" size="is-medium" @click="onClickLogIn" expanded, :loading="isLoggingIn") LOGIN

    template(v-else)
      .section
        .forgot-password-form
          p.is-size-4.mb-5.has-text-centered Please enter your email address
          .mb-5: FormInput(
            v-model="emailAddress"
            type="email"
            placeholder="Email Address",
            :disabled="isResettingPassword")
          .actions
            .btn-reset-password.btn-action: b-button(
              type="is-primary"
              @click="resetPassword",
              :loading="isResettingPassword"
              expanded) RESET PASSWORD
            .btn-cancel.btn-action: b-button(@click="showLoginForm = true", :disabled="isResettingPassword" expanded) Cancel
</template>

<script>
import gql from 'graphql-tag'
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
import FormInput from '~/components/atoms/Form/Input'

export default {
  name: 'XPLogin',
  components: { FormInput },
  props: {
    fullScreen: Boolean,
  },
  modal: {
    width: 640,
  },
  data() {
    return {
      emailAddress: '',
      password: '',
      showLoginForm: true,
      isResettingPassword: false,
      isLoggingIn: false,
      isLoggingInSocialMedia: false,
      isCheckingUserDetails: false,
    }
  },
  computed: {
    ...mapFields('v2/signup', ['form.email', 'form.firstName', 'form.lastName', 'form.socialMediaAvatar']),
    ...mapGetters({
      getMedalClaimDetails: 'medals/getMedalClaimDetails',
    }),
  },
  watch: {
    isLoggedIn(value) {
      if (value) {
        this.doAfterLogin()
      }
    },
  },
  mounted() {
    this.$appClient.segment.trackClickedToSignIn()
  },
  methods: {
    ...mapActions({
      setTeamManagementInvite: 'team-management/setTeamManagementInvite',
      setMedalIsClaiming: 'medals/setMedalIsClaiming',
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
      setUserOwnerDetails: 'user/setUserOwnerDetails',
    }),
    showForgotPassword() {
      this.showLoginForm = false
    },
    closeModal() {
      if (this.$parent?.close) {
        this.$parent.close()
      }
    },
    async onClickLogInGoogle() {
      try {
        const result = await this.$store.dispatch('auth/logInWithGoogle')
        if (result !== null) this.isLoggingInSocialMedia = true
        if (result?.additionalUserInfo?.isNewUser) {
          const {
            additionalUserInfo: {
              // eslint-disable-next-line camelcase
              profile: { given_name, family_name, picture, email },
            },
          } = result

          // eslint-disable-next-line camelcase
          this.firstName = given_name
          // eslint-disable-next-line camelcase
          this.lastName = family_name
          this.socialMediaAvatar = picture
          this.email = email

          this.closeModal()
          this.$router.push({
            path: '/signup/user?step=2',
          })
          return
        }
        if (this.isLoggedIn) {
          this.doAfterLogin()
        }
      } catch (e) {
        this.$buefy.dialog.alert({
          title: 'Log In Error',
          message: e.message || 'Log In failed, please try again.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
      }
    },
    async onClickLogInFacebook() {
      try {
        const result = await this.$store.dispatch('auth/logInWithFacebook')
        if (result !== null) this.isLoggingInSocialMedia = true
        if (result?.additionalUserInfo?.isNewUser) {
          const {
            additionalUserInfo: {
              // eslint-disable-next-line camelcase
              profile: { given_name, family_name, picture, email },
            },
          } = result

          // eslint-disable-next-line camelcase
          this.firstName = given_name
          // eslint-disable-next-line camelcase
          this.lastName = family_name
          this.socialMediaAvatar = picture
          this.email = email

          this.closeModal()
          this.$router.push({
            path: '/signup/user?step=2',
          })
          return
        }
        if (this.isLoggedIn) {
          this.doAfterLogin()
        }
      } catch (e) {
        this.$buefy.dialog.alert({
          title: 'Log In Error',
          message: e.message || 'Log In failed, please try again.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
      }
    },
    async onClickLogIn() {
      this.isLoggingIn = true
      try {
        await this.$store.dispatch('auth/logInWithEmail', { email: this.emailAddress, password: this.password })
        if (this.isLoggedIn) {
          this.doAfterLogin()
        }
      } catch (e) {
        //
        this.$buefy.dialog.alert({
          title: 'Log In Error',
          message: e.message || 'Log In failed, please try again.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
        this.isLoggingIn = false
      }
    },
    async resetPassword() {
      this.isResettingPassword = true
      const result = await this.$store.dispatch('auth/forgotPassword', { email: this.emailAddress })
      if (result?.error) {
        this.$buefy.dialog.alert({
          title: 'Password Reset Error',
          message: result.error?.message || 'Password Reset failed, please try again.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
        this.isResettingPassword = false
        return
      }
      this.$buefy.dialog.alert({
        title: 'Password Reset E-mail Sent',
        message:
          'A password reset confirmation has been sent to your e-mail address. Please follow the steps there to complete the reset. Thank you!',
        type: 'is-success',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true,
      })
      this.isResettingPassword = false
      this.closeModal()
    },
    async doAfterLogin() {
      this.clearSignUpStorage()
      this.$store.commit('app/setCurrentBusiness', null)
      const details = {
        userId: this.$store.state.auth?.uid,
      }
      await this.$appClient.segment.identifyProfile()
      await this.$appClient.segment.trackUserLogIn(details)
      await this.doAcceptTeamInvite()

      if (this.$store.getters['business-claim/getBusinessClaimIsClaiming']) {
        try {
          const { data } = await this.$apollo.mutate({
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
            location.href = `/b/${business?.data?.Business?.slug}`
          }
        } catch (error) {
          error.graphQLErrors.forEach((error) => {
            this.$toast.error(error.message, { duration: 3000, position: 'top-center' })
          })
          this.doTrackSegmentError(error, 'Login')
        }
      } else if (this.$route.name !== 'team-invitation-id') {
        // this.$router.push({
        //   path: '/',
        // })
      }
      await this.doRetrieveMemberDetails()
      if (!this.isCheckingUserDetails) {
        const route = this.$route

        if (route.name === 'signup-user') {
          this.$router.push({
            path: '/my-feed',
          })
        }
        this.closeModal()
      }
    },
    async doGoToSignUp() {
      if (this.$route.name === 'team-invitation-id') {
        await this.setTeamManagementInvite({
          isInviting: true,
          id: this.$route?.params?.id,
        })
      } else {
        await this.setTeamManagementInvite(null)
      }
      await this.$router.push('/signup/user?step=1')
      this.closeModal()
    },
    async doAcceptTeamInvite() {
      if (this.$route.name !== 'team-invitation-id') return
      try {
        await this.$apollo.mutate({
          variables: {
            action: 'responseInvite',
            status: 'Active',
            inactiveReason: undefined,
            id: this.$route?.params?.id,
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
      } catch (error) {
        error.graphQLErrors.forEach((error) => {
          this.doShowAcceptInvitationModal('error', error.message)
        })
        this.doTrackSegmentError(error, 'Team Invitation')
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
    async doMedalClaim() {
      const route = this.$route
      const userMedalID = this.getMedalClaimDetails?.id

      if (userMedalID) {
        await this.$api.NFTClaimMemberProfile({ userMedalID })
        if (route.name === 'signup-user') {
          this.$router.push({
            path: '/my-feed',
          })
        } else {
          this.$router.push({
            path: route?.path,
          })
        }

        this.setMedalIsClaiming(false)
        this.setMedalClaimDetails(null)
      }
    },
    async doRetrieveMemberDetails() {
      const {
        Me: { Owner },
      } = await this.$api.getMyProfile()

      if (Owner) {
        this.setUserOwnerDetails(Owner)
        await this.doMedalClaim()
      } else {
        this.isCheckingUserDetails = true
        this.email = this.emailAddress

        if (this.getMedalClaimDetails) {
          await this.doMedalClaim()
          this.closeModal()
          return
        }

        this.$toast.info(`Looks like your profile is incomplete. You will be redirected to complete your profile.`, {
          duration: 3000,
          position: 'top-center',
          onComplete: () => {
            this.$router.push({
              path: '/signup/user?step=2',
            })
            this.closeModal()
          },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section::v-deep {
  .login-form {
    width: 100%;
    max-width: 400px;
    margin: auto;
    background: #fff;

    .links-label {
      p {
        margin: 10px 0;
        font-size: 12px;
        color: #9b9b9b;
      }

      .underline-label {
        width: max-content;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .or-container {
      .section-hr {
        width: 47%;
        float: left;
      }

      .border-hr {
        border-top: 1px solid #cfd4d5;
      }

      p {
        width: 16%;
        text-align: center !important;
      }
    }

    .social-login-btn {
      width: 100%;
      margin-left: auto;
      margin-right: auto;

      .left-icon {
        width: 18px;
      }

      .btn-label {
        font-size: 12px;
        text-align: center;
        width: 90%;
      }

      .social-buttons {
        color: black;
        border: 1px solid #e3e3e3;
        padding: 0.5rem;
        display: block;
        font-size: 12px;
        font-weight: 100 !important;
        cursor: pointer;
        height: 34px;
      }
    }
  }
}

.forgot-password-form {
  width: 100%;
  max-width: 400px;
  margin: auto;
  background: #fff;

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .btn-action {
      width: 48%;
    }
  }
}

.login {
  &.full-height {
    height: 100%;

    .close {
      text-align: right;
    }
  }
}
</style>
