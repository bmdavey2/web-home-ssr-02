<template lang="pug">
.actions.pb-3
  .is-flex.is-flex-wrap-wrap.is-align-items-flex-end.is-justify-content-space-between
    .aggregates.mb-3
      .list.is-flex.is-flex-wrap-wrap
        .item
          ._icon(@click.prevent="doHighFive()")
            img(src="~assets/icons/social/article/high-fived.svg" width="18" height="18" v-if="isHighFive")
            img(src="~assets/icons/social/article/high-five.svg" width="18" height="18" v-else)
          .value-lg {{ highFiveCount }} High fives
          .value-sm {{ highFiveCount }}
        .item
          ._icon
            b-icon(icon="comment")
          .value-lg {{ commentsCount }} Comment
          .value-sm {{ commentsCount }}
        .item
          ._icon(@click.prevent="doSaveArticle()", :class="isSaving && 'is-disabled'")
            b-icon(icon="bookmark" v-if="isSaved")
            b-icon(icon="bookmark-outline" v-else)
          .value-lg {{ savesCount }} Saves
          .value-sm {{ savesCount }}
    .share.mb-3
      .mb-3 Share to
      .list.is-flex.is-flex-wrap-wrap.is-justify-content-space-between
        .item(@click.prevent="doLoadSegment()")
          share-network(
            network="linkedin",
            :title="title",
            :description="content",
            :media="coverPhotoURL",
            :url="`${baseURL}/article/${link}`")
            img(src="~assets/icons/social/article/linkedin.svg" width="16" height="16")
        .item(@click.prevent="doLoadSegment()")
          share-network(
            network="twitter",
            :title="title",
            :description="content",
            :media="coverPhotoURL",
            :url="`${baseURL}/article/${link}`")
            img(src="~assets/icons/social/article/twitter.svg" width="16" height="16")
        .item(@click.prevent="doLoadSegment()")
          share-network(
            network="facebook",
            :title="title",
            :description="content",
            :media="coverPhotoURL",
            :url="`${baseURL}/article/${link}`")
            img(src="~assets/icons/social/article/facebook.svg" width="16" height="16")
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XMArticleViewActions',
  props: {
    comments: Number,
  },
  data() {
    return {
      isHighFive: this.$parent?.article?.FeedItem?.isLiked,
      highFiveCount: this.$parent?.article?.FeedItem?.Aggregates?.likes || 0,
      isSaved: this.$parent?.article?.FeedItem?.isSaved || false,
      isSaving: false,
      savesCount: this.$parent?.article?.FeedItem?.Aggregates?.saves || 0,
      // commentsCount: this.$parent?.article?.FeedItem?.Aggregates?.comments || 0,
    }
  },
  computed: {
    article() {
      return this.$parent?.article
    },
    title() {
      return this.article?.title || ''
    },
    content() {
      return this.article?.content
    },
    coverPhotoURL() {
      return this.article?.coverPhotoURL
    },
    link() {
      return this.$route.params.slug
    },
    mutationID() {
      return this.article?.FeedItem?.id
    },
    commentsCount() {
      return this.comments || 0
    },
  },
  mounted() {
    this.$root.$on('article/addSavesCount', this.doAddSavesCount)
    this.$root.$on('article/subtractSavesCount', this.doSubtractSavesCount)
  },
  methods: {
    async doHighFive() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      try {
        const targetGetStreamActivityID = this.article?.FeedItem?.id
        if (this.isHighFive) {
          this.highFiveCount--
          this.isHighFive = false
          await this.$apollo.mutate({
            variables: { targetGetStreamActivityID },
            context: this.getGraphQLContext(),
            mutation: gql`
              mutation ($targetGetStreamActivityID: String, $targetGetStreamReactionID: String) {
                unlike(
                  targetGetStreamActivityID: $targetGetStreamActivityID
                  targetGetStreamReactionID: $targetGetStreamReactionID
                ) {
                  success
                  timestamp
                  objectID
                }
              }
            `,
          })
        } else {
          this.highFiveCount++
          this.isHighFive = true
          await this.$apollo.mutate({
            variables: { targetGetStreamActivityID },
            context: this.getGraphQLContext(),
            mutation: gql`
              mutation ($targetGetStreamActivityID: String, $targetGetStreamReactionID: String) {
                like(
                  targetGetStreamActivityID: $targetGetStreamActivityID
                  targetGetStreamReactionID: $targetGetStreamReactionID
                ) {
                  success
                  timestamp
                  objectID
                }
              }
            `,
          })
        }
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    async doSaveArticle() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }

      try {
        const targetGetStreamActivityID = this.article?.FeedItem?.id

        if (this.isSaved) {
          this.isSaved = false
          this.savesCount--
          this.$root.$emit('article/unsave')

          await this.$apollo.mutate({
            variables: { targetGetStreamActivityID },
            mutation: gql`
              mutation ($targetGetStreamActivityID: String!) {
                unsave(targetGetStreamActivityID: $targetGetStreamActivityID) {
                  success
                }
              }
            `,
          })
        } else {
          this.isSaved = true
          this.savesCount++
          this.$root.$emit('article/save')

          await this.$apollo.mutate({
            variables: { targetGetStreamActivityID },
            context: this.getGraphQLContext(),
            mutation: gql`
              mutation ($targetGetStreamActivityID: String) {
                save(targetGetStreamActivityID: $targetGetStreamActivityID) {
                  success
                  objectID
                }
              }
            `,
          })
        }
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isSaving = false
      }
    },
    doShowComments() {
      // TODO: Show comment mobile
    },
    doAddSavesCount() {
      this.isSaved = true
      this.savesCount++
    },
    doSubtractSavesCount() {
      this.isSaved = false
      this.savesCount--
    },
    doAddCommentCount() {
      this.commentsCount++
    },
    doLoadSegment() {
      let userId, groupId
      if (this.isLoggedIn) {
        if (this.currentBusinessID) {
          groupId = this.currentBusinessID
        } else {
          userId = this.$store.state.auth?.uid
        }
      }
      const details = {
        id: this.article?.id,
        slug: this.article?.slug,
        title: this.article?.title,
        userId,
        groupId,
      }
      this.$appClient.segment.trackArticleShareClick(details)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */

.actions::v-deep {
  border-bottom: 1px solid #cfd4d5;

  @media (max-width: $tabletLG) {
    padding: 0 1.5rem !important;
  }

  .aggregates {
    .list {
      .item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-right: 20px;
        user-select: none;
        color: #848484;

        ._icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid #65676b;
          padding: 8px 7px;
          margin-right: 10px;
          text-align: center;
          cursor: pointer;
          color: #65676b;

          &.is-disabled {
            pointer-events: none;
          }
        }
      }
    }
  }

  .share {
    width: 100%;
    max-width: 180px;

    .list {
      .item {
        a {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid #65676b;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          color: #65676b;
        }
      }
    }
  }

  .action-list {
    li {
      margin-right: 20px;
      color: #848484;
      user-select: none;

      a {
        font-size: 18px;
        color: #848484;
        border-radius: 50%;
        border: 1px solid #848484;
        padding: 8px 7px;
        width: 42px;
        height: 42px;
        display: inline-block;
        text-align: center;
        margin-right: 0.4rem;
      }
    }
  }

  .social-container {
    li {
      margin-right: 16px;
      user-select: none;
    }

    a {
      font-size: 1rem;
      color: #9e9090;
      border-radius: 50%;
      border: 1px solid #848484;
      padding: 8px 7px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.4rem;
    }
  }

  @media screen and (max-width: 1023px) {
    padding: 0 15px 0.75rem !important;
  }

  //.value-lg(v-if="$viewport.gte.tabletLG") {{ highFiveCount }} High fives
  // .value-sm(v-if="$viewport.lt.tabletLG") {{ highFiveCount }}
  .value-sm {
    display: none;
  }

  @media (max-width: $tabletLG) {
    .value-sm {
      display: unset !important;
    }
    .value-lg {
      display: none !important;
    }
  }
}
</style>
