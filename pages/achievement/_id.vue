<template lang="pug">
XTFeedItemPage(:profile="profile")
  XOFeedItem(:item="feedItem", :visible-comments="true")
</template>

<script>
import gql from 'graphql-tag'
import XTFeedItemPage from '~/components/templates/FeedItemPage'
import XOFeedItem from '~/components/organisms/Feed/Item'
import XPUpdate from '~/components/pages/Update'

export default {
  components: { XOFeedItem, XTFeedItemPage, XPUpdate },
  async asyncData({ app, route, res, redirect }) {
    try {
      const client = app.apolloProvider.defaultClient
      const { data } = await client.query({
        variables: {
          AchievementID: route.params.id,
        },
        query: gql`
          query ($AchievementID: String) {
            FeedItem(AchievementID: $AchievementID) {
              id
              timestamp
              objectType
              objectID
              actorType
              actorID
              isLiked
              Achievement {
                id
                title
                summary
                completionTimeInSeconds
                dateAccomplished
                description
                Categories {
                  id
                  name
                }
                Media {
                  objectID
                  objectType
                  PhotoURL
                  VideoURL
                }
              }
              Member {
                id
                slug
                name
                profilePhotoURL
                signUpNumber
                country
                Categories {
                  id
                  name
                }
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
                profilePhotoURL
                signUpNumber
                country
                Categories {
                  id
                  name
                }
                Aggregates {
                  articlesPublished
                  updates
                  likesReceived
                }
              }
              Aggregates {
                likes
                comments
              }
              Comments {
                items {
                  id
                  timestamp
                  actorType
                  content
                  Member {
                    name
                    profilePhotoURL
                  }
                  Business {
                    name
                    profilePhotoURL
                  }
                  Aggregates {
                    likes
                  }
                  isLiked
                }
                next
              }
              isLiked
            }
          }
        `,
      })
      if (!data.FeedItem) redirect('/404')
      return {
        feedItem: data.FeedItem,
      }
    } catch (e) {
      res.statusCode = 404
      redirect('/404')
    }
  },
  computed: {
    profile() {
      if (!this.feedItem?.actorType) return null
      return this.feedItem[this.feedItem.actorType]
    },
  },
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Achievement' })
  },
  head() {
    return {
      title: `${this.feedItem?.Achievement?.title
        .split(' ')
        .splice(0, 6)
        .join(' ')
        .replace(/<\/?[^>]+(>|$)/g, '')} | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.feedItem?.Achievement?.title
            .split(' ')
            .splice(0, 6)
            .join(' ')
            .replace(/<\/?[^>]+(>|$)/g, '')} | ActivePlace`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `${this.feedItem?.Achievement?.Media[0]?.PhotoURL || this.activeplaceLogo}`,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.feedItem?.Achievement?.title
            .split(' ')
            .splice(0, 6)
            .join(' ')
            .replace(/<\/?[^>]+(>|$)/g, '')} | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.feedItem?.Achievement?.title
            .split(' ')
            .splice(0, 6)
            .join(' ')
            .replace(/<\/?[^>]+(>|$)/g, '')} | ActivePlace`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.feedItem?.Achievement?.Media[0]?.PhotoURL || this.activeplaceLogo}`,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: `${this.feedItem?.Achievement?.Media[0]?.PhotoURL || this.activeplaceLogo}`,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: `${this.feedItem?.Achievement?.title
            .split(' ')
            .splice(0, 6)
            .join(' ')
            .replace(/<\/?[^>]+(>|$)/g, '')} | ActivePlace`,
        },
      ],
    }
  },
}
</script>
