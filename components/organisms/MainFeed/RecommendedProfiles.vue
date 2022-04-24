<template lang="pug">
.xo-main-feed-recommended-profiles.mt-5
  .title Recommended Businesses and People
  .separator
  XOMainFeedProfileFollowCard(
    v-for="profile in profiles",
    :key="profile.id",
    :value="profile",
    :loading="$apollo.queries.profiles.loading")
</template>

<script>
import gql from 'graphql-tag'
import XOMainFeedProfileFollowCard from '~/components/organisms/MainFeed/ProfileFollowCard'
export default {
  name: 'XOMainFeedRecommendedProfiles',
  components: { XOMainFeedProfileFollowCard },
  props: {
    count: { type: Number, default: () => 3 },
  },
  apollo: {
    profiles: {
      prefetch: false,
      query: gql`
        query {
          Me {
            RecommendedFollows(count: 3) {
              objectType
              Member {
                id
                slug
                name
                profilePhotoURL(type: "100")
                isFollowed
                Aggregates {
                  articlesPublished
                  updates
                  likesReceived
                }
              }
              Business {
                id
                slug
                name
                profilePhotoURL(type: "100")
                isFollowed
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
      update: (data) => data.Me?.RecommendedFollows || [],
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-main-feed-recommended-profiles::v-deep
  .title
    text-transform: uppercase
    font-size: 14px
    font-weight: 500
    margin-bottom: 8px

  .separator
    width: 30%
    height: 1px
    background: #444
    margin-bottom: 12px
</style>
