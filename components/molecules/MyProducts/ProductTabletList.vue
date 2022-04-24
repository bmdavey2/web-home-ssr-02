<template lang="pug">
.product-item-tablet
  .is-flex.is-flex-wrap-nowrap.is-align-items-center.mb-5.mt-2(v-for="row of items")
    b-checkbox(
      v-model="checkboxGroup",
      :native-value="row",
      :disabled="row.isNFTMedal",
      :style="{ visibility: row.isNFTMedal && 'hidden' }")
    .product-card.is-flex.is-flex-wrap-nowrap
      .thumbnail.mr-5.is-cursor-pointer(@click="editProduct(row.id)")
        img(:src="row.coverPhotoURL" v-if="row.coverPhotoID" width="142px" height="142px")
        XAImageNotLoaded(v-else)
      .product-details.is-flex.is-flex-direction-column.is-justify-content-space-between
        .is-flex.is-fullwidth
          p.has-text-weight-medium.is-cursor-pointer.row.items-center(@click="editProduct(row.id)")
            span.mr-2 {{ row.title }}
            span.row.items-center(v-if="row.isNFTMedal"): b-icon(icon="trophy-variant" type="is-primary")
          p.has-text-weight-light.ml-auto {{ row.status }}
        p.has-text-weight-light.my-auto {{ row.inquiryType }}
        .is-flex.is-fullwidth
          .image-container
            //- img.mr-4(
              v-for="slug of row.CategoryIDs",
              :src="require(`~/assets/icons/categories/default/${slug}.svg`)"
              width="23.9px"
              height="23.9px")

            img.mr-4(
              :src="require(`~/assets/icons/categories/default/${convertStringToSlug(row.Categories[0].parent)}.svg`)"
              width="23.9px"
              height="23.9px")
          .ml-auto.dates
            p(v-if="row.startDate && row.endDate") {{ convertDate(row.startDate) }} - {{ convertDate(row.endDate) }}
            p(v-else-if="row.startDate") {{ convertDate(row.startDate) }}
            p(v-else) -
  .empty-product.is-align-items-center.is-justify-content-center.is-flex(v-if="!items.length && !loading")
    .mt-5 No Products Found!
  .loading.is-align-items-center.is-justify-content-center.is-flex(v-if="loading")
    .mt-5 Loading...
</template>

<script>
import moment from 'moment'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMProductTabletList',
  components: { XAImageNotLoaded },
  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    checkedRows: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentPage: 1,
      checkboxGroup: [],
    }
  },
  watch: {
    checkedRows: {
      deep: true,
      handler(value) {
        this.checkboxGroup = value
      },
    },
    checkboxGroup: {
      deep: true,
      handler(value) {
        this.$emit('select', value)
      },
    },
  },
  mounted() {
    console.log('product list...', this.items)
  },
  methods: {
    convertDate(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    editProduct(id) {
      if (id) this.$router.push('/me/products/edit/' + id)
    },
    selectAll(data) {
      if (data) this.$emit('select', 'All')
      else this.$emit('select', 'None')
    },
  },
}
</script>

<style lang="scss" scoped>
.product-item-tablet::v-deep {
  .product-card {
    background-color: $white;
    height: 190px;
    border-radius: 3px;
    padding: 24px;
    width: 659px;

    .thumbnail {
      min-width: 142px;
      max-width: 142px;
      height: 142px;
      img {
        border-radius: 16px;
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
      .image-not-loaded {
        min-width: 142px !important;
        max-width: 142px !important;
        height: 142px !important;
        border-radius: 16px !important;
      }
    }
    .image-container {
      max-width: 300px;
    }
    .product-details {
      width: 100%;
      .w-100 {
        width: 100%;
      }
    }
  }
}
</style>
