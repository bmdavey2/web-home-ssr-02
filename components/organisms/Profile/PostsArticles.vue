<template lang="pug">
.xo-profile-posts-articles(
  v-infinite-scroll="doLoadMore"
  infinite-scroll-disabled="nextLoading",
  :infinite-scroll-distance="100")
  template(v-if="isRetrieving")
    XOFeedItem
  template(v-else)
    template(v-if="items.length > 0")
      XOFeedItem(v-for="(item, i) in items", :key="item.id", :item="item")
      transition(name="fade")
        XOFeedItem(v-show="nextLoading")
    template(v-else): .is-size-4.has-text-grey.has-text-centered.pt-5 No articles yet.
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import fragmentFeedItemContents from '~/assets/graphql/fragmentFeedItemContents.graphql'
import XOFeedItem from '~/components/organisms/Feed/Item'
export default {
  name: 'XOProfilePostsArticles',
  components: { XOFeedItem },
  props: {
    type: String,
    postsTab: String,
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
  computed: {
    ...mapGetters({
      getMedalActiveTab: 'medals/getMedalActiveTab',
    }),
  },
  async mounted() {
    await this.doRetrievePostArticles()
    this.isRetrieving = false
    this.$root.$on('DoRemoveArticle', (value) => {
      this.items = this.items.filter((item) => {
        return item.objectID !== value.objectID
      })
    })
  },
  methods: {
    async doRetrievePostArticles() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          context: this.getGraphQLContext(),
          variables: {
            slug: this.$route.params?.slug,
          },
          query:
            this.type === 'Member'
              ? gql`
                  ${fragmentFeedItemContents}
                  query ($slug: String) {
                    Member(slug: $slug) {
                      Activities(count: 10, objectType: "Article") {
                        ...FeedItemContents
                        next
                      }
                      Aggregates {
                        articlesPublished
                      }
                    }
                  }
                `
              : gql`
                  ${fragmentFeedItemContents}
                  query ($slug: String) {
                    Business(slug: $slug) {
                      Activities(count: 10, objectType: "Article") {
                        ...FeedItemContents
                        next
                      }
                      Aggregates {
                        articlesPublished
                      }
                    }
                  }
                `,
        })
        const { Member, Business } = data
        const count = Member?.Aggregates?.articlesPublished || Business?.Aggregates?.articlesPublished || 0
        this.items = Member?.Activities?.items || Business?.Activities?.items
        this.nextCursor = Member?.Activities?.next || Business?.Activities?.next
        this.$emit('update:count', count)
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    async doLoadMore() {
      if (this.getMedalActiveTab !== 'posts' && this.postsTab === 'articles') return
      if (!this.isRetrieving) {
        if (this.infiniteScroll) {
          this.nextLoading = true
          try {
            const { data } = await this.$apollo.query({
              fetchPolicy: 'no-cache',
              context: this.getGraphQLContext(),
              variables: {
                slug: this.$route.params?.slug,
                cursor: this.nextCursor,
              },
              query:
                this.type === 'Member'
                  ? gql`
                      ${fragmentFeedItemContents}
                      query ($slug: String, $cursor: String) {
                        Member(slug: $slug) {
                          Activities(count: 20, objectType: "Article", cursor: $cursor) {
                            ...FeedItemContents
                            next
                          }
                        }
                      }
                    `
                  : gql`
                      ${fragmentFeedItemContents}
                      query ($slug: String, $cursor: String) {
                        Business(slug: $slug) {
                          Activities(count: 20, objectType: "Article", cursor: $cursor) {
                            ...FeedItemContents
                            next
                          }
                        }
                      }
                    `,
            })
            const { Member, Business } = data
            const items = Member?.Activities?.items || Business?.Activities?.items

            if (items.length > 0) {
              items.forEach((item) => {
                this.items.push(item)
              })
              this.nextCursor = Member?.Activities?.next || Business?.Activities?.next
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
          slug: this.$route.params.slug,
        }
      },
      update(data) {
        const {
          Activities: { items },
          Aggregates: { articlesPublished: count },
        } = data[this.type]
        this.$emit('update:count', count)
        return items
      },
      query() {
        return this.type === 'Business'
          ? gql`
              ${fragmentFeedItemContents}
              query ($slug: String!) {
                Business(slug: $slug) {
                  Activities(objectType: "Article") {
                    ...FeedItemContents
                    next
                  }
                  Aggregates {
                    articlesPublished
                  }
                }
              }
            `
          : gql`
              ${fragmentFeedItemContents}
              query ($slug: String!) {
                Member(slug: $slug) {
                  Activities(objectType: "Article") {
                    ...FeedItemContents
                    next
                  }
                  Aggregates {
                    articlesPublished
                  }
                }
              }
            `
      },
    },
  },
}
</script>
