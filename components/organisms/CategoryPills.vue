<template lang="pug">
.xo-category-pills.flex.mt-2(style="flex-wrap: wrap")
  XMCategoryPill.mr-2.mb-2(
    v-for="{ id, name, parent } in computedCategories",
    :key="id",
    :label="name",
    :icon="id",
    :parent="parent",
    :clickable="false",
    :is-product-categories="isProductCategories")
  b-dropdown(aria-role="menu" trap-focus v-if="showMore")
    template(#trigger): XMCategoryPill.mr-2.mb-2(v-if="showMore", :more-count="moreCount")
    b-dropdown-item.dropdown-categories(aria-role="categories-item", :focusable="false" custom)
      .category(v-for="(category, index) in categories.slice(3)", :key="index") {{ category.name }}
</template>

<script>
import take from 'lodash/take'
import XMCategoryPill from '~/components/molecules/CategoryPill'
export default {
  name: 'XOCategoryPills',
  components: { XMCategoryPill },
  props: {
    categories: { type: Array, default: () => [] },
    max: Number,
    isProductCategories: { type: Boolean, default: true },
  },
  computed: {
    showMore() {
      return this.max > 0 && this.categories.length - this.max > 0
    },
    moreCount() {
      if (!this.showMore) return 0
      return this.categories.length - this.max
    },
    computedCategories() {
      if (this.max > 0) return take(this.categories, this.max)
      return this.categories
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-category-pills::v-deep {
  .dropdown-categories {
    .category {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
