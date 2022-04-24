<template lang="pug">
.xm-marketplace-all-filters
  .card
    .header
      ._icon(@click.prevent="doCloseModal"): b-icon(icon="arrow-left")
      ._title Filter
    .card-content
      .filter-section.categories
        XMMarketPlaceCategories(is-global)

      .filter-section.types(v-if="!activePages.includes($route.params.category)")
        ._title Type of Product
        .filter-item(v-for="(t, index) in types", :key="index"): b-radio(v-model="type", :native-value="t.key") {{ t.value }}

      .filter-section.locations
        ._title Location
        .filter-item(v-for="(l, index) in locations", :key="index"): b-radio(v-model="virtual", :native-value="l.value") {{ l.label }}
        template(v-if="virtual === false")
          .filter-item: FormSelect(
            v-model="locationCountry"
            placeholder="Select Country",
            :options="countries"
            optionsLabel="value",
            :show-label="false"
            @input="state = null")
          .filter-item: FormSelect(
            v-model="locationState"
            placeholder="Select State",
            :options="states"
            optionsLabel="value",
            :show-label="false"
            v-if="locationCountry")

      .filter-section.date
        ._title(style="margin-bottom: 0") Select Date
        .datepicker(v-if="showDatePicker")
          .header
            ._label {{ dateTextLabel }}
            .close(@click.prevent="showDatePicker = false"): b-icon(icon="close")
          XADateRangePicker(@DoUpdateValues="date = $event", :clear-date="clearDate")
          .datepicker-actions
            b-button(type="is-text" @click.prevent="doClearDate()") Clear Date
            b-button(type="is-primary" @click.prevent="showDatePicker = false") Done
        FormInput(v-model="dateTextLabel" placeholder="From - To" @focus="showDatePicker = true; clearDate = false")

      .filter-section.price(v-if="!isRetrievingPriceRange")
        ._title Price
        .filter-item(v-for="(p, index) in prices", :key="index"): b-radio(
          v-model="priceType",
          :native-value="p.key"
          @input="doUpdatePriceFilter()") {{ p.value }}
        template(v-if="priceType === 'Price'")
          .price-range
            .input-range
              .min-price.is-flex-width-auto
                b-field: b-numberinput(
                  v-model="priceRangeMin",
                  :min="productsPriceRange[0]",
                  :controls="false"
                  @blur="doUpdatePriceFilter()")
                ._label Min
              .seperator &mdash;
              .max-price.is-flex-width-auto
                b-field: b-numberinput(
                  v-model="priceRangeMax",
                  :max="productsPriceRange[1]",
                  :controls="false"
                  @blur="doUpdatePriceFilter()")
                ._label Max
            b-field
              b-slider(
                v-model="priceRange",
                :min="productsPriceRange[0]",
                :max="productsPriceRange[1]"
                rounded
                @dragend="doUpdatePriceFilter()")
    .actions
      b-button(type="is-text" @click.prevent="doClearProductFilters()") Clear Filter
      b-button(type="is-primary" @click.prevent="doUpdateProductFilters()") Save
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import { mapFields } from 'vuex-map-fields'
import countriesStates from './Category/Filter/countries-states'
import XMMarketPlaceCategories from '~/components/molecules/MarketPlace/Categories'
import FormSelect from '~/components/atoms/Form/Select'
import FormInput from '~/components/atoms/Form/Input'
import XADateRangePicker from '~/components/atoms/DateRangePicker'

export default {
  name: 'XMMarketPlaceAllFilters',
  components: { XMMarketPlaceCategories, FormSelect, FormInput, XADateRangePicker },
  data() {
    return {
      types: [
        { key: null, value: 'All' },
        { key: 'Event', value: 'Active Events' },
        { key: 'Experience', value: 'Active Experiences' },
        // { key: 'Active Program', value: 'Active Programs' },
      ],
      locations: [
        { label: 'Virtual', value: true },
        { label: 'Location', value: false },
      ],
      date: {
        startDate: null,
        endDate: null,
      },
      showDatePicker: false,
      dateTextLabel: null,
      prices: [
        { key: null, value: 'Any Price' },
        // { key: 'Free', value: 'Free' },
        { key: 'Paid', value: 'Paid' },
        { key: 'Price', value: 'Price Range' },
      ],
      priceRangeMin: null,
      priceRangeMax: null,
      priceRange: null,
      productsPriceRange: null,
      activePages: ['active-events', 'active-experiences', 'active-programs'],
      sourceCountries: [],
      isRetrievingPriceRange: true,
      clearDate: false,
    }
  },
  computed: {
    ...mapFields('marketplace', [
      'filters.type',
      'filters.virtual',
      'filters.locationCountry',
      'filters.locationState',
      'filters.dateFrom',
      'filters.dateTo',
      'filters.priceType',
      'filters.priceFrom',
      'filters.priceTo',
    ]),
    countries() {
      return this.sourceCountries.map((x) => ({ key: x, value: x }))
    },
    states() {
      const country = countriesStates.filter((country) => {
        return country.name === this.locationCountry
      })
      const states = country.map((state) => {
        return state.states.map((state) => {
          return { key: state.name, value: state.name }
        })
      })
      return states[0]
    },
    datePickerAttrs() {
      const datePickerAttrs = [
        {
          key: 'today',
          highlight: {
            style: {
              backgroundColor: '#EEF1F1',
            },
          },
          dates: new Date(),
        },
      ]
      return datePickerAttrs
    },
    datePickerSelectAttrs() {
      const datePickerSelectAttrs = {
        highlight: {
          startEnd: {
            style: {
              backgroundColor: '#F85454',
            },
            contentStyle: {
              color: 'white',
            },
          },
          base: {
            style: {
              backgroundColor: '#FEDDDD',
            },
          },
          today: {
            style: {
              backgroundColor: '#EEF1F1',
            },
          },
        },
      }

      return datePickerSelectAttrs
    },
  },
  watch: {
    date(value) {
      if (value === null) {
        this.dateTextLabel = null
        this.dateFrom = null
        this.dateTo = null
        return
      }
      this.dateFrom = moment(value?.startDate).format('YYYY-MM-DD')
      this.dateTo = moment(value?.endDate).format('YYYY-MM-DD')

      const startYear = new Date(value.startDate).getFullYear()
      const endYear = new Date(value.endDate).getFullYear()

      if (startYear === endYear) {
        this.dateTextLabel = `${moment(value.startDate).format('MMM DD')} - ${moment(value.endDate).format(
          'MMM DD, YYYY'
        )}`
        return
      }

      this.dateTextLabel = `${moment(value.startDate).format('MMM DD, YYYY')} - ${moment(value.endDate).format(
        'MMM DD, YYYY'
      )}`
    },
    priceRange(value) {
      this.priceRangeMin = value[0]
      this.priceRangeMax = value[1]
    },
    priceType() {
      this.doCheckPrice()
    },
  },
  async mounted() {
    await this.doRetrievePriceRange()
    this.$root.$on('marketplace/filter/global', this.doCloseModal)
    this.$zendesk.hide()
    try {
      const { data } = await this.$apollo.query({
        query: gql`
          query {
            getMarketplaceProductCountries
          }
        `,
      })
      this.sourceCountries = data.getMarketplaceProductCountries || []
    } catch (error) {
      this.doTrackSegmentError(error, 'MarketPlace Category')
    }
    this.doCheckPrice()
    this.doCheckDate()
  },
  methods: {
    doCloseModal() {
      this.$zendesk.show()
      this.$parent.close()
    },
    doFilterProducts() {
      this.$store.dispatch('marketplace/setProductFilters', {})
    },
    doUpdatePriceFilter() {
      if (this.priceType === 'Price') {
        this.$set(this.priceRange, 0, this.priceRangeMin)
        this.$set(this.priceRange, 1, this.priceRangeMax)
        this.priceFrom = Math.ceil(this.priceRangeMin)
        this.priceTo = Math.ceil(this.priceRangeMax)
        this.doCheckPrice()
        return
      }

      this.priceFrom = null
      this.priceTo = null
    },
    doUpdateProductFilters() {
      this.doCloseModal()
    },
    doClearProductFilters() {
      this.type = null
      this.virtual = null
      this.locationCountry = null
      this.locationState = null
      this.date = null
      this.dateFrom = null
      this.dateTo = null
      this.priceType = null
      this.priceFrom = null
      this.priceTo = null
      this.priceRangeMin = this.productsPriceRange[0]
      this.priceRangeMax = this.productsPriceRange[1]
      this.priceRange = this.productsPriceRange
    },
    async doRetrievePriceRange() {
      this.isRetrievingPriceRange = true
      try {
        const { data } = await this.$apollo.query({
          query: gql`
            query {
              ProductPriceRange {
                priceMax
                priceMin
              }
            }
          `,
        })
        const { ProductPriceRange } = data
        const priceMin = ProductPriceRange?.priceMin
        const priceMax = ProductPriceRange?.priceMax

        this.priceRange = [priceMin, priceMax]
        this.productsPriceRange = [priceMin, priceMax]
        this.priceRangeMin = priceMin
        this.priceRangeMax = priceMax
      } catch (error) {
        this.doTrackSegmentError(error, 'MarketPlace Category')
      } finally {
        this.isRetrievingPriceRange = false
      }
    },
    doCheckDate() {
      if (this.date === null) return
      this.date.startDate = this.dateFrom
      this.date.endDate = this.dateTo

      if (this.date?.startDate === null) {
        this.dateTextLabel = null
        this.dateButtonLabel = 'Dates'
        return
      }

      const startYear = new Date(this.date?.startDate).getFullYear()
      const endYear = new Date(this.date?.endDate).getFullYear()

      if (startYear === endYear) {
        this.dateTextLabel = `${moment(this.date?.startDate).format('MMM DD')} - ${moment(this.date?.endDate).format(
          'MMM DD, YYYY'
        )}`
        return
      }

      this.dateTextLabel = `${moment(this.date?.startDate).format('MMM DD, YYYY')} - ${moment(
        this.date?.endDate
      ).format('MMM DD, YYYY')}`
    },
    doClearDate() {
      this.date = null
      this.clearDate = true
    },
    doCheckPrice() {
      if (this.priceType === 'Price') {
        this.priceRange = [this.priceFrom, this.priceTo]
        this.priceRangeMin = this.priceFrom
        this.priceRangeMax = this.priceTo
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-all-filters::v-deep {
  height: 100%;

  .card {
    min-height: 100%;

    > .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 56px;
      z-index: 2;
      border-bottom: 1px solid #c2c8c9;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      background-color: $white;

      ._title {
        text-align: center;
        font-weight: 500;
        text-transform: uppercase;
      }

      ._icon {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 20px;
        margin: auto 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    .card-content {
      padding: 80px 1.5rem;

      .filter-section {
        margin-bottom: 30px;

        ._title {
          text-transform: uppercase;
          color: #050505;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .filter-item {
          margin-bottom: 10px;
        }

        &.categories {
          min-height: 173px;
        }

        &.date {
          .datepicker {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            background-color: $white;

            .header {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
              padding: 20px 20px 10px;

              ._label {
                font-weight: 500;
                font-size: 1.1429rem;
              }
            }

            .vc-container {
              width: 100%;
              border: 0;
            }

            .datepicker-actions {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: flex-end;
              padding: 0 20px;

              button {
                text-transform: uppercase;
                text-decoration: none;
                font-weight: 500;
                box-shadow: none;

                &:not(:last-child) {
                  margin-right: 10px;
                }
              }
            }

            .xa-date-range-picker {
              .vue-daterange-picker {
                .daterangepicker {
                  .calendars {
                    .calendars-container {
                      .drp-calendar {
                        width: 100%;
                        max-width: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        &.price {
          .price-range {
            .input-range {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;

              .min-price,
              .max-price {
                .field {
                  margin-bottom: 3px;

                  input {
                    border: 1px solid #dbdbdb;
                    box-shadow: none;
                  }
                }

                ._label {
                  font-size: 0.8571rem;
                }
              }

              .seperator {
                padding: 8px 10px 0;
              }
            }
          }
        }
      }
    }

    .actions {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: $white;
      box-shadow: 0 2px 20px rgba(39, 85, 96, 0.1);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      min-height: 60px;
      padding: 0 1.5rem;
      z-index: 2;

      button {
        text-transform: uppercase;
        text-decoration: none;
        font-weight: 500;

        &:not(:last-child) {
          margin-right: 10px;
          background-color: transparent;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
