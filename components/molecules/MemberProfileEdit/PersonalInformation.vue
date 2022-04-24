<template lang="pug">
.xm-member-profile-edit-personal-information
  form(action="#" autocomplete="off" v-if="profile")
    .inputs
      ._input.mb-5: FormInput(
        v-model="profile.firstName",
        :error="validation.firstError('profile.firstName')"
        label="First name")
      ._input.mb-5: FormInput(
        v-model="profile.lastName"
        label="Surname",
        :error="validation.firstError('profile.lastName')")
      //- ._input.mb-5: FormSelect(v-model="profile.country" label="Country" optionsLabel="value", :options="countries")
      //- ._input.mb-5: FormInput(
        v-model="profile.postalCode"
        label="Post code",
        :error="validation.firstError('profile.postalCode')")
      .mb-5(style="width: 100%")
        .label Address
        XAFormPlaceAutoComplete(:value="address" @updateText="setValue" @getAddress="setData")
      ._input.mb-5: FormMobileNumber(v-model="profile.phoneNumber" label="Phone Number")
      ._input.mb-5: FormSelect(
        v-model="profile.personalStatus"
        label="Status Profile"
        optionsLabel="value",
        :options="statusList")
      ._input.mb-5: client-only: FormDatePicker(v-model="profile.birthDate" label="Date of Birth")
    .actions: b-button(type="is-primary" size="is-medium" @click.prevent="doUpdateProfile()") Save
  b-loading(v-model="isLoading")
</template>

<script>
import gql from 'graphql-tag'
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Form/Input'
import FormSelect from '~/components/atoms/Form/Select'
import FormMobileNumber from '~/components/atoms/Form/MobileNumber'
import FormDatePicker from '~/components/atoms/Form/DatePicker'
import XAFormPlaceAutoComplete from '~/components/atoms/Form/PlaceAutoComplete'

export default {
  name: 'XMMemberProfileEditPersonalInformation',
  components: { FormInput, FormSelect, FormMobileNumber, FormDatePicker, XAFormPlaceAutoComplete },
  data() {
    return {
      countries: this.$store.getters['countries/getCountries'],
      isLoading: false,
      profile: [],
      statusList: [
        { key: 'Getting Started', value: 'Getting Started' },
        { key: 'Exerciser', value: 'Exerciser' },
        { key: 'Competitor', value: 'Competitor' },
        { key: 'Certified coach', value: 'Certified coach' },
        { key: 'Professional Athlete', value: 'Professional Athlete' },
        { key: 'Personal Trainer', value: 'Personal Trainer' },
        { key: 'Entrepreneur', value: 'Entrepreneur' },
        { key: 'Blogger', value: 'Blogger' },
        { key: 'Health & Wellness', value: 'Health & Wellness' },
      ],
      address: '',
    }
  },
  validators: {
    'profile.firstName': (value) => {
      return Validator.value(value).required('First Name field is required.')
    },
    'profile.lastName': (value) => {
      return Validator.value(value).required('Last Name field is required.')
    },
    // 'profile.postalCode': (value) => {
    //   return Validator.value(value).required('Postal Code field is required.')
    // },
  },
  watch: {
    profile: {
      deep: true,
      handler(value) {
        this.address = `${value?.suburb}, ${value?.state}, ${value?.country}`
      },
    },
  },
  mounted() {
    if (!('geolocation' in navigator)) {
      this.errorData = 'Geolocation is not available.'
    }
    this.geocoder = new window.google.maps.Geocoder()
  },
  methods: {
    doUpdateProfile() {
      this.$validate().then(async (success) => {
        if (success) {
          this.isLoading = true
          try {
            if (!this.profile?.phoneNumber) {
              this.profile.phoneNumber = ''
            }
            await this.$apollo.mutate({
              variables: {
                input: this.profile,
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
            this.doTrackSegmentError(error, 'Profile Edit')
          } finally {
            this.isLoading = false
            this.$toast?.success(`Data has been saved successfully`, { duration: 3 * 1000, position: 'bottom-right' })

            this.$store.commit('control/setLoading', {
              name: `app/loading`,
              value: true,
            })

            this.$router.push({
              path: `/p/${this.$route.params?.profile}`,
            })
          }
        } else {
          this.$toast?.error(`Please Fill Up Required Forms`, { duration: 3 * 1000, position: 'bottom-right' })
        }
      })
    },
    setValue(txt) {
      this.address = txt
    },
    setData(txt) {
      this.profile.suburb = txt?.sub
      this.profile.state = txt?.state
      this.profile.country = txt?.country
    },
  },
  apollo: {
    profile: {
      fetchPolicy: 'no-cache',
      query: gql`
        query {
          Me {
            Profile {
              Member {
                firstName
                lastName
                country
                state
                suburb
                postalCode
                phoneNumber
                personalStatus
                birthDate
              }
            }
          }
        }
      `,
      update(data) {
        if (!data.Me?.Profile) return {}
        const object = data.Me.Profile?.Member
        return {
          firstName: object?.firstName ? object?.firstName.replace(/&amp;/g, '&') : '',
          lastName: object?.lastName ? object?.lastName.replace(/&amp;/g, '&') : '',
          country: object?.country,
          state: object?.state,
          suburb: object?.suburb,
          postalCode: object?.postalCode,
          phoneNumber: object?.phoneNumber,
          personalStatus: object?.personalStatus,
          birthDate: new Date(object?.birthDate),
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-member-profile-edit-personal-information::v-deep {
  form {
    .inputs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      ._input {
        width: calc(100% / 2 - 10px);
      }

      .label {
        font-weight: 400;
        margin-bottom: 3px;
        color: #65676b;
      }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .xa-form-autocomplete {
      .field {
        .control {
          .icon {
            height: 100%;

            .mdi {
              font-size: 1.4286rem;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    form {
      .inputs {
        ._input {
          width: 100%;
        }
      }
    }
  }
}
</style>
