import { Context } from '@nuxt/types/app'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'

export default function (this: Context) {
  const brand = this.app.$deviceDetector?.device?.brand
  const model = this.app.$deviceDetector?.device?.model
  if (this.app.$device.isDesktop) return 'Desktop'
  if (this.app.$device.ipad) return 'iPad'
  if (this.app.$device.ios && this.app.$device.mobile) return this.app.$platform?.product
  return startCase(toLower(`${brand} ${model}`))
}
