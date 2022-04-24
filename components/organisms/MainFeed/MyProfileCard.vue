<template lang="pug">
.xo-main-feed-my-profile-card.card.is-user-select-none
  .content
    img.cover(:src="coverImage")
    XOMyProfileAvatar.avatar(size="96px")
    .name.has-text-centered {{ name }}
    .flex-center.mb-2
      nuxt-link.link-profile(:to="profileLink") Go to my profile

    .flex.has-text-centered.px-4.py-5.aggregates
      .aggregate-item.mx-1.px-2.pb-2.is-flex-width-auto(style="background: #f8f8f8")
        .flex-center.icon
          img(src="~/assets/icons/articles-primary.svg")
        .is-flex-width-auto(style="font-size: 12px") My Articles
        .value {{ articles }}
      .aggregate-item.mx-1.px-2.pb-2.is-flex-width-auto(style="background: #f8f8f8")
        .flex-center.icon
          img(src="~/assets/icons/updates-primary.svg")
        .is-flex-width-auto(style="font-size: 12px") My Updates
        .value {{ updates }}
      .aggregate-item.mx-1.px-2.pb-2.is-flex-width-auto(style="background: #f8f8f8")
        .flex-center.icon
          img(src="~/assets/icons/highfive-primary.svg")
        .is-flex-width-auto(style="font-size: 12px") High Fives
        .value {{ highFives }}
</template>

<script>
import gql from 'graphql-tag'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
export default {
  name: 'XOMainFeedMyProfileCard',
  components: { XOMyProfileAvatar },
  data() {
    return {
      profile: null,
      business: null,
      isRetrieving: true,
    }
  },
  computed: {
    hasSelectedBusiness() {
      return this.$store.state.app.currentBusiness
    },
    name() {
      if (this.hasSelectedBusiness) return this.business?.name ? this.business?.name.replace(/&amp;/g, '&') : ''
      return this.profile?.Member?.name ? this.profile?.Member?.name.replace(/&amp;/g, '&') : ''
    },
    coverImage() {
      if (this.hasSelectedBusiness) return this.business?.coverPhotoURL || require('~/assets/images/cover-default.jpg')
      return this.profile?.Member?.coverPhotoURL || require('~/assets/images/cover-default.jpg')
    },
    articles() {
      if (this.hasSelectedBusiness) return this.business?.Aggregates?.articlesPublished || 0
      return this.profile?.Member?.Aggregates?.articlesPublished || 0
    },
    updates() {
      if (this.hasSelectedBusiness) return this.business?.Aggregates?.updates || 0
      return this.profile?.Member?.Aggregates?.updates || 0
    },
    highFives() {
      if (this.hasSelectedBusiness) return this.business?.Aggregates?.likesReceived || 0
      return this.profile?.Member?.Aggregates?.likesReceived || 0
    },
    profileLink() {
      if (this.hasSelectedBusiness) return `/b/${this.business?.slug}`
      return `/p/${this.profile?.Member?.slug}`
    },
  },
  watch: {
    currentBusinessID() {
      this.doRetrieveBusiness()
      this.doRetrieveProfile()
    },
  },
  async mounted() {
    await this.doRetrieveBusiness()
    await this.doRetrieveProfile()
  },
  methods: {
    async doRetrieveBusiness() {
      if (this.currentBusinessID === null || this.currentBusinessID === undefined) return
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            id: this.currentBusinessID,
          },
          query: gql`
            query ($id: String!) {
              Business(id: $id) {
                name
                coverPhotoURL
                slug
                Aggregates {
                  articlesPublished
                  updates
                  likesReceived
                }
              }
            }
          `,
        })
        this.business = data?.Business
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    async doRetrieveProfile() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Me {
                Profile {
                  objectType
                  Member {
                    name
                    coverPhotoURL
                    slug
                    Aggregates {
                      articlesPublished
                      updates
                      likesReceived
                    }
                  }
                }
              }
            }
          `,
          skip() {
            return !this.isLoggedIn
          },
        })
        this.profile = data?.Me?.Profile
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-main-feed-my-profile-card::v-deep
  .cover
    object-fit: cover
    object-position: center
    width: 100%
    height: 120px

  .avatar
    position: relative
    top: -58px
    margin: 0 auto -46px auto

  .link-profile
    text-align: center
    font-size: 0.8571rem
    font-weight: 300
    color: inherit

  .icon
    position: relative
    top: -16px
    width: 32px
    height: 32px
    background: #fff
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.15)
    border-radius: 50%
    margin: 0 auto

  .name
    font-weight: 500
    font-size: 1.1429rem

  .aggregates .aggregate-item
    display: flex
    flex-wrap: wrap
    flex-direction: column

  .aggregates .value
    font-size: 1.1429rem
    font-weight: 500
</style>
