<template lang="pug">
.xa-header-navigation-button.mx-4(:class="isMarketplace && 'is-marketplace'")
  b-tooltip(:label="label" position="is-bottom" type="is-white" animated)
    nuxt-link(:to="route" exact, :class="{ active, disabled }", :event="!disabled ? 'click' : ''")
      ._icon
        img.inactive(:src="icon", :alt="label" width="24" height="24")
        img.active(:src="iconActive", :alt="label" width="24" height="24" v-if="iconActive")
      ._label(v-if="isMarketplace") {{ label }}
</template>

<script>
export default {
  name: 'XAHeaderNavigationButton',
  props: {
    active: Boolean,
    disabled: Boolean,
    icon: String,
    iconActive: String,
    label: String,
    route: String,
  },
  computed: {
    isMarketplace() {
      return this.$parent?.isMarketplace || false
    },
  },
}
</script>

<style lang="sass" scoped>
.xa-header-navigation-button::v-deep
  cursor: pointer
  transition: 0.3s
  display: flex
  flex-wrap: wrap
  align-items: center

  a
    display: block
    padding-bottom: 7px
    border-bottom: 2px solid transparent
    width: 24px

    img
      display: flex

  a.active,
  a:hover
    border-bottom: 2px solid $primary

  a.disabled
    opacity: .3
    border-bottom: 2px solid transparent

  &.is-marketplace
    a
      width: auto
      border-bottom: 0
      display: flex
      flex-wrap: wrap
      align-items: center
      text-transform: uppercase
      font-weight: 500
      color: #65676b

      ._icon
        position: relative

        .inactive
          position: relative
          z-index: 1

        .active
          position: absolute
          top: 0
          left: 0
          z-index: 2
          opacity: 0

      ._label
        padding-top: 3px
        margin-left: 10px

      &.active, &:hover
        color: $secondary

        ._icon
          .inactive
            opacity: 0

          .active
            opacity: 1
</style>
