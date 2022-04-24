<template lang="pug">
nuxt-link.xa-header-notification-item-group(:to="notificationLink" @click.native="doMarkAsRead()")
  XAProfileAvatarGroup(:profiles="profiles", :size="50")
  .right-content
    .text {{ message }}
    .timestamp: timeago(:datetime="timestamp", :auto-update="60")
    .indicator: .dot(v-if="!isRead")
</template>

<script>
import XAProfileAvatarGroup from '~/components/atoms/ProfileAvatarGroup'

export default {
  name: 'XAHeaderNotificationItemGroup',
  components: { XAProfileAvatarGroup },
  props: {
    profiles: Array,
    notification: Object,
    activeUser: Object,
  },
  computed: {
    activeUserLink() {
      if (this.activeUser?.Member) return `/p/${this.activeUser?.Member?.slug}`
      if (this.activeUser?.Business) return `/b/${this.activeUser?.Business?.slug}`
      return ''
    },
    kind() {
      return this.notification?.kind || null
    },
    objectType() {
      return this.notification?.objectType || null
    },
    timestamp() {
      return this.notification?.timestamp || new Date()
    },
    objectSlug() {
      return this.notification?.[this.objectType]?.slug || this.notification?.[this.objectType]?.id || ''
    },
    isRead() {
      return this.notification?.isRead || false
    },
    notificationText() {
      switch (this.kind) {
        case 'follow':
          return 'Wow your getting plenty of followers'
        case 'save':
          return 'Winning, your article is getting plenty of saves'
        case 'tag':
          if (this.objectType === 'Comment') return `Clean sweep. You're getting mentioned on ActivePlace`
          break
        case 'highFive':
          if (this.objectType === 'Update') return 'Wow, your update is getting plenty of high fives.'
          if (this.objectType === 'Article') return 'Winning, your article is getting plenty of love and high fives'
          if (this.objectType === 'Achievement') return 'Wow, your achievement is getting plenty of high fives.'
          break
        case 'comment':
          if (this.objectType === 'Update') return 'Clean sweep. Your update is getting plenty of comments.'
          if (this.objectType === 'Article') return 'Clean sweep. Your article is getting plenty of comments.'
          if (this.objectType === 'Achievement') return 'Clean sweep. Your achievement is getting plenty of comments.'
          break
        default:
          return ''
      }
      return ''
    },
    message() {
      return this.notification?.message || null
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
          return '/'
      }
    },
    notificationLink() {
      switch (this.kind) {
        case 'follow':
          return this.activeUserLink

        case 'like':
          return this.objectLink

        case 'tag':
          return this.objectLink

        case 'comment':
          return this.objectLink

        case 'save':
          return this.objectLink

        default:
          return '/'
      }
    },
  },
  methods: {
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
.xa-header-notification-item-group::v-deep {
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
