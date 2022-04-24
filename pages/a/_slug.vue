<template lang="pug">
.has-background-white
  XPArticle(:article="article")
</template>

<script>
import gql from 'graphql-tag'
import XPArticle from '~/components/pages/Article'

export default {
  components: { XPArticle },
  async asyncData({ route, app, res, redirect }) {
    app?.$app.setPageLoader()
    let result
    try {
      const client = app.apolloProvider.defaultClient
      result = await client.query({
        fetchPolicy: 'no-cache',
        variables: {
          slug: route.params.slug,
        },
        query: gql`
          query ($slug: String!) {
            Article(slug: $slug) {
              id
              slug
              createdAt
              title
              subtitle
              coverPhotoURL
              coverCaption
              content
              MemberID
              Categories {
                id
                name
              }
              Member {
                id
                name
                slug
                isFollowed
                profilePhotoURL
              }
              Business {
                id
                name
                slug
                isFollowed
                profilePhotoURL
              }
              FeedItem {
                id
                isLiked
                isSaved
                actorType
                Aggregates {
                  likes
                  comments
                  saves
                }
                Comments {
                  count
                  next
                  items {
                    id
                    actorID
                    actorType
                    content
                    isLiked
                    timestamp
                    Member {
                      profilePhotoURL
                      name
                      slug
                    }
                    Business {
                      profilePhotoURL
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        `,
      })
    } catch (e) {
      res.statusCode = 404
      redirect('/404')
    } finally {
      if (result.data.Article) {
        // eslint-disable-next-line no-unsafe-finally
        return {
          article: result.data?.Article,
        }
      } else {
        res.statusCode = 404
        redirect('/404')
      }
    }
  },
  mounted() {
    const details = {
      id: this.article?.id,
      slug: this.article?.slug,
      title: this.article?.title,
      UserID: this.article?.MemberID,
    }
    this.$appClient.segment.trackArticleViewed(details)
    this.getAllExternalLinks()
    if (!this.isLoggedIn) {
      this.trackNonLoggedUser({ page: 'Article' })
    }
    this.$appClient.segment.trackPageView({ page: 'Article' })
    this.doViewArticle()
  },
  beforeDestroy() {
    this.$store.dispatch('articles/setIsFromArticles', false)
  },
  methods: {
    async doViewArticle() {
      if (!this.isLoggedIn) return

      try {
        await this.$apollo.mutate({
          variables: {
            id: this.article?.id,
          },
          mutation: gql`
            mutation ($id: String!) {
              viewArticle(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Article')
      }
    },
  },
  head() {
    return {
      title: `${this.article?.title} | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.article?.subtitle}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.article?.title} | ActivePlace`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.article?.subtitle}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `${this.article?.coverPhotoURL || this.activeplaceLogo}`,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.article?.title} | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.article?.title} | ActivePlace`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.article?.subtitle}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.article?.coverPhotoURL || this.activeplaceLogo}`,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: `${this.article?.coverPhotoURL || this.activeplaceLogo}`,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: `${this.article?.title} | ActivePlace`,
        },
      ],
    }
  },
}
</script>
