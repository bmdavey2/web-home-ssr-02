<template lang="pug">
.xm-marketplace-single-content-community-interests.content-section
  ._title Community Interests
  XOCategoryPills(:categories="categories")
</template>

<script>
import uniqBy from 'lodash/uniqBy'
import XOCategoryPills from '~/components/organisms/CategoryPills'

export default {
  name: 'XMMarketPlaceSingleContentCommunityInterests',
  components: { XOCategoryPills },
  props: {
    product: Object,
  },
  computed: {
    categories() {
      const categories = uniqBy(
        this.product.Categories.map((category) => {
          return { id: category.id, name: category.parent, PhotoURL: category.PhotoURL, parent: category.parent }
        }),
        'name'
      )
      return categories || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-content-community-interests::v-deep {
  box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
  border-radius: 0;
  padding: 30px 20px;
  background-color: $white;
  border-bottom: 0;

  .xo-category-pills {
    .xm-category-pill {
      border-radius: 1000px;
      padding: 3.5px 10px !important;
    }
  }
}
</style>
