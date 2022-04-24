<template lang="pug">
.xm-layouts-header-center.col(:class="isLoggedIn && 'is-logged-in'")
  .row.items-center.justify-end
    XALayoutsHeaderNavigationButton(
      route="/marketplace"
      label="Find Events",
      :icon="require('~/assets/images/v2/Layouts/marketplace-nav-icon.svg')")

    XALayoutsHeaderNavigationButton(
      route="/my-feed"
      label="My Feed",
      :icon="require('~/assets/images/v2/Layouts/my-feed-nav-icon.svg')",
      :is-disabled="!isLoggedIn")

    XALayoutsHeaderNavigationButton(
      route="/articles"
      label="Articles",
      :icon="require('~/assets/images/v2/Layouts/articles-nav-icon.svg')")

    XALayoutsHeaderNavigationButton(
      route="/businesses"
      label="For Business",
      :icon="require('~/assets/images/v2/Layouts/business-nav-icon.svg')")
</template>

<script>
import XALayoutsHeaderNavigationButton from '~/components/atoms/v2/Layouts/Header/NavigationButton'

export default {
  name: 'XMLayoutsHeaderCenter',
  components: { XALayoutsHeaderNavigationButton },
}
</script>

<style lang="scss" scoped>
.xm-layouts-header-center::v-deep {
  padding-right: 30px;

  @include max-width(1270px) {
    padding-right: 20px;
  }

  @include max-width(1215px) {
    display: none;
  }

  &.is-logged-in {
    padding-right: 0;
  }
}
</style>
