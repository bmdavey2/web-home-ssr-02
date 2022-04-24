import { Context } from '@nuxt/types/app'

export default function (this: Context) {
  this.app.$segment.reset()
  const userId = this.$fire.auth.currentUser?.uid
  const login = this.app.$appClient.getLogInMethod()
  this.app.$appClient.segment.track('User Signup', { userId, login })
}
