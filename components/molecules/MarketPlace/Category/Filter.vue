<template lang="pug">
.xm-marketplace-category-filter
  .container
    .filters
      .left-filter(v-click-outside="doUpdateActiveFilter")
        XMMarketPlaceCategoryFilterGlobal
        XMMarketPlaceCategoryFilterCategory(
          :active-filter="activeFilter"
          @DoUpdateActiveFilter="activeFilter = $event")
        XMMarketPlaceCategoryFilterType(:active-filter="activeFilter" @DoUpdateActiveFilter="activeFilter = $event")
        XMMarketPlaceCategoryFilterLocation(
          :active-filter="activeFilter"
          @DoUpdateActiveFilter="activeFilter = $event")
        XMMarketPlaceCategoryFilterDates(:active-filter="activeFilter" @DoUpdateActiveFilter="activeFilter = $event")
        XMMarketPlaceCategoryFilterPrice(
          :active-filter="activeFilter",
          :clear-filter="clearFilter"
          @DoUpdateActiveFilter="activeFilter = $event")
        .clear-filter(v-if="clearFilter" @click.prevent="doClearProductFilters()") Clear Filter
      .right-filter
        ._label Sort by:
        ._input: FormSelect(
          v-model="sortBy",
          :options="sortByOptions"
          optionsLabel="value",
          :show-label="false"
          @input="setProductFilters({ sortBy })")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import XMMarketPlaceCategoryFilterCategory from '~/components/molecules/MarketPlace/Category/Filter/Category'
import XMMarketPlaceCategoryFilterType from '~/components/molecules/MarketPlace/Category/Filter/Type'
import XMMarketPlaceCategoryFilterLocation from '~/components/molecules/MarketPlace/Category/Filter/Location'
import XMMarketPlaceCategoryFilterDates from '~/components/molecules/MarketPlace/Category/Filter/Dates'
import XMMarketPlaceCategoryFilterPrice from '~/components/molecules/MarketPlace/Category/Filter/Price'
import XMMarketPlaceCategoryFilterGlobal from '~/components/molecules/MarketPlace/Category/Filter/Global'
import FormSelect from '~/components/atoms/Form/Select'

export default {
  name: 'XMMarketPlaceCategoryFilter',
  components: {
    XMMarketPlaceCategoryFilterCategory,
    XMMarketPlaceCategoryFilterType,
    XMMarketPlaceCategoryFilterLocation,
    XMMarketPlaceCategoryFilterDates,
    XMMarketPlaceCategoryFilterPrice,
    XMMarketPlaceCategoryFilterGlobal,
    FormSelect,
  },
  data() {
    return {
      activeFilter: '',
      sortBy: 'Most Popular',
      sortByOptions: [
        { key: 'Most Popular', value: 'Most Popular' },
        { key: 'New', value: 'New' },
      ],
      clearFilter: false,
      activePages: ['active-events', 'active-experiences', 'active-programs'],
    }
  },
  computed: {
    ...mapGetters({
      getProductFilters: 'marketplace/getProductFilters',
    }),
    ...mapFields('marketplace', [
      'filters.type',
      'filters.virtual',
      'filters.locationCountry',
      'filters.locationState',
      'filters.dateFrom',
      'filters.dateTo',
      'filters.priceType',
      'filters.priceFrom',
      'filters.priceTo',
    ]),
    title() {
      return this.$parent?.title
    },
  },
  watch: {
    getProductFilters: {
      deep: true,
      handler(value) {
        if (
          value?.type ||
          value?.locationCountry ||
          value?.locationState ||
          value?.dateFrom ||
          value?.dateTo ||
          value?.priceType ||
          value?.virtual !== null
        ) {
          this.clearFilter = true
          return
        }
        this.clearFilter = false
      },
    },
  },
  mounted() {
    this.doCheckFilters()
  },
  methods: {
    ...mapActions({
      setProductFilters: 'marketplace/setProductFilters',
    }),
    doClearProductFilters() {
      this.type = null
      this.virtual = null
      this.locationCountry = null
      this.locationState = null
      this.dateFrom = null
      this.dateTo = null
      this.priceType = null
      this.priceFrom = null
      this.priceTo = null
    },
    doUpdateActiveFilter() {
      this.activeFilter = ''
    },
    doCheckFilters() {
      if (
        (this.type ||
          this.virtual ||
          this.locationCountry ||
          this.locationState ||
          this.dateFrom ||
          this.dateTo ||
          this.priceType) !== null
      ) {
        this.clearFilter = true
        return
      }
      this.clearFilter = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-filter::v-deep {
  background-color: $white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: sticky;
  top: 90px;
  left: 0;
  z-index: 2;
  padding: 12px 0 2px;

  .filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;

    .left-filter {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .action {
        position: relative;
        margin-bottom: 10px;

        &:not(:last-child) {
          margin-right: 15px;
        }

        .value {
          border: 1px solid $secondary;
          border-radius: 5px;
          padding: 8px 16px;
          cursor: pointer;
          user-select: none;
          font-weight: 300;

          &.disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
        }

        .dropdown-filter {
          position: absolute;
          top: 45px;
          left: 0;
          box-shadow: 0 4px 30px rgb(18 55 63 / 15%);
          background-color: $white;
          padding: 20px;
          border-radius: 5px;

          .filter-item {
            &:not(:last-child) {
              margin-bottom: 10px;
            }
          }
        }
      }

      .clear-filter {
        cursor: pointer;
        font-size: 1.1429rem;
        font-weight: 300;
        padding-bottom: 10px;
      }
    }

    .right-filter {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 270px;
      margin-bottom: 10px;

      ._input {
        width: 100%;
        max-width: 210px;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .filters {
      .left-filter {
        flex: 10000 1 0;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    top: 103px;

    .filters {
      align-items: flex-start;

      .right-filter {
        max-width: 170px;

        ._label {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    top: 63px;
  }

  @media screen and (max-width: 767px) {
    .filters {
      .left-filter {
        .clear-filter {
          display: none;
        }
      }
    }
  }
}
</style>
