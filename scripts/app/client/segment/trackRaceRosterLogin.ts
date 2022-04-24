import { Context } from '@nuxt/types/app'

export default function (this: Context) {
  const userId = this.$fire.auth.currentUser?.uid
  const login = 'RaceRoster'
  this.app.$appClient.segment.track('RaceRoster Login', { userId, login })
}
