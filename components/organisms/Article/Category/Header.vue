<template lang="pug">
  .header-actions
    h1 {{articleTitle}} Articles
    .filter
      .left-filter(v-click-outside="doHideCategoriesDropdown")
        b-button(type="is-secondary" label="Categories" outlined @click.prevent="showCategories = !showCategories")
        transition(name="fade")
          .categories-dropdown-container(v-if="showCategories")
            .categories-dropdown(v-bar="{preventParentScroll: true}")
              div(style="max-height: 250px;")
                .category-item.all(@click.prevent="selectedCategories = []" :class="selectedCategories.length === 0 && 'active'")
                  ._icon.img-border-shadow
                    img(src="~assets/images/Categories/active/all.svg" width="20" height="20")
                    .selected: b-icon(icon="check" size="is-small" type="is-light")
                  ._label All
                .category-item(v-for="(category, index) in categories" :key="index" @click.prevent="doSelectCategories(category)" :class="selectedCategories.includes(category) && 'active'")
                  ._icon.img-border-shadow
                    img(:src="require(`~/assets/images/Discover/${category.id}-category.webp`)" width="28" height="28")
                    .selected: b-icon(icon="check" size="is-small" type="is-light")
                  ._label {{category.name}}
      .right-filter
        XAFormSelect(v-model="sortBy" :options="sortByOptions" optionsLabel="value" :show-label="false")
    .selected-categories
      .selected-category(v-for="(category, index) in selectedCategories")
        ._label {{category.name}}
        .close(@click.prevent="doSelectCategories(category)"): b-icon(icon="close" size="is-small")
</template>

<script>
import XAFormSelect from '~/components/atoms/Form/Select'
export default {
  name: 'XOArticleCategoryHeader',
  components: { XAFormSelect },
  props: {
    articleTitle: String,
  },
  data() {
    return {
      selectedCategories: [],
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
      return ''
    },
  },
  watch: {
    selectedCategories(value) {
      this.$emit('DoSelectCategories', value)
    },
    sortBy(value) {
      this.$emit('DoSortByArticles', value)
    },
  },
  methods: {
    doSelectCategories(category) {
      if (this.selectedCategories.includes(category)) {
        this.selectedCategories = this.selectedCategories.filter((e) => {
          return e?.id !== category?.id
        })
      } else {
        this.selectedCategories.push(category)
      }
    },
    doHideCategoriesDropdown() {
      this.showCategories = false
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.header-actions::v-deep {
  h1 {
    color: $secondary;
    font-size: 3rem;
    line-height: 3.5714rem;
    margin-bottom: 10px;
  }

  @media (max-width: $tabletLG) {
    h1 {
      font-size: 1.5rem !important;
      line-height: 2rem !important;
    }
  }

  .filter {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 30px;

    .left-filter {
      position: relative;

      .categories-dropdown-container {
        position: absolute;
        top: 40px;
        left: 0;
        width: 270px;
        background-color: $white;
        box-shadow: 0 4px 30px rgba(18, 55, 63, 0.15);
        border-radius: 5px;
        padding: 20px;
        z-index: 1;

        .categories-dropdown {
          .category-item {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 10px;
            cursor: pointer;

            &.all {
              ._icon {
                background-color: #cff1f8;
                padding: 4px;
              }
            }

            &.active {
              ._icon {
                .selected {
                  opacity: 1;
                }
              }
            }

            ._icon {
              width: 32px;
              height: 32px;
              margin-right: 10px;
              position: relative;

              img {
                position: relative;
                z-index: 2;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }

              .selected {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
                background: linear-gradient(0deg, rgba(12, 53, 62, 0.5), rgba(12, 53, 62, 0.5));
                opacity: 0;
                transition: 0.3s;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
              }
            }

            ._label {
              font-size: 0.8571rem;
              font-weight: 500;
              text-transform: uppercase;
              color: $secondary;
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

  .selected-categories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: 30px;

    .selected-category {
      background-color: #eef1f1;
      color: $secondary;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      height: 28px;
      padding: 0 8px;
      border-radius: 30px;
      margin-right: 8px;
      margin-bottom: 8px;

      .close {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
