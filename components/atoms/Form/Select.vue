<template lang="pug">
.form-select
  .label(v-show="label") {{ label }}
  v-select(
    :value="value",
    :options="options",
    :placeholder="placeholder",
    :label="optionsLabel",
    :reduce="(optionsLabel) => optionsLabel.key || optionsLabel",
    :closeOnSelect="closeOnSelect",
    :multiple="multiple",
    :disabled="disabled",
    :class="[isTransparent && 'is-transparent', multiple && 'is-multiple']"
    @input="$emit('input', $event)")
    template(#open-indicator="{ attributes }")
      span(v-bind="attributes"): img(src="~/assets/icons/dropdown-caret.svg" width="12" height="12")
  .input-error(:class="errorClass" v-if="error") {{ error }}
</template>
<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'XAFormSelect',
  components: { 'v-select': vSelect },
  props: {
    label: { type: String },
    value: { type: null, default: null },
    placeholder: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    isTransparent: { type: Boolean, default: false },
    optionsLabel: { type: String, default: 'label' },
    closeOnSelect: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    error: { type: String, default: '' },
    errorClass: { type: String, default: 'has-text-danger' },
    disabled: Boolean,
  },
}
</script>
<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.form-select::v-deep {
  .label {
    font-weight: 400;
    color: #65676b;
    margin-bottom: 3px;
  }

  .v-select {
    margin-bottom: 3px;

    &.vs--open {
      .vs__dropdown-toggle {
        .vs__selected-options {
          .vs__selected {
            top: 4px;
          }
        }
      }
    }

    &.is-transparent {
      .vs__dropdown-toggle {
        background-color: rgba($white, 0.8);
      }
    }

    &.is-multiple {
      .vs__dropdown-toggle {
        .vs__selected-options {
          align-items: center;

          .vs__selected {
            border: 0;
            background-color: #eef1f1;
            color: $secondary;
            margin: 2px;
            padding: 3px 5px;

            .vs__deselect {
              margin-left: 10px;
            }
          }
        }
      }
    }

    &.vs--disabled {
      .vs__search,
      .vs__open-indicator {
        background-color: transparent;
      }

      .vs__dropdown-toggle {
        background-color: #f8f8f8;

        .vs__selected-options {
          .vs__selected {
            color: #7a7a7a;
          }
        }
      }
    }

    .vs__dropdown-toggle {
      min-height: 2.8em;
      border: 1px solid #dbdbdb;
      background-color: $white;
      padding-bottom: 0;

      .vs__selected-options {
        font-weight: 300;
        font-size: 16px;

        input {
          font-weight: 300;

          &::placeholder {
            color: #65676b;
          }

          &:-ms-input-placeholder {
            color: #65676b;
          }

          &::-ms-input-placeholder {
            color: #65676b;
          }
        }
      }

      .vs__actions {
        display: flex;
        align-items: center;
        padding: 0 6px 0 0;
        height: 34px;

        .vs__clear {
          display: flex;
        }
      }
    }

    .vs__open-indicator {
      img {
        width: 12px;
      }
    }
  }

  .input-error {
    font-size: 0.8571rem;
    font-weight: 300;
  }
}
</style>
