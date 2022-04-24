<template lang="pug">
.xm-marketplace-category-filter-location.action
  .value(@click.prevent="doUpdateActiveFilter()") {{ locationText }}
  transition(fade="name")
    .dropdown-filter(v-if="activeFilter === 'location'")
      .filter-item(v-for="(loc, index) in locations")
        b-radio(v-model="virtual", :native-value="loc.value") {{ loc.label }}
      template(v-if="virtual === false")
        .filter-item: FormSelect(
          v-model="locationCountry"
          placeholder="Select Country",
          :options="countries"
          optionsLabel="value",
          :close-on-select="false",
          :show-label="false"
          @input="locationState = null")
        .filter-item: FormSelect(
          v-model="locationState"
          placeholder="Select State",
          :options="states"
          optionsLabel="value",
          :close-on-select="false",
          :show-label="false"
          v-if="locationCountry")
</template>

<script>
import { mapActions } from 'vuex'
import gql from 'graphql-tag'
import { mapFields } from 'vuex-map-fields'
import countriesStates from './countries-states'
import FormSelect from '~/components/atoms/Form/Select'

export default {
  name: 'XMMarketPlaceCategoryFilterLocation',
  components: { FormSelect },
  props: {
    activeFilter: String,
    clearFilter: Boolean,
  },
  data() {
    return {
      locationText: null,
      locations: [
        { label: 'Virtual', value: true },
        { label: 'Location', value: false },
      ],
      sourceCountries: [],
    }
  },
  computed: {
    ...mapFields('marketplace', ['filters.locationCountry', 'filters.locationState', 'filters.virtual']),
    countries() {
      return this.sourceCountries.map((x) => ({ key: x, value: x }))
    },
    states() {
      const country = countriesStates.filter((country) => {
        return country.name === this.locationCountry
      })
      const states = country.map((state) => {
        return state.states.map((state) => {
          return { key: state.name, value: state.name }
        })
      })
      return states[0]
    },
  },
  watch: {
    virtual() {
      this.doCheckLocation()
    },
    locationCountry() {
      this.doCheckLocation()
    },
    locationState() {
      this.doCheckLocation()
    },
  },
  async mounted() {
    try {
      const { data } = await this.$apollo.query({
        query: gql`
          query {
            getMarketplaceProductCountries
          }
        `,
      })
      this.sourceCountries = data.getMarketplaceProductCountries || []
    } catch (error) {
      this.doTrackSegmentError(error)
    }

    this.doCheckLocation()
  },
  methods: {
    ...mapActions({
      setProductFilters: 'marketplace/setProductFilters',
    }),
    doUpdateActiveFilter() {
      if (this.activeFilter === 'location') {
        this.$emit('DoUpdateActiveFilter', '')
        return
      }
      this.$emit('DoUpdateActiveFilter', 'location')
    },
    doCheckLocation() {
      switch (this.virtual) {
        case true:
          this.locationText = 'Virtual'
          break
        case false:
          if ((this.locationCountry || this.locationState) === null) {
            this.locationText = 'Location'
          } else {
            this.locationText = this.locationCountry
          }
          break
        case null:
          this.locationText = 'Location'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-filter-location::v-deep {
  .dropdown-filter {
    width: 345px;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
