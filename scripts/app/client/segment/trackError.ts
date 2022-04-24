import { Context } from '@nuxt/types/app'

export default function (this: Context, { page, error, url }: { page: string; error: string; url: string }) {
  this.app.$appClient.segment.track('Error Shown', { pageShown: page, errorText: error, pageURL: url })
}
