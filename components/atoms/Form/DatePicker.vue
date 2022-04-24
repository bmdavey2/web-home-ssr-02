<template lang="pug">
.form-datepicker
  b-field(:label="label")
    b-datepicker(
      icon-right="calendar-today",
      :mobile-native="false",
      :value="value",
      :locale="locale",
      :placeholder="placeholder",
      :maxDate="maxDate",
      :years-range="[-50, 50]",
      :class="isTransparent ? 'is-transparent' : ''"
      @input="$emit('input', $event)"
      trap-focus)
  .input-error(:class="errorClass" v-if="error") {{ error }}
</template>
<script>
export default {
  name: 'FormDatePicker',
  props: {
    label: { type: String, default: '' },
    value: { type: null, default: null },
    locale: { type: null, default: undefined },
    isTransparent: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    maxDate: { type: null, default: null },
    error: { type: String, default: '' },
    errorClass: { type: String, default: 'has-text-danger' },
  },
}
</script>
<style lang="scss" scoped>
.form-datepicker::v-deep {
  > .field {
    margin-bottom: 3px;

    .control {
      .input {
        font-weight: 300;
        font-size: 16px;
        box-shadow: none;
        border: 1px solid #dbdbdb;
      }
      .dropdown-menu {
        .datepicker-header {
          .pagination {
            align-items: flex-start;

            .pagination-list {
              select {
                border: 1px solid #dbdbdb !important;
              }
            }
          }
        }
      }

      &.is-transparent {
        .input {
          background-color: rgba($white, 0.8);
        }
      }
    }
  }
  .input-error {
    font-size: 0.8571rem;
    font-weight: 300;
  }
}
</style>
