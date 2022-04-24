<template lang="pug">
.xm-marketplace-category-sidebar
  .card.browse-category
    .card-content: XMMarketPlaceCategories
  .card
    .card-content
      ._title Browse By Type
      nuxt-link.type-link(to="/marketplace/active-events" exact @click.native="doUpdateProductType('Event')") Active Events
      //- nuxt-link.type-link(
        to="/marketplace/active-programs"
        exact
        @click.native="doUpdateProductType('Active Program')") Active Programs
      nuxt-link.type-link(to="/marketplace/active-experiences" exact @click.native="doUpdateProductType('Experience')") Active Experiences
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import XMMarketPlaceCategories from '~/components/molecules/MarketPlace/Categories'

export default {
  name: 'XMMarketPlaceCategorySidebar',
  components: { XMMarketPlaceCategories },
  computed: {
    ...mapFields('marketplace', ['filters.type']),
  },
  methods: {
    doUpdateProductType(value) {
      this.type = value
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-sidebar::v-deep {
  padding-bottom: 50px;
  position: sticky;
  top: 180px;
  left: 0;

  .browse-category {
    margin-bottom: 20px;
  }

  .card-content {
    ._title {
      text-transform: uppercase;
      color: #050505;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .type-link {
      display: block;
      font-size: 0.8571rem;
      font-weight: 500;
      text-transform: uppercase;
      color: inherit;

      &:not(:last-child) {
        margin-bottom: 15px;
      }

      &.active {
        color: $secondary;
      }
    }
  }
}
</style>
