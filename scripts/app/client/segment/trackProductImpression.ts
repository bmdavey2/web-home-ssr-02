import { Context } from '@nuxt/types/app'
import { NexusGenFieldTypes } from '~/types/nexus'

export default function (this: Context, { id, title, type, Business }: NexusGenFieldTypes['Product']) {
  this.app.$appClient.segment.track('Product Impression', {
    productSku: id,
    productName: title,
    productType: type,
    ownerName: Business?.name,
  })
}
