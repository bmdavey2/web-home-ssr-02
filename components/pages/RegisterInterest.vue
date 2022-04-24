<template lang="pug">
.xp-register-interest
  .card
    .header
      ._title Register Interest
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
    .card-content
      form(action="#")
        .mb-5: FormInput(v-model="firstName" label="First Name", :error="validation.firstError('firstName')")
        .mb-5: FormInput(v-model="lastName" label="Last Name", :error="validation.firstError('lastName')")
        .mb-5: FormInput(v-model="email" type="email" label="Email", :error="validation.firstError('email')")
        .mb-5: FormMobileNumber(v-model="phone" label="Phone", :error="validation.firstError('phone')")
        .mb-5: FormTextarea(v-model="message" placeholder="Message" is-auto-grow)
        .actions
          b-button.is-uppercase(type="is-primary", :loading="isSubmitting" @click.prevent="doRegisterInterest()") Send
</template>

<script>
import gql from 'graphql-tag'
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Form/Input'
import FormMobileNumber from '~/components/atoms/Form/MobileNumber'
import FormTextarea from '~/components/atoms/Form/Textarea'

export default {
  name: 'XPRegisterInterest',
  components: { FormInput, FormMobileNumber, FormTextarea },
  validators: {
    firstName(value) {
      return Validator.value(value).required('First name field is required')
    },
    lastName(value) {
      return Validator.value(value).required('Last name field is required')
    },
    email(value) {
      return Validator.value(value).required('Email field is required')
    },
    phone(value) {
      return Validator.value(value).required('Phone field is required')
    },
  },
  props: {
    product: Object,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      isSubmitting: false,
    }
  },
  methods: {
    doRegisterInterest() {
      this.isSubmitting = true

      this.$validate().then(async (success) => {
        if (success) {
          try {
            const input = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              phoneNumber: this.phone,
              message: this.message,
              productID: this.product?.id,
              targetBusinessID: this.product?.Business?.id,
            }

            await this.$apollo.mutate({
              variables: {
                input,
              },
              mutation: gql`
                mutation ($input: InputProductContactForm!) {
                  createProductContactForm(input: $input) {
                    success
                  }
                }
              `,
            })
            this.isSubmitting = false
            this.$parent.close()

            this.$buefy.modal.open({
              parent: this,
              component: require('~/components/molecules/RegisterInterestSuccess').default,
              props: {
                product: this.product,
              },
              width: 635,
              canCancel: false,
            })
          } catch (error) {
            this.doTrackSegmentError(error, 'MarketPlace Product')
          }
        } else {
          this.isSubmitting = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-register-interest::v-deep {
  .card {
    .header {
      position: relative;
      border-bottom: 1px solid #c2c8c9;
      padding: 17px 20px;

      ._title {
        font-weight: 500;
        text-align: center;
        text-transform: uppercase;
        color: $secondary;
      }

      .close {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    .card-content {
      padding: 50px 40px;

      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
    }
  }
}
</style>
