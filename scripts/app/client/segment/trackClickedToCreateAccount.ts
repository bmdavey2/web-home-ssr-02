import { Context } from '@nuxt/types/app'

export default function (this: Context) {
  this.app.$appClient.segment.track('Clicked to Create Account')
}
