<template lang="pug">
.filter.mb-5: XAFormSelect(
  v-model="rate",
  :options="rates"
  optionsLabel="value",
  :show-label="false"
  @input="doUpdateFilterValue()")
</template>

<script>
import XAFormSelect from '~/components/atoms/Form/Select'
export default {
  name: 'XMProfileReviewFilter',
  components: { XAFormSelect },
  data() {
    return {
      rate: 'Show All',
      rates: [
        { key: null, value: 'Show All' },
        { key: 1, value: 1 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 4, value: 4 },
        { key: 5, value: 5 },
      ],
    }
  },
  mounted() {
    this.doUpdateFilterValue()
  },
  methods: {
    doUpdateFilterValue() {
      this.$emit('DoUpdateFilterValue', this.rate)
    },
  },
}
</script>

<style lang="scss" scoped>
.filter::v-deep {
  width: 100%;
  max-width: 200px;
}
</style>
