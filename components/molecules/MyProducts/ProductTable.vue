<template lang="pug">
b-table.mt-5.product-table(
  :data="items"
  checkable,
  :checked-rows.sync="desktopCheckRows"
  checkbox-position="left",
  :loading="loading",
  :row-class="(row, index) => row.isNFTMedal && 'has-medal'")
  b-table-column(field="id" label="Title" v-slot="props" width="400px")
    .is-flex.is-align-items-center.link
      .thumbnail.mr-5.my-4.is-cursor-pointer(@click="editProduct(props.row.id)")
        img(:src="props.row.coverPhotoURL" v-if="props.row.coverPhotoID" width="86px" height="86px")
        XAImageNotLoaded(v-else)

      a.has-text-weight-medium.is-cursor-pointer.row.items-center(@click="editProduct(props.row.id)")
        span.mr-2 {{ props.row.title }}
        span.row.items-center(v-if="props.row.isNFTMedal"): b-icon(icon="trophy-variant" type="is-primary")
  b-table-column(field="id" label="Categories" v-slot="props" width="200px")
    .item.is-flex.is-flex-wrap-wrap.my-4
      //- img.mr-4(v-for="slug of props.row.CategoryIDs", :src="require(`~/assets/icons/categories/default/${slug}.svg`)")
      img.mr-4(
        :src="require(`~/assets/icons/categories/default/${convertStringToSlug(props.row.Categories[0].parent)}.svg`)")

  b-table-column(field="id" label="Inquiry Type" v-slot="props")
    .item.my-4.has-text-weight-light
      p {{ props.row.inquiryType }}
  b-table-column(field="id" label="Status" v-slot="props")
    .item.my-4.has-text-weight-light(style="color: ##65676b")
      p {{ props.row.status }}
  b-table-column(field="id" label="Date" v-slot="props" width="150px")
    .item.my-4
      p(v-if="props.row.startDate && props.row.endDate") {{ convertDate(props.row.startDate) }} - {{ convertDate(props.row.endDate) }}
      p(v-else-if="props.row.startDate") {{ convertDate(props.row.startDate) }}
      p(v-else) -
  template(#empty)
    p No products Found
</template>

<script>
import moment from 'moment'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMProductTable',
  components: { XAImageNotLoaded },
  props: {
    items: { type: Array, default: () => [{}] },
    loading: { type: Boolean, default: false },
    checkedRows: { type: Array, default: () => [] },
  },
  data() {
    return {
      imageLoaded: true,
      desktopCheckRows: [],
    }
  },
  watch: {
    checkedRows: {
      deep: true,
      handler(value) {
        this.desktopCheckRows = value
      },
    },
    desktopCheckRows: {
      deep: true,
      handler(value) {
        this.$emit('select', value)
      },
    },
  },
  methods: {
    doCheckIfImageIsLoaded() {
      this.imageLoaded = false
    },
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
.product-table::v-deep {
  .table-header {
    height: 59px;
    display: flex;
    align-items: center;
  }

  .link {
    a {
      color: black !important;
    }
  }

  .thumbnail {
    width: 86px;
    height: 86px;
    img {
      border-radius: 16px;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .image-not-loaded {
      width: 86px !important;
      height: 86px !important;
      border-radius: 16px !important;
    }
  }

  .item {
    height: 86px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  tbody {
    .has-medal {
      .checkbox-cell {
        label {
          display: none;
        }
      }
    }

    td {
      .checkbox {
        padding: 50px 0;
      }
    }
  }
}
</style>
