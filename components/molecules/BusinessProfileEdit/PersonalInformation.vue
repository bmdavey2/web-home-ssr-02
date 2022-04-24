<template lang="pug">
.xm-business-profile-edit-personal-information
  form(action="#" autocomplete="off")
    .inputs
      ._input.mb-5: FormInput(
        v-model="profile.name",
        :error="validation.firstError('profile.name')"
        label="Business Name")
      ._input.mb-5: FormInput(v-model="profile.website" label="Website address")
      ._input.mb-5: FormSelect(v-model="profile.country" label="Country" optionsLabel="value", :options="countries")
      ._input.mb-5: FormInput(
        v-model="profile.postalCode",
        :error="validation.firstError('profile.postalCode')"
        label="Post code")
      ._input.mb-5: FormMobileNumber(
        v-model="profile.phoneNumber",
        :error="validation.firstError('profile.phoneNumber')"
        label="Phone Number")
      ._input.mb-5: FormSelect(
        v-model="profile.profileType"
        label="Which best describes your business?"
        optionsLabel="value",
        :options="businessDescriptions")
      ._input.full-width.mb-5(v-if="hasServices.includes(profile.profileType)")
        FormSelect(
          v-model="profile.serviceProvided",
          :options="services"
          optionsLabel="value"
          label="What type of services do you provide?",
          :close-on-select="false"
          multiple)
      ._input.full-width.mb-5(v-if="profile.profileType === 'Expert'"): XMBusinessProfileEditServiceExpert(
        v-model="profile.serviceProvided")
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
import XMBusinessProfileEditServiceExpert from '~/components/molecules/BusinessProfileEdit/ServiceExpert'

export default {
  name: 'XMBusinessProfileEditPersonalInformation',
  components: { FormInput, FormSelect, FormMobileNumber, FormDatePicker, XMBusinessProfileEditServiceExpert },
  data() {
    return {
      countries: this.$store.getters['countries/getCountries'],
      businessDescriptions: [
        { key: 'Event Organizer', value: 'Event Organizer' },
        { key: 'Travel & Tour Operator', value: 'Travel & Tour Operator' },
        { key: 'Governing Body', value: 'Governing Body' },
        { key: 'Consumer Goods', value: 'Consumer Goods' },
        { key: 'Expert', value: 'Expert' },
      ],
      hasServices: ['Travel & Tour Operator', 'Consumer Goods'],
      services: [],
      serviceLoad: true,
      slug: this.$route.params.profile,
      profile: [],
      isLoading: false,
    }
  },
  validators: {
    'profile.name': (value) => {
      return Validator.value(value).required('Business Name field is required.')
    },
    'profile.postalCode': (value) => {
      return Validator.value(value).required('Postal Code field is required.')
    },
    'profile.phoneNumber': (value) => {
      return Validator.value(value).required('Phone Number field is required.')
    },
  },
  watch: {
    'profile.profileType': {
      handler() {
        if (!this.serviceLoad) {
          this.doUpdateServices()
        } else {
          this.serviceLoad = false
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.loadProfileInfo()
  },
  methods: {
    doUpdateProfile() {
      const profile = this.profile

      let serviceProvided
      if (profile.serviceProvided !== null) {
        serviceProvided = profile.serviceProvided.map((service) => {
          if (service?.value) {
            return service?.value
          }
          return service
        })
      }

      this.$validate().then(async (success) => {
        if (success) {
          this.isLoading = true
          try {
            await this.$apollo.mutate({
              variables: {
                id: profile.id,
                input: {
                  name: profile.name,
                  website: profile.website,
                  country: profile.country,
                  postalCode: profile.postalCode,
                  phoneNumber: profile.phoneNumber,
                  profileType: profile.profileType || '',
                  serviceProvided: serviceProvided || '',
                },
              },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($id: String!, $input: InputBusiness!) {
                  editBusiness(id: $id, input: $input) {
                    success
                  }
                }
              `,
            })
          } catch (error) {
            this.doTrackSegmentError(error, 'Edit Business')
          } finally {
            this.isLoading = false
            this.$toast?.success(`Data has been saved successfully`, {
              duration: 3 * 1000,
              position: 'bottom-right',
            })

            this.$store.commit('control/setLoading', {
              name: `app/loading`,
              value: true,
            })

            location.href = `/b/${this.$route.params.profile}`
          }
        } else {
          this.$toast?.error(`Please Fill Up Required Forms`, {
            duration: 3 * 1000,
            position: 'bottom-right',
          })
        }
      })
    },
    doUpdateServices(load) {
      if (!load) {
        this.profile.serviceProvided = null
      }

      switch (this.profile.profileType) {
        case 'Travel & Tour Operator':
          this.services = [
            { key: 'Multi Day Tours', value: 'Multi Day Tours' },
            { key: 'Single Day Tours', value: 'Single Day Tours' },
            { key: 'Travel Products Only', value: 'Travel Products Only' },
          ]
          break

        case 'Consumer Goods':
          this.services = [
            { key: 'Apparel', value: 'Apparel' },
            { key: 'Footwear', value: 'Footwear' },
            { key: 'Accessories', value: 'Accessories' },
            { key: 'Equipment', value: 'Equipment' },
            { key: 'Supplements', value: 'Supplements' },
            { key: 'Hydration', value: 'Hydration' },
            { key: 'Nutrition', value: 'Nutrition' },
          ]
          break
      }
    },
    async loadProfileInfo() {
      try {
        const { data } = await this.$apollo.query({
          variables: { slug: this.slug },
          fetchPolicy: 'no-cache',
          query: gql`
            query ($slug: String) {
              Business(slug: $slug) {
                id
                name
                website
                country
                postalCode
                phoneNumber
                profileType
                personalStatus
                serviceProvided
              }
            }
          `,
        })
        const object = data?.Business

        this.profile = {
          id: object?.id,
          name: object?.name ? object?.name.replace(/&amp;/g, '&') : '',
          website: object?.website,
          country: object?.country,
          postalCode: object?.postalCode,
          phoneNumber: object?.phoneNumber,
          profileType: object?.profileType ? object?.profileType.replace('&amp;', '&') : null,
          personalStatus: object?.personalStatus,
          serviceProvided: object?.serviceProvided,
        }
        this.doUpdateServices(true)
      } catch (error) {
        this.doTrackSegmentError(error, 'Edit Business')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-business-profile-edit-personal-information::v-deep {
  form {
    .inputs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      ._input {
        width: calc(100% / 2 - 10px);

        &.full-width {
          width: 100%;
        }
      }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
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
