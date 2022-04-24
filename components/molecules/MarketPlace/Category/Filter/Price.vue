<template lang="pug">
.xm-marketplace-category-filter-price.action
  .value(@click.prevent="doUpdateActiveFilter()") {{ priceText }}
  transition(name="fade")
    .dropdown-filter(v-if="activeFilter === 'price'")
      .filter-item(v-for="(p, index) in prices", :key="index")
        b-radio(v-model="priceType", :native-value="p.key" @input="doUpdateProductFilters()") {{ p.value }}
      template(v-if="priceType === 'Price'")
        .price-range
          .input-range
            .min-price.is-flex-width-auto
              b-field: b-numberinput(
                v-model="priceRangeMin",
                :min="productsPriceRange[0]",
                :controls="false",
                :step="0.1"
                @blur="doUpdateProductFilters()")
              ._label Min
            .seperator &mdash;
            .max-price.is-flex-width-auto
              b-field: b-numberinput(
                v-model="priceRangeMax",
                :max="productsPriceRange[1]",
                :controls="false",
                :step="0.1"
                @blur="doUpdateProductFilters()")
              ._label Max
          b-field
            b-slider(
              v-model="priceRange",
              :min="productsPriceRange[0]",
              :max="productsPriceRange[1]"
              rounded
              @dragend="doUpdateProductFilters()")
</template>

<script>
import gql from 'graphql-tag'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XMMarketPlaceCategoryFilterPrice',

  props: {
    activeFilter: String,
    clearFilter: Boolean,
  },
  data() {
    return {
      prices: [
        { key: null, value: 'Any Price' },
        // { key: 'Free', value: 'Free' },
        { key: 'Paid', value: 'Paid' },
        { key: 'Price', value: 'Price Range' },
      ],
      priceRangeMin: null,
      priceRangeMax: null,
      priceRange: null,
      productsPriceRange: null,
      priceText: null,
    }
  },
  computed: {
    ...mapFields('marketplace', ['filters.priceType', 'filters.priceFrom', 'filters.priceTo']),
  },
  watch: {
    priceRange(value) {
      this.priceRangeMin = value[0]
      this.priceRangeMax = value[1]
    },
    priceType() {
      this.doCheckPrice()
    },
  },
  async mounted() {
    await this.doRetrievePriceRange()
    this.doCheckPrice()
  },
  methods: {
    doUpdateActiveFilter() {
      if (this.activeFilter === 'price') {
        this.$emit('DoUpdateActiveFilter', '')
        return
      }
      this.$emit('DoUpdateActiveFilter', 'price')
    },
    doUpdateProductFilters() {
      if (this.priceType === 'Price') {
        this.$set(this.priceRange, 0, this.priceRangeMin)
        this.$set(this.priceRange, 1, this.priceRangeMax)
        this.priceFrom = Math.ceil(this.priceRangeMin)
        this.priceTo = Math.ceil(this.priceRangeMax)
        this.doCheckPrice()
        return
      }

      this.priceFrom = null
      this.priceTo = null
    },
    async doRetrievePriceRange() {
      try {
        const { data } = await this.$apollo.query({
          query: gql`
            query {
              ProductPriceRange {
                priceMax
                priceMin
              }
            }
          `,
        })
        const { ProductPriceRange } = data
        const priceMin = ProductPriceRange?.priceMin
        const priceMax = ProductPriceRange?.priceMax

        this.priceRange = [priceMin, priceMax]
        this.productsPriceRange = [priceMin, priceMax]
        this.priceRangeMin = priceMin
        this.priceRangeMax = priceMax
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    doCheckPrice() {
      if (this.priceType === null) {
        this.priceText = 'Price'
        return
      }

      if (this.priceType === 'Price') {
        this.priceText = `Price: $${this.priceFrom} - $${this.priceTo}`
        this.priceRange = [this.priceFrom, this.priceTo]
        this.priceRangeMin = this.priceFrom
        this.priceRangeMax = this.priceTo
        return
      }

      this.priceText = this.priceType
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-filter-price::v-deep {
  .dropdown-filter {
    width: 300px;

    .price-range {
      .input-range {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .min-price,
        .max-price {
          .field {
            margin-bottom: 3px;

            input {
              border: 1px solid #dbdbdb;
              box-shadow: none;
            }
          }

          ._label {
            font-size: 0.8571rem;
          }
        }

        .seperator {
          padding: 8px 10px 0;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
