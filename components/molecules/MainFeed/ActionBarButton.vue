<template lang="pug">
div
  template(v-if="upload && !disabled")
    b-upload.xm-main-feed-action-bar-button.is-cursor-pointer.flex(v-model="file" v-bind="$attrs")
      img.mr-2(:src="icon")
      span {{ label }}
  template(v-else)
    .xm-main-feed-action-bar-button.is-cursor-pointer.flex(v-bind="$attrs" @click="$emit('click')")
      img.mr-2(:src="icon")
      span {{ label }}
</template>

<script>
export default {
  name: 'XMMainFeedActionBarButton',
  props: {
    value: Object,
    icon: String,
    label: String,
    upload: Boolean,
    disabled: Boolean,
  },
  computed: {
    file: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="sass" scoped>
.xm-main-feed-action-bar-button
  align-items: flex-start
  margin-right: 20px
  span
    white-space: pre
</style>
