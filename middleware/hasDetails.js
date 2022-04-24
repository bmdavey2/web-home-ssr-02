export default async function ({ store, app }) {
  if (store.getters['auth/isLoggedIn']) {
    const {
      Me: { Owner },
    } = await app.$api.getMyProfile()

    if (Owner) {
      store.dispatch('user/setUserOwnerDetails', Owner)
    } else {
      store.dispatch('auth/logOut')
    }
  }
}
