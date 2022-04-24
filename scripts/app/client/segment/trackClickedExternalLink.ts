import { Context } from '@nuxt/types/app'

export default function (
  this: Context,
  { domain, linkURL, linkText }: { domain: string; linkURL: string; linkText: string }
) {
  this.app.$appClient.segment.track('Clicked External Link', { domain, linkURL, linkText })
}
