import { Context } from '@nuxt/types/app'

export default function (this: Context, { pageType, name }: { pageType: string; name: string }) {
  this.app.$appClient.segment.track('Clicked Profile from Article', { pageType, name })
}
