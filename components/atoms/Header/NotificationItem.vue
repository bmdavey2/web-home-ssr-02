<template lang="pug">
nuxt-link.xa-header-notification-item(:to="notificationLink" @click.native="doMarkAsRead()")
  XAProfileAvatar(:image="profilePhotoURL", :label="initials" size="50px")
  .right-content
    .text(v-html="message")
    .timestamp(:class="kind === 'follow' && 'has-actions'"): timeago(:datetime="timestamp", :auto-update="60")
    .indicator: .dot(v-if="kind !== 'follow' && !isRead")
  .actions(v-if="kind === 'follow'")
    b-button.is-following(
      size="is-small"
      icon-left="check",
      :loading="isSubmitting"
      v-if="isFollowing"
      @click.prevent="doToggleFollow()") Following
    b-button.is-secondary(size="is-small" outlined, :loading="isSubmitting" v-else @click.prevent="doToggleFollow()") Follow
    .indicator: .dot(v-if="!isRead")
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XAHeaderNotificationItem',
  components: { XAProfileAvatar },
  props: {
    profile: Object,
    notification: Object,
    activeUser: Object,
  },
  data() {
    return {
      isFollowing: this.profile?.[this.profile?.objectType]?.isFollowed || false,
      isSubmitting: false,
    }
  },
  computed: {
    activeUserProfileName() {
      return this.activeUser?.Member?.name || this.activeUser?.Business?.name || null
    },
    profileNotification() {
      return this.profile?.Member || this.profile?.Business || null
    },
    profilePhotoURL() {
      return this.profileNotification?.profilePhotoURL || null
    },
    name() {
      return this.profileNotification?.name || 'ActivePlace Member'
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    kind() {
      return this.notification?.kind || null
    },
    objectType() {
      return this.notification?.objectType || null
    },
    actorType() {
      return this.profile?.objectType || null
    },
    profileSlug() {
      return this.profile?.[this.actorType]?.slug || null
    },
    profileLink() {
      switch (this.actorType) {
        case 'Member':
          return `/p/${this.profileSlug}`
        case 'Business':
          return `/b/${this.profileSlug}`
        default:
          return '/'
      }
    },
    objectSlug() {
      return this.notification?.[this.objectType]?.slug || this.notification?.[this.objectType]?.id || null
    },
    objectLink() {
      switch (this.objectType) {
        case 'Update':
          return `/u/${this.objectSlug}`
        case 'Article':
          return `/a/${this.objectSlug}`
        case 'Achievement':
          return `/achievement/${this.objectSlug}`
        default:
          return ''
      }
    },
    notificationLink() {
      switch (this.kind) {
        case 'follow':
          return this.profileLink
        default:
          return this.objectLink
      }
    },
    notificationText() {
      switch (this.kind) {
        case 'follow':
          return `<span class="name">${this.name}</span> started following you on ActivePlace`
        case 'save':
          return `Hey <span class="name">${this.activeUserProfileName}</span> your article was saved by <span class="name">${this.name}</span>`
        case 'tag':
          if (this.objectType === 'Update')
            return `<span class="name">${this.name}</span> just tagged you in their update`
          if (this.objectType === 'Article')
            return `<span class="name">${this.name}</span> just tagged you in their article`
          if (this.objectType === 'Achievement')
            return `<span class="name">${this.name}</span> just tagged you in their achievement`
          break
        case 'highFive':
          if (this.objectType === 'Update') return 'Snap! You just received a high five on your update'
          if (this.objectType === 'Article') return 'Snap! You just received a high five on your article'
          if (this.objectType === 'Achievement') return 'Snap! You just received a high five on your achievement'
          break
        case 'comment':
          if (this.objectType === 'Update')
            return `Hey <span class="name">${this.activeUserProfileName}</span> you received a comment on your update`
          if (this.objectType === 'Article')
            return `Hey <span class="name">${this.activeUserProfileName}</span> you received a comment on your article`
          if (this.objectType === 'Achievement')
            return `Hey <span class="name">${this.activeUserProfileName}</span> you received a comment on your achievement`
          break
        default:
          return ''
      }
      return ''
    },
    message() {
      return this.notification?.message || null
    },
    timestamp() {
      return this.notification?.timestamp || new Date().getTime()
    },
    isRead() {
      return this.notification?.isRead || false
    },
  },
  methods: {
    async doToggleFollow() {
      if (this.getFollowLimit(this.isFollowing)) return
      this.isSubmitting = true
      try {
        const MemberID = this.actorType === 'Member' ? this.profileNotification?.id : undefined
        const BusinessID = this.actorType === 'Business' ? this.profileNotification?.id : undefined

        this.isFollowing
          ? await this.$api.unfollow({ MemberID, BusinessID }, { 'X-ActivePlace-Placement': 'notifications' })
          : await this.$api.follow({ MemberID, BusinessID }, { 'X-ActivePlace-Placement': 'notifications' })
      } catch (error) {
        this.doTrackSegmentError(error, 'Notification')
      } finally {
        this.isSubmitting = false
        this.isFollowing = !this.isFollowing
      }
    },
    async doMarkAsRead() {
      if (this.notification?.isRead) return
      try {
        await this.$api.markNotificationsRead({ id: this.notification?.id })
      } catch (error) {
        this.doTrackSegmentError(error, 'Notification')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-header-notification-item::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
  color: inherit;
  font-weight: 300;

  .right-content {
    flex: 10000 1 0;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .text {
      flex: 10000 1 0;
      padding-right: 10px;

      .name {
        font-weight: 400;
        color: $secondary;
      }
    }

    .timestamp {
      font-size: 0.8571rem;
      color: #aab2c2;
      font-weight: 300;

      &.has-actions {
        width: 100%;
      }
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    button {
      border-radius: 5px;
      height: 25px;
      transition: 0.3s;

      &.is-following {
        background-color: #eef1f1;
        color: $secondary;
        border-color: transparent;
        box-shadow: none;
      }
    }
  }

  .indicator {
    width: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;

    .dot {
      width: 10px;
      height: 10px;
      background-color: $danger;
      border-radius: 50%;
    }
  }
}
</style>
