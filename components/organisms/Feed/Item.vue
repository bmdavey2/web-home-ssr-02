<template lang="pug">
.xo-feed-item(v-view="doSegmentImpression")
  .box
    XMFeedItemHeader(:item="item")
    XMFeedItemContent(:item="item")
    XMFeedItemAggregates(
      :item="item"
      @comment="toggleComments",
      :addComments="addComments",
      :addHighFives="addHighFives")
    XMFeedItemActions(
      :item="item",
      :highFived="highFived",
      :commentsVisible="showComments"
      @highfive="toggleHighFive"
      @comment="toggleComments")
    XMFeedItemComments(v-if="item && showComments", :item="item" @addComment="addComments++")
  template(v-if="isLoggedIn")
    XOFeedRecommendedFollowsMobile(v-if="isDivisibleByTen", :isEvenNumber="isEvenNumber")
</template>

<script>
import gql from 'graphql-tag'
import XMFeedItemHeader from '~/components/molecules/FeedItem/Header'
import XMFeedItemContent from '~/components/molecules/FeedItem/Content'
import XMFeedItemAggregates from '~/components/molecules/FeedItem/Aggregates'
import XMFeedItemActions from '~/components/molecules/FeedItem/Actions'
import XMFeedItemComments from '~/components/molecules/FeedItem/Comments'
import XOFeedRecommendedFollowsMobile from '~/components/organisms/MainFeed/RecommendedFollowsMobile'

export default {
  name: 'XOFeedItem',
  components: {
    XMFeedItemComments,
    XMFeedItemActions,
    XMFeedItemAggregates,
    XMFeedItemContent,
    XMFeedItemHeader,
    XOFeedRecommendedFollowsMobile,
  },
  props: {
    item: Object,
    visibleComments: Boolean,
    position: Number,
    loading: Boolean,
  },
  data() {
    return {
      showComments: this.visibleComments,
      highFived: this.item?.isLiked || false,
      addHighFives: 0,
      addComments: 0,
    }
  },
  computed: {
    wasHighFived() {
      return this.item?.isLiked || false
    },
    isDivisibleByTen() {
      return this.position % 10 === 0
    },
    isEvenNumber() {
      const isEvenNumber = this.position / 10
      return isEvenNumber % 2 === 0
    },
  },
  watch: {
    item(value) {
      this.highFived = value?.isLiked || false
    },
  },
  mounted() {
    this.getAllExternalLinks()
  },
  methods: {
    async toggleHighFive() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      this.highFived = !this.highFived

      if (this.highFived && !this.wasHighFived) {
        this.addHighFives = 1
      } else if (!this.highFived && this.wasHighFived) {
        this.addHighFives = -1
      } else {
        this.addHighFives = 0
      }

      try {
        await this.$apollo.mutate({
          variables: {
            id: this.item.id,
          },
          context: this.getGraphQLContext(),
          mutation: this.highFived
            ? gql`
                mutation ($id: String!) {
                  like(FeedItemID: $id) {
                    success
                  }
                }
              `
            : gql`
                mutation ($id: String!) {
                  unlike(FeedItemID: $id) {
                    success
                  }
                }
              `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    toggleComments() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      this.showComments = !this.showComments
    },
    doSegmentImpression(e) {
      const route = this.$route?.name
      const acceptedRoutes = ['trending', 'my-feed']

      if (!acceptedRoutes.includes(route)) return

      if (e.scrollPercent === 0) return
      if (this.item) {
        if (['p-slug', 'b-slug'].includes(this.$route.name)) {
          if (e.type === 'enter') {
            switch (this.item.objectType) {
              case 'Article':
                this.$appClient.segment.trackArticleImpression(this.item)
                break
              case 'Product':
                this.$appClient.segment.trackProductImpression(this.item)
                break
              case 'Update':
                this.$appClient.segment.trackUpdateImpression(this.item)
                break
            }
          }
          return
        }
        if (e.type === 'exit') {
          switch (this.item.objectType) {
            case 'Article':
              this.item.title = this.item?.Article?.title
              this.item.UserID = this.item?.actorID
              this.$appClient.segment.trackArticleImpression(this.item)
              break
            case 'Product':
              this.$appClient.segment.trackProductImpression(this.item)
              break
            case 'Update':
              this.$appClient.segment.trackUpdateImpression(this.item)
              break
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-feed-item::v-deep {
  margin-bottom: 1.5rem;
  .box {
    @media screen and (max-width: $tabletLG) {
      padding: 1.25rem 0 !important;
      .xm-feed-item-header,
      .description,
      .xm-feed-item-content-aggregates,
      .article-title,
      .article-excerpt {
        padding: 0 1.25rem;
      }
      .content-tag {
        margin-right: 15px;
      }
      .b-skeleton {
        padding: 0 1.25rem;
      }
    }
  }
}
</style>
