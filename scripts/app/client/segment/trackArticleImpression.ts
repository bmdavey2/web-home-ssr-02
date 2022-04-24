import { Context } from '@nuxt/types/app'
import compact from 'lodash/compact'
import { NexusGenFieldTypes } from '~/types/nexus'

export default function (this: Context, { id, Categories, title, UserID }: NexusGenFieldTypes['Article']) {
  this.app.$appClient.segment.track('Article Impression', {
    articleID: id,
    categories: compact(Categories?.map((x) => x?.name)).join(', ') || '',
    articleTitle: title,
    authorID: UserID,
  })
}
