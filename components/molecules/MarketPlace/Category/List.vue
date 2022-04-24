<template lang="pug">
.xm-marketplace-category-list(v-if="!isRetrieving")
  template(v-if="products.length > 0")
    .products
      XMMarketPlaceProduct(v-for="(product, index) in products", :key="index", :product="product" has-tag)
    .load-more(v-if="showMore")
      b-button(type="is-primary" outlined @click.prevent="doLoadNextProducts()", :loading="isRetrievingMoreProducts") Load More
  template(v-else): XANoResultFound
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import XMMarketPlaceProduct from '~/components/molecules/MarketPlace/Product'
import XANoResultFound from '~/components/atoms/NoResultFound'

export default {
  name: 'XMMarketPlaceCategoryList',
  components: { XMMarketPlaceProduct, XANoResultFound },
  data() {
    return {
      type: null,
      category: null,
      offset: null,
      products: [],
      isRetrieving: true,
      showMore: false,
      isRetrievingMoreProducts: false,
    }
  },
  computed: {
    ...mapGetters({
      getProductFilters: 'marketplace/getProductFilters',
    }),
  },
  watch: {
    getProductFilters: {
      deep: true,
      handler() {
        this.offset = null
        this.doRetrieveProducts()
      },
    },
  },
  async mounted() {
    await this.doCheckProductType()
    await this.doCheckCategory()
    await this.doRetrieveProducts()
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: false,
    })
  },
  methods: {
    doCheckProductType() {
      const slug = this.$route.params?.category
      switch (slug) {
        case 'active-events':
          this.type = 'Event'
          return
        case 'active-experiences':
          this.type = 'Experience'
          return
        case 'active-programs':
          this.type = 'Active Program'
          return
        default:
          this.type = ''
      }
    },
    doCheckCategory() {
      const types = ['active-events', 'active-experiences', 'active-programs']
      const slug = this.$route.params?.category

      if (!types.includes(slug)) {
        switch (slug) {
          case 'general-fitness':
            this.category = 'General Fitness'
            return
          case 'outdoor-adventure':
            this.category = 'Outdoor & Adventure'
            return
          case 'endurance-sports':
            this.category = 'Endurance Sports'
            return
          case 'health-wellness':
            this.category = 'Health & Wellness'
            return
          default:
            this.category = slug
        }
      }
    },
    async doRetrieveProducts() {
      this.isRetrieving = true
      this.isRetrievingMoreProducts = false
      this.showMore = false

      let priceType = this.getProductFilters?.priceType
      if (priceType === 'Price') priceType = 'Paid'

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            category: this.category || null,
            sortBy: this.getProductFilters?.sortBy,
            type: this.type || this.getProductFilters?.type,
            virtual: this.getProductFilters?.virtual,
            locationCountry: this.getProductFilters?.locationCountry,
            locationState: this.getProductFilters?.locationState,
            dateFrom: this.getProductFilters?.dateFrom,
            dateTo: this.getProductFilters?.dateTo,
            priceType,
            priceFrom: this.getProductFilters?.priceFrom,
            priceTo: this.getProductFilters?.priceTo,
            offset: this.offset,
            preferredCurrency: 'AUD',
          },
          context: this.getGraphQLContext(),
          query: gql`
            query (
              $type: String
              $category: String
              $sortBy: String
              $virtual: Boolean
              $locationCountry: String
              $locationState: String
              $dateFrom: String
              $dateTo: String
              $priceType: String
              $priceFrom: Int
              $priceTo: Int
              $offset: Int
              $preferredCurrency: String
            ) {
              Products(
                category: $category
                sortBy: $sortBy
                type: $type
                virtual: $virtual
                locationCountry: $locationCountry
                locationState: $locationState
                dateFrom: $dateFrom
                dateTo: $dateTo
                priceType: $priceType
                priceFrom: $priceFrom
                priceTo: $priceTo
                offset: $offset
                businessID: null
                count: 24
                status: null
                hidden: null
                preferredCurrency: $preferredCurrency
                filterType: "publishedExpired"
              ) {
                count
                next
                items {
                  id
                  Categories {
                    id
                    name
                    PhotoURL
                  }
                  Business {
                    id
                    name
                    slug
                    profilePhotoURL
                  }
                  createdAt
                  slug
                  type
                  title
                  coverPhotoURL(type: "300")
                  description
                  AdditionalInformation {
                    objectType
                    objectID
                    fileName
                    fileSize
                    fileType
                  }
                  UserID
                  actorType
                  parentID
                  repeats
                  hibernation
                  status
                  hidden
                  inquiryType
                  externalURL
                  startDate
                  endDate
                  startTime
                  endTime
                  timezone
                  virtual
                  address1
                  address2
                  city
                  state
                  country
                  postcode
                  pricing
                  priceAmount
                  priceAmountMax
                  viewerCurrency(preferredCurrency: $preferredCurrency)
                  viewerPrice(preferredCurrency: $preferredCurrency)
                  viewerPriceMax(preferredCurrency: $preferredCurrency)
                  currency
                  Media {
                    PhotoURL
                    VideoURL
                    FileURL
                    objectType
                    fileName
                  }
                  recommendsCount
                  viewsCount
                  savesCount
                  businessPaidPlan
                  isSaved
                  isNFTMedal
                }
              }
            }
          `,
        })
        this.products = data?.Products?.items
        this.offset = parseInt(data?.Products?.next)
        this.isRetrieving = false

        if (this.products.length >= 24) this.showMore = true
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    async doLoadNextProducts() {
      this.isRetrievingMoreProducts = true

      let priceType = this.getProductFilters?.priceType
      if (priceType === 'Price') priceType = 'Paid'

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            category: this.category || null,
            sortBy: this.getProductFilters?.sortBy,
            type: this.type || this.getProductFilters?.type,
            virtual: this.getProductFilters?.virtual,
            locationCountry: this.getProductFilters?.locationCountry,
            locationState: this.getProductFilters?.locationState,
            dateFrom: this.getProductFilters?.dateFrom,
            dateTo: this.getProductFilters?.dateTo,
            priceFrom: this.getProductFilters?.priceFrom,
            priceTo: this.getProductFilters?.priceTo,
            offset: this.offset,
            preferredCurrency: 'AUD',
            priceType,
          },
          context: this.getGraphQLContext(),
          query: gql`
            query (
              $type: String
              $category: String
              $sortBy: String
              $virtual: Boolean
              $locationCountry: String
              $locationState: String
              $dateFrom: String
              $dateTo: String
              $priceType: String
              $priceFrom: Int
              $priceTo: Int
              $offset: Int
              $preferredCurrency: String
            ) {
              Products(
                category: $category
                sortBy: $sortBy
                type: $type
                virtual: $virtual
                locationCountry: $locationCountry
                locationState: $locationState
                dateFrom: $dateFrom
                dateTo: $dateTo
                priceType: $priceType
                priceFrom: $priceFrom
                priceTo: $priceTo
                offset: $offset
                count: 24
                businessID: null
                status: null
                hidden: null
                preferredCurrency: $preferredCurrency
                filterType: "publishedExpired"
              ) {
                count
                next
                items {
                  id
                  Categories {
                    id
                    name
                    PhotoURL
                  }
                  Business {
                    id
                    name
                    slug
                    profilePhotoURL
                  }
                  createdAt
                  slug
                  type
                  title
                  coverPhotoURL
                  description
                  AdditionalInformation {
                    objectType
                    objectID
                    fileName
                    fileSize
                    fileType
                  }
                  UserID
                  actorType
                  parentID
                  repeats
                  hibernation
                  status
                  hidden
                  inquiryType
                  externalURL
                  startDate
                  endDate
                  startTime
                  endTime
                  timezone
                  virtual
                  address1
                  address2
                  city
                  state
                  country
                  postcode
                  pricing
                  priceAmount
                  priceAmountMax
                  viewerCurrency(preferredCurrency: $preferredCurrency)
                  viewerPrice(preferredCurrency: $preferredCurrency)
                  viewerPriceMax(preferredCurrency: $preferredCurrency)
                  currency
                  Media {
                    PhotoURL
                    VideoURL
                    FileURL
                    objectType
                    fileName
                  }
                  recommendsCount
                  viewsCount
                  savesCount
                  businessPaidPlan
                  isSaved
                }
              }
            }
          `,
        })

        const items = data?.Products?.items
        this.offset = parseInt(data?.Products?.next)

        if (items.length > 0) {
          items.forEach((item) => {
            this.products.push(item)
          })
          if (items.length < 24) return (this.showMore = false)
          this.showMore = true
        } else {
          this.showMore = false
        }
        this.isRetrievingMoreProducts = false
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-list::v-deep {
  padding-bottom: 50px;

  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .xm-marketplace-product {
      width: calc(100% / 3 - 15px);
      margin-bottom: 25px;
      height: auto;
    }

    &::after {
      width: calc(100% / 3 - 15px);
      content: '';
      display: block;
      height: auto;
    }
  }

  .load-more {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 50px 0;
  }

  @media screen and (max-width: 1200px) {
    .products {
      .xm-marketplace-product {
        width: calc(100% / 2 - 15px);
      }
    }
  }

  @media screen and (max-width: 1023px) {
    padding: 0 50px 50px;
  }

  @media screen and (max-width: 767px) {
    padding: 0 0 50px;

    .products {
      .xm-marketplace-product {
        width: 100%;
      }
    }
  }
}
</style>
