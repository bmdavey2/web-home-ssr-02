<template lang="pug">
.xo-main-feed-quick-links
  nuxt-link.link.mr-5.mb-3(to="/businesses") Businesses
  //- nuxt-link.link.mr-5.mb-3(to="/mentors") Mentors
  nuxt-link.link.mr-5.mb-3(to="/about") About
  nuxt-link.link.mr-5.mb-3(to="/faq") FAQ
  nuxt-link.link.mr-5.mb-3(to="/contact") Contact
  nuxt-link.link.mr-5.mb-3(to="/privacy-policy") Privacy
  nuxt-link.link.mr-5.mb-3(to="/terms-conditions") Terms
  .copyright &copy; ActivePlace {{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: 'XOMainFeedQuickLinks',
}
</script>

<style lang="scss" scoped>
.xo-main-feed-quick-links::v-deep {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid $secondary;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;

  .link {
    color: #65676b;
    font-size: 0.8571rem;
    font-weight: 300;
    transition: 0.3s;

    &:hover {
      color: $secondary;
    }
  }

  .copyright {
    font-size: 0.8571rem;
    font-weight: 300;
    width: 100%;
  }
}
</style>
