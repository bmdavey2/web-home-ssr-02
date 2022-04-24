<template lang="pug">
.xo-profile-follow-button
  b-button(:size="size" @click="toggleFollow", :class="{ active: isFollowed }")
    .flex.align-center
      template(v-if="isFollowed")
        b-icon(icon="check" size="is-small")
        span Following
      span(v-else) Follow
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XOProfileFollowButton',
  props: {
    value: Object,
    size: String,
  },
  data() {
    return {
      isFollowed: this.value?.objectType
        ? this.value[this.value.objectType]?.isFollowed || this.value?.isFollowed || false
        : false,
    }
  },
  computed: {
    profile() {
      if (!this.value?.objectType) return null
      return this.value[this.value.objectType]
    },
    wasFollowed() {
      return this.profile?.isFollowed || this.value?.isFollowed || false
    },
  },
  watch: {
    wasFollowed: {
      initial: true,
      handler(value) {
        this.isFollowed = value
      },
    },
  },
  methods: {
    async toggleFollow() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.getFollowLimit(this.isFollowed)) return
      let placement
      switch (this.$route.name) {
        case 'my-feed':
          placement = 'my_feed'
          break
        case 'trending':
          placement = 'trending_feed'
          break
        case 'p-slug':
          placement = 'profile'
          break
        case 'b-slug':
          placement = 'profile'
          break
        case 'u-slug':
          placement = 'single_update'
          break
        default:
          break
      }
      this.isFollowed = !this.isFollowed
      try {
        const profileID = this.profile?.id || this.value?.id

        await this.$apollo.mutate({
          variables: {
            MemberID: this.value.objectType === 'Member' ? profileID : undefined,
            BusinessID: this.value.objectType === 'Business' ? profileID : undefined,
          },
          context: this.getGraphQLContext(placement),
          mutation: this.isFollowed
            ? gql`
                mutation ($MemberID: String, $BusinessID: String) {
                  follow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
                    success
                  }
                }
              `
            : gql`
                mutation ($MemberID: String, $BusinessID: String) {
                  unfollow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
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
.xo-profile-follow-button::v-deep
  button
    border-radius: 6px
    transition: all .25s
    box-shadow: none !important

    &:focus
      border-color: #dbdbdb

    &.active
      background-color: #EEF1F1
      color: #0c353e
</style>
