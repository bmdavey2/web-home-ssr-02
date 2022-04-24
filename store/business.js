import Vue from 'vue'

export const state = () => {
  return {
    subscription: {
      plan: null,
      follows: 0,
      cancelled: false,
      endTime: null,
    },
  }
}

export const getters = {
  getBusinessSubscription(state) {
    return state.subscription
  },
}

export const mutations = {
  setBusinessSubscription(state, data) {
    Object.keys(data).forEach((key) => {
      if (typeof state.subscription[key] === 'undefined') {
      } else {
        Vue.set(state.subscription, key, data[key])
      }
    })
  },
}

export const actions = {
  setBusinessSubscription({ commit }, data) {
    commit('setBusinessSubscription', data)
  },
}
