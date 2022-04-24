<template lang="pug">
.xa-form-daterange-picker(
  :class="[isMedium && 'is-medium', hasFocus && 'has-focus', hasCustomErrorStyle && 'has-custom-error-style']")
  .row._input
    date-range-picker.col(
      ref="daterangePicker"
      v-model="date",
      :locale-data="localeData",
      :ranges="false",
      :single-date-picker="singleDatePicker",
      :min-date="_minDate"
      auto-apply
      @update="$emit('input', $event)",
      :class="error && 'has-error'")
      template(#input="date")
        .value(v-if="date.startDate") {{ date.startDate | dateFormat(_format) }} - {{ date.endDate | dateFormat(_format) }}
        .placeholder(v-else) {{ placeholder }}
        .icon-error.row.items-center.justify-center(v-if="hasCustomErrorStyle && error"): b-icon(icon="message-alert")
    .clear(v-if="date.startDate"): b-button.text-uppercase(type="is-primary" @click.prevent="$emit('clear')") Clear
  .input-error(v-if="error") {{ error }}
</template>

<script>
import moment from 'moment'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'XAFormDateRangePicker',
  components: { DateRangePicker },
  props: {
    placeholder: String,
    isMedium: Boolean,
    singleDatePicker: Boolean,
    value: Object,
    error: String,
    hasFocus: Boolean,
    hasCustomErrorStyle: Boolean,
    format: { type: String, default: 'MM/DD/YYYY' },
    minDate: { type: null, default: () => new Date() },
  },
  data() {
    return {
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
  computed: {
    date: {
      get() {
        const defaultDate = {
          startDate: null,
          endDate: null,
        }

        return this.value || defaultDate
      },
      set(value) {
        return value
      },
    },
    _format() {
      return this.format
    },
    _minDate() {
      return moment(this.minDate).format('MM/DD/YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-form-daterange-picker::v-deep {
  .vue-daterange-picker {
    display: block;

    .form-control {
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      font-weight: 300;
      padding: calc(0.5em - 1px) calc(0.75em - 1px);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      position: relative;

      .value {
        color: #363636;
      }

      .placeholder {
        color: #65676b;
      }

      .icon-error {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: 0;
        width: 33px;
        height: 33px;
      }
    }

    .daterangepicker {
      .calendars {
        .calendars-container {
          .drp-calendar {
            .calendar-table {
              table {
                tbody {
                  tr {
                    td {
                      font-weight: 300;

                      &.today {
                        background-color: $primary;
                        color: $white;
                      }

                      &.in-range {
                        background-color: rgba(#886bf2, 0.3);

                        &.active {
                          background-color: #886bf2;
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
      }
    }
  }

  ._input {
    margin-bottom: 3px;
  }

  .input-error {
    font-size: 0.8571rem;
    font-weight: 300;
    color: $danger;
  }

  &.is-medium {
    .vue-daterange-picker {
      .form-control {
        font-size: 1.1429rem;
        height: 56px;
      }
    }
  }

  &.has-focus {
    &:hover {
      .vue-daterange-picker {
        .form-control {
          border: 1px solid #886bf2;
        }
      }
    }
  }

  &.has-custom-error-style {
    &:hover {
      .vue-daterange-picker {
        .form-control {
          border: 1px solid #886bf2;
        }
      }
    }

    .vue-daterange-picker {
      &.has-error {
        .form-control {
          border: 1px solid #ffaf23;

          .icon-error {
            color: #ffaf23;
          }
        }
      }
    }

    .input-error {
      color: #ffaf23 !important;
      font-size: 1rem;
    }
  }

  .clear {
    padding-left: 10px;

    .button {
      height: 100%;
    }
  }
}
</style>
