<template lang="pug">
.my-product-header
  .is-flex
    .tab-product.ml-5
      .is-flex
        b-dropdown(aria-role="list" position="is-bottom-left")
          template(#trigger)
            .is-flex
              p.is-uppercase.border-bottom(v-if="selectedTab === 'draft'") Drafts
              p.is-uppercase.border-bottom(v-else) {{ selectedTab }}
              b-icon.ml-2(:icon="onclickDrop ? 'menu-up' : 'menu-down'" @click.native="onclickDrop = !onclickDrop")
          b-dropdown-item(aria-role="listitem" v-for="(tab, index) in tabs", :key="tab" @click="selectTab(tab)")
            .is-uppercase(v-if="tab === 'draft'") Drafts
            .is-uppercase(v-else) {{ tab }}
    .filter.ml-auto.mr-5
      .is-flex
        b-dropdown(aria-role="list" position="is-bottom-left")
          template(#trigger)
            .is-flex
              img.mr-2(src="~assets/icons/secondary/align-right.svg")
              p {{ selectedFilter }}
          b-dropdown-item(
            aria-role="listitem"
            v-for="(filter, index) in sortByOptions",
            :key="filter.value"
            @click="selectFilter(filter.value)")
            p {{ filter.value }}
</template>

<script>
export default {
  name: 'XMMyProductHeader',
  props: {
    currentTab: String,
    currentFilter: String,
  },
  data() {
    return {
      sortByOptions: [
        { key: 'Most Popular', value: 'Most Popular' },
        { key: 'New', value: 'New' },
        { key: 'All', value: 'All' },
      ],
      selectedFilter: 'Most Popular',
      selectedTab: 'published',
      onclickDrop: true,
      tabs: ['published', 'expired', 'unpublished', 'draft'],
    }
  },
  watch: {
    currentTab: {
      deep: true,
      handler(value) {
        this.selectedTab = value
      },
    },
    currentFilter: {
      deep: true,
      handler(value) {
        this.selectedFilter = value
      },
    },
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab
      this.$emit('selectTab', tab)
      this.onclickDrop = true
    },
    selectFilter(filter) {
      this.selectedFilter = filter
      this.$emit('selectFilter', filter)
    },
  },
}
</script>

<style lang="scss" scoped>
.my-product-header::v-deep {
  box-shadow: 0 8px 6px -6px rgb(39 85 96 / 10%);
  height: 30px;
  background: #fff;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 40;
  top: 63px;
  .border-bottom {
    padding-bottom: 7px;
    border-bottom: 2px solid $secondary !important;
  }
}
</style>
