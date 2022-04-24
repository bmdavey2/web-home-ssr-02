import { getAccessorType } from 'typed-vuex'

export const actions = {
  async nuxtServerInit({ dispatch }, { res }) {
    if (res?.locals?.user) {
      const { allClaims: claims, idToken, ...authUser } = res.locals.user
      await dispatch('auth/onStateChanged', { authUser, claims, idToken })
    }
  },
}

export const accessorType = getAccessorType({
  // state,
  // getters,
  // mutations,
  actions,
  // modules: {
  //  auth,
  //  control,
  // },
})
