import { Context } from '@nuxt/types/app'

export default function (this: Context) {
  let method = this.store.state.auth.method || 'email'
  method = method.toString()
  return method.charAt(0).toUpperCase() + method.slice(1)
}
