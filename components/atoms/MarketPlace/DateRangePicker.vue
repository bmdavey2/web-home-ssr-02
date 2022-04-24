<template lang="pug">
.xa-marketplace-date-range-picker(:class="isModal && 'is-modal'")
  .datepicker-container
    .header
      .value {{ dateTextLabel }}
      .close(@click.prevent="doShowDateRange()"): b-icon(icon="close")
    XADateRangePicker(@DoUpdateValues="date = $event", :clear-date="clearDate")
    .actions
      b-button(type="is-text" @click.prevent="doClearDate()") Clear Date
      b-button(type="is-primary" @click.prevent="doSelectDate()") Done
</template>

<script>
import moment from 'moment'
import XADateRangePicker from '~/components/atoms/DateRangePicker'

export default {
  name: 'XAMarketPlaceDateRangePicker',
  components: { XADateRangePicker },
  props: {
    isModal: Boolean,
  },
  data() {
    return {
      date: this.$parent?.date || this.$parent?.form?.date,
      dateTextLabel: null,
      clearDate: false,
    }
  },
  computed: {
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
    datePickerColumn() {
      if (this.lt('tabletLG')) {
        return 1
      }
      return 2
    },
    datePickerRow() {
      if (this.lt('tabletLG')) {
        return 2
      }
      return 1
    },
  },
  watch: {
    date() {
      this.doChangeTextLabel()
    },
  },
  mounted() {
    this.doChangeTextLabel()
  },
  methods: {
    doSelectDate() {
      this.$emit('DoSelectDate', this.date)
      this.doShowDateRange()
    },
    doShowDateRange() {
      this.$emit('DoShowDateRange', false)
    },
    doChangeTextLabel() {
      if (this.date === null) {
        this.dateTextLabel = null
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
  },
}
</script>

<style lang="scss" scoped>
.xa-marketplace-date-range-picker::v-deep {
  &.is-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($white, 0.8);
    z-index: 999;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .datepicker-container {
    background-color: $white;
    box-shadow: 0 4px 30px rgba(18, 55, 63, 0.15);
    width: 100%;
    max-width: 540px;
    padding: 20px;

    .header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .close {
        cursor: pointer;
      }
    }

    .datepicker {
      border: 0;
      width: 100%;

      .vc-pane-container {
        .vc-pane-layout {
          .vc-weeks {
            .vc-day {
              .vc-day-content {
                font-weight: 300 !important;
              }
            }
          }
        }
      }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

      button {
        text-transform: uppercase;
        text-decoration: none;
        box-shadow: none;
        outline: none;

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .datepicker-container {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
