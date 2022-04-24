<template lang="pug">
.xa-form-autocomplete(:class="[isLarge && 'is-large', isMedium && 'is-medium']")
  b-field
    b-autocomplete(
      expanded
      autocomplete="off"
      keep-first,
      :value="value",
      :data="filteredData",
      :icon-right="iconRight",
      :placeholder="placeholder"
      @input="$emit('input', $event)")
</template>

<script>
export default {
  name: 'XAFormAutocomplete',
  props: {
    value: null,
    data: Array,
    isLarge: Boolean,
    isMedium: Boolean,
    iconRight: String,
    placeholder: String,
  },
  computed: {
    filteredData() {
      return this.data.filter((option) => {
        return option.toString().toLowerCase().includes(this.value.toLowerCase())
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-form-autocomplete::v-deep {
  &.is-large {
    .field {
      .control {
        .input {
          font-size: 1.4286rem;
          height: 72px;
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
              font-size: 2.2857rem;
            }
          }
        }
      }
    }
  }
}
</style>
