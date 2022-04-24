import { Context } from '@nuxt/types/app'
import { NexusGenFieldTypes } from '~/types/nexus'

export default function (this: Context, { id, title, Business }: NexusGenFieldTypes['Product']) {
  this.app.$appClient.segment.track('Product Viewed', {
    productSku: id,
    productName: title,
    ownerName: Business?.name,
  })
}
