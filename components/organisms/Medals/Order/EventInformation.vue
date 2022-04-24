<template lang="pug">
.xo-medals-order-event-information.form-content(ref="eventInformation")
  h3 Event information

  .mb-5: FormInput(
    v-model="eventName"
    placeholder="Name of event"
    is-medium
    has-focus
    has-custom-error-style,
    :error="validation.firstError('eventName')")
  .mb-5: FormInput(v-model="companyName" placeholder="Company name" is-medium has-focus has-custom-error-style)
  //- .mb-5: FormInput(
    v-model="eventType"
    placeholder="Type: running, swimming, cycling, triathlon, etc."
    is-medium
    has-focus
    has-custom-error-style,
    :error="validation.firstError('eventType')")
  .mb-5: FormMobileNumber(
    v-model="eventParticipants"
    placeholder="Expected participants"
    is-medium
    has-focus
    has-custom-error-style,
    :error="validation.firstError('eventParticipants')")
  .mb-5: XAFormDateRangePicker(
    v-model="eventDate"
    placeholder="Date event"
    format="MM/DD/YYYY"
    is-medium
    has-focus
    has-custom-error-style
    @clear="doClearDate()",
    :error="validation.firstError('eventDate')")
  .mb-6: XAFormPlaceAutoComplete(
    :value="eventLocation"
    placeholder="Location"
    is-city-only
    is-medium
    has-focus
    has-custom-error-style
    @updateText="setLocation")

  .mb-5
    p How many events do you operate per year?
    .events.row.justify-between
      .event.row.items-center.justify-center(
        v-for="(event, index) in events",
        :class="eventFrequency === event && 'active'"
        @click.prevent="eventFrequency = event") {{ event }}

  .mb-6
    p Across all your events, how many total participants enter each year?
    .participants.row.justify-between
      .participant.row.items-center.justify-center.col(
        v-for="(participant, event) in participants",
        :class="eventAnnualParticipants === participant && 'active'"
        @click.prevent="eventAnnualParticipants = participant") {{ participant }}

  .actions
    b-button.btn-prev(type="is-light" @click.prevent="doPrevStep()"): b-icon(icon="chevron-left")
    b-button.btn-next(type="is-primary", :loading="isSubmitting" @click.prevent="doNextStep()") Send Enquiry #[span.step 3/3]
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { Validator } from 'simple-vue-validator'
import FormInput from '~/components/atoms/Form/Input'
import FormMobileNumber from '~/components/atoms/Form/MobileNumber'
import XAFormDateRangePicker from '~/components/atoms/Form/DateRangePicker'
import XAFormPlaceAutoComplete from '~/components/atoms/Form/PlaceAutoComplete'

export default {
  name: 'XOMedalsOrderEventInformation',
  components: { FormInput, FormMobileNumber, XAFormDateRangePicker, XAFormPlaceAutoComplete },
  validators: {
    eventName(value) {
      return Validator.value(value).required('Name of event field is required.')
    },
    // eventType(value) {
    //   return Validator.value(value).required('Type field is required.')
    // },
    eventParticipants(value) {
      return Validator.value(value).required('Expected participants field is required.')
    },
    eventDate(value) {
      return Validator.value(value).required('Date event field is required.')
    },
    // eventLocation(value) {
    //   return Validator.value(value).required('Location field is required.')
    // },
  },
  data() {
    return {
      events: ['1', '2-5', '6 or more'],
      participants: ['100-1000', '1000-3000', '3000-6000', '6000+'],
      isSubmitting: false,
      eventCountry: '',
      selectedCountry: null,
      eventCity: '',
    }
  },
  computed: {
    ...mapFields('medals', [
      'order.eventName',
      'order.companyName',
      'order.eventType',
      'order.eventParticipants',
      'order.eventDate',
      'order.eventLocation',
      'order.eventFrequency',
      'order.eventAnnualParticipants',
      'order.isSuccess',
    ]),
    ...mapGetters({
      getMedalOrder: 'medals/getMedalOrder',
    }),
  },
  methods: {
    doClearDate() {
      this.eventDate = null
    },
    doPrevStep() {
      this.$root.$emit('set/active/form', 2)
    },
    doNextStep() {
      this.isSubmitting = true

      this.$validate().then(async (success) => {
        if (success) {
          try {
            const {
              name,
              email,
              phoneNumber,
              eventWebsite,
              medalDesign,
              marketingActivation,
              eventName,
              companyName,
              eventType,
              eventParticipants,
              eventDate,
              eventLocation,
              eventFrequency,
              eventAnnualParticipants,
            } = this.getMedalOrder

            const eventStartDate = this.$root.$options.filters.dateFormat(eventDate?.startDate, 'YYYY-MM-DD')
            const eventEndDate = this.$root.$options.filters.dateFormat(eventDate?.endDate, 'YYYY-MM-DD')

            await this.$api.createFormEntry({
              type: 'DigitalNFTMedalForm',
              data: {
                name,
                email,
                phoneNumber,
                eventWebsite,
                medalDesign,
                marketingActivation,
                eventName,
                companyName,
                eventType,
                eventParticipants,
                eventStartDate,
                eventEndDate,
                eventLocation,
                eventFrequency,
                eventAnnualParticipants,
              },
            })
            this.isSuccess = true
            this.$router.push({
              path: '/medals/order/success',
            })
          } catch (error) {
          } finally {
            this.isSubmitting = false
          }
        } else {
          const element = this.$refs.eventInformation
          const top = element.offsetTop + 100
          window.scrollTo(0, top)
          this.isSubmitting = false
        }
      })
    },
    setLocation(value) {
      this.eventLocation = value
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-medals-order-event-information::v-deep {
  width: 100%;
  max-width: 575px;

  @include max-width(1023px) {
    max-width: 100%;
  }

  h3 {
    margin-bottom: 50px;
  }

  p {
    font-size: 1.1429rem;
    line-height: 1.7143rem;
    font-weight: 500;
    color: $black;
    margin-bottom: 15px;
  }

  .events,
  .participants {
    .event,
    .participant {
      border: 1px solid #e5e5e5;
      color: rgba($black, 0.5);
      border-radius: 5px;
      height: 56px;
      font-size: 1.1429rem;
      font-weight: 100;
      line-height: 28px;
      letter-spacing: -0.28px;
      width: calc(100% / 3 * 1 - 5px);
      cursor: pointer;

      &.active {
        background-color: #886bf2;
        color: $white;
      }
    }

    .participant {
      padding: 0 15px;
      margin-right: 5px;
      width: auto;

      @include max-width(767px) {
        flex: none;
        width: calc(50% - 5px);
        margin: 0 0 10px;
      }

      &:last-child {
        flex: none;
        margin: 0;
      }
    }
  }

  .actions {
    .btn-prev {
      background-color: #f8f8f8 !important;
    }

    .btn-next {
      @include max-width(767px) {
        width: calc(100% - 70px) !important;
        white-space: unset;
      }
    }
  }

  .form-error {
    font-size: 1rem;
    font-weight: 300;
    margin-top: 3px;
    color: #ffaf23;
  }
}
</style>
