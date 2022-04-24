<template lang="pug">
.reset-password
  .card
    .card-content
      template(v-if="isSuccess")
        .icon-success: img(src="~assets/images/ResetPassword/success.svg" width="200" height="158")
        h1.heading-success Password successfully changed
        b-button.is-uppercase(type="is-primary", :loading="isSubmitting" expanded @click.prevent="doShowLoginModal()") Sign In
      template(v-else)
        h1 Please enter your new password
        p Passwords must be at least 8 characters long and contain 1 symbol

        form(action="#" autocomplete="off")
          .mb-5: FormInput(
            v-model="password"
            type="password"
            placeholder="New password",
            :disabled="isSubmitting",
            :error="validation.firstError('password')"
            @enter="doResetPassword()")
          .mb-6: FormInput(
            v-model="passwordConfirmation"
            type="password"
            placeholder="Repeat password",
            :disabled="isSubmitting",
            :error="validation.firstError('passwordConfirmation')"
            @enter="doResetPassword()")
          b-button.is-uppercase(type="is-primary", :loading="isSubmitting" expanded @click.prevent="doResetPassword()") Reset Password
</template>

<script>
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Form/Input'

export default {
  middleware: ['guestOnly'],
  components: { FormInput },
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      isSubmitting: false,
      isSuccess: false,
    }
  },
  validators: {
    password(value) {
      return Validator.value(value)
        .required('Password field is required.')
        .minLength(8)
        .regex(`[^A-Za-z0-9]`, 'Must contain at least 1 symbol')
    },
    'passwordConfirmation, password'(passwordConfirmation, password) {
      return Validator.value(passwordConfirmation)
        .required('Password confirmation is required.')
        .match(password, `* Sorry, that password didn't match.`)
        .minLength(8)
        .regex(`[^A-Za-z0-9]`, 'Must contain at least 1 symbol')
    },
  },
  watch: {
    async isLoggedIn(value) {
      if (value) {
        await this.$store.dispatch('auth/logOut')
      }
    },
  },
  methods: {
    doResetPassword() {
      this.isSubmitting = true

      this.$validate().then((success) => {
        if (success) {
          try {
            const auth = this.$fire.auth

            auth
              .checkActionCode(this.$route.query?.code)
              .then((email) => {
                auth
                  .signInWithEmailAndPassword(email?.data?.email, this.password)
                  .then(() => {
                    this.$toast.error('Please create a new password. That is your current password.', {
                      duration: 5000,
                      position: 'top-center',
                    })
                    this.isSubmitting = false
                  })
                  .catch(async () => {
                    await auth.confirmPasswordReset(this.$route.query?.code, this.password)
                    this.isSuccess = true
                    this.isSubmitting = false
                  })
              })
              .catch((this.isSubmitting = false))
          } catch (error) {
            // this.$toast.error(error.message, { duration: 5000, position: 'top-center' })
            this.isSubmitting = false
          }
        } else {
          this.isSubmitting = false
        }
      })
    },
    doShowLoginModal() {
      this.$router.push('/')
      this.showLogInDialog()
    },
  },
}
</script>

<style lang="scss" scoped>
.reset-password::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 100vh;

  .card {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;

    .card-content {
      padding: 60px;

      h1 {
        font-size: 2.8571rem;
        line-height: 3.5714rem;
        text-align: center;
        color: $secondary;
        letter-spacing: -0.8px;

        &.heading-success {
          margin-bottom: 25px;
        }
      }

      p {
        font-size: 1.1429rem;
        line-height: 1.4286rem;
        color: #65676b;
        text-align: center;
        margin: 25px 0 30px;
      }

      .icon-success {
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    max-width: 100%;

    .card {
      box-shadow: none;
      min-height: 100vh;

      .card-content {
        padding: 30px 20px;

        h1 {
          font-size: 2.2857rem;
          line-height: 2.5714rem;
        }
      }
    }
  }
}
</style>
