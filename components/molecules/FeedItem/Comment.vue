<template lang="pug">
.xm-feed-item-comment.mb-4
  .flex.mb-2
    .flex-auto.py-2.pr-2
      XAProfileAvatar.is-cursor-pointer(:image="image", :label="initials" size="32px")
    .flex-grow.flex
      .content-container.py-2.px-3
        .flex.align-center.is-cursor-pointer.is-user-select-none
          .name {{ name }}
          b-icon(icon="circle-small")
          .time-ago {{ timeAgo }}
        .content.no-margin(v-html="content" v-linkified)
        .high-five.is-user-select-none.flex-center.is-cursor-pointer.px-2.py-1(@click="onHighFive")
          img(v-if="highFived" src="~assets/icons/highfive.svg")
          img(v-else src="~assets/icons/highfive-outline.svg")
          span.ml-1(v-show="highFives > 0") {{ highFives }}
</template>

<script>
import moment from 'moment'
import gql from 'graphql-tag'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
export default {
  name: 'XMFeedItemComment',
  components: { XAProfileAvatar },
  props: {
    value: Object,
  },
  data() {
    return {
      highFived: this.value?.isLiked || false,
      addHighFives: 0,
    }
  },
  computed: {
    profile() {
      if (!this.value?.actorType) return null
      return this.value[this.value?.actorType]
    },
    image() {
      return this.profile?.profilePhotoURL
    },
    name() {
      return this.profile?.name ? this.profile?.name.replace(/&amp;/g, '&') : ''
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    content() {
      return this.value?.content || ''
    },
    timeAgo() {
      if (!this.value?.timestamp) return ''
      return moment(this.value?.timestamp).fromNow()
    },
    highFives() {
      return (this.value?.Aggregates?.likes || 0) + this.addHighFives
    },
    wasHighFived() {
      return this.value?.isLiked || false
    },
  },
  watch: {
    wasHighFived(value) {
      this.highFived = value
    },
  },
  methods: {
    async onHighFive() {
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
            id: this.value.id,
          },
          context: this.getGraphQLContext(),
          mutation: this.highFived
            ? gql`
                mutation ($id: String!) {
                  like(CommentID: $id) {
                    success
                  }
                }
              `
            : gql`
                mutation ($id: String!) {
                  unlike(CommentID: $id) {
                    success
                  }
                }
              `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.xm-feed-item-comment::v-deep
  .content-container
    position: relative
    background-color: #F8F8F8
    border-radius: 12px
    .content
      font-weight: 300
      font-size: 13px
  .name
    font-size: 12px
    font-weight: bold
  .time-ago
    font-size: 11px
  .high-five
    position: absolute
    right: 0
    box-shadow: 0 0 6px rgba(0, 0, 0, .15)
    border-radius: 33%
    z-index: 1
    margin-right: 6px
    margin-top: -4px
    font-size: 11px
</style>
