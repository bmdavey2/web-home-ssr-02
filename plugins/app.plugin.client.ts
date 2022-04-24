import { Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'
import DeviceDetector from 'device-detector-js'
import createAppClient from '~/scripts/app/client'

const platform = require('platform')
const deviceDetector = new DeviceDetector()

const plugin: Plugin = (context, inject) => {
  const $appClient = createAppClient(context)
  setInterval(() => $appClient.checkAuthToken(), 10000)

  inject('appClient', $appClient)
  inject('platform', platform)
  inject('deviceDetector', deviceDetector.parse(navigator.userAgent))

  createPersistedState({
    key: 'activeplace',
    paths: [
      'app.currentBusiness',
      'signup.signupAsBusiness',
      'signup.purchase',
      'signup.signupAsMentor',
      'media.showPins',
      'business.subscription',
      'medals.claimDetails',
      'user.ownerDetails',
    ],
  })(context.store)
}

export default plugin
