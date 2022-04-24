<template lang="pug">
.post-achievement-category.card
  .card-content.p-0.py-3.px-5
    form(action="#" autocomplete="off")
      .categories
        ._title.has-text-secondary.has-text-centered.has-text-weight-medium.is-size-4.mt-5 Select the community interests that match your achievement
        .list.is-flex.is-flex-wrap-wrap.is-align-items-center.mt-5
          XOCategoryPillsSelector.my-4(v-model="selectedCategories", :max="1", :clickable="true")

      .error-message(v-if="showError")
        p.has-text-weight-medium.has-text-danger Please select any community interest

      .actions.is-flex.is-flex-wrap.is-justify-content-flex-end
        b-button.is-uppercase.mr-3(type="is-primary" outlined @click="doCheckIfSelected") Cancel
        b-button.is-uppercase(type="is-primary" @click="doSaveCategory()") Save
      b-loading(v-model="isLoading")
</template>

<script>
import XOCategoryPillsSelector from '~/components/organisms/CategoryPillsSelector'
export default {
  components: { XOCategoryPillsSelector },
  data() {
    return {
      selectedCategories: [],
      isLoading: false,
      showError: false,
    }
  },
  computed: {
    categories() {
      return [
        {
          name: 'General Wellness',
          slug: 'general-wellness',
        },
      ]
    },
    doSelectCategories: {
      get() {
        return this.selectedCategories
      },
      set(value) {
        this.selectedCategories = []
        this.selectedCategories.push(value)
        return this.selectedCategories
      },
    },
  },
  methods: {
    doSaveCategory() {
      if (this.doSelectCategories.length === 0) {
        this.showError = true
      } else {
        this.showError = false
        this.$emit('iconSelected', this.doSelectCategories[0])
        this.$emit('close')
      }
    },
    doCheckIfSelected() {
      if (this.doSelectCategories.length === 0) {
        this.$emit('closeParentModal')
      }
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
/* stylelint-disable no-duplicate-selectors */
.post-achievement-category::v-deep {
  &.is-mobile-below {
    .card-content {
      padding: 15px;
    }
  }

  .categories {
    .note {
      font-size: 0.8571rem;
    }
    ._title {
      margin: 0 auto;
      padding: 0 40px;
    }

    @media (max-width: $tabletLG) {
      .list {
        max-height: 268px !important;
        overflow-x: scroll !important;
      }
    }

    .list {
      .item {
        background-color: #eef1f1;
        position: relative;
        cursor: pointer;
        border-radius: 100px;
        font-weight: 300;
        transition: 0.3s;

        &.active {
          background-color: $secondary;

          .default {
            opacity: 0;
          }

          .active {
            opacity: 1;
          }
        }

        .default,
        .active {
          transition: 0.3s;

          ._icon {
            width: 20px;
            height: 20px;
          }
        }

        .active {
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto 0;
        }

        .default {
          opacity: 1;
          color: $secondary;
        }

        .active {
          opacity: 0;
          color: $white;
        }
      }
    }
  }
}
</style>
