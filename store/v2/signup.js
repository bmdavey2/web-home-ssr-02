import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    form: {
      email: '',
      password: '',
      agree: false,
      socialMediaAvatar: null,
      avatar: null,
      firstName: '',
      lastName: '',
      location: '',
      describedAs: '',
      interested: [],
      PhotoID: '',
    },
  }
}

export const getters = {
  getField,
  getSignUpFormDetails(state) {
    return state.form
  },
}

export const mutations = {
  updateField,
  setSignUpFormDetails(state, data) {
    Object.keys(data).forEach((key) => {
      if (typeof state.form[key] !== 'undefined') {
        Vue.set(state.form, key, data[key])
      }
    })
  },
}

export const actions = {
  setSignUpFormDetails({ commit }, data) {
    commit('setSignUpFormDetails', data)
  },
}
