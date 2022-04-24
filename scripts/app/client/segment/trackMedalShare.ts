import { Context } from '@nuxt/types/app'

export default function (this: Context, { medalType, sharePlatform }: { medalType: string; sharePlatform: string }) {
  this.app.$appClient.segment.track('Medal Share Click', { medalType, sharePlatform })
}
