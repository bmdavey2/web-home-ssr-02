import { Context } from '@nuxt/types/app'

export default function (this: Context) {
  // const deviceName = this.app.$appClient.getDeviceName()
  return {
    devicePlatform: 'website',
    clientType: 'browser',
  }
}
