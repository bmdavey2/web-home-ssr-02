<template lang="pug">
.xo-signup-user-step-1.signup-process
  .container
    .contents.row.items-center
      .left-content: img(src="~assets/images/SignUp/step1.webp")
      .right-content
        .header.row.items-center
          .logo: img(src="~assets/icons/logo@3x.svg")
          ._label Tell us how you want to sign up
        form(autocomplete="off" @submit.prevent)
          .btn-action.btn-google.row.items-center.justify-center(
            @click.prevent="doSignUpGoogle()",
            :class="isSubmitting && 'disabled'")
            ._icon: img(src="~assets/images/SignUp/google.svg")
            ._label Sign Up with Google
          .btn-action.btn-facebook.row.items-center.justify-center(
            @click.prevent="doSignUpFacebook()",
            :class="isSubmitting && 'disabled'")
            ._icon: img(src="~assets/images/SignUp/facebook.svg")
            ._label Sign Up with Facebook

          .separator.mt-5.mb-5: span OR
          div(v-show="showEmail")
            .mb-5: FormInput(
              v-model.trim="email"
              placeholder="E-mail"
              is-large,
              :disabled="isSubmitting",
              :error="validation.firstError('email')"
              @enter="doCheckIfEmailExists()")
            .actions.mb-6: b-button.btn-action(
              type="is-primary"
              @click.prevent="doCheckIfEmailExists()",
              :disabled="isSignupEmailDisabled",
              :loading="isSubmitting") Sign Up via E-mail
          div(v-show="!showEmail")
            .mb-5: FormInput(
              v-model="password"
              type="password"
              placeholder="Enter Password",
              :disabled="isSubmitting",
              :error="validation.firstError('password')"
              is-large
              @enter="doSignUpViaEmail()")
            .actions.mb-6: b-button.btn-action(
              type="is-primary"
              @click.prevent="doSignUpViaEmail()",
              :loading="isSubmitting",
              :disabled="isSignupPasswordDisabled") Sign Up via E-mail

          .agree.row.items-center.justify-center
            b-checkbox(v-model="agree" aria-labelledby)
            ._label I agree to the #[router-link(to="/terms-conditions") terms of use] and #[router-link(to="/privacy-policy") privacy policy]

          .member-login.row.items-center.justify-center Already a Member? #[b-button(type="is-primary" @click.prevent="doShowLoginPopup") Login]
</template>

<script>
import gql from 'graphql-tag'
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import dialogs from '~/mixins/dialogs'
import FormInput from '~/components/atoms/Form/Input'

export default {
  name: 'XOSignUpUserStep1',
  components: { FormInput },
  mixins: [dialogs],
  validators: {
    email(value) {
      return Validator.value(value).required('Email field is required.').email(`That doesn't look like a valid email.`)
    },
    password(value) {
      if (!this.showEmail) {
        return Validator.value(value).required('Password field is required.').minLength(8)
      }
    },
  },
  data() {
    return {
      showEmail: true,
      isSubmitting: false,
      feedItems: null,
      isClaimingMedal: false,
    }
  },
  computed: {
    ...mapFields('v2/signup', [
      'form.email',
      'form.password',
      'form.agree',
      'form.firstName',
      'form.lastName',
      'form.socialMediaAvatar',
    ]),
    ...mapGetters({
      getMedalClaimDetails: 'medals/getMedalClaimDetails',
    }),
    isSignupEmailDisabled() {
      return !this.email || !this.agree
    },
    isSignupPasswordDisabled() {
      return !this.password || !this.agree
    },
  },
  watch: {
    feedItems: {
      deep: true,
      handler(value) {
        if (value.length) {
          window.location.href = '/my-feed'
        } else {
          this.doRetrieveMyFeed()
        }
      },
    },
    '$store.state.auth': {
      deep: true,
      async handler(value) {
        if (!this.isClaimingMedal) return

        const details = {
          userId: value?.uid,
        }

        await this.$api.NFTClaimMemberProfile({ userMedalID: this.getMedalClaimDetails?.id })
        await this.$appClient.segment.identifyProfile()
        await this.$appClient.segment.trackUserSignUp(details)
        this.doRetrieveMyFeed()
        this.setMedalClaimDetails(null)
      },
    },
  },
  methods: {
    ...mapActions({
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
    }),
    async doSignUpGoogle() {
      if (this.isSubmitting) return
      this.isSubmitting = true
      try {
        const result = await this.$store.dispatch('auth/logInWithGoogle')
        if (!result) return
        if (result?.additionalUserInfo?.isNewUser) {
          const {
            additionalUserInfo: {
              // eslint-disable-next-line camelcase
              profile: { given_name, family_name, picture },
            },
          } = result

          // eslint-disable-next-line camelcase
          this.firstName = given_name
          // eslint-disable-next-line camelcase
          this.lastName = family_name
          this.socialMediaAvatar = picture

          // if user is trying to claim medal
          if (this.getMedalClaimDetails) {
            this.isClaimingMedal = true
            return
          }

          // if user is trying to sign up using normal process
          this.$router.push({
            query: { step: 2 },
          })
          this.isSubmitting = false
        } else {
          const uid = result?.user?.uid
          const {
            data: { Member },
          } = await this.$apollo.query({
            variables: { UserID: uid },
            query: gql`
              query ($UserID: String) {
                Member(UserID: $UserID) {
                  id
                }
              }
            `,
          })

          if (!Member) {
            const {
              additionalUserInfo: {
                // eslint-disable-next-line camelcase
                profile: { given_name, family_name, picture },
              },
            } = result

            // eslint-disable-next-line camelcase
            this.firstName = given_name
            // eslint-disable-next-line camelcase
            this.lastName = family_name
            this.socialMediaAvatar = picture

            this.$router.push({
              query: { step: 2 },
            })
            return
          }
          this.$toast?.error('Sorry, this email address is already in use. Please try another.', {
            duration: 5000,
            position: 'top-center',
          })
          this.$store.dispatch('auth/logOut')
        }
      } catch (error) {
        this.isSubmitting = false
      } finally {
        this.isSubmitting = false
      }
    },
    async doSignUpFacebook() {
      if (this.isSubmitting) return
      this.isSubmitting = true
      try {
        const result = await this.$store.dispatch('auth/logInWithFacebook')
        if (!result) return
        if (result?.additionalUserInfo?.isNewUser) {
          // if user is trying to claim medal
          if (this.getMedalClaimDetails) {
            this.isClaimingMedal = true
            return
          }

          // if user is trying to sign up using normal process
          this.$router.push({
            query: { step: 2 },
          })
        } else {
          const uid = result?.user?.uid
          const {
            data: { Member },
          } = await this.$apollo.query({
            variables: { UserID: uid },
            query: gql`
              query ($UserID: String) {
                Member(UserID: $UserID) {
                  id
                }
              }
            `,
          })

          if (!Member) {
            const {
              additionalUserInfo: {
                // eslint-disable-next-line camelcase
                profile: { given_name, family_name, picture },
              },
            } = result

            // eslint-disable-next-line camelcase
            this.firstName = given_name
            // eslint-disable-next-line camelcase
            this.lastName = family_name
            this.socialMediaAvatar = picture

            this.$router.push({
              query: { step: 2 },
            })
            return
          }
          this.$toast?.error('Sorry, this email address is already in use. Please try another.', {
            duration: 5000,
            position: 'top-center',
          })
          this.$store.dispatch('auth/logOut')
        }
      } catch (error) {
        this.isSubmitting = false
      } finally {
        this.isSubmitting = false
      }
    },
    doCheckIfEmailExists() {
      if (this.isSignupEmailDisabled) return
      this.$validate().then(async (success) => {
        if (success) {
          this.isSubmitting = true
          try {
            const { data } = await this.$apollo.query({
              variables: {
                email: this.email,
              },
              query: gql`
                query ($email: String!) {
                  isExistingMemberEmail(email: $email)
                }
              `,
            })

            if (data?.isExistingMemberEmail) {
              if (this.getMedalClaimDetails) {
                this.$toast.error('This email is already been used by another account.', {
                  duration: 5000,
                  position: 'top-center',
                })
                return
              }
              this.$toast.error('This email is already been used by another account.', {
                duration: 5000,
                position: 'top-center',
              })
              return
            }

            this.showEmail = false
          } catch (error) {
            error.graphQLErrors.forEach((error) => {
              this.$toast.error(error.message, { duration: 5000, position: 'top-center' })
            })
            this.doTrackSegmentError(error, 'SignUp')
          } finally {
            this.isSubmitting = false
          }
        }
      })
    },
    doSignUpViaEmail() {
      if (this.isSignupPasswordDisabled) return
      this.isSubmitting = true
      this.$validate().then(async (success) => {
        if (success) {
          try {
            const { email, password } = this
            await this.$store.dispatch('auth/signUpWithEmail', { email, password })
            // if user is trying to claim medal
            if (this.getMedalClaimDetails) {
              this.isClaimingMedal = true
              return
            }

            // if user is trying to sign up using normal process
            this.$router.push({
              path: '/signup/user?step=2',
            })
            this.isSubmitting = false
          } catch (error) {
            this.doTrackSegmentError(error, 'SignUp')
            this.isSubmitting = false
          }
        } else {
          this.isSubmitting = false
        }
      })
    },
    async doRetrieveMyFeed() {
      const params = {
        CategoryID: null,
        count: 10,
      }

      const {
        Me: {
          Timeline: { items },
        },
      } = await this.$api.getMyFeed({ params })

      this.feedItems = items
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-signup-user-step-1::v-deep {
  .contents {
    min-height: calc(100vh - 65px) !important;

    @include max-width(767px) {
      min-height: 100vh !important;
    }

    .right-content {
      form {
        width: 100%;
        max-width: 400px;

        .btn-action {
          &.disabled {
            cursor: not-allowed;
            opacity: 0.8;
          }
        }

        .btn-google {
          background-color: $black;
        }

        .btn-facebook {
          background-color: #1877f2;
        }

        .separator {
          position: relative;
          text-align: center;
          font-size: 1.2857rem;

          &::before,
          &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            width: calc(100% / 2 - 20px);
            height: 1px;
            background-color: rgba($black, 0.1);
          }

          &::before {
            left: 0;
          }

          &::after {
            right: 0;
          }
        }

        .actions {
          @include max-width(767px) {
            margin-bottom: 20px !important;
          }
        }

        .agree {
          font-weight: 300;

          label {
            margin-right: 0;
          }

          a {
            color: $primary;
          }

          @include max-width(767px) {
            margin-bottom: 30px;

            label {
              align-self: flex-start;
            }

            ._label {
              flex: 10000 1 0;
            }
          }
        }

        .member-login {
          display: none;
          padding: 0;

          @include max-width(767px) {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
