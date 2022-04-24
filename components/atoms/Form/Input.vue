<template lang="pug">
.form-input(
  :class="[isLarge && 'is-large', isMedium && 'is-medium', hasFocus && 'has-focus', hasCustomErrorStyle && 'has-custom-error-style']")
  b-field(:label="label")
    b-input(
      autocomplete="off"
      expanded,
      :value="value",
      :type="type",
      :placeholder="placeholder",
      :icon="icon",
      :icon-right="hasCustomErrorStyle && error ? 'message-alert' : iconRight",
      :password-reveal="isPassword",
      :maxlength="maxlength",
      :disabled="disabled"
      @input="$emit('input', $event)"
      @keyup.enter.native="$emit('enter', $event)"
      @focus="$emit('focus', $event)"
      @blur="onBlur()",
      :class="[error ? 'has-error' : '']")
  .input-error(:class="[errorClass]" v-if="error") {{ error }}
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: String,
    value: String,
    placeholder: String,
    isTransparent: Boolean,
    icon: String,
    iconRight: String,
    maxlength: String,
    disabled: Boolean,
    error: String,
    isLarge: Boolean,
    isMedium: Boolean,
    hasFocus: Boolean,
    hasCustomErrorStyle: Boolean,
    type: { type: String, default: 'text' },
    errorClass: { type: String, default: 'has-text-danger' },
  },
  computed: {
    isPassword() {
      return this.type === 'password'
    },
  },
  methods: {
    onBlur() {
      if (!this.value) return
      this.$emit('blur', this.value.trim())
    },
  },
}
</script>

<style lang="scss" scoped>
.form-input::v-deep {
  &.is-large {
    .field {
      .control {
        .input {
          font-size: 1.4286rem;
          height: 72px;

          @include max-width(767px) {
            height: 52px;
          }
        }

        .icon {
          &.is-right {
            bottom: 0;
            margin: auto 0;
          }
        }
      }
    }
  }

  &.is-medium {
    .field {
      .control {
        .input {
          font-size: 1.1429rem;
          height: 56px;
        }

        .icon {
          &.is-right {
            bottom: 0;
            margin: auto 0;
          }
        }
      }
    }
  }

  &.has-focus {
    .field {
      .control {
        .input {
          &.focus-visible {
            border: 1px solid #886bf2 !important;
          }
        }
      }
    }
  }

  &.has-custom-error-style {
    .field {
      .control {
        &.has-error {
          .input {
            border: 1px solid #ffaf23 !important;
          }

          .icon {
            &.is-right {
              color: #ffaf23;
            }
          }
        }
      }
    }

    .input-error {
      color: #ffaf23 !important;
      font-size: 1rem;
    }
  }
}
</style>
