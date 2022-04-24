<template lang="pug">
.xm-marketplace-single-breadcrumbs
  nuxt-link(to="/") Home
  nuxt-link(to="/marketplace") MarketPlace
  nuxt-link(:to="`/marketplace/${parentCategory}`" v-if="parentCategory") {{ parentTitle }}
  nuxt-link(:to="`/marketplace/${parentCategory}/${subCategory}`" v-if="subCategory") {{ subTitle }}
  nuxt-link(:to="$route.fullPath") {{ title }}
</template>

<script>
export default {
  name: 'XMMarketPlaceSingleBreadcrumbs',
  computed: {
    title() {
      return this.$parent?.product?.title || null
    },
    parentCategory() {
      return this.$store.getters['marketplace/getMarketPlaceParentCategory'] || null
    },
    subCategory() {
      return this.$store.getters['marketplace/getMarketPlaceSubCategory'] || null
    },
    parentTitle() {
      const url = this.parentCategory

      switch (url) {
        case 'outdoor-adventure':
          return 'Outdoor & Adventure'
        case 'health-wellness':
          return 'Health & Wellness'
        case 'health-nutrition':
          return 'Health & Nutrition'
        case 'technology-gear':
          return 'Technology & Gear'
        case 'recovery-injuries':
          return 'Recovery & Injuries'
      }

      const words = url.split('-')
      const wordsUppercase = words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1)
        })
        .join(' ')

      return wordsUppercase
    },
    subTitle() {
      const url = this.subCategory

      switch (url) {
        case 'outdoor-adventure':
          return 'Outdoor & Adventure'
        case 'health-wellness':
          return 'Health & Wellness'
        case 'health-nutrition':
          return 'Health & Nutrition'
        case 'technology-gear':
          return 'Technology & Gear'
        case 'recovery-injuries':
          return 'Recovery & Injuries'
      }

      const words = url.split('-')
      const wordsUppercase = words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1)
        })
        .join(' ')

      return wordsUppercase
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-breadcrumbs::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  a {
    font-weight: 300;
    color: #65676b;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &:not(:last-child) {
      &::after {
        content: '';
        width: 5px;
        height: 5px;
        border: 1px solid #65676b;
        border-bottom: 0;
        border-left: 0;
        display: block;
        transform: rotate(45deg);
        margin: 0 8px;
      }
    }

    &.active {
      color: $secondary;
    }
  }
}
</style>
