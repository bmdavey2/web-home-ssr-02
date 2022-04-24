import firebase from 'firebase/app'
import jwt from 'jsonwebtoken'

export const state = () => {
  return {
    isLoggedIn: false,
    displayName: null,
    uid: null,
    token: null,
    tokenExpiry: null,
    email: null,
    method: null,
    error: null,
  }
}

export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  },
}

export const mutations = {
  setUser(state, user) {
    if (!user) {
      state.uid = null
      state.displayName = null
      state.email = null
      state.token = null
      state.tokenExpiry = null
      state.isLoggedIn = false
      state.method = null
      return
    }
    const { uid, email, displayName, token } = user
    state.uid = uid
    state.displayName = displayName
    state.email = email
    state.token = token
    state.tokenExpiry = token ? jwt.decode(token)?.exp * 1000 : null
    state.isLoggedIn = !!token
  },
  setMethod(state, method) {
    state.method = method
  },
  setError(state, error) {
    state.error = error
  },
  clearLogin(state) {
    state.token = null
    state.isLoggedIn = false
    state.tokenExpiry = null
    state.uid = null
  },
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onStateChanged({ commit }, { authUser, idToken, refreshOnly }) {
    await this.$apollo?.provider.defaultClient.queryManager.fetchQueryRejectFns
    if (!authUser) {
      await this.$apolloHelpers?.onLogout(undefined, false)
      commit('setUser', null)
      return
    }
    const token = idToken || (await authUser?.getIdToken())
    if (!token) {
      await this.$apolloHelpers?.onLogout(undefined, false)
      commit('setUser', null)
      return
    }
    await this.$apolloHelpers?.onLogin(token, undefined, undefined, true)
    const { uid, email, displayName } = authUser
    commit('setUser', { uid, email, displayName, token })
    await this.$apollo?.provider.defaultClient.refetchQueries({ include: 'all' })
  },
  async logInWithProvider({ commit }, { provider, name }) {
    try {
      this.commit('control/setWaiting', { name: 'auth/logIn', value: 'true' })
      /** @type { import('firebase').default.auth.Auth } */
      const auth = this.$fire.auth
      const result = await auth.signInWithPopup(provider)
      // const accessToken = result.credential.accessToken
      commit('setMethod', name)
      return result
    } catch (error) {
      // this.$toast?.error('Firebase: Network Error', { duration: 5000, position: 'top-center' })
      /*
      if (error?.code === 'auth/account-exists-with-different-credential') {
        return firebase
          .auth()
          .fetchSignInMethodsForEmail(error.email)
          .then(function (providers) {
            if (providers.includes(firebase.auth.GoogleAuthProvider.PROVIDER_ID)) {
              const googleProvider = new firebase.auth.GoogleAuthProvider()
              provider.setCustomParameters({ login_hint: error.email })

              return firebase
                .auth()
                .signInWithPopup(googleProvider)
                .then((result) => {
                  return result.user
                })
            } else if (providers.includes(firebase.auth.EmailAuthProvider.PROVIDER_ID)) {
              Dialog.prompt({
                message: `Please provide the password for ${error.email}`,
                inputAttrs: {
                  type: 'password',
                },
                closeOnConfirm: true,
                onConfirm: async (value) => {
                  await firebase.auth().signInWithEmailAndPassword(error.email, value)
                  return firebase
                    .auth()
                    .currentUser.linkWithCredential(error.credential)
                    .then(() => {
                      location.href = '/'
                    })
                },
              })
            }
          })
          .then((user) => {
            return user.linkWithCredential(error.credential)
          })
      }
      */
      commit('setError', error)
      return null
    } finally {
      this.commit('control/setWaiting', { name: 'auth/logIn', value: false })
    }
  },
  async signUpWithEmail({ commit }, { email, password }) {
    try {
      this.commit('control/setWaiting', { name: 'auth/logIn', value: true })
      const result = await this.$fire.auth.createUserWithEmailAndPassword(email, password)
      this.dispatch('onStateChanged', { authUser: result.user })
    } catch (error) {
      commit('setError', error)
      throw error
    } finally {
      this.commit('control/setWaiting', { name: 'auth/logIn', value: false })
    }
  },
  async logInWithEmail({ commit }, { email, password }) {
    try {
      this.commit('control/setWaiting', { name: 'auth/logIn', value: true })
      return await this.$fire.auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      commit('setError', error)
      throw error
    } finally {
      this.commit('control/setWaiting', { name: 'auth/logIn', value: false })
    }
  },
  async logInWithGoogle({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    return await dispatch('logInWithProvider', { provider, name: 'google' })
  },
  async logInWithFacebook({ dispatch }) {
    const provider = new firebase.auth.FacebookAuthProvider()
    return await dispatch('logInWithProvider', { provider, name: 'facebook' })
  },
  async forgotPassword(_, { email }) {
    try {
      this.commit('control/setWaiting', { name: 'auth/forgotPassword', value: true })
      /** @type { import('firebase').default.auth.Auth } */
      const auth = this.$fire.auth
      return await auth.sendPasswordResetEmail(email)
    } catch (error) {
      return { error }
    } finally {
      this.commit('control/setWaiting', { name: 'auth/forgotPassword', value: false })
    }
  },
  async logOut({ commit, dispatch }) {
    /** @type { import('firebase').default.auth.Auth } */
    const auth = this.$fire.auth
    await auth.signOut()
    // this.$segment.reset()
    dispatch('user/setUserOwnerDetails', null, { root: true })
    dispatch('medals/setMedalClaimDetails', null, { root: true })
    commit('clearLogin')
  },
  async refreshToken({ dispatch }) {
    const authUser = this.$fire.auth.currentUser
    if (!authUser) return
    const idToken = await authUser.getIdToken(true)
    await dispatch('onStateChanged', { authUser, idToken, refreshOnly: true })
  },
}
