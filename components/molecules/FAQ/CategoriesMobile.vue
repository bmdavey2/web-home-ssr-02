<template lang="pug">
.xm-faq-categories-mobile.mb-5
  b-field
    b-select(v-model="category" placeholder="Select Categories" expanded @input="doChangeCategories()")
      option(v-for="option in options", :value="option.value") {{ option.label }}
</template>

<script>
export default {
  data() {
    return {
      category: this.$route.params?.category,
    }
  },
  computed: {
    categories() {
      return this.$store.getters['faq/getAll']
    },
    options() {
      if (!this.categories) return []
      return this.categories.map(({ title: label, slug: value }) => ({ label, value }))
    },
  },
  methods: {
    doChangeCategories() {
      this.$router.push({
        path: `/faq/${this.category}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-faq-categories-mobile::v-deep {
  width: 100%;
  display: none;

  @media screen and (max-width: 767px) {
    display: block;
  }
}
</style>
