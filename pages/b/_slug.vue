<template lang="pug">
.page-member-profile
  XOProfile(type="Business", :profile="profile", :productAggregates="productAggregates" v-if="!isRetrieving")
</template>

<script>
import gql from 'graphql-tag'
import XOProfile from '~/components/organisms/Profile'
export default {
  components: { XOProfile },
  async asyncData({ route, app, res, redirect }) {
    try {
      const client = app.apolloProvider.defaultClient
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        variables: {
          slug: route.params.slug,
        },
        query: gql`
          query ($slug: String!) {
            Business(slug: $slug) {
              name
            }
          }
        `,
      })
      if (!data.Business) redirect('/404')
      return {
        profileDetails: data.Business,
      }
    } catch (e) {
      res.statusCode = 404
      redirect('/404')
    }
  },
  data() {
    return {
      isFromArticle: null,
      profile: null,
      isRetrieving: true,
      productAggregates: {},
    }
  },
  beforeCreate() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  async mounted() {
    await this.doRetrieveProfile()
    await this.doRetrieveProductAggregates()
    this.$appClient.segment.trackPageView({ page: 'Business Profile' })
    if (!this.profile?.Medals.total) {
      this.$app.setPageLoader(false)
    }
    if (this.isFromArticle) {
      const pageType = 'business_profile'
      let userId, groupId
      if (this.isLoggedIn) {
        if (this.currentBusinessID) {
          groupId = this.currentBusinessID
        } else {
          userId = this.$store.state.auth?.uid
        }
      }
      // if (this.profile?.badge) pageType = 'mentor_profile'
      this.$appClient.segment.trackClickedProfileFromArticle({
        userId,
        groupId,
        pageType,
        name: this.profile?.name,
      })
    }
    const fullScreen = this.lt('tabletLG')
    if (this.$store.getters['signup/getSignupAsBusiness']) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/BusinessSetupSuccess').default,
        parent: this,
        width: 635,
        canCancel: false,
        customClass: 'bg-white',
        fullScreen,
        props: {
          fullScreen,
        },
      })
    }
  },
  methods: {
    async doRetrieveProfile() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            slug: this.$route.params.slug,
          },
          context: this.getGraphQLContext(),
          query: gql`
            query ($slug: String!) {
              Business(slug: $slug) {
                id
                slug
                name
                signUpNumber
                country
                nonProfitBusiness
                profileType
                description
                profilePhotoURL
                coverPhotoURL
                ap5FavoriteEvents
                ap5InspiredBy
                ap5PassionateAbout
                ap5BestKnownFor
                ap5ProudestThing
                serviceProvided
                statement
                website
                isFollowed
                Categories {
                  name
                  id
                  parent
                }
                Aggregates {
                  articlesPublished
                  updates
                  likesReceived
                  reviews
                  rating
                }
                plan
                Partners {
                  objectID
                  objectType
                  Business {
                    id
                    name
                    slug
                    profilePhotoURL
                    Aggregates {
                      articlesPublished
                      likesReceived
                      updates
                    }
                    isFollowed
                  }
                  Member {
                    id
                    name
                    slug
                    profilePhotoURL
                    Aggregates {
                      articlesPublished
                      likesReceived
                      updates
                    }
                    isFollowed
                  }
                }
                Medals {
                  total
                }
              }
            }
          `,
        })

        this.profile = data?.Business
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isRetrieving = false
      }
    },
    async doRetrieveProductAggregates() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            actorID: this.profile?.id,
            actorType: 'Business',
          },
          query: gql`
            query ($actorID: String, $actorType: String) {
              getMyProductsAggregates(actorType: $actorType, actorID: $actorID) {
                activeProgram
                publishedExpired
                event
                experience
              }
            }
          `,
        })
        this.productAggregates = data?.getMyProductsAggregates
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
  head() {
    return {
      title: `${this.profileDetails?.name} | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.profileDetails?.name} | ActivePlace`,
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
          content: `${this.profileDetails?.name} | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.profileDetails?.name} | ActivePlace`,
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
          content: `${this.profileDetails?.name} | ActivePlace`,
        },
      ],
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from?.name === 'a-slug') {
        vm.isFromArticle = true
      }
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteLeave(to, from, next) {
    next(() => {
      this.setMedalActiveTab('about')
    })
  },
}
</script>

<style lang="scss" scoped>
.page-member-profile {
  background-color: white;
}
</style>
