export const state = () => {
  return {
    isFromArticles: false,
    parentCategory: null,
    subCategory: null,
  }
}

export const getters = {
  getIsFromArticles(state) {
    return state.isFromArticles
  },
  getArticleParentCategory(state) {
    return state.parentCategory
  },
  getArticleSubCategory(state) {
    return state.subCategory
  },
}

export const mutations = {
  setIsFromArticles(state, data) {
    state.isFromArticles = data
  },
  setArticleParentCategory(state, data) {
    state.parentCategory = data
  },
  setArticleSubCategory(state, data) {
    state.subCategory = data
  },
}

export const actions = {
  setIsFromArticles({ commit }, data) {
    commit('setIsFromArticles', data)
  },
  setArticleParentCategory({ commit }, data) {
    commit('setArticleParentCategory', data)
  },
  setArticleSubCategory({ commit }, data) {
    commit('setArticleSubCategory', data)
  },
}
