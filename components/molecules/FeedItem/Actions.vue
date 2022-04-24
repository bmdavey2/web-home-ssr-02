<template lang="pug">
.xm-feed-item-actions.is-user-select-none
  .separator.my-2(:class="{ loading: !item }")
  .actions
    template(v-if="item")
      .action.flex-center.is-cursor-pointer.px-2.py-1(@click="$emit('highfive')")
        template(v-if="item")
          img(v-if="highFived" src="~assets/icons/highfive.svg")
          img(v-else src="~assets/icons/highfive-outline.svg")
          span.ml-2 High Five
    template(v-else)
      div: b-skeleton(width="80" height="24")
    template(v-if="item")
      .action.flex-center.is-cursor-pointer.px-2.py-1(@click="$emit('comment')")
        img(v-if="commentsVisible" src="~assets/icons/comment.svg")
        img(v-else src="~assets/icons/comment-outline.svg")
        span.ml-2 Comment
    template(v-else)
      div: b-skeleton(width="80" height="24")
    template(v-if="item")
      .action.flex-center.is-cursor-pointer.px-2.py-1(
        v-if="item.objectType === 'Article'"
        @click.prevent="doShowShareTo()")
        img(src="~assets/icons/share.svg")
        span.ml-2 Share
    template(v-else)
      div: b-skeleton(width="80" height="24")
</template>

<script>
import XPShareTo from '~/components/pages/ShareTo'

export default {
  name: 'XMFeedItemActions',
  props: {
    item: Object,
    highFived: Boolean,
    commentsVisible: Boolean,
  },
  methods: {
    doShowShareTo() {
      let userId, groupId
      if (this.isLoggedIn) {
        if (this.currentBusinessID) {
          groupId = this.currentBusinessID
        } else {
          userId = this.$store.state.auth?.uid
        }
      }
      const details = {
        id: this.item?.Article?.id,
        slug: this.item?.Article?.slug,
        title: this.item?.Article?.title,
        userId,
        groupId,
      }
      this.$appClient.segment.trackArticleShareClick(details)
      this.$buefy.modal.open({
        parent: this,
        component: XPShareTo,
        width: 500,
        canCancel: false,
        props: {
          details: this.item?.Article,
          type: 'Article',
        },
      })
    },
  },
}
</script>

<style lang="sass" scoped>
.xm-feed-item-actions::v-deep
  .separator
    height: 1px
    background: #333
    &.loading
      background: #ddd

  .actions
    display: flex
    justify-content: space-evenly
    align-items: center
    font-size: smaller
</style>
