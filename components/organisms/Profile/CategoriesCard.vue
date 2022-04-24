<template lang="pug">
.xo-profile-categories-card.box
  .title COMMUNITY INTEREST
  XOCategoryPills(:categories="categories", :isProductCategories="false")
  //-.category(v-for="category in computedCategories", :key="category.id")
    .flex.align-center
      img.mr-1(:src="category.id")
      span {{ category.name }}
</template>

<script>
import XOCategoryPills from '~/components/organisms/CategoryPills'
export default {
  name: 'XOProfileCategoriesCard',
  components: { XOCategoryPills },
  props: {
    profile: Object,
  },
  computed: {
    categories() {
      return this.profile?.Categories || []
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-profile-categories-card
  .title
    font-size: 14px
    line-height: 18px
    letter-spacing: .8px
  .category
    background: #EEF1F1
    color: #0c353e
</style>
