<template lang="pug">
.product-item-mobile
  .is-flex.is-flex-wrap-nowrap.is-align-items-center.mb-5.mt-2(v-for="row of items")
    .product-card.is-flex.is-flex-wrap-nowrap.is-flex-direction-column.is-justify-content-space-between
      .header.is-flex
        .thumbnail.mr-5.is-cursor-pointer(@click="editProduct(row.id)")
          img(:src="row.coverPhotoURL" v-if="row.coverPhotoID" width="142px" height="142px")
          XAImageNotLoaded(v-else)
        p.has-text-weight-medium.is-cursor-pointer(@click="editProduct(row.id)") {{ row.title }}
      .product-content.is-flex
        p Date
        .product-value.ml-auto.mr-4
          p(v-if="row.startDate && row.endDate") {{ convertDate(row.startDate) }} - {{ convertDate(row.endDate) }}
          p(v-else-if="row.startDate") {{ convertDate(row.startDate) }}
          p(v-else) -
      .product-content.is-flex
        p Inquiry Type
        .product-value.ml-auto
          p.has-text-weight-light {{ row.inquiryType }}
      .product-content.is-flex
        p Status
        .product-value.ml-auto
          p.has-text-weight-light {{ row.status }}
      .product-content.is-flex
        p.mr-4 Categories
        .product-value.ml-auto
          //- img.mr-4(
            v-for="slug of row.CategoryIDs",
            :src="require(`~/assets/icons/categories/default/${slug}.svg`)"
            width="23px"
            height="23px")
          img.mr-4(
            :src="require(`~/assets/icons/categories/default/${convertStringToSlug(row.Categories[0].parent)}.svg`)"
            width="23px"
            height="23px")

  .empty-product.is-align-items-center.is-justify-content-center.is-flex(v-if="!items.length && !loading")
    .mt-5 No Products Found!
  .loading.is-align-items-center.is-justify-content-center.is-flex(v-if="loading")
    .mt-5 Loading...
</template>

<script>
import moment from 'moment'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMProductMobileList',
  components: { XAImageNotLoaded },
  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      checkboxGroup: [],
    }
  },
  methods: {
    editProduct(id) {
      if (id) this.$router.push('/me/products/edit/' + id)
    },
    convertDate(date) {
      return moment(date).format('DD MMMM YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
.product-item-mobile::v-deep {
  margin-top: 50px;
  .product-card {
    height: 287px;
    width: 415px;
    border-radius: 3px;
    background-color: $white;
    padding: 24px;
    margin: 0 auto;
  }

  .thumbnail {
    min-width: 87px;
    max-width: 87px;
    height: 87px;
    img {
      border-radius: 16px;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .image-not-loaded {
      min-width: 87px !important;
      max-width: 87px !important;
      height: 87px !important;
      border-radius: 16px !important;
    }
  }
}
</style>
