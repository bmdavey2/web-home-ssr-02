export default function ({ store, redirect }) {
  if (store.state.auth.isLoggedIn) {
    if (store.state.app.currentBusiness === null) {
      return redirect('/')
    }
  } else {
    return redirect('/')
  }
}
