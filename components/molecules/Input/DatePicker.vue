<template lang="pug">
b-field.xm-input-date-picker(:label="label")
  b-datepicker(
    v-bind="$attrs"
    v-on="$listeners"
    icon-right="calendar-today",
    :mobile-native="false",
    :years-range="[-20, 20]"
    trap-focus)
</template>

<script>
export default {
  name: 'XMInputDatePicker',
  props: {
    label: String,
  },
}
</script>
