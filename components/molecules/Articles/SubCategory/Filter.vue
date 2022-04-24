<template lang="pug">
.xm-articles-sub-category-filter
  .left-filter(v-click-outside="doHideCategoryList")
    //- b-button(type="is-secondary" label="Categories" outlined @click.prevent="showCategories = !showCategories")
    //- transition(name="fade")
      .categories(v-if="showCategories")
        simplebar.custom-scrollbar(data-simplebar-auto-hide="false")
          nuxt-link.category-item(
            v-for="(category, index) in categories",
            :key="index",
            :to="`/articles/${$route.params.category}/${category.id}`")
            .photo
              img(:src="category.PhotoURL")
              .active: b-icon(icon="check" size="is-small")
            .name {{ category.name }}
  .right-filter
    XAFormSelect(
      v-model="sortBy",
      :options="sortByOptions"
      optionsLabel="value",
      :show-label="false"
      @input="doUpdateSortByFilter()")
</template>

<script>
import XAFormSelect from '~/components/atoms/Form/Select'

export default {
  name: 'XMArticlesSubCategoryFilter',
  components: { XAFormSelect },
  data() {
    return {
      showCategories: false,
      sortBy: 'Trending',
      sortByOptions: [
        { key: 'trending', value: 'Trending' },
        { key: 'latest', value: 'Latest' },
        // { key: 'mentors', value: 'Mentors' },
      ],
    }
  },
  computed: {
    categories() {
      return this.$parent?.categories || null
    },
  },
  methods: {
    doHideCategoryList() {
      this.showCategories = false
    },
    doUpdateSortByFilter() {
      this.$emit('DoUpdateSortByFilter', this.sortBy)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-articles-sub-category-filter::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 50px;

  .left-filter {
    position: relative;

    .categories {
      background-color: $white;
      box-shadow: 0 4px 30px rgba(18, 55, 63, 0.15);
      border-radius: 5px;
      position: absolute;
      top: 40px;
      left: 0;
      width: 295px;
      z-index: 2;
      padding: 20px;

      .custom-scrollbar {
        max-height: 500px;

        .simplebar-track {
          &.simplebar-vertical {
            width: 7px;
          }

          .simplebar-scrollbar {
            &::before {
              background-color: $primary;
              opacity: 1;
            }
          }
        }
      }

      .category-item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;

        .photo {
          border: 1px solid $white;
          box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
          border-radius: 3px;
          width: 32px;
          height: 32px;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
            z-index: 1;
          }

          .active {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($secondary, 0.6);
            color: $white;
            z-index: 2;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            opacity: 0;
          }
        }

        .name {
          color: $secondary;
          text-transform: uppercase;
          font-size: 0.8571rem;
          font-weight: 500;
          line-height: 1.2;
          flex: 10000 1 0;
          margin-left: 15px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &.active {
          .photo {
            .active {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .right-filter {
    width: 100%;
    max-width: 150px;
  }
}
</style>
