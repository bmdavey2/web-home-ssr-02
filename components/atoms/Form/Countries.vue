<template lang="pug">
.xa-form-countries(:class="[isMedium && 'is-medium']")
  b-field
    b-autocomplete(
      autocomplete="chrome-off"
      expanded
      keep-first,
      :value="value",
      :data="filteredData",
      :placeholder="placeholder"
      field="name"
      @input="$emit('input', $event)"
      @select="(option) => (selected = option)")
</template>

<script>
import countries from '~/assets/json/country.json'

export default {
  name: 'XAFormCountries',
  props: {
    value: String,
    placeholder: String,
    isMedium: Boolean,
  },
  data() {
    return {
      countries,
      selected: null,
    }
  },
  computed: {
    filteredData() {
      return this.countries.filter((option) => {
        return option.name.toString().toLowerCase().includes(this.value.toLowerCase())
      })
    },
  },
  watch: {
    selected(value) {
      this.$emit('select', value)
    },
  },
}
</script>
