<template lang="pug">
.xm-category-pill.flex-center.px-2.py-1.is-cursor-pointer.is-user-select-none(
  :class="{ active: value, unselectable: unselectable, 'is-white': isWhite, 'is-signup': isSignup }"
  @click="onClick")
  template(v-if="!moreCount")
    img.mr-2(:src="image" style="width: 24px; height: 24px")
    //- img.mr-2(:src="image" style="width: 24px; height: 24px" v-if="!isProductCategories")
    span {{ label }}
  template(v-else)
    span + {{ moreCount }}
</template>

<script>
const icons = require.context('~/assets/icons/categories/default', false, /\.svg$/)
const iconsLight = require.context('~/assets/icons/categories/active', false, /\.svg$/)

export default {
  name: 'XMCategoryPill',
  props: {
    value: Boolean,
    moreCount: Number,
    icon: String,
    parent: String,
    label: String,
    clickable: Boolean,
    disabled: Boolean,
    unselectable: Boolean,
    isWhite: Boolean,
    isSignup: Boolean,
    isProductCategories: { type: Boolean, default: false },
  },
  computed: {
    image() {
      if (!this.icon) return null

      let find

      if (this.isProductCategories) {
        find = `./${this.convertStringToSlug(this.parent || '')}.svg`
      } else {
        find = `./${this.icon}.svg`
      }

      const iconSet = this.value ? iconsLight : icons
      if (iconSet.keys().includes(find)) {
        return iconSet(find)
      }
      return null
    },
  },
  methods: {
    onClick() {
      if (!this.clickable) return
      if (this.disabled) {
        if (this.unselectable && this.value) {
          this.$emit('input', false)
        }
      } else {
        this.$emit('input', !this.value)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.xm-category-pill::v-deep
  background: #EEF1F1
  color: #03353E
  font-weight: 300
  border-radius: 12px
  transition: all .25s

  &.active
    background: #03353E
    color: white
    opacity: 1

  &.disabled
    opacity: .5
    &.active.unselectable
      opacity: 1

  &.is-white
    background-color: white

    &.active
      background-color: #03353E

  &.is-signup
    min-height: 40px
    border-radius: 50px
    padding: 0 10px !important
</style>
