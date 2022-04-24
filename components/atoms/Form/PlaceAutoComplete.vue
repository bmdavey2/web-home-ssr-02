<template lang="pug">
.xa-form-autocomplete(
  :class="[disabled && 'disabled', isLarge && 'is-large', isMedium && 'is-medium', hasFocus && 'has-focus', hasCustomErrorStyle && 'has-custom-error-style']")
  .field
    .control.has-icons-right(:class="[error && 'has-error']")
      input.input(
        autocomplete="chrome-off",
        :value="contentValue"
        ref="PlaceSearchInput",
        :placeholder="placeholder",
        :disabled="disabled")
      span.icon.is-right
        i.mdi.mdi-magnify
  .input-error(:class="[errorClass]" v-if="error") {{ error }}
</template>

<script>
export default {
  name: 'XAFormPlaceAutoComplete',
  props: {
    value: null,
    data: Array,
    isLarge: Boolean,
    isMedium: Boolean,
    iconRight: String,
    placeholder: String,
    isCityOnly: Boolean,
    disabled: Boolean,
    error: String,
    hasFocus: Boolean,
    hasCustomErrorStyle: Boolean,
    errorClass: { type: String, default: 'has-text-danger' },
  },
  data() {
    return {
      isLoaded: false,
      waiting: [],
      locality: '',
      country: '',
      contentValue: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.contentValue = newValue // Update when the prop changes
    },
  },
  mounted() {
    this.doRenderAutoComplete()
  },
  methods: {
    doRenderAutoComplete() {
      let options

      if (this.isCityOnly) {
        options = {
          types: ['(cities)'],
          componentRestrictions: { country: ['us', 'uk', 'au', 'nz', 'cn'] },
        }
      }

      const autocomplete = new window.google.maps.places.Autocomplete(this.$refs.PlaceSearchInput, options)

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        const ac = place.address_components
        if (ac) {
          this.$emit('updateText', place.formatted_address)
          for (const component of ac) {
            const componentType = component.types

            if (componentType.includes('locality')) this.locality = component.long_name
            if (componentType.includes('administrative_area_level_1')) this.state = component.short_name
            if (componentType.includes('country')) this.country = component.long_name
          }
        }

        this.$emit('getAddress', { sub: this.locality, state: this.state, country: this.country })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-form-autocomplete::v-deep {
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
            right: 10px;
          }

          i {
            &::before {
              font-size: 2.2857rem;
            }
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
            right: 10px;
          }

          i {
            &::before {
              font-size: 1.7143rem;
            }
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
        }
      }
    }

    .input-error {
      color: #ffaf23 !important;
      font-size: 1rem;
    }
  }

  .field {
    margin-bottom: 3px;
  }

  .input-error {
    font-size: 0.8571rem;
    font-weight: 300;
  }
}
</style>
