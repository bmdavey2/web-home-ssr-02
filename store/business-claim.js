export const state = () => {
  return {
    isClaiming: false,
    claimId: null,
  }
}

export const getters = {
  getBusinessClaimIsClaiming(state) {
    return state.isClaiming
  },
  getBusinessClaimId(state) {
    return state.claimId
  },
}

export const mutations = {
  setBusinessClaimIsClaiming(state, data) {
    state.isClaiming = data
  },
  setBusinessClaimId(state, data) {
    state.claimId = data
  },
}

export const actions = {
  setBusinessClaimIsClaiming({ commit }, data) {
    commit('setBusinessClaimIsClaiming', data)
  },
  setBusinessClaimId({ commit }, data) {
    commit('setBusinessClaimId', data)
  },
}
