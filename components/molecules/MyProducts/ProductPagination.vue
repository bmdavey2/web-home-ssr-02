<template lang="pug">
.is-flex.table-footer.is-align-items-center.mt-5.mb-5
  .item-selector.is-flex.is-align-items-center
    ._label.mr-1 Item per page:
    ._input: XAFormSelect(v-model="showItem", :options="itemOptions", :show-label="false")

  .product-pagination
    b-pagination(
      :total="total"
      v-model="currentPage"
      @change="changePage"
      order="is-centered"
      range-before="3"
      range-after="1",
      :rounded="true",
      :per-page="currentItemPage"
      icon-prev="chevron-left"
      icon-next="chevron-right")

  .filter
    .right-content
      ._label.mr-1 Go to Page:
      ._input: XAFormSelect(v-model="goToPage", :options="pageOptions", :show-label="false")
</template>

<script>
import XAFormSelect from '~/components/atoms/Form/Select'
export default {
  name: 'XMProductPagination',
  components: { XAFormSelect },
  props: {
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentPage: 1,
      showItem: '5',
      goToPage: '1',
      itemOptions: ['5', '10', '20', 'All'],
    }
  },
  computed: {
    total() {
      return this.items?.length || 0
    },
    currentItemPage() {
      return this.showItem ? (this.showItem === 'All' ? this.total : this.showItem) : '5'
    },
    pageOptions() {
      const pages = []
      const res = this.total / this.showItem
      const page = Math.ceil(res)
      for (let i = 0; i < page; i++) {
        pages.push(i + 1)
      }
      return pages
    },
    paginatedItem() {
      const pageNumber = this.currentPage - 1
      return this.items.slice(pageNumber * this.currentItemPage, (pageNumber + 1) * this.currentItemPage)
    },
  },
  watch: {
    goToPage: {
      deep: true,
      handler(value) {
        if (!value) this.currentPage = 1
        else this.currentPage = value
      },
    },
    paginatedItem: {
      deep: true,
      handler(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    changePage(value) {
      this.goToPage = value
    },
  },
}
</script>

<style lang="scss" scoped>
.table-footer {
  width: 100%;
  .item-selector {
    flex: 25;
  }
  .product-pagination {
    flex: 50;
  }
  .filter {
    flex: 25;
    .right-content {
      align-items: center;
      width: 200px;
      display: flex;
      margin-left: auto;
    }
  }
}

@media (max-width: 768px) {
  .item-selector {
    display: none !important;
  }
  .filter {
    display: none !important;
  }
  .product-pagination {
    flex: 100 !important;
  }
}
</style>
