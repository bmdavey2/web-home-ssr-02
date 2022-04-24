<template lang="pug">
.xa-date-range-picker
  date-range-picker(
    ref="dateRangePicker"
    v-model="date"
    @update="doUpdateValues()"
    opens="inline",
    :ranges="false",
    :min-date="new Date()",
    :locale-data="localeData"
    auto-apply)
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'XADateRangePicker',
  components: { DateRangePicker },
  props: {
    clearDate: Boolean,
  },
  data() {
    return {
      date: {
        startDate: this.$parent?.date?.startDate || null,
        endDate: this.$parent?.date?.endDate || null,
      },
      localeData: {
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
    }
  },
  watch: {
    clearDate(value) {
      if (value) {
        this.date = {
          startDate: null,
          endDate: null,
        }
      }
    },
  },
  methods: {
    doUpdateValues() {
      this.$emit('DoUpdateValues', this.date)
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-date-range-picker::v-deep {
  .vue-daterange-picker {
    .reportrange-text {
      display: none;
    }

    .daterangepicker {
      margin: 0;
      border: 0;

      .calendars {
        .calendars-container {
          .drp-calendar {
            width: 100%;
            max-width: 50%;
          }

          .calendar-table {
            .month {
              font-size: 1.2857rem;
              font-weight: 300;
            }

            td {
              font-weight: 300;

              &.in-range {
                background-color: rgba($primary, 0.3);

                &.active {
                  background-color: $primary;
                }
              }

              &.off {
                visibility: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>
