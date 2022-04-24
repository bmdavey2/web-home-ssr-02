<template lang="pug">
.xp-marketplace-product-edit.py-6
  h1 Edit Product
  form(action="#")
    .mb-5: FormInput(v-model="product.title" label="Name", :error="validation.firstError('product.title')")
    .form-column
      .left-column
        .mb-5: FormSelect(
          v-model="product.type"
          label="Select types of products"
          optionsLabel="value",
          :options="types",
          :error="validation.firstError('product.type')")
      .right-column
        .mb-5 
          .date
            ._label Select date
            .value(@click.prevent="showDateRange = true")
              .text {{ dateTextLabel }}
              b-icon(icon="calendar")
            .input-error {{ validation.firstError('date') }}
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
              v-model="product.startTime"
              label="Start Time"
              placeholder="From",
              :options="hours"
              optionsLabel="value",
              :error="validation.firstError('product.startTime')")
          .right-sub-column
            FormSelect(
              v-model="product.endTime"
              label="End Time"
              placeholder="To",
              :options="hours"
              optionsLabel="value",
              :error="validation.firstError('product.endTime')")
          //- .note Times are shown in Eastern European Time.
      .right-column.mb-5
        FormSelect(
          v-model="product.timezone"
          placeholder="Timezone"
          label="Select timezone",
          :options="timezones",
          :error="validation.firstError('form.timezone')")

    .form-column.distances-input
      .left-column(:class="product.Distance.length ? 'mb-1' : 'mb-5'")
        b-field(label="Event Distance"): b-numberinput(v-model="distance", :controls="false", :min="0", :step="0.01")
        .input-error(v-if="validation.firstError('distance')" style="margin-top: -9px") {{ validation.firstError('distance') }}

      .center-column(:class="product.Distance.length ? 'mb-1' : 'mb-5'")
        FormSelect(
          v-model="distanceUnit",
          :options="eventDistanceUnits"
          optionsLabel="value"
          label="Measurement Unit"
          placeholder="Select...",
          :error="validation.firstError('distanceUnit')")

      .right-column(:class="product.Distance.length ? 'mb-1' : 'mb-5'")
        FormInput(v-model="distanceType" label="Distance Label")

      .btn-add-distance(
        :class="[validation.firstError('distanceUnit') && 'has-error', product.Distance.length ? 'mb-1' : 'mb-5']"): b-button(
        label="Add Distance"
        type="is-primary",
        :disabled="!distance"
        @click.prevent="doAddDistance()")

    .distances-list.row.mb-5(v-if="product.Distance.length")
      .distance-item.row.items-center(v-for="(distance, index) in product.Distance", :key="index")
        span.mr-1(v-if="distance.hasMedal"): b-icon(icon="trophy-variant" custom-size="mdi-18px" type="is-primary")
        span {{ distance.distance }}
        span {{ distance.distanceUnit }}
        span.ml-1(v-if="distance.distanceType") &mdash; {{ distance.distanceType }}
        span.btn-delete(@click.prevent="doDeleteDistance(index)" v-if="!distance.hasMedal"): b-icon(
          icon="close"
          custom-size="mdi-18px")

    .form-column.mb-5
      .label(style="width: 100%") Type
      .row.items-center
        .pr-5: b-radio(v-model="product.virtual", :native-value="true") Virtual
        div: b-radio(v-model="product.virtual", :native-value="false") Location
    template(v-if="!product.virtual")
      .mb-5: FormInput(
        v-model="address"
        placeholder="A place of business or potential park etc."
        label="Address",
        :error="validation.firstError('address')")
      .form-column
        .left-column
          .mb-5: FormSelect(
            v-model="product.country",
            :options="countries"
            optionsLabel="value"
            label="Country"
            @input="product.state = null",
            :error="validation.firstError('product.country')")
        .right-column
          .mb-5: FormSelect(
            v-model="product.state",
            :options="states"
            optionsLabel="value"
            label="State",
            :error="validation.firstError('product.state')")
      .form-column
        .left-column
          .mb-5: FormInput(v-model="product.suburb" label="Suburb")
        .right-column
          .mb-5: FormInput(v-model="product.postcode" label="Postcode")
    .form-column.mb-5
      .label(style="width: 100%") Set price
      .currency
        FormSelect(
          v-model="product.currency",
          :options="currencies"
          optionsLabel="value"
          placeholder="Currency",
          :disabled="product.pricing === 'Free'",
          :error="validation.firstError('product.currency')")
      .price-amount
        b-numberinput(
          v-model="product.priceAmount",
          :controls="false",
          :min="0.0",
          :step="0.01"
          placeholder="From",
          :disabled="product.pricing === 'Free'")
        .note Min
        .input-error {{ validation.firstError('product.priceAmount') }}
      .price-amount-max
        b-numberinput(
          v-model="product.priceAmountMax",
          :controls="false",
          :min="0.0",
          :step="0.01"
          placeholder="To",
          :disabled="product.pricing === 'Free'")
        .note Max
      .free
        b-field: b-checkbox(v-model="product.pricing" true-value="Free" false-value="Paid") Make it as free event
    .form-column
      .left-column
        // TODO activate this when subscription is ready
        .mb-5: FormSelect(
          v-model="product.inquiryType"
          label="Select a call to action button"
          optionsLabel="value",
          :options="inquiries"
          placeholder="Book Now",
          :disabled="plan === null")
      .right-column
        .mb-5: FormInput(
          v-model="product.externalURL"
          label="Enter the booking URL of the product"
          type="url"
          placeholder="https://",
          :disabled="product.inquiryType === 'Contact Form' || product.inquiryType === null",
          :error="validation.firstError('product.externalURL')")
    .mb-5
      ._label Description
      VueEditor(v-model="description", :editorToolbar="descriptionToolbar", :editorSettings="descriptionSettings")
    .additional-files.mb-5
      template(v-if="product.AdditionalInformation !== null")
        .files-list(:class="!getAdditionalFiles.length && 'mb-5'" v-if="product.AdditionalInformation.length > 0")
          XAMarketPlaceAddedFile(
            v-for="(file, index) in product.AdditionalInformation",
            :key="index",
            :file="file"
            @delete="doDeleteFile(index)")
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
      template(v-if="product.Media !== null")
        .medias-list(v-if="product.Media.length > 0")
          template(v-for="(media, index) in product.Media")
            XAMarketPlaceAddedImage(
              :key="index"
              v-if="media.objectType === 'Photo'",
              :url="media.PhotoURL",
              :coverPhotoID="product.coverPhotoID",
              :id="media.objectID"
              @delete="doDeleteMedia(index)")
            XAMarketPlaceAddedVideo(:key="index", :url="media.VideoURL" @delete="doDeleteMedia(index)" v-else)
      XOMediaUploads.mt-2(v-model="mediaStates", :media.sync="media" has-mark-cover-photo)
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
        v-model="product.CategoryIDs",
        :max="5"
        clickable,
        :excluded-parent="['Technology & Gear']"
        is-product-categories
        grouped)
      .input-error {{ validation.firstError('product.CategoryIDs') }}
    .actions
      //- b-button(type="is-text") Cancel
      b-button(type="is-primary" outlined @click.prevent="doEditProduct('Draft')") Save
      b-button(type="is-primary" @click.prevent="doEditProduct('Published')") Publish
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
  props: {
    product: Object,
  },
  validators: {
    'product.title'(value) {
      return Validator.value(value).required('Name field is required')
    },
    'product.type'(value) {
      return Validator.value(value).required('Type of product field is required')
    },
    date(value) {
      return Validator.value(value).required('Date field is required')
    },
    'product.startTime'(value) {
      return Validator.value(value).required('Start time field is required')
    },
    'product.endTime'(value) {
      return Validator.value(value).required('End time field is required')
    },
    distanceUnit(value) {
      if (this.distance) {
        return Validator.value(value).required('Event distance unit field is required')
      }
    },
    'product.externalURL'(value) {
      if (this.product?.inquiryType === 'External URL') {
        return Validator.value(value).required('External URL field is required').url()
      }
    },
    'product.CategoryIDs'(value) {
      return Validator.value(value).required('Select at least one category')
    },
    address(value) {
      if (!this.product.virtual) {
        return Validator.value(value).required('Address field is required')
      }
    },
    'product.country'(value) {
      if (!this.product.virtual) {
        return Validator.value(value).required('Country field is required')
      }
    },
    'product.state'(value) {
      if (!this.product.virtual) {
        return Validator.value(value).required('State field is required')
      }
    },
    'product.currency'(value) {
      if (this.product.pricing === 'Paid') {
        return Validator.value(value).required('Currency field is required')
      }
    },
    'product.priceAmount'(value) {
      if (this.product.pricing === 'Paid') {
        return Validator.value(value).required('Price min field is required').greaterThan(0)
      }
    },
  },
  data() {
    return {
      types: [
        { key: 'Event', value: 'Active Events' },
        { key: 'Experience', value: 'Active Experiences' },
      ],
      dateTextLabel: null,
      showDateRange: false,
      date: {
        startDate: new Date(this.product?.startDate),
        endDate: new Date(this.product?.endDate),
      },
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
      description: this.product?.description.replace(/<div/g, '<p').replace(/<\/div>/g, '</p>'),
      photoFiles: null,
      videoFile: null,
      mediaStates: null,
      media: [],
      initialFiles: null,
      address: this.product?.address1,
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
        return country.name === this.product?.country
      })
      const states = country.map((state) => {
        return state.states.map((state) => {
          return { key: state.name, value: state.name }
        })
      })
      return states[0]
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
    plan() {
      return this.product?.Business?.plan || null
    },
  },
  watch: {
    date(value) {
      if (value === null) {
        this.dateTextLabel = null
        return
      }

      this.dateTextLabel = `${moment(value.startDate).format('MM.DD.YYYY')} - ${moment(value.endDate).format(
        'MM.DD.YYYY'
      )}`
    },
  },
  mounted() {
    this.doConvertDate()
    this.doGenerateHours()
    this.doRetrieveCategories()
    this.$store.dispatch('media/setCoverPhotoID', null)
    this.$store.commit('media/clearAdditionalFiles')

    const linkEditor = document.querySelector('[data-link]')
    linkEditor.setAttribute('data-link', 'https://activeplace.com/')
  },
  methods: {
    ...mapActions({
      removeAdditionalFiles: 'media/removeAdditionalFiles',
    }),
    doConvertDate() {
      const startDate = this.product?.startDate
      const endDate = this.product?.endDate

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
        this.doTrackSegmentError(error, 'Edit Product')
      } finally {
        this.isRetrievingCategories = false
      }
    },
    doEditProduct(status) {
      let initialMedias = []
      let initialFiles = []

      if (this.product?.Media !== null) {
        initialMedias = this.product?.Media.map((media) => {
          return { objectID: media.objectID, objectType: media.objectType }
        })
      }

      if (this.product?.AdditionalInformation !== null) {
        initialFiles = this.product?.AdditionalInformation.map((file) => {
          return {
            objectID: file.objectID,
            objectType: file.objectType,
            fileName: file.fileName,
            fileSize: file.fileSize,
            fileType: file.fileType,
          }
        })
      }
      const loader = this.$buefy.loading.open()
      const newDistance = this.product?.Distance.map((x) => {
        const { distance, distanceUnit, distanceType, hasMedal } = x
        return {
          distance,
          distanceUnit,
          distanceType,
          hasMedal,
        }
      })

      this.$validate().then(async (success) => {
        if (success) {
          try {
            await this.$apollo.mutate({
              variables: {
                id: this.product?.id,
                BusinessID: this.currentBusinessID,
                input: {
                  status,
                  title: this.product?.title,
                  type: this.product?.type,
                  startDate: moment(this.date?.startDate).format('YYYY-MM-DD'),
                  endDate: moment(this.date?.endDate).format('YYYY-MM-DD'),
                  startTime: this.product?.startTime,
                  endTime: this.product?.endTime,
                  Distance: newDistance,
                  virtual: this.product?.virtual,
                  currency: this.product?.currency,
                  priceAmount: this.product?.priceAmount,
                  priceAmountMax: this.product?.priceAmountMax,
                  pricing: this.product?.pricing,
                  inquiryType: this.product?.inquiryType,
                  externalURL: this.product?.externalURL,
                  description: this.description.replace(/\n\r?/g, '<br/>'),
                  CategoryIDs: this.product?.CategoryIDs,
                  Media: initialMedias.concat(this.media),
                  AdditionalInformation: initialFiles.concat(this.$store.getters['media/getAdditionalFiles']),
                  coverPhotoID: this.$store.getters['media/getCoverPhotoID'] || this.product?.coverPhotoID,
                  address1: this.address,
                  address2: '',
                  country: this.product?.country || '',
                  state: this.product?.state || '',
                  suburb: this.product?.suburb || '',
                  postcode: this.product?.postcode || '',
                  timezone: this.product?.timezone || 'EET',
                },
              },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($id: String!, $BusinessID: String!, $input: InputProduct!) {
                  editProduct(id: $id, BusinessID: $BusinessID, input: $input) {
                    success
                  }
                }
              `,
            })
            this.$router.push({
              path: '/me/products',
            })
            switch (status) {
              case 'Draft':
                this.$toast.success('Product has been updated', { duration: 3000, position: 'top-center' })
                return
              case 'Published':
                this.$toast.success('Product has been published', { duration: 3000, position: 'top-center' })
                return
              default:
                return
            }
          } catch (error) {
            this.doTrackSegmentError(error, 'Edit Product')
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
            this.product?.Distance.some(
              (distance) =>
                distance.distance === this.distance &&
                distance.distanceUnit === this.distanceUnit &&
                distance.distanceType === this.distanceType
            )
          ) {
            this.$toast.error('Please input unique distance.', { duration: 3000, position: 'top-center' })
            return
          }

          this.product.Distance.push({
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
      this.product.Distance.splice(index, 1)
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
        margin-bottom: 5px;

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

  .b-checkbox {
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
      .center-column,
      .right-column {
        flex: none;
        width: 100%;
        padding: 0;
      }

      .free {
        width: 100%;
      }
    }

    .additional-files-actions {
      .btn-action {
        margin-bottom: 5px;
      }
    }
  }

  @media screen and (max-width: 427px) {
    .form-column {
      .currency,
      .price-amount,
      .price-amount-max {
        max-width: 100%;
        margin-bottom: 10px;
      }
    }

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
