<template lang="pug">
XPMarketPlaceProductEdit(:product="product" v-if="!isRetrieving")
</template>

<script>
import gql from 'graphql-tag'
import XPMarketPlaceProductEdit from '~/components/pages/MarketPlace/Product/Edit'
export default {
  middleware: ['businessOnly'],
  components: { XPMarketPlaceProductEdit },
  async asyncData({ route, app, redirect }) {
    try {
      const client = app.apolloProvider.defaultClient
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        variables: {
          id: route.params.id,
        },
        query: gql`
          query ($id: String) {
            Product(id: $id) {
              title
            }
          }
        `,
      })
      if (data?.Product === null) {
        redirect('/404')
      }
      return { productDetails: data?.Product }
    } catch (e) {}
  },
  data() {
    return {
      product: null,
      isRetrieving: true,
    }
  },
  beforeCreate() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  async mounted() {
    await this.doRetrieveProduct()
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: false,
    })
    if (this.product?.Business?.id !== this.currentBusinessID) {
      this.$router.push('/my-feed')
    }
  },
  methods: {
    async doRetrieveProduct() {
      this.isRetrieving = true

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            id: this.$route.params?.id,
            preferredCurrency: 'AUD',
          },
          query: gql`
            query ($id: String) {
              Product(id: $id) {
                slug
                id
                title
                type
                startDate
                endDate
                startTime
                endTime
                Distance {
                  distance
                  distanceUnit
                  distanceType
                  hasMedal
                }
                virtual
                currency
                pricing
                priceAmount
                priceAmountMax
                viewerPrice
                viewerPriceMax
                inquiryType
                externalURL
                description
                Categories {
                  id
                  name
                  parent
                }
                CategoryIDs
                coverPhotoID
                AdditionalInformation {
                  fileName
                  objectID
                  objectType
                  fileSize
                  fileType
                }
                Media {
                  PhotoURL
                  VideoURL
                  objectType
                  objectID
                }
                Business {
                  id
                  plan
                }
                address1
                address2
                city
                country
                postcode
                state
                suburb
                timezone
              }
            }
          `,
        })

        this.product = data?.Product
        this.isRetrieving = false
      } catch (error) {
        this.doTrackSegmentError(error, 'Edit Product')
      }
    },
  },
  head() {
    return {
      title: `${this.productDetails?.title} | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.productDetails?.title} | ActivePlace`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.activeplaceLogo,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.productDetails?.title} | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.productDetails?.title} | ActivePlace`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.activeplaceLogo,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.activeplaceLogo,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: `${this.productDetails?.title} | ActivePlace`,
        },
      ],
    }
  },
}
</script>
