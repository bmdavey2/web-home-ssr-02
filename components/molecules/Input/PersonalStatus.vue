<template lang="pug">
.xm-input-personal-status.is-user-select-none
  .item.px-4.py-1.mr-2.mb-2(
    v-for="item in personalStatus"
    @click="onSelectItem(item)",
    :class="{ active: value === item }") {{ item }}
</template>

<script>
import personalStatus from '~/assets/json/personalStatus.json'
export default {
  name: 'XMInputPersonalStatus',
  props: {
    value: String,
  },
  data() {
    return {
      personalStatus,
    }
  },
  methods: {
    onSelectItem(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="sass" scoped>
.xm-input-personal-status::v-deep
  display: flex
  flex-wrap: wrap

  > .item
    display: inline-block
    border: 1px solid rgb(12, 53, 62)
    border-radius: 100px
    color: #0C353E
    background-color: rgba(255,255,255,0.9)
    transition: all .2s

    &:hover,
    &.active
      cursor: pointer
      color: white
      background-color: #0C353E
</style>
