<template lang="pug">
.login-card.is-flex.is-justify-content-center.is-align-items-center
  .card
    .card-content
      .container
        .is-flex.is-justify-content-center
          img(:src="require(`~/assets/icons/primary/getstarted.svg`)")
        p.has-text-black Sign up using

        .social-login.is-flex.my-1.is-justify-content-space-between
          .social-login-btn
            .social-buttons.has-text-weight-regular.is-flex.is-align-items-center(@click="clickSignUpGoogle")
              .left-icon.mr-3.is-flex.is-flex-wrap-wrap
                img(src="~assets/icons/social/google.svg")
              .btn-label Google

          .social-login-btn
            .social-buttons.has-text-weight-regular.is-flex.is-align-items-center(@click="clickSignUpFacebook")
              .left-icon.mr-3.is-flex.is-flex-wrap-wrap
                img(src="~assets/icons/social/facebook.svg")
              .btn-label Facebook

        img.mt-2(:src="require(`~/assets/icons/ordivider.svg`)")

        FormInput(
          v-model="email"
          placeholder="Email",
          :disabled="isSubmitting",
          :error="validation.firstError('email')")

        //- :class='validation.firstError(\'email\') ?  "":  "pt-3"'

        FormInput.pb-2(
          :class="validation.firstError('email') ? '' : 'pt-3'"
          v-model="password"
          type="password"
          placeholder="Password",
          :disabled="isSubmitting",
          :error="validation.firstError('password')")

        //- :class='validation.firstError(\'password\') ?  "":  "pt-3"'
        .is-flex.is-justify-content-center.is-flex-wrap-nowrap(
          :class="validation.firstError('password') ? '' : 'pt-3'")
          b-field
            b-radio.has-text-weight-light.has-text-grey(v-model="agree" size="is-medium" native-value="true")
              p.is-size-6 I agree to the terms of use and privacy policy
        XAValidationError.is-center(:value="validation.firstError('agree')")
        //- :class='validation.firstError(\'agreed\') ?  "":  "mt-3"'
        .is-flex.is-justify-content-center
          b-button.btn-next(
            :class="validation.firstError('agreed') ? '' : 'mt-3'"
            type="is-primary"
            @click="userSignup",
            :loading="isSubmitting",
            :disabled="isSubmitting") Next
</template>

<script>
import gql from 'graphql-tag'
import { mapFields } from 'vuex-map-fields'
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Form/Input'
import XAValidationError from '~/components/atoms/ValidationError'

export default {
  name: 'XOHomeSignUpCard',
  components: { XAValidationError, FormInput },
  data() {
    return {
      isSubmitting: false,
      type: 'new',
      user: true,
    }
  },
  validators: {
    email(value) {
      return Validator.value(value).required('Email field is required.').email()
    },
    password(value) {
      return Validator.value(value).required('Password field is required.').minLength(8)
    },
    agree(value) {
      if (this.type === 'new') {
        return Validator.custom(() => {
          if (!value) {
            return 'You must first agree with our terms and policy.'
          }
        })
      }
    },
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
  },
  mounted() {
    if (this.isLoggedIn && this.$store.state.auth?.displayName === null) {
      this.showCreateProfileDialog({ redirectOnCompletion: true })
    }
  },
  methods: {
    userSignup() {
      this.isSubmitting = true

      this.$validate().then(async (success) => {
        try {
          if (success) {
            const { email, password } = this
            await this.$store.dispatch('auth/signUpWithEmail', { email, password })
            this.$router.push({
              path: '/signup/user?step=2',
            })
          }
        } catch (error) {
          this.$toast.error(error.message, { duration: 5000, position: 'top-center' })
        } finally {
          this.isSubmitting = false
        }
      })
    },
    async clickSignUpGoogle() {
      this.isSubmitting = true
      try {
        const result = await this.$store.dispatch('auth/logInWithGoogle')
        if (!result) return
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

          this.$router.push({
            path: '/signup/user?step=2',
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
                profile: { given_name, family_name, picture, email },
              },
            } = result

            // eslint-disable-next-line camelcase
            this.firstName = given_name
            // eslint-disable-next-line camelcase
            this.lastName = family_name
            this.socialMediaAvatar = picture
            this.email = email

            this.$router.push({
              path: '/signup/user?step=2',
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
      } finally {
        this.isSubmitting = false
      }
    },
    async clickSignUpFacebook() {
      this.isSubmitting = true
      try {
        const result = await this.$store.dispatch('auth/logInWithFacebook')
        if (!result) return
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

          this.$router.push({
            path: '/signup/user?step=2',
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
                profile: { given_name, family_name, picture, email },
              },
            } = result

            // eslint-disable-next-line camelcase
            this.firstName = given_name
            // eslint-disable-next-line camelcase
            this.lastName = family_name
            this.socialMediaAvatar = picture
            this.email = email

            this.$router.push({
              path: '/signup/user?step=2',
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
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-card {
  height: 400px !important;

  .card {
    width: 442px;
    margin: 10px 0 auto;
    border-radius: 4%;
    .card-content {
      padding: 1rem 1.5rem !important;
    }

    .is-center::v-deep {
      max-width: max-content;
      margin: 0 auto !important;
    }

    .btn-next {
      width: 200px;
    }

    .social-login {
      width: 100%;

      .social-login-btn {
        .left-icon {
          width: 24px;
        }

        .btn-label {
          text-align: center;
        }

        .social-buttons {
          background: #eef1f1;
          border-radius: 3px;
          padding: 0.5rem 20px;
          width: 161px;
          height: 40px;
          font-weight: 100 !important;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
