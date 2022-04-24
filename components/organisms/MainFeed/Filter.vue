<template lang="pug">
.xo-feed-filter.is-user-select-none(style="font-size: smaller")
  .selected-title.p-4.mb-4
    | {{ selectedCategoryTitle }}
  .select-categories
    .card
      .card-content
        .actions.has-text-weight-semibold.is-uppercase(@click.prevent="_show = !_show")
          ._label.py-1(style="font-size: smaller") Filter My Feed
          ._icon: b-icon(:icon="_show ? 'chevron-up' : 'chevron-down'")

        .content(v-if="_show")
          .categories-container
            client-only
              simplebar.custom-scrollbar(data-simplebar-auto-hide="false")
                .categories
                  template(v-if="!categories")
                    XMFeedFilterItem(v-for="n in 3", :key="n", :loading="true")

                  template(v-else)
                    XMFeedFilterItem(
                      key="all",
                      :value="null"
                      label="All",
                      :active="selectedCategoryID === null"
                      @click="clickCategory(null)")
                    XMFeedFilterItem(
                      v-for="category in _categories",
                      :key="category.id",
                      :value="category.id",
                      :image="category.PhotoURL",
                      :label="category.name",
                      :active="selectedCategoryID === category.id"
                      @click="clickCategory(category.id)")

          .separator.my-3
          div Expand your active lifestyle by discovering new community interests here
          nuxt-link.has-text-primary.is-uppercase.has-text-weight-semibold.py-4(
            style="display: block"
            to="/community-interests",
            :event="isLoggedIn ? 'click' : ''")
            div(@click="!isLoggedIn ? showSignUpNagDialog() : null") MANAGE MY COMMUNITY INTERESTS
</template>

<script>
import find from 'lodash/find'
import simplebar from 'simplebar-vue'
import XMFeedFilterItem from '~/components/molecules/MainFeed/FilterItem'
import 'simplebar/dist/simplebar.min.css'

export default {
  name: 'XOMainFeedFilter',
  components: { XMFeedFilterItem, simplebar },
  props: {
    categories: { type: Array, default: null },
    show: Boolean,
  },
  computed: {
    _show: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      },
    },
    _value: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    _categories() {
      // ~assets/icons/categories/active/logo.svg -- 20
      return this.categories
    },
    selectedCategoryID() {
      return this.$store.state.app.selectedCategory
    },
    selectedCategoryTitle() {
      return find(this.categories, (x) => x.id === this.selectedCategoryID)?.name || 'All'
    },
  },
  methods: {
    clickCategory(id) {
      this.$store.commit('app/setSelectedCategory', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-feed-filter::v-deep {
  .selected-title {
    background-color: #eef1f1;
    // color: $secondary;
    font-weight: bold;
    text-transform: uppercase;
  }

  .select-categories {
    position: relative;
    z-index: 5;

    .card {
      .card-content {
        padding: 14px 14px 0;

        .actions {
          font-size: 1rem;
          line-height: 1;
          user-select: none;
          cursor: pointer;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
        }
      }
    }

    .separator {
      width: 25%;
      height: 1px;
      background: #000;
    }

    .custom-scrollbar {
      max-height: 250px;

      .simplebar-track {
        .simplebar-scrollbar {
          &::before {
            background-color: $primary;
            opacity: 1;
            width: 4px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    .selected-title {
      width: 100%;
      order: 2;
    }

    .select-categories {
      width: 100%;
      order: 1;
      min-height: 61px;

      .card {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  }
}
</style>
