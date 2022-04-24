<template lang="pug">
nav.xm-faq-breadcrumb.breadcrumb.has-succeeds-separator.mb-6(arial="breadcrumbs")
  ul
    li: nuxt-link(to="/faq" exact) FAQ
    li(v-if="category"): nuxt-link(:to="`/faq/${category}`" exact) {{ categoryTitle }}
    li(v-if="slug"): nuxt-link(:to="`/faq/${category}/${slug}`" exact) {{ slugTitle }}
</template>

<script>
export default {
  name: 'XMFAQBreadcumb',
  computed: {
    category() {
      return this.$route.params?.category
    },
    categoryTitle() {
      return this.$store.getters['faq/getCategory'](this.category)?.title
    },
    slug() {
      return this.$route.params?.sub
    },
    slugTitle() {
      return this.$store.getters['faq/getCategoryQuestion'](this.category, this.slug)?.question
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-faq-breadcrumb::v-deep {
  white-space: normal;

  li {
    margin-bottom: 10px;

    a {
      color: #848484;
      text-transform: uppercase;

      &.active {
        color: $secondary;
        text-transform: none;
      }
    }
  }
}
</style>
