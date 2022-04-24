<template lang="pug">
.container
  .my-products-container
    .is-flex.is-align-items-center.pt-5.is-hidden-mobile
      h1.is-size-1.has-text-secondary My Products
      b-button.ml-5(type="is-primary" tag="router-link" to="/me/products/add" outlined) ADD NEW
    .is-flex.mt-5.is-hidden-mobile
      .tabs
        ul.is-flex.is-justify-content-left.has-text-weight-regular.is-uppercase
          li(v-for="(tab, index) in tabs" @click="selectTab(tab)", :class="currentTab === tab ? 'active' : null")
            a.is-uppercase(v-if="tab === 'draft'") Drafts ({{ getAggregates('draft') }})
            a.is-uppercase(v-else) {{ tab }} ({{ getAggregates(tab) }})
      .search.is-visible-dekstop
        b-input(placeholder="Search" @input="searchDataAsync" v-model="search" icon="magnify")
    .is-visible-tablet
      .is-flex.is-fullwidth
        .is-flex.is-align-items-center
          ._label.mr-2 Sort by:
          ._input: XAFormSelect(
            v-model="sortBy"
            @input="searchSortBy",
            :options="sortByOptions"
            optionsLabel="value",
            :show-label="false")
        b-input.ml-auto(placeholder="Search" @input="searchDataAsync" v-model="search" icon="magnify")

    .is-flex.button-actions.mt-5.is-align-items-center.mb-5.is-hidden-mobile
      b-checkbox.select-all-tablet(v-model="tabletSelect" @change.native="tabletSelectAll") Select All
      b-button(type="is-text", :disabled="!hasCheckedRows" @click="unpublishSelected" v-if="hideUnPublish") Unpublish selected
      b-button(
        @click="publishSelected"
        type="is-text",
        :disabled="!hasCheckedRows"
        v-if="currentTab === 'draft' || currentTab === 'unpublished'") Publish selected
      b-button(type="is-text", :disabled="!hasCheckedRows" @click="deleteSelected") Delete selected

      .right-filter.is-visible-dekstop
        ._label Sort by:
        ._input: XAFormSelect(
          v-model="sortBy"
          @input="searchSortBy",
          :options="sortByOptions"
          optionsLabel="value",
          :show-label="false")

    XMProductTable.is-visible-dekstop(
      :items="paginatedProducts",
      :loading="isLoading",
      :checkedRows="checkedRows"
      @select="setcheckedRows")
    XMProductTabletList.is-visible-tablet(
      :items="paginatedProducts",
      :loading="isLoading",
      :checkedRows="checkedRows"
      @select="setcheckedRows")
    XMProductMobileList.is-visible-mobile(:items="paginatedProducts", :loading="isLoading")
    XMProductPagination.bottom-margin(:items="products" @change="changeProducts")
    XMMyProductHeader.is-visible-mobile(
      :currentTab="currentTab",
      :currentFilter="sortBy"
      @selectTab="setTab"
      @selectFilter="setFilter")
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import XAFormSelect from '~/components/atoms/Form/Select'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'
import XMProductTable from '~/components/molecules/MyProducts/ProductTable'
import XMProductPagination from '~/components/molecules/MyProducts/ProductPagination'
import XMProductTabletList from '~/components/molecules/MyProducts/ProductTabletList'
import XMProductMobileList from '~/components/molecules/MyProducts/ProductListMobile'
import XMMyProductHeader from '~/components/molecules/MyProducts/ProductMobileHeader'

export default {
  name: 'XPMyProducts',
  components: {
    XMMyProductHeader,
    XMProductMobileList,
    XMProductTabletList,
    XMProductPagination,
    XMProductTable,
    XAImageNotLoaded,
    XAFormSelect,
  },
  data() {
    return {
      tabs: ['published', 'expired', 'unpublished', 'draft'],
      currentTab: 'published',
      activeFilter: '',
      sortBy: 'Most Popular',
      sortByOptions: [
        { key: 'Most Popular', value: 'Most Popular' },
        { key: 'New', value: 'New' },
      ],
      products: [],
      paginatedProducts: [],
      isLoading: false,
      search: '',
      checkedRows: [],
      tabletSelect: false,
      aggregates: [],
    }
  },
  computed: {
    ...mapGetters({
      getBusinessSubscription: 'business/getBusinessSubscription',
    }),
    hasCheckedRows() {
      return this.checkedRows.length || false
    },
    hideUnPublish() {
      switch (this.currentTab) {
        case 'draft':
        case 'expired':
        case 'unpublished':
          return false
        default:
          return true
      }
    },
  },
  mounted() {
    this.loadProducts()
  },
  methods: {
    getAggregates(tab) {
      switch (tab) {
        case 'draft':
          return this.aggregates.draft || 0
        case 'expired':
          return this.aggregates.expired || 0
        case 'published':
          return this.aggregates.published || 0
        case 'unpublished':
          return this.aggregates.unpublished || 0
      }
    },
    publishSelected() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Article/Library/ArticleDialog').default,
        width: 400,
        props: {
          heading: 'Are you sure to published selected products?',
        },
        events: {
          onclickActionEmit: () => {
            this.publishProduct()
          },
        },
        canCancel: false,
      })
    },
    unpublishSelected() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Article/Library/ArticleDialog').default,
        width: 400,
        props: {
          heading: 'Are you sure to unpublished selected products?',
        },
        events: {
          onclickActionEmit: () => {
            this.unpublishProduct()
          },
        },
        canCancel: false,
      })
    },
    deleteSelected() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Article/Library/ArticleDialog').default,
        width: 400,
        props: {
          heading: 'Are you sure to delete selected products?',
        },
        events: {
          onclickActionEmit: () => {
            this.deleteProducts()
          },
        },
        canCancel: false,
      })
    },
    async unpublishProduct() {
      const ids = []
      for (const row of this.checkedRows) {
        if (row.status === 'Published') ids.push(row.id)
      }

      try {
        this.isLoading = true
        await this.$apollo.mutate({
          variables: {
            ids,
          },
          mutation: gql`
            mutation unpublishProducts($ids: [String!]!) {
              unpublishProducts(ids: $ids) {
                objectID
                objectType
                success
                timestamp
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'My Products')
      } finally {
        await this.loadProducts()
        this.$toast.success('Product has been updated', { duration: 3000, position: 'top-center' })
      }
    },
    async publishProduct() {
      try {
        this.isLoading = true
        const ids = []
        for (const row of this.checkedRows) {
          ids.push(row.id)
        }
        await this.$apollo.mutate({
          variables: {
            ids,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation publishProducts($ids: [String!]!) {
              publishProducts(ids: $ids) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'My Products')
      } finally {
        await this.loadProducts()
        this.$toast.success('Product has been updated', { duration: 3000, position: 'top-center' })
      }
    },
    async deleteProducts() {
      const ids = []
      for (const row of this.checkedRows) {
        // if (row.status === 'Published')
        ids.push(row.id)
      }

      try {
        this.isLoading = true
        await this.$apollo.mutate({
          variables: {
            ids,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation deleteProducts($ids: [String!]!) {
              deleteProducts(ids: $ids) {
                objectID
                objectType
                success
                timestamp
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'My Products')
      } finally {
        await this.loadProducts()
        this.$toast.success('Product has been deleted', { duration: 3000, position: 'top-center' })
      }
    },
    setTab(tab) {
      this.currentTab = tab
      this.loadProducts()
    },
    setFilter(filter) {
      this.sortBy = filter
      this.loadProducts()
    },
    tabletSelectAll(value) {
      const isChecked = value.target.checked
      isChecked ? this.setcheckedRows('All') : this.setcheckedRows('None')
    },
    setcheckedRows(value) {
      if (value === 'None') {
        this.checkedRows = []
      } else if (value === 'All') {
        this.checkedRows = this.paginatedProducts
      } else {
        this.checkedRows = value
      }
    },
    searchSortBy(value) {
      this.sortBy = value
      this.loadProducts()
    },
    searchDataAsync(text) {
      if (text) {
        const result = this.products.filter((o) => o.title.includes(text))
        this.products = result
      } else {
        this.products = this.containProduct
      }
    },
    changeProducts(data) {
      this.paginatedProducts = data
    },
    async loadProducts() {
      this.tabletSelect = []
      this.checkedRows = []
      this.products = []
      this.isLoading = true

      if (this.currentBusinessID) {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            businessID: this.currentBusinessID,
            filterType: this.currentTab,
            sortBy: this.sortBy,
          },
          query: gql`
            query ($businessID: String, $sortBy: String, $filterType: String) {
              Products(businessID: $businessID, sortBy: $sortBy, filterType: $filterType) {
                items {
                  coverPhotoURL
                  title
                  inquiryType
                  status
                  startDate
                  endDate
                  coverPhotoID
                  CategoryIDs
                  id
                  isNFTMedal
                  Business {
                    name
                  }
                  Categories {
                    id
                    name
                    parent
                  }
                }
              }
            }
          `,
        })

        const res = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            actorID: this.currentBusinessID,
            actorType: 'Business',
          },
          query: gql`
            query ($actorType: String, $actorID: String) {
              getMyProductsAggregates(actorType: $actorType, actorID: $actorID) {
                draft
                expired
                published
                unpublished
              }
            }
          `,
        })
        this.aggregates = res.data?.getMyProductsAggregates
        const products = data.Products?.items
        if (this.currentTab === 'expired') {
          for (const product of products) {
            product.status = 'Expired'
          }
        }
        this.products = products
        this.containProduct = products
      }
      this.isLoading = false
    },
    selectTab(tab) {
      this.currentTab = tab
      this.sortBy = 'Most Popular'
      this.loadProducts()
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  overflow-x: hidden;
  flex: 70;

  ul {
    border-bottom: none;

    li {
      padding-right: 8%;

      a {
        color: #65676b;
        border-bottom-width: 0;
      }

      &.active a {
        border-bottom-color: $secondary !important;
        border-bottom-width: medium !important;
        color: $secondary;
      }
    }
  }
}

.search {
  flex: 30;
}

.button-actions {
  .button {
    text-decoration: none !important;
  }
}

.right-filter {
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 270px;

  ._input {
    width: 100%;
    max-width: 210px;
  }
}
.bottom-margin {
  margin-bottom: 100px !important;
}

.is-visible-tablet,
.select-all-tablet,
.is-visible-mobile {
  display: none !important;
}
.is-hidden-mobile {
  display: flex !important;
}

@media (max-width: 768px) {
  .is-visible-dekstop {
    display: none;
  }
  .is-visible-tablet {
    display: unset !important;
  }
  .select-all-tablet {
    display: inline-flex !important;
  }
}

@media (max-width: 536px) {
  .is-visible-tablet {
    display: none !important;
  }
  .is-hidden-mobile {
    display: none !important;
  }
  .select-all-tablet {
    display: none !important;
  }
  .is-visible-mobile {
    display: block !important;
  }
}
</style>
