export const state = () => {
  return {
    signupAsBusiness: false,
    signupAsMentor: false,
    purchase: false,
    initialSignUpDetails: {
      email: null,
      password: null,
    },
    isNewUser: true,
  }
}

export const getters = {
  getSignupAsBusiness(state) {
    return state.signupAsBusiness
  },
  getSignupAsMentor(state) {
    return state.signupAsMentor
  },
  getSignupIsNewUser(state) {
    return state.isNewUser
  },
  getPurchaseBusiness(state) {
    return state.purchase
  },
}

export const mutations = {
  setSignupAsBusiness(state, data) {
    state.signupAsBusiness = data
  },
  setSignupAsMentor(state, data) {
    state.signupAsMentor = data
  },
  setInitialSignUpDetails(state, data) {
    state.initialSignUpDetails = data
  },
  setSignupIsNewUser(state, data) {
    state.isNewUser = data
  },
  setPurchaseBusiness(state, data) {
    state.purchase = data
  },
}

export const actions = {
  setPurchaseBusiness({ commit }, data) {
    commit('setPurchaseBusiness', data)
  },
  setSignupAsBusiness({ commit }, data) {
    commit('setSignupAsBusiness', data)
  },
  setSignupAsMentor({ commit }, data) {
    commit('setSignupAsMentor', data)
  },
  setInitialSignUpDetails({ commit }, data) {
    commit('setInitialSignUpDetails', data)
  },
  setSignupIsNewUser({ commit }, data) {
    commit('setSignupIsNewUser', data)
  },
}
