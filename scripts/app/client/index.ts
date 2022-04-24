import { Context } from '@nuxt/types/app'
import segmentBindToContext from './segment'
import checkAuthToken from './checkAuthToken'
import getDeviceName from './getDeviceName'
import getLogInMethod from './getLogInMethod'

const bindToNuxtApp = function (context: Context) {
  return {
    segment: segmentBindToContext(context),
    checkAuthToken: checkAuthToken.bind(context),
    getDeviceName: getDeviceName.bind(context),
    getLogInMethod: getLogInMethod.bind(context),
  }
}

export default bindToNuxtApp
