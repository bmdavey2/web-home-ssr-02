<template lang="pug">
.xm-marketplace-category-filter-dates.action
  .value(@click.prevent="doUpdateActiveFilter()") {{ dateButtonLabel }}
  transition(name="fade")
    .dropdown-filter(v-if="activeFilter === 'dates'")
      .date-text-label {{ dateTextLabel }}
      XADateRangePicker(@DoUpdateValues="date = $event", :clear-date="clearDate")
      .actions
        b-button(type="is-text" @click.prevent="doClearDate()") Clear Date
        b-button(type="is-primary" @click.prevent="doUpdateDate()") Done
</template>

<script>
import moment from 'moment'
import { mapFields } from 'vuex-map-fields'
import XADateRangePicker from '~/components/atoms/DateRangePicker'

export default {
  name: 'XMMarketPlaceCategoryFilterDates',
  components: { XADateRangePicker },
  props: {
    activeFilter: String,
    clearFilter: Boolean,
  },
  data() {
    return {
      date: {
        startDate: null,
        endDate: null,
      },
      dateButtonLabel: null,
      dateTextLabel: null,
      clearDate: false,
    }
  },
  computed: {
    ...mapFields('marketplace', ['filters.dateFrom', 'filters.dateTo']),
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
        return
      }
      const startYear = new Date(value.startDate).getFullYear()
      const endYear = new Date(value.endDate).getFullYear()

      if (startYear === endYear) {
        const dateFrom = moment(value.startDate).format('MMM DD, YYYY')
        const dateTo = moment(value.endDate).format('MMM DD, YYYY')
        if (dateFrom === dateTo) {
          this.dateTextLabel = `${dateFrom} ~ onward`
          return
        }
        this.dateTextLabel = `${moment(value.startDate).format('MMM DD')} - ${moment(value.endDate).format(
          'MMM DD, YYYY'
        )}`
        return
      }

      this.dateTextLabel = `${moment(value.startDate).format('MMM DD, YYYY')} - ${moment(value.endDate).format(
        'MMM DD, YYYY'
      )}`
    },
    dateFrom() {
      this.doCheckDate()
    },
    dateTo() {
      this.doCheckDate()
    },
  },
  mounted() {
    this.doCheckDate()
  },
  methods: {
    doUpdateActiveFilter() {
      this.clearDate = false
      if (this.activeFilter === 'dates') {
        this.$emit('DoUpdateActiveFilter', '')
        return
      }
      this.$emit('DoUpdateActiveFilter', 'dates')
    },
    doUpdateDate() {
      this.doUpdateActiveFilter()
      if (this.dateTextLabel === null) {
        this.dateButtonLabel = 'Dates'
        this.dateFrom = null
        this.dateTo = null
        return
      }
      this.dateButtonLabel = this.dateTextLabel
      const startDate = moment(this.date?.startDate).format('YYYY-MM-DD')
      const endDate = moment(this.date?.endDate).format('YYYY-MM-DD')

      if (startDate === endDate) {
        this.dateFrom = startDate
        this.dateTo = null
        return
      }
      this.dateFrom = startDate
      this.dateTo = endDate
    },
    doClearDate() {
      this.date = null
      this.clearDate = true
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
        const dateFrom = moment(this.date?.startDate).format('MMM DD, YYYY')
        const dateTo = moment(this.date?.endDate).format('MMM DD, YYYY')
        if (dateFrom === dateTo) {
          this.dateTextLabel = `${dateFrom} ~ onward`
          this.dateButtonLabel = this.dateTextLabel
          return
        }
        this.dateTextLabel = `${moment(this.date?.startDate).format('MMM DD')} - ${moment(this.date?.endDate).format(
          'MMM DD, YYYY'
        )}`
        this.dateButtonLabel = this.dateTextLabel
        return
      }

      this.dateTextLabel = `${moment(this.date?.startDate).format('MMM DD, YYYY')} - ${moment(
        this.date?.endDate
      ).format('MMM DD, YYYY')}`
      this.dateButtonLabel = this.dateTextLabel
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-filter-dates::v-deep {
  .dropdown-filter {
    .date-text-label {
      margin-bottom: 10px;
    }

    .datepicker {
      border: 0;

      .vc-pane-container {
        .vc-pane-layout {
          .vc-weeks {
            .vc-day {
              .vc-day-content {
                font-weight: 400 !important;
              }
            }
          }
        }
      }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
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
  }

  @media screen and (max-width: 1023px) {
    .dropdown-filter {
      left: -200px !important;
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
