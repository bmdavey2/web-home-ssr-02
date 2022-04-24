<template lang="pug">
.container(style="padding-top: 50px; padding-bottom: 50px")
  p.is-size-2.has-text-secondary.mb-5.pb-3 My Subscription
  .columns.is-multiline.is-mobile
    .column.is-8-desktop.is-12-mobile
      .is-flex
        XOMyProfileAvatar(size="96px" style="min-width: 96px")
        .ml-5
          XOMyProfileName.is-size-2.has-text-secondary.is-uppercase
          p.is-uppercase.is-grey Business plans member since {{ startDate }}
      XMSubscriptionProductSlider.mt-5(:products="products", :subscription="subscription")
    .column.is-4-desktop.is-12-mobile
      XMSubscriptionPayment.mb-3(:subscription="subscription")
      XMSubscriptionFeatures(:features="features", :type="type")
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import XOMyProfileName from '~/components/organisms/MyProfileName'
import XMSubscriptionProductSlider from '~/components/molecules/Subscription/ProductSlider'
import XMSubscriptionPayment from '~/components/molecules/Subscription/PaymentCard'
import XMSubscriptionFeatures from '~/components/molecules/Subscription/KeyFeatures'
import XMCheckoutStatus from '~/components/molecules/Checkout/Status'
export default {
  name: 'XPBusinessSubscription',
  components: {
    XMCheckoutStatus,
    XMSubscriptionFeatures,
    XMSubscriptionPayment,
    XMSubscriptionProductSlider,
    XOMyProfileName,
    XOMyProfileAvatar,
  },
  data() {
    return {
      subscription: [],
      business: '',
      products: [],
    }
  },
  computed: {
    type() {
      return this.subscription?.type || 'default'
    },
    periodStartTime() {
      return this.subscription?.periodStartTime || null
    },
    startDate() {
      const date = this.periodStartTime ? this.periodStartTime : this.business
      if (date) {
        return moment(date).format('MMM DD YYYY')
      } else {
        return ''
      }
    },
    features() {
      return this.subscription?.features || []
    },
  },
  watch: {
    currentBusinessID() {
      this.loadSubscription()
    },
  },
  mounted() {
    if (this.$route.query.payment === 'success') {
      //
      this.openModal('success')
    } else if (this.$route.query.payment === 'cancel') {
      this.openModal('cancel')
    }

    this.loadSubscription()
  },
  methods: {
    async openModal(value) {
      let result
      try {
        if (this.$route.query.session_id) {
          const { data } = await this.$apollo.query({
            fetchPolicy: 'no-cache',
            variables: {
              session_id: this.$route.query.session_id,
            },
            query: gql`
              query ($session_id: String!) {
                getStripeSession(session_id: $session_id) {
                  currency
                  amount_total
                  amount_total_converted
                }
              }
            `,
          })
          result = data?.getStripeSession
        }
      } catch (error) {
        this.doTrackSegmentError(error, 'My Subscription')
      } finally {
        this.$buefy.modal.open({
          parent: this,
          component: XMCheckoutStatus,
          width: 600,
          props: {
            status: value,
            sessionValue: result,
          },
        })
      }
    },
    async getBusinessCreated() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            id: this.currentBusinessID,
          },
          query: gql`
            query ($id: String!) {
              Business(id: $id) {
                createdAt
              }
            }
          `,
        })
        this.business = data?.Business?.createdAt
      } catch (error) {
        this.doTrackSegmentError(error, 'My Subscription')
      }
    },
    async loadSubscription() {
      if (!this.currentBusinessID) {
        this.$router.push({
          path: '/',
        })
      }

      this.getBusinessCreated()
      this.loadProducts()

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            actorID: this.profile?.id,
            actorType: 'Member',
          },
          context: this.getGraphQLContext(),
          query: gql`
            query {
              getMyBusinessSubscription {
                creationTime
                periodStartTime
                periodEndTime
                interval
                type
                isPaid
                features {
                  addLinksInContent
                  followLimits
                  recommendProfile
                  prioritySupport
                  additionalTeamMembers
                }
                canceled
              }
            }
          `,
        })
        this.subscription = data?.getMyBusinessSubscription || []
        this.$store.dispatch('business/setBusinessSubscription', {
          cancelled: this.subscription?.canceled,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'My Subscription')
      }
    },
    async loadProducts() {
      if (this.currentBusinessID) {
        try {
          const { data } = await this.$apollo.query({
            fetchPolicy: 'no-cache',
            variables: {
              businessID: this.currentBusinessID,
              filterType: 'published',
            },
            query: gql`
              query ($businessID: String, $sortBy: String, $filterType: String) {
                Products(businessID: $businessID, sortBy: $sortBy, filterType: $filterType) {
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
                    viewerCurrency(preferredCurrency: "AUD")
                    viewerPrice(preferredCurrency: "AUD")
                    viewerPriceMax(preferredCurrency: "AUD")
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
          this.products = data.Products?.items
        } catch (error) {
          this.doTrackSegmentError(error, 'Business Claim')
        }
      }
    },
  },
}
</script>
