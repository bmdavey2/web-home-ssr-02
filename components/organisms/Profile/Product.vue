<template lang="pug">
.xo-profile-posts-updates(
  v-infinite-scroll="doLoadMore"
  infinite-scroll-disabled="nextLoading",
  :infinite-scroll-distance="100")
  template(v-if="isRetrieving")
    XOFeedItem
  template(v-else)
    template(v-if="items.length > 0")
      XMMarketPlaceProduct.mb-5.market-product(v-for="(item, i) in items", :key="item.id", :product="item")
      transition(name="fade")
        XOFeedItem(v-show="nextLoading")
    template(v-else): .is-size-4.has-text-grey.has-text-centered.pt-5 No Products Found
</template>

<script>
import gql from 'graphql-tag'
import fragmentProductItemContents from '~/assets/graphql/fragmentProductItemContents.graphql'
import XMMarketPlaceProduct from '~/components/molecules/MarketPlace/Product'
import XOFeedItem from '~/components/organisms/Feed/Item'

export default {
  name: 'XOProfileProducts',
  components: { XOFeedItem, XMMarketPlaceProduct },
  props: {
    productType: String,
    profile: Object,
    type: String,
  },
  data() {
    return {
      items: [],
      isRetrieving: true,
      infiniteScroll: true,
      nextLoading: false,
      nextCursor: null,
    }
  },
  async mounted() {
    await this.doRetrievePostUpdates()
    this.isRetrieving = false
  },
  methods: {
    async doRetrievePostUpdates() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            businessID: this.profile?.id,
            type: this.productType === 'All' ? null : this.productType,
            filterType: 'publishedExpired',
            preferredCurrency: 'AUD',
          },
          query: gql`
            ${fragmentProductItemContents}
            query ($businessID: String, $type: String, $filterType: String, $preferredCurrency: String) {
              Products(
                count: 10
                businessID: $businessID
                type: $type
                filterType: $filterType
                preferredCurrency: $preferredCurrency
              ) {
                ...ProfileProductContents
                next
              }
            }
          `,
        })

        const res = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            actorID: this.profile?.id,
            actorType: this.type,
          },
          query: gql`
            query ($actorType: String, $actorID: String) {
              getMyProductsAggregates(actorType: $actorType, actorID: $actorID) {
                activeProgram
                publishedExpired
                event
                experience
              }
            }
          `,
        })

        const { Products } = data
        const MyProductAggregates = res.data?.getMyProductsAggregates

        let count = 0
        switch (this.productType) {
          case 'All':
            count = MyProductAggregates?.publishedExpired || 0
            break
          case 'Event':
            count = MyProductAggregates?.event || 0
            break
          case 'Active Program':
            count = MyProductAggregates?.activeProgram || 0
            break
          case 'Experience':
            count = MyProductAggregates?.experience || 0
            break
        }
        this.$emit('update:count', count)
        this.items = Products?.items
        this.nextCursor = Products?.next
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    async doLoadMore() {
      if (!this.isRetrieving) {
        if (this.infiniteScroll) {
          this.nextLoading = true
          try {
            const { data } = await this.$apollo.query({
              fetchPolicy: 'no-cache',
              context: this.getGraphQLContext(),
              variables: {
                businessID: this.profile?.id,
                offset: parseInt(this.nextCursor),
                type: this.productType === 'All' ? null : this.productType,
                filterType: 'publishedExpired',
                preferredCurrency: 'AUD',
              },
              query: gql`
                ${fragmentProductItemContents}
                query (
                  $businessID: String
                  $offset: Int
                  $type: String
                  $filterType: String
                  $preferredCurrency: String
                ) {
                  Products(
                    count: 10
                    businessID: $businessID
                    offset: $offset
                    type: $type
                    filterType: $filterType
                    preferredCurrency: $preferredCurrency
                  ) {
                    ...ProfileProductContents
                    next
                  }
                }
              `,
            })
            const { Products } = data
            const items = Products?.items

            if (items.length > 0) {
              items.forEach((item) => {
                this.items.push(item)
              })
              this.nextCursor = Products?.next
            } else {
              this.infiniteScroll = false
              this.nextLoading = true
            }
          } catch (error) {
            this.doTrackSegmentError(error)
          } finally {
            this.nextLoading = false
          }
        }
      }
    },
  },
  apollo: {
    items: {
      skip: true,
      variables() {
        return {
          businessID: this.profile?.id,
          type: this.productType === 'All' ? null : this.productType,
          filterType: 'publishedExpired',
          preferredCurrency: 'AUD',
        }
      },
      query() {
        gql`
          ${fragmentProductItemContents}
          query ($businessID: String, $type: String, $filterType: String, $preferredCurrency: String) {
            Products(
              businessID: $businessID
              type: $type
              filterType: $filterType
              preferredCurrency: $preferredCurrency
            ) {
              ...ProfileProductContents
              next
            }
          }
        `
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.market-product::v-deep {
  .card-image {
    height: 320px !important;
  }
}
</style>
