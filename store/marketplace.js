import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    filters: {
      locationState: null,
      locationCountry: null,
      virtual: null,
      dateFrom: null,
      dateTo: null,
      priceFrom: null,
      priceTo: null,
      priceType: null,
      sortBy: 'Most Popular',
      type: null,
    },
    parentCategory: null,
    subCategory: null,
  }
}

export const getters = {
  getField,
  getProductFilters(state) {
    return state.filters
  },
  getMarketPlaceParentCategory(state) {
    return state.parentCategory
  },
  getMarketPlaceSubCategory(state) {
    return state.subCategory
  },
}

export const mutations = {
  updateField,
  setProductFilters(state, data) {
    Object.keys(data).forEach((key) => {
      if (typeof state.filters[key] === 'undefined') {
      } else {
        Vue.set(state.filters, key, data[key])
      }
    })
  },
  setMarketPlaceParentCategory(state, data) {
    state.parentCategory = data
  },
  setMarketPlaceSubCategory(state, data) {
    state.subCategory = data
  },
}

export const actions = {
  setProductFilters({ commit }, data) {
    commit('setProductFilters', data)
  },
  setMarketPlaceParentCategory({ commit }, data) {
    commit('setMarketPlaceParentCategory', data)
  },
  setMarketPlaceSubCategory({ commit }, data) {
    commit('setMarketPlaceSubCategory', data)
  },
}
