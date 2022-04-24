export const state = () => {
  return {
    items: null,
  }
}

export const getters = {
  getCheckoutItems(state) {
    return state.items
  },
}

export const mutations = {
  setCheckoutItems(state, data) {
    state.items = data
  },
}

export const actions = {
  setCheckoutItems({ commit }, data) {
    commit('setCheckoutItems', data)
  },
}
