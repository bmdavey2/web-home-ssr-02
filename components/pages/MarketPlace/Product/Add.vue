<template lang="pug">
.xp-marketplace-product-edit.py-6
  h1 Add Product
  form(action="#")
    .mb-5: FormInput(v-model="form.title" label="Name", :error="validation.firstError('form.title')")
    .form-column
      .left-column
        .mb-5: FormSelect(
          v-model="form.type"
          placeholder="Product type"
          label="Select types of products"
          optionsLabel="value",
          :options="types",
          :error="validation.firstError('form.type')")
      .right-column
        .mb-5
          .date
            ._label Select date
            .value(@click.prevent="showDateRange = true")
              .text {{ dateTextLabel }}
              b-icon(icon="calendar")
            .input-error(v-if="validation.firstError('date')") {{ validation.firstError('date') }}
        XAMarketPlaceDateRangePicker(
          is-modal
          v-if="showDateRange"
          @DoSelectDate="date = $event"
          @DoShowDateRange="showDateRange = $event")

    .form-column
      .left-column.mb-5
        .sub-column
          .left-sub-column
            FormSelect(
              v-model="form.startTime"
              label="Start Time"
              placeholder="From",
              :options="hours"
              optionsLabel="value",
              :error="validation.firstError('form.startTime')")
          .right-sub-column
            FormSelect(
              v-model="form.endTime"
              label="End Time"
              placeholder="To",
              :options="hours"
              optionsLabel="value",
              :error="validation.firstError('form.endTime')")
          //- .note Times are shown in Eastern European Time.
      .right-column.mb-5
        FormSelect(
          v-model="form.timezone"
          placeholder="Timezone"
          label="Select timezone",
          :options="timezones",
          :error="validation.firstError('form.timezone')")

    .form-column.distances-input
      .left-column(:class="newDistances.length ? 'mb-1' : 'mb-5'")
        b-field(label="Event Distance"): b-numberinput(v-model="distance", :controls="false", :min="0", :step="0.01")
        .input-error(v-if="validation.firstError('distance')" style="margin-top: -9px") {{ validation.firstError('distance') }}

      .center-column(:class="newDistances.length ? 'mb-1' : 'mb-5'")
        FormSelect(
          v-model="distanceUnit",
          :options="eventDistanceUnits"
          optionsLabel="value"
          label="Measurement Unit"
          placeholder="Select...",
          :error="validation.firstError('distanceUnit')")

      .right-column(:class="newDistances.length ? 'mb-1' : 'mb-5'")
        FormInput(v-model="distanceType" label="Distance Label")

      .btn-add-distance(
        :class="[validation.firstError('distanceUnit') && 'has-error', newDistances.length ? 'mb-1' : 'mb-5']"): b-button(
        label="Add Distance"
        type="is-primary",
        :disabled="!distance"
        @click.prevent="doAddDistance()")

    .distances-list.row.mb-5(v-if="newDistances.length")
      .distance-item.row.items-center(v-for="(distance, index) in newDistances", :key="index")
        span {{ distance.distance }}
        span {{ distance.distanceUnit }}
        span.ml-1(v-if="distance.distanceType") &mdash; {{ distance.distanceType }}
        span.btn-delete(@click.prevent="doDeleteDistance(index)"): b-icon(icon="close" custom-size="mdi-18px")

    .form-column.mb-5
      .label(style="width: 100%") Type
      .row.items-center
        .pr-5: b-radio(v-model="form.virtual", :native-value="true") Virtual
        div: b-radio(v-model="form.virtual", :native-value="false") Location
      .input-error(style="width: 100%") {{ validation.firstError('form.virtual') }}

    template(v-if="!form.virtual")
      .mb-5: FormInput(
        v-model="form.address1"
        placeholder="A place of business or potential park etc."
        label="Address",
        :error="validation.firstError('form.address1')")
      .form-column
        .left-column
          .mb-5: FormSelect(
            v-model="form.country",
            :options="countries"
            optionsLabel="value"
            label="Country"
            @input="form.state = null",
            :error="validation.firstError('form.country')")
        .right-column
          .mb-5: FormSelect(
            v-model="form.state",
            :options="states"
            optionsLabel="value"
            label="State",
            :error="validation.firstError('form.state')")
      .form-column
        .left-column
          .mb-5: FormInput(v-model="form.suburb" label="Suburb")
        .right-column
          .mb-5: FormInput(v-model="form.postcode" label="Postcode")

    .form-column.mb-5
      .label(style="width: 100%") Set price
      .currency
        FormSelect(
          v-model="form.currency",
          :options="currencies"
          optionsLabel="value"
          placeholder="Currency",
          :disabled="form.pricing === 'Free'")
      .price-amount
        b-numberinput(
          v-model="form.priceAmount",
          :controls="false",
          :min="0.0",
          :step="0.01"
          placeholder="From",
          :disabled="form.pricing === 'Free'")
        .note Min
        .input-error {{ validation.firstError('form.priceAmount') }}
      .price-amount-max
        b-numberinput(
          v-model="form.priceAmountMax",
          :controls="false",
          :min="0.0",
          :step="0.01"
          placeholder="To",
          :disabled="form.pricing === 'Free'")
        .note Max
      .free
        b-field: b-checkbox(v-model="form.pricing" true-value="Free" false-value="Paid") Make it as free event
    .form-column
      .left-column
        // TODO activate this when subscription is ready
        .mb-5: FormSelect(
          v-model="form.inquiryType"
          label="Select a call to action button"
          optionsLabel="value",
          :options="inquiries"
          placeholder="Book Now",
          :error="validation.firstError('form.inquiryType')",
          :disabled="plan === null")
      .right-column
        .mb-5: FormInput(
          v-model="form.externalURL"
          label="Enter the booking URL of the product"
          type="url"
          placeholder="https://",
          :disabled="form.inquiryType === 'Contact Form' || form.inquiryType === null",
          :error="validation.firstError('form.externalURL')")
    .mb-5
      ._label Description
      VueEditor(v-model="form.description", :editorToolbar="descriptionToolbar", :editorSettings="descriptionSettings")
      .input-error(v-if="validation.firstError('form.description')") {{ validation.firstError('form.description') }}
    .additional-files.mb-5
      .added-files-list.mb-5(v-if="getAdditionalFiles.length")
        XAMarketPlaceAddedFile(
          v-for="(file, index) in getAdditionalFiles",
          :key="index",
          :file="file"
          @delete="removeAdditionalFiles(index)")
      .additional-files-actions
        .btn-action.btn-add-file(@click.prevent="doShowUploadFile()")
          img(src="~assets/images/MarketPlace/add-file.svg")
          | Add File
        div *You can add an extra information.
    .medias.mb-5
      XOMediaUploads.mt-2(
        v-model="mediaStates",
        :media.sync="media"
        @DoArrangeMedia="mediaStates = $event"
        has-mark-cover-photo)
      .medias-actions
        b-upload.btn-action.btn-add-image(v-model="photoFiles" accept="image/*" multiple)
          img(src="~assets/images/MarketPlace/add-image.svg")
          | Add Image
        b-upload.btn-action.btn-add-video(v-model="videoFile" accept="video/*")
          img(src="~assets/images/MarketPlace/add-video.svg")
          | Add Video
    .categories(v-if="!isRetrievingCategories")
      ._title Select Community Interests
      .note.mb-5 You can put your product in up to 3
      XOCategoryPillsSelector(
        v-model="form.CategoryIDs",
        :max="5"
        clickable,
        :excluded-parent="['Technology & Gear']"
        is-product-categories
        grouped)
      .input-error {{ validation.firstError('form.CategoryIDs') }}
    .actions
      //- b-button(type="is-text") Cancel
      b-button(type="is-primary" outlined @click.prevent="doAddProduct('Draft')") Save
      b-button(type="is-primary" @click.prevent="doAddProduct('Published')") Publish
    XHMediaUploader(
      v-model="media",
      :photoFiles.sync="photoFiles",
      :videoFile.sync="videoFile",
      :mediaStates.sync="mediaStates")
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import { VueEditor } from 'vue2-editor'
import countriesStates from './countries-states'
import FormInput from '~/components/atoms/Form/Input'
import FormSelect from '~/components/atoms/Form/Select'
import FormTextarea from '~/components/atoms/Form/Textarea'
import XAMarketPlaceDateRangePicker from '~/components/atoms/MarketPlace/DateRangePicker'
import XOCategoryPillsSelector from '~/components/organisms/CategoryPillsSelector'
import XAMarketPlaceAddedImage from '~/components/atoms/MarketPlace/AddedImage'
import XAMarketPlaceAddedVideo from '~/components/atoms/MarketPlace/AddedVideo'
import XAMarketPlaceAddedFile from '~/components/atoms/MarketPlace/AddedFile'
import XOMediaUploads from '~/components/organisms/MediaUploads'
import XHMediaUploader from '~/components/helpers/MediaUploader'
import timezones from '~/assets/json/timezones.json'

export default {
  name: 'XPMarketPlaceProductEdit',
  components: {
    FormInput,
    FormSelect,
    FormTextarea,
    XAMarketPlaceDateRangePicker,
    XOCategoryPillsSelector,
    XAMarketPlaceAddedImage,
    XAMarketPlaceAddedVideo,
    XAMarketPlaceAddedFile,
    XOMediaUploads,
    XHMediaUploader,
    VueEditor,
  },
  props: { profile: Object },
  validators: {
    'form.title'(value) {
      return Validator.value(value).required('Name field is required')
    },
    'form.type'(value) {
      return Validator.value(value).required('Type of product field is required')
    },
    date(value) {
      if (value?.startDate === null) {
        return Validator.value(value?.startDate).required('Date field is required')
      }
      return Validator.value(value).required('Date field is required')
    },
    'form.startTime'(value) {
      return Validator.value(value).required('Start time field is required')
    },
    'form.endTime'(value) {
      return Validator.value(value).required('End time field is required')
    },
    distanceUnit(value) {
      if (this.distance) {
        return Validator.value(value).required('Event distance unit field is required')
      }
    },
    'form.timezone'(value) {
      return Validator.value(value).required('Timezone field is required')
    },
    'form.virtual'(value) {
      return Validator.value(value).required('Type of location field is required')
    },
    'form.address1'(value) {
      if (!this.form?.virtual) {
        return Validator.value(value).required('Address field is required')
      }
    },
    'form.country'(value) {
      if (!this.form?.virtual) {
        return Validator.value(value).required('Country field is required')
      }
    },
    'form.state'(value) {
      if (!this.form?.virtual) {
        return Validator.value(value).required('State field is required')
      }
    },
    'form.currency'(value) {
      if (this.form?.pricing === 'Paid') {
        return Validator.value(value).required('Currency field is required')
      }
    },
    'form.priceAmount'(value) {
      if (this.form?.pricing === 'Paid') {
        return Validator.value(value).required('Price min field is required').greaterThan(0)
      }
    },
    'form.inquiryType'(value) {
      if (this.plan !== null) {
        return Validator.value(value).required('Book now field is required')
      }
    },
    'form.externalURL'(value) {
      if (this.form?.inquiryType === 'External URL') {
        return Validator.value(value).required('External URL field is required').url()
      }
    },
    'form.description'(value) {
      return Validator.value(value).required('Description field is required')
    },
    'form.CategoryIDs'(value) {
      return Validator.value(value).required('Select at least one category')
    },
  },
  data() {
    return {
      form: {
        title: '',
        type: '',
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        timezone: null,
        Distance: [],
        virtual: false,
        priceAmount: null,
        priceAmountMax: null,
        pricing: 'Free',
        inquiryType: 'Contact Form',
        externalURL: null,
        description: null,
        AdditionalInformation: [],
        Media: [],
        CategoryIDs: [],
        repeats: false,
        address1: null,
        country: null,
        state: null,
        suburb: undefined,
        postcode: undefined,
        coverPhotoID: null,
      },
      date: {
        startDate: null,
        endDate: null,
      },
      types: [
        { key: 'Event', value: 'Active Events' },
        { key: 'Experience', value: 'Active Experiences' },
      ],
      dateTextLabel: 'From - To',
      showDateRange: false,
      hours: [],
      eventDistanceUnit: null,
      eventDistanceUnits: [
        { key: 'km', value: 'KMs' },
        { key: 'mile', value: 'Miles' },
      ],
      inquiries: [
        { key: 'Contact Form', value: 'Inquiry' },
        { key: 'External URL', value: 'Link to External Website' },
      ],
      categories: null,
      isRetrievingCategories: true,
      selectedCategories: [],
      description: '',
      photoFiles: null,
      videoFile: null,
      mediaStates: null,
      media: [],
      initialFiles: null,
      currencies: [
        { key: 'AUD', value: 'AUD' },
        { key: 'USD', value: 'USD' },
        { key: 'GBP', value: 'GBP' },
        { key: 'EUR', value: 'EUR' },
        { key: 'JPY', value: 'JPY' },
        { key: 'CAD', value: 'CAD' },
        { key: 'CHF', value: 'CHF' },
        { key: 'CNY', value: 'CNY' },
        { key: 'HKD', value: 'HKD' },
        { key: 'NZD', value: 'NZD' },
      ],
      timezones,
      distance: null,
      distanceUnit: null,
      distanceType: null,
      newDistances: [],
    }
  },
  computed: {
    ...mapGetters({
      getAdditionalFiles: 'media/getAdditionalFiles',
    }),
    countries() {
      const countries = countriesStates.map((country) => {
        return { key: country.name, value: country.name }
      })
      return countries
    },
    states() {
      const country = countriesStates.filter((country) => {
        return country.name === this.form?.country
      })
      const states = country.map((state) => {
        return state.states.map((state) => {
          return { key: state.name, value: state.name }
        })
      })
      return states[0]
    },
    plan() {
      return this.profile?.plan || null
    },
    descriptionToolbar() {
      const hasLink = false // will be added if business is starter or higher plan
      const descriptionToolbar = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ]

      if (hasLink) {
        descriptionToolbar.push(['link'])
      }

      return descriptionToolbar
    },
    descriptionSettings() {
      const descriptionSettings = {
        modules: {
          link: {
            placeholder: 'test',
          },
        },
      }
      return descriptionSettings
    },
  },
  watch: {
    date(value) {
      if (value === null) {
        this.dateTextLabel = 'From - To'
        return
      }
      this.dateTextLabel = `${moment(value.startDate).format('MM.DD.YYYY')} - ${moment(value.endDate).format(
        'MM.DD.YYYY'
      )}`
    },
    media(value) {
      console.log(value)
    },
  },
  mounted() {
    this.doGenerateHours()
    this.doRetrieveCategories()
    this.$store.dispatch('media/setCoverPhotoID', null)
    this.$store.commit('media/clearAdditionalFiles')
  },
  methods: {
    ...mapActions({
      removeAdditionalFiles: 'media/removeAdditionalFiles',
    }),
    doConvertDate() {
      const startDate = this.form?.date?.startDate
      const endDate = this.form?.date?.endDate

      this.dateTextLabel = `${moment(startDate).format('MM.DD.YYYY')} - ${moment(endDate).format('MM.DD.YYYY')}`
    },
    doGenerateHours() {
      let hours = []
      for (let hour = 5; hour < 20.5; hour++) {
        hours.push({ key: moment({ hour }).format('HH:mm:ss'), value: moment({ hour }).format('HH:mm:ss') })
        hours.push({
          key: moment({
            hour,
            minute: 30,
          }).format('HH:mm:ss'),
          value: moment({
            hour,
            minute: 30,
          }).format('HH:mm:ss'),
        })
      }

      hours = hours.filter((hour) => {
        if (hour.key !== '20:30:00') {
          return hour
        }
      })

      this.hours = hours
    },
    async doRetrieveCategories() {
      this.isRetrievingCategories = true

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Categories {
                id
                name
              }
            }
          `,
        })

        this.categories = data?.Categories
      } catch (error) {
        this.doTrackSegmentError(error, 'Add Product')
      } finally {
        this.isRetrievingCategories = false
      }
    },
    doAddProduct(status) {
      this.form.status = status
      this.form.startDate = this.date?.startDate ? moment(this.date?.startDate).format('YYYY-MM-DD') : null
      this.form.endDate = this.date?.endDate ? moment(this.date?.endDate).format('YYYY-MM-DD') : null
      this.form.currency = this.form?.currency || 'AUD'
      this.form.priceAmount = this.form?.priceAmount || 0
      this.form.AdditionalInformation = this.getAdditionalFiles
      this.form.Media = this.media
      this.form.coverPhotoID = this.$store.getters['media/getCoverPhotoID']
      this.form.Distance = this.newDistances

      const mediaMapped = this.form.Media.map((media) => {
        return { id: media?.objectID }
      })

      console.log('media mapped...', mediaMapped)

      if (this.form.virtual) {
        this.form.country = ''
        this.form.address1 = ''
        this.form.state = ''
      }

      console.log('form details...', this.form)

      const loader = this.$buefy.loading.open()
      this.$validate().then(async (success) => {
        if (success) {
          try {
            await this.$apollo.mutate({
              variables: {
                BusinessID: this.currentBusinessID,
                input: this.form,
              },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($BusinessID: String!, $input: InputProduct!) {
                  createProduct(BusinessID: $BusinessID, input: $input) {
                    success
                  }
                }
              `,
            })

            this.$router.push({
              path: '/me/products',
            })
          } catch (error) {
            this.doTrackSegmentError(error, 'Add Product')
          } finally {
            loader.close()
          }
        } else {
          this.$toast.error('Some fields are required', { duration: 3000, position: 'top-center' })
          loader.close()
        }
      })
    },
    doDeleteMedia(index) {
      this.product?.Media.splice(index, 1)
    },
    doDeleteFile(index) {
      this.product?.AdditionalInformation.splice(index, 1)
    },
    doShowUploadFile() {
      this.$buefy.modal.open({
        component: require('~/components/molecules/MarketPlace/UploadFile').default,
        parent: this,
        width: 600,
        canCancel: false,
      })
    },
    doAddDistance() {
      this.$validate(['distanceUnit']).then((success) => {
        if (success) {
          const { distance, distanceUnit, distanceType } = this

          if (
            this.newDistances.some(
              (distance) =>
                distance.distance === this.distance &&
                distance.distanceUnit === this.distanceUnit &&
                distance.distanceType === this.distanceType
            )
          ) {
            this.$toast.error('Please input unique distance.', { duration: 3000, position: 'top-center' })
            return
          }

          this.newDistances.push({
            distance,
            distanceUnit,
            distanceType,
          })

          this.distance = null
          this.distanceUnit = null
          this.distanceType = null
        }
      })
    },
    doDeleteDistance(index) {
      this.newDistances.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xp-marketplace-product-edit::v-deep {
  background-color: $white;
  min-height: calc(100vh - 417px);

  h1 {
    font-size: 2.8571rem;
    color: $secondary;
    text-align: center;
    margin-bottom: 30px;
  }

  form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    .date {
      ._label {
        margin-bottom: 3px;
      }

      .value {
        font-size: 16px;
        font-weight: 300;
        border: 1px solid #dbdbdb;
        padding: 7px 11px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 4px;
        min-height: 40px;
        margin-bottom: 3px;

        .text {
          flex: 10000 1 0;
        }

        .icon {
          color: #65676b;
        }
      }
    }

    .distances-input {
      .left-column,
      .center-column,
      .right-column {
        @include max-width(767px) {
          margin-bottom: 1.5rem !important;
        }
      }

      .btn-add-distance {
        align-self: flex-end;
        padding-left: 20px;
        padding-bottom: 3px;

        @include max-width(767px) {
          padding-left: 0;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          margin-bottom: 1.5rem !important;
        }

        &.has-error {
          margin-bottom: 17px !important;
          align-self: center;
        }

        .button {
          height: 40px;
        }
      }
    }

    .distances-list {
      .distance-item {
        background-color: #f8f8f8;
        padding: 5px 10px;
        border-radius: 100px;
        margin-right: 5px;

        .btn-delete {
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }

  .b-radio {
    .check {
      width: 20px !important;
      height: 20px !important;
    }
  }

  .b-numberinput {
    input {
      text-align: left;
    }
  }

  .form-column {
    display: flex;
    flex-wrap: wrap;

    &.items-center {
      align-items: center;
    }

    .label {
      font-weight: 400;
      margin-bottom: 3px;
      color: #65676b;
    }

    .left-column,
    .center-column,
    .right-column {
      flex: 10000 1 0;
    }

    .left-column {
      padding-right: 10px;
    }

    .right-column {
      padding-left: 10px;
    }

    .sub-column {
      display: flex;
      flex-wrap: wrap;

      .left-sub-column,
      .right-sub-column {
        flex: 10000 1 0;
      }

      .left-sub-column {
        padding-right: 5px;
      }

      .right-sub-column {
        padding-left: 5px;
      }
    }

    .currency {
      width: 100%;
      max-width: 120px;
      padding-right: 10px;
    }

    .price-amount,
    .price-amount-max {
      width: 100%;
      max-width: 110px;
      padding-right: 10px;
    }
  }

  .note {
    width: 100%;
    font-size: 0.8571rem;
    font-weight: 300;
    color: #65676b;
  }

  .categories {
    ._title {
      text-transform: uppercase;
      color: $secondary;
    }
  }

  .actions {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;

    button {
      text-transform: uppercase;
      text-decoration: none;
      box-shadow: none;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  .medias {
    .medias-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 10px;

      &::after {
        width: calc(100% / 3 - 10px);
        content: '';
      }
    }

    .xo-media-uploads {
      .item {
        width: calc(100% / 3 - 10px) !important;
        height: 145px !important;
        min-height: 0 !important;
        max-height: none !important;
        margin-bottom: 10px;
      }

      &::after {
        width: calc(100% / 3 - 10px);
        content: '';
      }
    }
  }

  .additional-files-actions,
  .medias-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn-action {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: $secondary;
    border: 1px solid $secondary;
    border-radius: 100px;
    width: 100%;
    max-width: 140px;
    height: 38px;
    cursor: pointer;

    img {
      margin-top: -3px;
      margin-right: 5px;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  .input-error {
    font-size: 12px;
    font-weight: 300;
    color: $danger;
  }

  .quillWrapper {
    .ql-container {
      .ql-editor {
        font-size: 1rem;
        font-family: 'Rotunda', sans-serif;
        font-weight: 300;

        ol,
        ul {
          padding-left: 15px;

          li {
            padding-left: 0;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 1.5714rem;
    }

    form {
      padding: 0 15px;
    }

    .form-column {
      .left-column,
      .right-column {
        flex: none;
        width: 100%;
        padding: 0;
      }
    }

    .additional-files-actions {
      .btn-action {
        margin-bottom: 5px;
      }
    }
  }

  @media screen and (max-width: 427px) {
    .medias {
      .xo-media-uploads {
        .item {
          width: calc(50% - 10px) !important;
        }
      }
    }
  }
}
</style>
