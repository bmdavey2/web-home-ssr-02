import Vue from 'vue'

export const state = () => {
  return {
    initialized: {},
    waiting: {},
    error: {},
    progress: {},
    paused: {},
  }
}

export const getters = {
  //
  isLoading(state) {
    return (name) => {
      return !!state.waiting[name] || false
    }
  },
  isWaiting(state) {
    return (name) => {
      return !!state.waiting[name] || false
    }
  },
  isInitialized(state) {
    return (name) => {
      return !!state.initialized[name] || false
    }
  },
  hasError(state) {
    return (name) => {
      return !!state.error[name] || null
    }
  },
  getError(state) {
    return (name) => {
      return state.error[name] || null
    }
  },
  isPaused(state) {
    return (name) => {
      return !!state.paused[name] || false
    }
  },
  getProgress(state) {
    return (name) => {
      return state.progress[name] || 0
    }
  },
  hasProgress(state) {
    return (name) => {
      return !!state.progress[name] || false
    }
  },
}

export const mutations = {
  setLoading(state, { name, value }) {
    Vue.set(state.waiting, name, value)
  },
  setWaiting(state, { name, value }) {
    Vue.set(state.waiting, name, value)
  },
  setError(state, { name, value }) {
    Vue.set(state.error, name, value)
  },
  setInitialized(state, { name, value }) {
    Vue.set(state.initialized, name, value)
  },
  setProgress(state, { name, value }) {
    Vue.set(state.progress, name, value)
  },
  setPaused(state, { name, value }) {
    Vue.set(state.paused, name, value)
  },
}

export const actions = {}
