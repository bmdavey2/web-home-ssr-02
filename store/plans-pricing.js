export const state = () => {
  return {
    isPreRegistering: false,
    purchasing: null,
  }
}

export const getters = {
  getIsPreRegistering(state) {
    return state.isPreRegistering
  },
  getPlansPricingPurchasing(state) {
    return state.purchasing
  },
}

export const mutations = {
  setIsPreRegistering(state, data) {
    state.isPreRegistering = data
  },
  setPlansPricingPurchasing(state, data) {
    state.purchasing = data
  },
}

export const actions = {
  setIsPreRegistering({ commit }, data) {
    commit('setIsPreRegistering', data)
  },
  setPlansPricingPurchasing({ commit }, data) {
    commit('setPlansPricingPurchasing', data)
  },
}
