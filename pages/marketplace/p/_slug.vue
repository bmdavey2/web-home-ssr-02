<template lang="pug">
XPMarketPlaceProduct(:product="product" v-if="!isRetrieving")
</template>

<script>
import gql from 'graphql-tag'
import uniqBy from 'lodash/uniqBy'
import meta from '~/mixins/meta'
import XPMarketPlaceProduct from '~/components/pages/MarketPlace/Product'

export default {
  components: { XPMarketPlaceProduct },
  mixins: [meta],
  async asyncData({ app, route, redirect }) {
    app.$app.setPageLoader()
    try {
      const client = app.apolloProvider.defaultClient
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        variables: {
          slug: route.params.slug,
        },
        query: gql`
          query ($slug: String) {
            Product(slug: $slug) {
              title
              coverPhotoURL
              Categories {
                PhotoURL
              }
              description
            }
          }
        `,
      })
      if (data?.Product === null) redirect('/404')
      return { productDetails: data?.Product }
    } catch (e) {}
  },
  data() {
    return {
      product: null,
      isRetrieving: true,
    }
  },
  created() {
    this.metaTitle = this.productDetails?.title || ''
    this.metaImage = this.productDetails?.coverPhotoURL || this.productDetails?.Categories[0]?.PhotoURL || null
    this.metaDescription = this.productDetails?.description || ''
  },
  async mounted() {
    if (!this.isLoggedIn) {
      this.trackNonLoggedUser({ page: 'MarketPlace Product' })
    }
    this.$appClient.segment.trackPageView({ page: 'MarketPlace Product' })
    await this.doRetrieveProduct()
    if (!this.product?.NFTMedals?.total) this.$app.setPageLoader(false)
    this.doViewProduct()
  },
  beforeDestroy() {
    this.$store.dispatch('marketplace/setMarketPlaceParentCategory', null)
    this.$store.dispatch('marketplace/setMarketPlaceSubCategory', null)
  },
  methods: {
    async doViewProduct() {
      if (!this.isLoggedIn) return

      try {
        await this.$apollo.mutate({
          variables: {
            id: this.product?.id,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($id: String!) {
              viewProduct(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'MarketPlace Product')
      }
    },
    async doRetrieveProduct() {
      this.isRetrieving = true

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            slug: this.$route.params?.slug,
            preferredCurrency: 'AUD',
          },
          context: this.getGraphQLContext(),
          query: gql`
            query ($slug: String, $preferredCurrency: String) {
              Product(slug: $slug, preferredCurrency: $preferredCurrency) {
                id
                slug
                title
                savesCount
                viewsCount
                description
                coverPhotoURL
                Media {
                  PhotoURL
                  VideoURL
                  objectType
                  objectID
                }
                AdditionalInformation {
                  fileName
                  fileSize
                  fileType
                  objectID
                  objectType
                }
                Business {
                  id
                  name
                  profilePhotoURL
                  signUpNumber
                  country
                  website
                  isFollowed
                  statement
                  slug
                  plan
                }
                Categories {
                  id
                  name
                  PhotoURL
                  parent
                }
                startDate
                endDate
                startTime
                endTime
                timezone
                address1
                address2
                city
                country
                state
                postcode
                repeats
                pricing
                currency
                priceAmount
                priceAmountMax
                viewerPrice(preferredCurrency: $preferredCurrency)
                viewerPriceMax(preferredCurrency: $preferredCurrency)
                viewerCurrency(preferredCurrency: $preferredCurrency)
                inquiryType
                externalURL
                isSaved
                status
                NFTMedals {
                  items {
                    id
                    slug
                    Media {
                      isNFTMedal
                      PhotoURL
                      VideoURL
                      objectType
                      orientation
                    }
                  }
                  total
                }
                ProductTheme {
                  backgroundColor
                  fontColor
                  buttonColor
                  circleColor
                }
              }
            }
          `,
        })
        const product = data?.Product
        product.Categories = uniqBy(
          product.Categories.map((category) => {
            return { id: category.id, name: category.parent, PhotoURL: category.PhotoURL, parent: category.parent }
          }),
          'name'
        )
        this.product = product
        this.isRetrieving = false
      } catch (error) {
        this.doTrackSegmentError(error, 'MarketPlace Product')
      }
    },
  },
}
</script>
