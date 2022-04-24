import { find } from 'lodash'

export const state = () => {
  return {
    loading: false,
    loaded: false,
    content: [],
  }
}

export const getters = {
  getAll(state) {
    return state.content
  },
  getCategory(state) {
    return (slug) => {
      return find(state.content, (x) => x.slug === slug)
    }
  },
  getCategoryQuestion(state) {
    return (slugCategory, slugQuestion) => {
      const category = find(state.content, (x) => x.slug === slugCategory)
      return find(category?.items, (x) => x.slug === slugQuestion)
    }
  },
}

export const mutations = {
  setLoaded(state, value) {
    state.loaded = value
  },
  setLoading(state, value) {
    state.loading = value
  },
  setContent(state, value) {
    state.content = value
  },
}

export const actions = {
  async load({ state, commit }) {
    if (state.loaded || state.loading) return
    try {
      commit('setLoading', true)
      const response = await this.$axios.$get('https://api.activeplace.com/faq')
      commit('setContent', response.content)
      commit('setLoaded', true)
    } catch (e) {
      //
      console.error(e)
      commit('setLoaded', false)
    } finally {
      commit('setLoading', false)
    }
  },
}
