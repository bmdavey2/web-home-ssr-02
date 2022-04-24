export const state = () => {
  return {
    selectedParent: null,
    activeSelectedCategoryIDs: [],
    activeUnselectedCategoryIDs: [],
  }
}

export const getters = {
  isParentSelected(state) {
    return (name) => (state.selectedParent === null && name === 'All') || state.selectedParent === name
  },
  isCategoryActivelyUnselected(state) {
    return (id) => state.activeUnselectedCategoryIDs.includes(id)
  },
  isCategoryActivelySelected(state) {
    return (id) => state.activeSelectedCategoryIDs.includes(id)
  },
}

export const mutations = {
  clear(state) {
    state.selectedParent = null
    state.activeSelectedCategoryIDs = []
    state.activeUnselectedCategoryIDs = []
  },
  setSelectedParent(state, parent) {
    state.selectedParent = parent
  },
  toggleCategory(state, { id, unselect }) {
    if (unselect) {
      if (state.activeUnselectedCategoryIDs.includes(id)) {
        state.activeUnselectedCategoryIDs.splice(state.activeUnselectedCategoryIDs.indexOf(id), 1)
      } else {
        state.activeUnselectedCategoryIDs.push(id)
      }
    } else if (state.activeSelectedCategoryIDs.includes(id)) {
      state.activeSelectedCategoryIDs.splice(state.activeSelectedCategoryIDs.indexOf(id), 1)
    } else {
      state.activeSelectedCategoryIDs.push(id)
    }
  },
}
