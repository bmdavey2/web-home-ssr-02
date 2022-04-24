<template lang="pug">
.default-footer
  .container
    .is-flex.is-flex-wrap-wrap.is-justify-content-center
      .links.is-flex.is-flex-wrap-wrap
        .link: nuxt-link(to="/businesses" exact) Businesses
        .link: nuxt-link(to="/mentors" exact) Mentors
        .link: nuxt-link(to="/about" exact) About
        .link: nuxt-link(to="/faq" exact) FAQ
        .link: nuxt-link(to="/contact" exact) Contact
        .link: nuxt-link(to="/privacy-policy" exact) Privacy
        .link: nuxt-link(to="/terms-conditions" exact) Terms
    .logo.has-text-centered: img(src="~assets/images/logo-secondary-min.svg" width="65" height="65")
    .copyright.has-text-centered.has-text-secondary &copy; ActivePlace {{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: 'XOFooter',
}
</script>

<style lang="scss" scoped>
.default-footer::v-deep {
  padding: 2.8571rem 0;

  @media screen and (min-width: $tabletLG) {
    .links {
      justify-content: space-between !important;
    }
  }

  .links {
    padding-bottom: 3.5714rem;
    width: 100%;
    max-width: 960px;

    .link {
      margin-bottom: 1.4286rem;
      padding: 0 1.0714rem;

      a {
        color: $secondary;
        display: block;
        text-transform: uppercase;
        transition: 0.3s;
        border-bottom: 1px solid transparent;

        &:hover,
        &.active {
          border-color: $secondary;
        }
      }
    }
  }

  .logo {
    padding-bottom: 1.4286rem;

    img {
      width: 100%;
      max-width: 65px;
    }
  }
}
</style>
