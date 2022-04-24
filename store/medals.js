import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    enquiryMessage: '',
    activeTab: 'about',
    claimDetails: null,
    isClaiming: false,
    order: {
      name: '',
      email: '',
      phoneNumber: '',
      eventWebsite: '',
      medalDesign: null,
      marketingActivation: false,
      eventName: '',
      companyName: '',
      eventType: '',
      eventParticipants: '',
      eventDate: null,
      eventLocation: '',
      eventFrequency: '',
      eventAnnualParticipants: '',
      isSuccess: false,
    },
  }
}

export const getters = {
  getField,
  getMedalEnquiryMessage(state) {
    return state.enquiryMessage
  },
  getMedalActiveTab(state) {
    return state.activeTab
  },
  getMedalClaimDetails(state) {
    return state.claimDetails
  },
  getMedalIsClaiming(state) {
    return state.isClaiming
  },
  getMedalOrder(state) {
    return state.order
  },
}

export const mutations = {
  updateField,
  setMedalEnquiryMessage(state, data) {
    state.enquiryMessage = data
  },
  setMedalActiveTab(state, data) {
    state.activeTab = data
  },
  setMedalClaimDetails(state, data) {
    state.claimDetails = data
  },
  setMedalIsClaiming(state, data) {
    state.isClaiming = data
  },
  clearMedalOrder(state) {
    state.order.name = ''
    state.order.email = ''
    state.order.phoneNumber = ''
    state.order.eventWebsite = ''
    state.order.medalDesign = null
    state.order.marketingActivation = false
    state.order.eventName = ''
    state.order.companyName = ''
    state.order.eventType = ''
    state.order.eventParticipants = ''
    state.order.eventDate = null
    state.order.eventLocation = ''
    state.order.eventFrequency = ''
    state.order.eventAnnualParticipants = ''
    state.order.isSuccess = false
  },
}

export const actions = {
  setMedalEnquiryMessage({ commit }, data) {
    commit('setMedalEnquiryMessage', data)
  },
  setMedalActiveTab({ commit }, data) {
    commit('setMedalActiveTab', data)
  },
  setMedalClaimDetails({ commit }, data) {
    commit('setMedalClaimDetails', data)
  },
  setMedalIsClaiming({ commit }, data) {
    commit('setMedalIsClaiming', data)
  },
  clearMedalOrder({ commit }) {
    commit('clearMedalOrder')
  },
}
