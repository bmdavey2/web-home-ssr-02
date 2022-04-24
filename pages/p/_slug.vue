<template lang="pug">
.page-business-profile
  XOProfile(type="Member", :profile="profile", :productAggregates="productAggregates" v-if="!isRetrieving")
</template>

<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
import meta from '~/mixins/meta'
import XOProfile from '~/components/organisms/Profile'

export default {
  components: { XOProfile },
  mixins: [meta],
  async asyncData({ route, app, res, redirect }) {
    app.$app.setPageLoader()
    const slug = route.params.slug

    try {
      const { Member } = await app.$api.getMemberProfile({ slug, profilePhotoSize: '100' })

      if (!Member) redirect('/404')
      return {
        profileDetails: Member,
      }
    } catch (e) {
      res.statusCode = 404
      redirect('/404')
    }
  },
  data() {
    return {
      isFromArticle: null,
      isFromMemberClaim: null,
      profile: null,
      isRetrieving: true,
      productAggregates: {
        saved: 0,
      },
    }
  },
  async mounted() {
    await this.doRetrieveProfile()
    await this.doRetrieveProductReactions()
    if (!this.profile?.Medals.total) {
      this.$app.setPageLoader(false)
    }
    if (this.isFromArticle) {
      const pageType = 'user_profile'
      let userId, groupId
      if (this.isLoggedIn) {
        if (this.currentBusinessID) {
          groupId = this.currentBusinessID
        } else {
          userId = this.$store.state.auth?.uid
        }
      }
      // if (this.profile?.Mentor?.badge) pageType = 'mentor_profile'
      this.$appClient.segment.trackClickedProfileFromArticle({
        userId,
        groupId,
        pageType,
        name: this.profile?.name,
      })
    }

    if (this.isFromMemberClaim) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/MemberClaim/SetNewPassword').default,
        parent: this,
        canCancel: false,
        width: 500,
      })
    }

    this.$appClient.segment.trackPageView({ page: 'User Profile' })
  },
  created() {
    this.metaTitle = this.profileDetails?.name
  },
  methods: {
    ...mapActions({
      setMedalActiveTab: 'medals/setMedalActiveTab',
    }),
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
              Member(slug: $slug) {
                id
                name
                signUpNumber
                quotes
                personalStatus
                country
                backgroundColor
                coverPhotoURL
                profilePhotoURL
                biography
                ap5FavoriteEvents
                ap5InspiredBy
                ap5PassionateAbout
                ap5ToughestThing
                ap5TrainingWith
                slug
                isFollowed
                backgroundColor
                claimed
                Categories {
                  name
                  id
                  parent
                }
                Aggregates {
                  articlesPublished
                  updates
                  likesReceived
                }
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

        this.profile = data?.Member
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isRetrieving = false
      }
    },
    async doRetrieveProductReactions() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            actorID: this.profile?.id,
            actorType: 'Member',
          },
          query: gql`
            query ($actorID: String!, $actorType: String!) {
              ProductReactions(verb: "save", actorID: $actorID, actorType: $actorType) {
                Saved {
                  items {
                    id
                  }
                }
              }
            }
          `,
        })
        this.productAggregates.saved = data?.ProductReactions?.Saved?.items.length
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from?.name === 'a-slug') {
        vm.isFromArticle = true
      }

      if (from?.name === 'member-claim-code') {
        vm.isFromMemberClaim = true
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
.page-business-profile {
  background-color: white;
}
</style>
