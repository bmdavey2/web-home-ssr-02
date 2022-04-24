import { Context } from '@nuxt/types/app'
import { NexusGenFieldTypes } from '~/types/nexus'

export default function (this: Context, { id, slug, title, UserID }: NexusGenFieldTypes['Article']) {
  this.app.$appClient.segment.track('Article Viewed', {
    articleId: id,
    articleSlug: slug,
    articleTitle: title,
    authorID: UserID,
  })
}
