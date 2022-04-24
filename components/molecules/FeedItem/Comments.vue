<template lang="pug">
.xm-feed-item-comments.mt-5
  .content.mb-0
    XMFeedItemComment(v-for="comment in comments", :value="comment", :key="comment.id")
  hr
  .flex
    .flex-auto.mr-2
      XOMyProfileAvatar(size="36px")

    .flex-grow
      client-only
        XMFeedItemCommentInput(@submit="onSubmitComment", :submitting="submitting")
</template>

<script>
import gql from 'graphql-tag'
import concat from 'lodash/concat'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XMFeedItemComment from '~/components/molecules/FeedItem/Comment'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import XMFeedItemCommentInput from '~/components/molecules/FeedItem/CommentInput'

export default {
  name: 'XMFeedItemComments',
  components: { XMFeedItemCommentInput, XOMyProfileAvatar, XMFeedItemComment, XAProfileAvatar },
  props: {
    item: Object,
  },
  data() {
    return {
      submitting: false,
      newComments: [],
    }
  },
  computed: {
    comments() {
      return concat(this.newComments, this.item?.Comments?.items || [])
    },
  },
  methods: {
    async onSubmitComment(content) {
      if (!this.submitting) {
        this.submitting = true
        try {
          const {
            data: {
              addComment: { timestamp, objectID: id },
            },
          } = await this.$apollo.mutate({
            context: this.getGraphQLContext(),
            variables: {
              id: this.item.id,
              content,
            },
            mutation: gql`
              mutation ($id: String!, $content: String!) {
                addComment(targetGetStreamActivityID: $id, content: $content) {
                  objectID
                  timestamp
                  success
                }
              }
            `,
          })
          const profile = await this.getMyDisplayProfile()
          this.newComments.push({
            id,
            actorType: this.currentBusinessID ? 'Business' : 'Member',
            Member: this.currentBusinessID ? null : profile,
            Business: this.currentBusinessID ? profile : null,
            content,
            timestamp,
            isLiked: false,
            Aggregates: {
              likes: 0,
            },
          })
          this.$emit('addComment')
        } catch (error) {
          this.doTrackSegmentError(error)
        } finally {
          this.submitting = false
        }
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.xm-feed-item-comments::v-deep
  > .content
    overflow: auto
    max-height: 316px
</style>
