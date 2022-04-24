<template lang="pug">
.xo-sign-up-business-details
  XMSignUpHeader.flex-auto.mb-5 Add some details to make it yours.

  .content-body.px-2
    .mb-5 Take your time, this information will help you reach more of the right people more often, telling them what your business is all about.
    .mb-5: b-input(v-model="value.name" name="name" placeholder="Business name *")
    .mb-5
      b-input(v-model="value.website" name="website" placeholder="Website address *")
    .mb-5
      b-input(v-model="value.email" name="email" placeholder="Customer service email", :loading="validatingEmail")
      XAValidationError.mb-2(:value="errors.email")
    .mb-5
      b-select(v-model="value.country" name="country" placeholder="Country *" expanded)
        option(v-for="item in countries", :value="item") {{ item }}
    .mb-5: b-input(v-model="value.postalCode" name="postalCode" placeholder="Postcode *")
    .mb-5
      b-select(
        v-model="value.profileType"
        name="profileType"
        placeholder="Which best describes your business? *"
        expanded)
        option(v-for="item in profileTypes", :value="item") {{ item }}
    .mb-5
      b-select(
        v-if="servicesProvided"
        v-model="value.serviceProvided"
        name="profileType"
        placeholder="What type of services do you provide? *"
        expanded)
        template(v-for="item in servicesProvided")
          optgroup(v-if="typeof item === 'object'", :label="item.group")
            option(v-for="option in item.items", :value="option") {{ option }}
          option(v-else, :value="item") {{ item }}

    .agree.py-2: b-checkbox.align-center(v-model="value.nonProfitBusiness") We're a non for profit business

  .flex-auto.flex-center.mt-5
    b-button.mr-2(type="is-primary" @click="onClickBack" outlined) BACK
    b-button(type="is-primary" @click="onClickNext", :disabled="disabled")
      | NEXT -
      i Only 1 step to go
</template>

<script>
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
import profileTypes from '~/assets/json/businessProfileType.json'
import country from '~/assets/json/country.json'
import XAValidationError from '~/components/atoms/ValidationError'
import XMSignUpHeader from '~/components/molecules/SignUpHeader'

export default {
  name: 'XOSignUpBusinessDetails',
  components: { XAValidationError, XMSignUpHeader },
  props: {
    value: Object,
  },
  data() {
    return {
      validatingEmail: false,
      isEmailValid: true,
      profileTypes: Object.keys(profileTypes),
      countries: country.map((x) => x.name),
      errors: {
        email: null,
      },
    }
  },
  computed: {
    servicesProvided() {
      return profileTypes[this.value.profileType]
    },
    disabled() {
      return (
        this.validatingEmail ||
        !this.isEmailValid ||
        !this.value.name ||
        !this.value.website ||
        !this.value.country ||
        !this.value.postalCode ||
        !this.value.profileType ||
        (this.servicesProvided && !this.value.serviceProvided)
      )
    },
  },
  watch: {
    'value.email'(email) {
      if (!email) {
        this.isEmailValid = true
      } else {
        this.validateEmail()
      }
    },
    'value.profileType'() {
      this.value.serviceProvided = []
    },
    isEmailValid(value) {
      this.errors.email = value ? null : 'The email you entered is invalid or already used.'
    },
  },
  methods: {
    validateEmail: debounce(async function () {
      try {
        this.validatingEmail = true
        const {
          data: { isUniqueBusinessEmail },
        } = await this.$apollo.query({
          variables: {
            email: this.value.email,
          },
          query: gql`
            query ($email: String!) {
              isUniqueBusinessEmail(email: $email)
            }
          `,
        })
        this.isEmailValid = isUniqueBusinessEmail
      } catch (e) {
        //
        this.isEmailValid = false
      } finally {
        this.validatingEmail = false
      }
    }, 500),
    onClickBack() {
      this.$emit('back')
    },
    onClickNext() {
      this.$emit('next')
      if (this.$store.getters['signup/getSignupIsNewUser']) {
        this.$router.push({
          query: { step: 5 },
        })
        return
      }
      this.$router.push({
        query: { step: 3 },
      })
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-sign-up-business-details::v-deep
  display: flex
  flex-direction: column
  height: 100%

  .content-body
    flex: 1 0 0
    overflow-y: auto
</style>
