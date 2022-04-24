import { Context } from '@nuxt/types/app'
import Vue from 'vue'

export default function (this: Context, { page }: { page: string }) {
  if (!process.client) return
  Vue.$segment.page(page, {
    ...this.app.$appClient.segment.getTrackDefaults(),
    ...{
      title: `${page} | ActivePlace`,
      path: this.route.fullPath,
      url: window.location.href,
    },
  })
}
