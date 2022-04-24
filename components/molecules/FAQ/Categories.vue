<template lang="pug">
.xm-faq-categories
  .category-item(v-for="(category, index) in categories", :key="index")
    nuxt-link(:to="`/faq/${category.slug}`") #[span._label {{ category.title }}] #[span._icon: b-icon(icon="chevron-right")]
</template>

<script>
export default {
  name: 'XMFAQCategories',
  computed: {
    categories() {
      return this.$store.getters['faq/getAll']
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-faq-categories::v-deep {
  width: 100%;
  max-width: 260px;

  .category-item {
    a {
      color: $secondary;
      padding: 12px 15px 12px 0;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -200%;
        width: 300%;
        height: 100%;
        background-color: transparent;
        z-index: 1;
        transition: 0.3s;
      }

      ._label,
      ._icon {
        position: relative;
        z-index: 2;
      }

      &:hover,
      &.active {
        &::before {
          background-color: #f7ecdf;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
