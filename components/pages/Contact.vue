<template lang="pug">
.xp-contact
  .banner: h1 General enquiries take flight here!
  .container.is-max-widescreen
    .contents
      .left-content: h1 General enquiries take flight here!
      .right-content
        form(action="#" autocomplete="off")
          .mb-5: FormInput(
            v-model="firstName"
            placeholder="First Name",
            :disabled="isSubmitting",
            :error="validation.firstError('firstName')"
            error-class="has-text-white")
          .mb-5: FormInput(
            v-model="lastName"
            placeholder="Last Name",
            :disabled="isSubmitting",
            :error="validation.firstError('lastName')"
            error-class="has-text-white")
          .mb-5: FormInput(v-model="businessName" placeholder="Business Name", :disabled="isSubmitting")
          .mb-5: FormInput(
            v-model="email"
            type="email"
            placeholder="Email",
            :disabled="isSubmitting",
            :error="validation.firstError('email')"
            error-class="has-text-white")
          .mb-5: FormMobileNumber(v-model="phoneNumber" placeholder="Phone Number", :disabled="isSubmitting")
          .mb-6: FormTextarea(
            v-model="enquiry"
            placeholder="I'm enquiring because...",
            :min-height="160",
            :disabled="isSubmitting"
            is-auto-grow,
            :error="validation.firstError('enquiry')"
            error-class="has-text-white")
          .actions: b-button.is-uppercase(
            type="is-primary"
            expanded,
            :loading="isSubmitting"
            @click.prevent="doSubmitEnquiry()") Send Enquiry
</template>

<script>
import gql from 'graphql-tag'
import { Validator } from 'simple-vue-validator'
import { mapGetters, mapActions } from 'vuex'
import FormInput from '~/components/atoms/Form/Input'
import FormMobileNumber from '~/components/atoms/Form/MobileNumber'
import FormTextarea from '~/components/atoms/Form/Textarea'

export default {
  name: 'XPContact',
  components: { FormInput, FormMobileNumber, FormTextarea },
  validators: {
    firstName(value) {
      return Validator.value(value).required('First Name field is required.')
    },
    lastName(value) {
      return Validator.value(value).required('Last Name field is required.')
    },
    email(value) {
      return Validator.value(value).required('Email field is required.').email("That doesn't look like a valid email.")
    },
    enquiry(value) {
      return Validator.value(value).required('Enquiry field is required.')
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      businessName: '',
      email: '',
      phoneNumber: '',
      enquiry: '',
      isSubmitting: false,
    }
  },
  computed: {
    ...mapGetters({
      getMedalEnquiryMessage: 'medals/getMedalEnquiryMessage',
      getUserOwnerDetails: 'user/getUserOwnerDetails',
    }),
  },
  watch: {
    currentBusinessID() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.enquiry = ''
    },
  },
  mounted() {
    const owner = this.getUserOwnerDetails?.Owner

    if (!this.currentBusinessID) {
      this.firstName = owner?.firstName || ''
      this.lastName = owner?.lastName || ''
      this.email = this.$store.state.auth.email || ''
    }

    this.enquiry = this.getMedalEnquiryMessage || ''
  },
  methods: {
    ...mapActions({
      setMedalEnquiryMessage: 'medals/setMedalEnquiryMessage',
    }),
    doSubmitEnquiry() {
      this.isSubmitting = true
      this.$validate().then(async (success) => {
        if (success) {
          try {
            const input = {
              businessName: this.businessName,
              content: this.enquiry,
              email: this.email,
              firstName: this.firstName,
              lastName: this.lastName,
              phoneNumber: this.phoneNumber,
            }

            await this.$apollo.mutate({
              variables: {
                input,
              },
              mutation: gql`
                mutation ($input: InputInquiry!) {
                  createInquiry(input: $input) {
                    success
                  }
                }
              `,
            })

            this.$toast.success('Thank you, we’ll review your message and get back to you shortly.', {
              duration: 5000,
              position: 'top-center',
            })
            this.firstName = ''
            this.lastName = ''
            this.businessName = ''
            this.email = ''
            this.phoneNumber = ''
            this.enquiry = ''
            this.validation.reset()
            this.setMedalEnquiryMessage()
          } catch (error) {
            this.doTrackSegmentError(error, 'Contact')
          } finally {
            this.isSubmitting = false
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
.xp-contact::v-deep {
  min-height: calc(100vh - 111px);
  background-color: $white;
  background-image: url('~assets/images/Contact/background.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 45px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  h1 {
    font-size: 4.2857rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .banner {
    background-image: url('~assets/images/Contact/background.webp');
    min-height: 300px;
    background-size: cover;
    background-position: center;
    padding: 0 15px;
    display: none;
    flex-wrap: wrap;
    align-items: center;
    color: $white;
  }

  .contents {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .left-content {
      flex: 10000 1 0%;
      padding-right: 0.75rem;

      h1 {
        color: $white;
      }
    }

    .right-content {
      width: 100%;
      max-width: 475px;
      padding-left: 0.75rem;
    }
  }

  @media screen and (max-width: 1023px) {
    .contents {
      .left-content,
      .right-content {
        width: 100%;
        max-width: 50%;
      }
    }
  }

  @media screen and (max-width: 767px) {
    background-image: none;
    padding: 0 0 45px;

    h1 {
      font-size: 2.2857rem;
      text-align: center;
    }

    .banner {
      display: flex;
    }

    .contents {
      padding-top: 1.5rem;
      padding-bottom: 3rem;

      .left-content {
        display: none;
      }

      .right-content {
        max-width: 100%;

        .input-error {
          color: $danger !important;
        }
      }
    }
  }
}
</style>
