export default function ({ store, redirect }) {
  if (!store.getters['checkout/getCheckoutItems']) {
    return redirect('/')
  }
}
