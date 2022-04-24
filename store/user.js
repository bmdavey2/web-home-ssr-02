export const state = () => {
  return {
    ownerDetails: null,
    businessDetails: null,
  }
}

export const getters = {
  getUserOwnerDetails(state) {
    return state.ownerDetails
  },
  getUserBusinessDetails(state) {
    return state.businessDetails
  },
}

export const mutations = {
  setUserOwnerDetails(state, data) {
    state.ownerDetails = data
  },
  setUserBusinessDetails(state, data) {
    state.businessDetails = data
  },
}

export const actions = {
  setUserOwnerDetails({ commit }, data) {
    commit('setUserOwnerDetails', data)
  },
  setUserBusinessDetails({ commit }, data) {
    commit('setUserBusinessDetails', data)
  },
}
