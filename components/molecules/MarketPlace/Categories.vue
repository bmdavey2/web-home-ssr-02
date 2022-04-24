<template lang="pug">
.xm-marketplace-categories(v-if="categories")
  ._title Browse By Category
  .accordion-item(
    v-for="(category, index) in categoryParents",
    :key="`${index}-p`"
    v-if="category !== 'Technology & Gear'")
    .header(:class="activeCategoryClass === category && 'active'")
      ._value: nuxt-link(:to="`/marketplace/${convertStringToSlug(category)}`" @click.native="doCloseGlobalFilters()") {{ category }}
      ._icon(@click.prevent="doUpdateActiveCategory(category)"): b-icon(
        :icon="activeCategory === category ? 'chevron-down' : 'chevron-right'")
    .sub-categories(v-if="activeCategory === category")
      nuxt-link.sub-category-item.all(
        :to="`/marketplace/${convertStringToSlug(category)}`"
        @click.native="doCloseGlobalFilters()"
        exact)
        ._icon
          img(src="~assets/icons/categories/active/all.svg")
          .active: img(src="~assets/images/MarketPlace/checked.png")
        ._value All
      nuxt-link.sub-category-item(
        :to="`/marketplace/${convertStringToSlug(sub.parent)}/${convertStringToSlug(sub.id)}`"
        v-for="(sub, index) in categories"
        v-if="sub.parent === category && sub.name !== category",
        :key="sub.id"
        @click.native="doCloseGlobalFilters()")
        ._icon
          //- img(:src="sub.PhotoURL")
          img(:src="require(`~/assets/images/MarketPlace/Category/${convertStringToSlug(sub.parent)}.webp`)")
          .active: img(src="~assets/images/MarketPlace/checked.png")
        ._value {{ sub.name }}
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XMMarketPlaceCategories',
  props: {
    isGlobal: Boolean,
  },
  data() {
    return {
      activeCategory: '',
      activeCategoryClass: '',
    }
  },
  computed: {
    categoryParents() {
      const categoryParents = this.categories.map((category) => {
        return category?.parent
      })

      return categoryParents.filter((value, index) => categoryParents.indexOf(value) === index)
    },
  },
  watch: {
    categories(value) {
      if (value) {
        const slug = this.$route.params.category
        switch (slug) {
          case 'health-wellness':
            // this.activeCategory = 'Health & Wellness'
            this.activeCategoryClass = 'Health & Wellness'
            return
          case 'endurance-sports':
            // this.activeCategory = 'Endurance Sports'
            this.activeCategoryClass = 'Endurance Sports'
            return
          case 'outdoor-adventure':
            // this.activeCategory = 'Outdoor & Adventure'
            this.activeCategoryClass = 'Outdoor & Adventure'
            return
          case 'general-fitness':
            // this.activeCategory = 'General Fitness'
            this.activeCategoryClass = 'General Fitness'
            return
        }
        const activeSubCategory = this.categories.filter((category) => {
          return category?.id === slug
        })
        // this.activeCategory = activeSubCategory[0]?.parent
        this.activeCategoryClass = activeSubCategory[0]?.parent
      }
    },
  },
  methods: {
    doUpdateActiveCategory(category) {
      if (this.activeCategory === category) {
        this.activeCategory = ''
        return
      }
      this.activeCategory = category
    },
    doCloseGlobalFilters() {
      if (!this.isGlobal) return
      this.$root.$emit('marketplace/filter/global')
    },
  },
  apollo: {
    categories: {
      fetchPolicy: 'no-cache',
      variables: {
        hasProductsOnly: true,
      },
      query: gql`
        query ($hasProductsOnly: Boolean) {
          getActiveCategories(hasProductsOnly: $hasProductsOnly) {
            id
            name
            parent
            PhotoURL
          }
        }
      `,
      update(data) {
        return data?.getActiveCategories
      },
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-categories::v-deep {
  ._title {
    text-transform: uppercase;
    color: #050505;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .accordion-item {
    &:not(:last-child) {
      .header {
        margin-bottom: 10px;
      }
    }

    .header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      color: #65676b;

      ._value {
        flex: 10000 1 0;

        a {
          color: inherit;
        }
      }
    }

    .sub-categories {
      .sub-category-item {
        color: inherit;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 0.8571rem;
        font-weight: 500;
        text-transform: uppercase;
        margin-bottom: 10px;

        ._icon {
          width: 32px;
          height: 32px;
          border: 2px solid $white;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
          margin-right: 10px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .active {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            background-color: rgba($secondary, 0.5);
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            opacity: 0;

            img {
              width: auto;
              height: auto;
            }
          }
        }

        &:last-child {
          margin-bottom: 20px;
        }

        &.all {
          ._icon {
            background-color: #cff1f8;
            padding: 4px;
          }
        }

        &.active {
          ._icon {
            .active {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
