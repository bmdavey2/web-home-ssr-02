import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    currentBusiness: null,
    selectedCategory: null,
    geoLocation: {
      country: 'United States',
      alpha2: 'us',
    },
  }
}
export const getters = {
  getField,
}

export const mutations = {
  updateField,
  setCurrentBusiness(state, id) {
    state.currentBusiness = id
  },
  clearCurrentBusiness(state) {
    state.currentBusiness = null
  },
  setSelectedCategory(state, id) {
    state.selectedCategory = id
  },
  clearSelectedCategory(state) {
    state.selectedCategory = null
  },
  setCountry(state, data) {
    state.geoLocation = {
      country: data.name,
      alpha2: data.alpha2,
    }
  },
}
