<template lang="pug">
.xo-sign-up-profile-details
  XMSignUpHeader.flex-auto.mb-5 Add some details to make it yours.

  .content-body.px-2.mt-5
    .mb-5: b-input(v-model="value.firstName" name="firstName" placeholder="First Name")
    .mb-5: b-input(v-model="value.lastName" name="lastName" placeholder="Surname")
    .mb-5
      b-select(v-model="value.country" name="country" placeholder="Country *" expanded)
        option(v-for="item in countries", :value="item") {{ item }}
    .mb-5: b-input(v-model="value.postalCode" name="postalCode" placeholder="Postcode")
    .mb-5
      b-select(v-model="value.gender" name="gender" placeholder="Gender" expanded)
        option(v-for="item in gender", :value="item") {{ item }}
    .mb-5: FormDatePicker(v-model="value.birthDate" placeholder="Birth Date", :max-date="maxBirthDate")

    .mt-4(style="line-height: 16px") I'm best described as: *
    div(style="font-size: smaller; font-weight: 500") Select only 1

    XMInputPersonalStatus.my-4(v-model="value.personalStatus")

  .flex-auto.flex-center.mt-5
    b-button.mr-2(type="is-primary" @click="onClickBack" outlined) BACK
    b-button(type="is-primary" @click="onClickNext", :disabled="disabled") 1 MORE STEP
</template>

<script>
import XMSignUpHeader from '~/components/molecules/SignUpHeader'
import XMInputDatePicker from '~/components/molecules/Input/DatePicker'
import XMInputPersonalStatus from '~/components/molecules/Input/PersonalStatus'
import FormDatePicker from '~/components/atoms/Form/DatePicker'

import gender from '~/assets/json/gender.json'
import country from '~/assets/json/country.json'
export default {
  name: 'XOSignUpProfileDetails',
  components: { XMSignUpHeader, XMInputDatePicker, XMInputPersonalStatus, FormDatePicker },
  props: {
    value: Object,
  },
  data() {
    return {
      gender,
      countries: country.map((x) => x.name),
    }
  },
  computed: {
    disabled() {
      return (
        !this.value.firstName ||
        !this.value.lastName ||
        !this.value.country ||
        !this.value.postalCode ||
        !this.value.gender ||
        !this.value.birthDate ||
        !this.value.personalStatus
      )
    },
    maxBirthDate() {
      const today = new Date()
      const maxBirthDate = today.setFullYear(today.getFullYear() - 18)

      return new Date(maxBirthDate)
    },
  },
  methods: {
    onClickBack() {
      this.$emit('back')
    },
    onClickNext() {
      this.$emit('next')
      this.$router.push({
        query: { step: 3 },
      })
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-sign-up-profile-details::v-deep
  display: flex
  flex-direction: column
  height: 100%

  .content-body
    flex: 1 0 0
    overflow-y: auto
</style>
