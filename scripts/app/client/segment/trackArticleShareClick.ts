import { Context } from '@nuxt/types/app'
import { NexusGenFieldTypes } from '~/types/nexus'

export default function (this: Context, { id, slug, title }: NexusGenFieldTypes['Article']) {
  this.app.$appClient.segment.track('Article Share Click', {
    articleId: id,
    articleSlug: slug,
    articleTitle: title,
  })
}
