import { Context } from '@nuxt/types/app'

export default function (this: Context) {
  const expiry = this.store.state.auth.tokenExpiry
  if (!expiry) return
  const expiryTime = this.$moment(expiry)
  const targetTime = this.$moment().add(5, 'minutes')
  if (!expiryTime.isBefore(targetTime)) return
  return this.store.dispatch('auth/refreshToken')
}
