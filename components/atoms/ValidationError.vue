<template lang="pug">
.xa-validation-error.has-text-danger.mt-1(v-if="value") * {{ value }}
</template>

<script>
export default {
  name: 'XAValidationError',
  props: {
    value: String,
  },
}
</script>

<style lang="sass" scoped>
.xa-validation-error::v-deep
  font-size: 0.8571rem
</style>
