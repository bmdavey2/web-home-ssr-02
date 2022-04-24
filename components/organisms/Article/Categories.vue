<template lang="pug">
.article-category.card
  ._header.p-3.pt-4
    //.close.is-flex.is-flex-wrap-wrap.is-align-items-center(
    //  @click.prevent="$parent.close()"
    //  v-if="$viewport.lt.tabletLG"): b-icon(
    //  icon="close")

  .card-content
    .is-flex.is-flex-wrap-wrap.is-align-items-center.mb-3
      .categories.mb-5
        ._title.is-size-3.has-text-centered.has-text-secondary.has-text-weight-medium Select Categories
        .note.has-text-centered.mb-5 Select up to 5 categories so readers know what your article is about
        .list.is-flex.is-flex-wrap-wrap.is-align-items-center
          XOCategoryPillsSelector(v-model="selectedCategories", :max="5", :clickable="true")

    .actions.has-text-right
      b-button.is-uppercase(:disabled="!this.selectedCategories.length" type="is-primary" @click="doAddCategories()") Add Categories
    .error-publish.has-text-right.pt-2.has-text-weight-light(v-if="noCategoriesFound")
      p * Please select at least 1 category then click the publish button again

    b-loading(v-model="isLoading")
</template>

<script>
import XOCategoryPillsSelector from '~/components/organisms/CategoryPillsSelector'
export default {
  components: { XOCategoryPillsSelector },
  props: {
    initialCategories: { type: Array, default: () => [] },
    noCategoriesFound: { type: Boolean, default: false },
  },
  data() {
    return {
      post: '',
      selectedCategories: [],
      showPlaceholder: true,
      isLoading: false,
    }
  },
  created() {
    this.selectedCategories = this.initialCategories
  },
  methods: {
    doAddCategories() {
      this.$emit('doAddCategories', this.selectedCategories)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.article-category::v-deep {
  ._header {
    position: relative;
    text-align: center;
    text-transform: uppercase;

    .close {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      z-index: 1;
      cursor: pointer;
    }
  }

  .error-publish {
    color: red;
  }

  .card-content {
    padding: 35px 45px;

    .categories {
      width: 100%;
      .note {
        font-size: 1.1429rem;
        color: grey;
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
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;

            ._icon {
              width: 20px;
              height: 20px;
            }
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
}
</style>
