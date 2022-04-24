<template lang="pug">
.xm-layouts-header-left.row.items-center
  .logo
    nuxt-link.row(to="/"): img(src="~assets/images/v2/Layouts/activeplace.svg" alt="ActivePlace" width="168" height="18")
  //b-dropdown.locator(trap-focus append-to-body max-height="200" scrollable)
  //  template(#trigger)
  //    .actions.row.items-center.justify-center
  //      client-only: country-flag(:country="alpha2 ? alpha2 : 'us'")
  //      p.value.mr-1 {{ country ? country : 'United States' }}
  //      .locator-icon.row.items-center: img(src="~assets/images/v2/Layouts/navigation.svg")
  //      ._icon.row.items-center: b-icon(icon="chevron-down" custom-size="mdi-18px")
  //  b-dropdown-item.locator-input(custom aria-role="listitem")
  //    b-input(
  //      icon="magnify"
  //      v-model="searchValue"
  //      @input="getCountryList"
  //      placeholder="Your Country"
  //      custom-class="custom-input-header")
  //  b-dropdown-item(custom style="height: 50px" v-if="isLoading")
  //    b-loading(v-model="isLoading", :is-full-page="false")
  //  b-dropdown-item.text-center(
  //    custom
  //    style="height: 50px"
  //    aria-role="listitem"
  //    v-if="!countries.length && !isLoading")
  //    p No Results Found
  //  b-dropdown-item(
  //    v-if="countries.length && !isLoading"
  //    v-for="item of countries",
  //    :key="item.text"
  //    aria-role="listitem"
  //    @click="$store.commit('app/setCountry', { name: item.text, alpha2: item.ISO }), (searchValue = '')")
  //    .is-flex.is-align-items-center
  //      country-flag(:country="item.ISO" v-if="item.ISO")
  //      p(:class="item.ISO ? '' : 'ml-5'") {{ item.text }}
</template>

<script>
import debounce from 'lodash/debounce'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XMLayoutsHeaderLeft',
  data() {
    return {
      isLoading: false,
      countries: [],
      searchValue: '',
      errorData: '',
      geocoder: '',
      gettingLocation: false,
    }
  },
  computed: {
    ...mapFields('app', ['geoLocation.country', 'geoLocation.alpha2', 'geoLocation']),
  },
  mounted() {
    // if (!('geolocation' in navigator)) {
    //   this.errorData = 'Geolocation is not available.'
    // }
    // this.geocoder = new window.google.maps.Geocoder()
  },
  created() {
    // this.locateMe()
  },
  methods: {
    async locateMe() {
      this.gettingLocation = true
      try {
        this.gettingLocation = false
        await navigator.geolocation.getCurrentPosition(this.getPosition)
      } catch (e) {
        this.gettingLocation = false
        this.errorData = e.message
      }
    },
    async getPosition(position) {
      const latlng = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      }
      await this.geocoder.geocode({ location: latlng }).then(async (response) => {
        let country
        let iso
        this.initialAddress = response.results[0].formatted_address
        const ac = response.results[0].address_components
        if (ac) {
          for (const component of ac) {
            const componentType = component.types
            if (componentType.includes('country')) country = component.long_name
          }
          iso = await this.getUserFlag(country)
        }

        this.$store.commit('app/setCountry', { name: country, alpha2: iso })
      })
    },
    getCountryList: debounce(async function () {
      try {
        this.isLoading = true
        const { getHomepageProductCountries } = await this.$api.getHomepageProductCountries({
          text: this.searchValue,
        })
        const countries = []
        let alpha2
        await getHomepageProductCountries.map(async (data) => {
          const ISO = await this.$store.dispatch('countries/getCode', data)
          if (ISO) alpha2 = ISO[0]?.alpha2

          countries.push({
            ISO: alpha2 || null,
            text: data,
          })
        })
        this.countries = countries
      } finally {
        this.isLoading = false
      }
    }, 1000),
    async getUserFlag(data) {
      try {
        const result = await this.$store.dispatch('countries/getCode', data)
        if (result.length) return result[0].alpha2
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-layouts-header-left::v-deep {
  .logo {
    margin-right: 15px;

    @include max-width(427px) {
      max-width: 140px;
    }
  }

  .locator {
    .actions {
      background-color: $secondary;
      color: #cad3d4;
      min-width: 120px;
      max-width: 190px;
      padding: 5px 15px;
      min-height: 36px;
      border-radius: 100px;
      font-weight: 300;
      cursor: pointer;

      @include max-width(767px) {
        min-width: unset;
        padding: 0 5px;
      }

      .flag {
        @include max-width(427px) {
          transform: scale(0.4);
          margin-left: -6px;
        }
      }

      .locator-icon {
        display: none;

        @include max-width(767px) {
          display: flex;
        }

        @include max-width(427px) {
          margin-left: -8px;
        }
      }

      .value {
        max-width: 70px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @include max-width(767px) {
          display: none;
        }
      }
    }
  }
}
</style>
