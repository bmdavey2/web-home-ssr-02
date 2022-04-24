<template lang="pug">
.xo-medals-order-information.form-content
  h3 Information

  .mb-5: FormInput(
    v-model="name"
    placeholder="Full name",
    :error="validation.firstError('name')"
    is-medium
    has-focus
    has-custom-error-style
    @enter="doNextStep()")
  .mb-5: FormInput(
    v-model="email"
    placeholder="Email",
    :error="validation.firstError('email')"
    is-medium
    has-focus
    has-custom-error-style
    @enter="doNextStep()")
  .mb-5: FormMobileNumber(
    v-model="phoneNumber"
    placeholder="Phone number"
    is-medium
    has-focus
    has-custom-error-style,
    :error="validation.firstError('phoneNumber')"
    @enter="doNextStep()")
  .mb-6: FormInput(
    v-model="eventWebsite"
    placeholder="Event website/URL"
    is-medium
    has-focus
    has-custom-error-style,
    :error="validation.firstError('eventWebsite')"
    @enter="doNextStep()")

  .actions
    b-button.btn-next(type="is-primary" @click.prevent="doNextStep()") To Medal Design #[span.step 1/3]
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Form/Input'
import FormMobileNumber from '~/components/atoms/Form/MobileNumber'

export default {
  name: 'XOMedalsOrderInformation',
  components: { FormInput, FormMobileNumber },
  validators: {
    name(value) {
      return Validator.value(value).required('Full name field is required.')
    },
    email(value) {
      return Validator.value(value).required('Email field is required.').email(`That doesn't look like a valid email.`)
    },
    phoneNumber(value) {
      return Validator.value(value).required('Phone number field is required.')
    },
    eventWebsite(value) {
      return Validator.value(value).required('Event website field is required.')
    },
  },
  computed: {
    ...mapFields('medals', ['order.name', 'order.email', 'order.phoneNumber', 'order.eventWebsite']),
  },
  methods: {
    doNextStep() {
      this.$validate().then((success) => {
        if (success) {
          this.$root.$emit('set/active/form', 2)
          window.scrollTo(0, 0)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-medals-order-information::v-deep {
  width: 100%;
  max-width: 575px;

  @include max-width(1023px) {
    max-width: 100%;
  }

  h3 {
    margin-bottom: 50px;

    @include max-width(767px) {
      margin-bottom: 30px;
    }
  }
}
</style>
