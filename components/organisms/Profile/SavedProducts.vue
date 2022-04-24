<template lang="pug">
.xo-profile-posts-updates(
  v-infinite-scroll="doLoadMore"
  infinite-scroll-disabled="nextLoading",
  :infinite-scroll-distance="100")
  template(v-if="isRetrieving")
    XOFeedItem
  template(v-else)
    template(v-if="items.length > 0")
      XMMarketPlaceProduct.market-product.mb-5(v-for="(item, i) in items", :key="item.id", :product="item")
      transition(name="fade")
        XOFeedItem(v-show="nextLoading")
    template(v-else): .is-size-4.has-text-grey.has-text-centered.pt-5 No Products Found
</template>

<script>
import gql from 'graphql-tag'
import XMMarketPlaceProduct from '~/components/molecules/MarketPlace/Product'
import XOFeedItem from '~/components/organisms/Feed/Item'

export default {
  name: 'XOProfileSavedProducts',
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
            actorID: this.profile?.id,
            actorType: 'Member',
          },
          query: gql`
            query ($actorType: String!, $actorID: String!) {
              ProductReactions(verb: "save", actorType: $actorType, actorID: $actorID) {
                Saved(count: 10) {
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
                    viewerPrice(preferredCurrency: "AUD")
                    viewerPriceMax(preferredCurrency: "AUD")
                    viewerCurrency(preferredCurrency: "AUD")
                  }
                  next
                  total
                }
              }
            }
          `,
        })
        const { ProductReactions } = data
        const { Saved } = ProductReactions
        const total = Saved?.total
        this.$emit('update:count', total)
        this.items = Saved?.items
        this.nextCursor = Saved?.next
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

              variables: {
                skip: parseInt(this.nextCursor),
                actorID: this.profile?.id,
                actorType: 'Member',
              },
              query: gql`
                query ($skip: Int, $actorType: String!, $actorID: String!) {
                  ProductReactions(skip: $skip, verb: "save", actorType: $actorType, actorID: $actorID) {
                    Saved(count: 10) {
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
                        viewerPrice(preferredCurrency: "AUD")
                        viewerPriceMax(preferredCurrency: "AUD")
                        viewerCurrency(preferredCurrency: "AUD")
                      }
                      next
                    }
                  }
                }
              `,
            })
            const { ProductReactions } = data
            const { Saved } = ProductReactions
            const items = Saved?.items

            if (items.length > 0) {
              items.forEach((item) => {
                this.items.push(item)
              })
              this.nextCursor = Saved?.next
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
          actorID: this.profile?.id,
          actorType: 'Member',
        }
      },
      query() {
        gql`
          query ($actorType: String, $actorID: String) {
            ProductReactions {
              Saved(count: 10, verb: "save", actorType: $actorType, actorID: $actorID) {
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
                  viewerPrice(preferredCurrency: "AUD")
                  viewerPriceMax(preferredCurrency: "AUD")
                  viewerCurrency(preferredCurrency: "AUD")
                }
                next
                total
              }
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
