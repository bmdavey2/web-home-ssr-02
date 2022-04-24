import { Context } from '@nuxt/types/app'
import Vue from 'vue'

export default function (this: Context, name: string, props: any, ignoreGroup?: boolean) {
  if (!process.client) return
  const BusinessID = this.store.state.app.currentBusiness || undefined
  const userId = BusinessID ? undefined : this.store.state.auth.uid

  Vue.$segment.track(name, {
    ...(ignoreGroup
      ? undefined
      : {
          groupId: BusinessID,
          business_id: BusinessID,
          userId,
        }),
    ...this.app.$appClient.segment.getTrackDefaults(),
    ...props,
    role: BusinessID ? 'business' : 'person',
  })
}
