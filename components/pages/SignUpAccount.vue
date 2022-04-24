<template lang="pug">
.xp-sign-up-account.fill.flex-center
  .contents
    XMSignUpHeader
      slot

    .flex.align-center.mt-5(v-show="!user")
      .pr-5.mb-4: b-radio(v-model="type" name="type" native-value="new" @input="setSignupIsNewUser(true)") I'M NEW
      .pr-5.mb-4: b-radio(v-model="type" name="type" native-value="existing" @input="setSignupIsNewUser(false)") I HAVE AN ACCOUNT

    .is-size-5.my-3 Sign up using
    .columns.is-vcentered.is-mobile.mb-0
      .column
        .flex.align-center.px-3.py-2.is-cursor-pointer(
          @click="clickSignUpGoogle"
          style="background: #eef1f1; font-weight: 300")
          img.mr-4(src="~/assets/icons/social/gmail.svg" width="24" height="24")
          span Google
      .column
        .flex.align-center.px-3.py-2.is-cursor-pointer(
          @click="clickSignUpFacebook"
          style="background: #eef1f1; font-weight: 300")
          img.mr-4(src="~/assets/icons/social/facebook.svg" width="24" height="24")
          span Facebook

    .flex-center.no-wrap.my-3
      .flex-grow
        div(style="height: 1px; background: #333")
      .flex-auto
        .px-3(style="font-weight: 300") OR
      .flex-grow
        div(style="height: 1px; background: #333")

    form(action="#" autocomplete="off")
      .mb-5
        b-input(
          v-model="email"
          placeholder="Email",
          :disabled="isSubmitting"
          is-transparent
          @keyup.enter.native="clickNext()")
        XAValidationError(:value="validation.firstError('email')")

      .mb-5
        b-input(
          type="password"
          v-model="password"
          placeholder="Enter password"
          password-reveal,
          :disabled="isSubmitting"
          is-transparent
          @keyup.enter.native="clickNext()")

        XAValidationError(:value="validation.firstError('password')")

      template(v-if="type === 'new'")
        .mb-5
          b-input(
            type="password"
            v-model="passwordConfirm"
            password-reveal,
            :disabled="isSubmitting"
            placeholder="Enter password confirmation"
            is-transparent
            @keyup.enter.native="clickNext()")

          XAValidationError(:value="validation.firstError('passwordConfirm')")

        .agree.py-2: b-checkbox(v-model="agreed")
          | I agree to the terms of use and privacy policy

        XAValidationError(:value="validation.firstError('agreed')")

      .actions.flex-center.mt-6
        b-button.btn-fixed-width.is-uppercase(
          type="is-primary"
          @click.prevent="clickNext",
          :loading="isSubmitting",
          :disabled="isSubmitting") Next
</template>

<script>
import { Validator } from 'simple-vue-validator'
import { mapActions } from 'vuex'
import XMSignUpHeader from '~/components/molecules/SignUpHeader'
import XAValidationError from '~/components/atoms/ValidationError'
export default {
  name: 'XPSignUpAccount',
  components: { XAValidationError, XMSignUpHeader },
  props: {
    user: Boolean,
  },
  data() {
    return {
      isSubmitting: false,
      type: 'new',
      email: '',
      password: '',
      passwordConfirm: '',
      agreed: false,
    }
  },
  validators: {
    email(value) {
      return Validator.value(value).required('Email field is required.').email()
    },
    password(value) {
      return Validator.value(value).required('Password field is required.').minLength(8)
    },
    'passwordConfirm, password'(passwordConfirm, password) {
      if (this.type === 'new') {
        return Validator.value(passwordConfirm)
          .required('Password confirmation is required.')
          .match(password, `* Sorry, that password didn't match.`)
          .minLength(8)
      }
    },
    agreed(value) {
      if (this.type === 'new') {
        return Validator.custom(() => {
          if (!value) {
            return 'You must first agree with our terms and policy.'
          }
        })
      }
    },
  },
  created() {
    if (this.$route.query?.newUser) {
      this.showCreateProfileDialog({ redirectOnCompletion: true })
    }
  },
  async mounted() {
    await this.$appClient.segment.trackClickedToCreateAccount()
    if (this.isLoggedIn && this.$store.state.auth?.displayName === null) {
      this.showCreateProfileDialog({ redirectOnCompletion: true })
    }
    this.loadInitial()
  },
  methods: {
    ...mapActions({
      setSignupIsNewUser: 'signup/setSignupIsNewUser',
    }),
    async loadInitial() {
      const { email, password } = await this.$store.state.signup.initialSignUpDetails
      if (email && password) {
        this.email = email
        this.password = password
      }
      this.$store.dispatch('signup/setInitialSignUpDetails', { email: null, password: null })
    },
    async clickSignUpGoogle() {
      const result = await this.$store.dispatch('auth/logInWithGoogle')
      if (!result?.additionalUserInfo?.isNewUser) {
        this.$toast?.error('Sorry, this email address is already in use. Please try another.', {
          duration: 5000,
          position: 'top-center',
        })
        this.$store.dispatch('auth/logOut')
      } else {
        this.showCreateProfileDialog({ redirectOnCompletion: this.user })
      }
    },
    async clickSignUpFacebook() {
      const result = await this.$store.dispatch('auth/logInWithFacebook')
      if (!result?.additionalUserInfo?.isNewUser) {
        this.$toast?.error('Sorry, this email address is already in use. Please try another.', {
          duration: 5000,
          position: 'top-center',
        })
        this.$store.dispatch('auth/logOut')
      } else {
        this.showCreateProfileDialog({ redirectOnCompletion: this.user })
      }
    },
    async clickNext() {
      try {
        this.isSubmitting = true
        if (await this.$validate()) {
          const { email, password } = this
          const existing = this.type === 'existing'
          await this.$store.dispatch(existing ? 'auth/logInWithEmail' : 'auth/signUpWithEmail', { email, password })

          // const { data, errors } = await this.$apollo.query({
          //   query: gql`
          //     query {
          //       Me {
          //         Profile {
          //           Member {
          //             id
          //           }
          //         }
          //       }
          //     }
          //   `,
          // })
          // if (errors) {
          //   this.$toast.error(errors.message, {
          //     duration: 5000,
          //     position: 'top-center',
          //   })
          // }
          // if (!data.Me?.Profile?.Member?.id) {
          //   this.showCreateProfileDialog({ redirectOnCompletion: this.user })
          //   this.$router.push({
          //     query: { step: 2 },
          //   })
          // }

          this.$router.push({
            query: { step: 2 },
          })

          if (this.type === 'new') {
            this.showCreateProfileDialog({ redirectOnCompletion: this.user })
          }
        }
      } catch (error) {
        this.$toast.error(error.message, {
          duration: 5000,
          position: 'top-center',
        })
        this.doTrackSegmentError(error, 'Sign Up')
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-sign-up-account::v-deep {
  .contents {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    .agree {
      background-color: rgba($white, 0.8);
      font-weight: 300;
      display: flex;
    }

    .actions {
      button {
        width: 100%;
        max-width: 200px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .contents {
      padding: 0 15px;
    }
  }

  @media screen and (max-width: 427px) {
    .contents {
      .actions {
        button {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
