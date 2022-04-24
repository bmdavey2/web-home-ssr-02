import { Context } from '@nuxt/types/app'
import compact from 'lodash/compact'
import { NexusGenFieldTypes } from '~/types/nexus'

export default function (this: Context, { Categories, Media }: NexusGenFieldTypes['Update']) {
  const video = Media?.some((media) => media.objectType === 'Video') ? 'yes' : 'no'
  const images = Media?.filter((media) => media.objectType === 'Photo').length || 0

  this.app.$appClient.segment.track('Update Impression', {
    categories: compact(Categories?.map((x) => x.name)).join(', '),
    video,
    images,
  })
}
