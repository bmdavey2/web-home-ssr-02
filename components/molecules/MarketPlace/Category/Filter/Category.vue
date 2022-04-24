<template lang="pug">
.xm-marketplace-category-filter-category.action
  .value(@click.prevent="doUpdateActiveFilter()") {{ categoryTextLabel }}
  transition(name="fade")
    .dropdown-filter(v-if="activeFilter === 'categories'")
      XMMarketPlaceCategories
</template>

<script>
import XMMarketPlaceCategories from '~/components/molecules/MarketPlace/Categories'

export default {
  name: 'XMMarketPlaceCategoryFilterCategory',
  components: { XMMarketPlaceCategories },
  props: {
    activeFilter: String,
  },
  data() {
    return {
      categoryTextLabel: 'Category',
      activeTypePages: ['active-events', 'active-experiences', 'active-programs'],
    }
  },
  mounted() {
    const page = this.$route.params?.category
    if (this.activeTypePages.includes(page)) {
      this.categoryTextLabel = 'Category'
      return
    }
    switch (page) {
      case 'health-wellness':
        this.categoryTextLabel = 'All Health & Wellness'
        return
      case 'endurance-sports':
        this.categoryTextLabel = 'All Endurance Sports'
        return
      case 'outdoor-adventure':
        this.categoryTextLabel = 'All Outdoor & Adventure'
        return
      case 'general-fitness':
        this.categoryTextLabel = 'All General Fitness'
        return
      default:
        this.categoryTextLabel = this.$parent?.title
    }
  },
  methods: {
    doUpdateActiveFilter() {
      if (this.activeFilter === 'categories') {
        this.$emit('DoUpdateActiveFilter', '')
        return
      }
      this.$emit('DoUpdateActiveFilter', 'categories')
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-filter-category::v-deep {
  display: none;

  .dropdown-filter {
    width: 275px;
  }

  @media screen and (max-width: 1023px) {
    display: block;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
