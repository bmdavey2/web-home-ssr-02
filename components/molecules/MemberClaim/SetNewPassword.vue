<template lang="pug">
.xm-member-claim-set-new-password
  .card
    .card-content
      .header
        h2 Welcome to ActivePlace!
        p Please set a password to finalize your profile. Passwords must contain at least 8 characters and 1 symbol.
      .content
        form(action="#" autocomplete="off")
          .mb-5: FormInput(
            v-model="password"
            type="password"
            placeholder="New Password",
            :disabled="isSubmitting",
            :error="validation.firstError('password')"
            @enter="doUpdatePassword()")
          .mb-6: FormInput(
            v-model="passwordConfirmation"
            type="password"
            placeholder="Repeat Password",
            :disabled="isSubmitting",
            :error="validation.firstError('passwordConfirmation')"
            @enter="doUpdatePassword()")
          .actions: b-button.is-uppercase(
            type="is-primary"
            expanded,
            :loading="isSubmitting"
            @click.prevent="doUpdatePassword()") Set Password
</template>

<script>
import gql from 'graphql-tag'
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Form/Input'

export default {
  name: 'XMMemberClaimSetNewPassword',
  components: { FormInput },
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
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      isSubmitting: false,
    }
  },
  methods: {
    doUpdatePassword() {
      this.isSubmitting = true
      const auth = this.$fire.auth

      this.$validate().then(async (success) => {
        if (success) {
          try {
            await auth.currentUser.updatePassword(this.password)
            this.$toast.success('You have successfully set your password.', { duration: 5000, position: 'top-center' })
            await this.doUpdateMemberClaim()
            this.$parent.close()
          } catch (error) {
          } finally {
            this.isSubmitting = false
          }
        } else {
          this.isSubmitting = false
        }
      })
    },
    async doUpdateMemberClaim() {
      try {
        await this.$apollo.mutate({
          variables: {
            input: {
              claimed: true,
            },
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($input: InputProfile!) {
              editProfile(input: $input) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'RaceRoster Member Claim')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-member-claim-set-new-password::v-deep {
  .card {
    .card-content {
      padding: 50px;

      .header {
        text-align: center;

        h2 {
          font-size: 2rem;
          line-height: 1.2;
          color: $secondary;
        }

        p {
          margin-bottom: 20px;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
