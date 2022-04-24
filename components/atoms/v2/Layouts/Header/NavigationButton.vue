<template lang="pug">
.xa-layouts-header-navigation-button
  nuxt-link.row.items-center(:to="route", :class="isDisabled && 'disabled'")
    ._icon.row.items-center: img(:src="icon", :alt="label" width="24" height="24")
    ._label {{ label }}
</template>

<script>
export default {
  name: 'XALayoutsHeaderNavigationButton',
  props: {
    route: String,
    label: String,
    icon: String,
    isDisabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.xa-layouts-header-navigation-button::v-deep {
  &:not(:last-child) {
    margin-right: 30px;

    @include max-width(1270px) {
      margin-right: 15px;
    }
  }

  a {
    color: $white;
    text-transform: uppercase;
    user-select: none;

    &.disabled {
      pointer-events: none;
      opacity: 0.7;
    }

    ._icon {
      margin-right: 10px;
    }
  }
}
</style>
