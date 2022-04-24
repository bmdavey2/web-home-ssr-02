export const state = () => {
  return {
    invite: null,
  }
}

export const getters = {
  getTeamManagementInvite(state) {
    return state.invite
  },
}

export const mutations = {
  setTeamManagementInvite(state, data) {
    state.invite = data
  },
}

export const actions = {
  setTeamManagementInvite({ commit }, data) {
    commit('setTeamManagementInvite', data)
  },
}
