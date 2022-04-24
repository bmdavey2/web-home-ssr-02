<template lang="pug">
.xm-header-notification-button
  .icon(@click.prevent="doShowNotificationList()")
    template(v-if="!hasNewNotifications")
      .count
      img(src="~/assets/images/v2/Layouts/notifications.svg" alt="New Notifications" width="21" height="21")
    template(v-else)
      img(src="~assets/images/Header/notifications-outline.svg" alt="Notifications" width="21" height="21")
  template(v-if="showNotificationList")
    XMHeaderNotificationList(v-if="notifications.length > 0")
    .no-notifications(v-else)
      img(src="~assets/icons/light/notifications-outline-sm.svg" alt="No Notifications" width="21" height="21")
      | No notifications yet.
</template>

<script>
import gql from 'graphql-tag'
import XMHeaderNotificationList from '~/components/molecules/Header/NotificationList'

export default {
  name: 'XMHeaderNotificationButton',
  components: { XMHeaderNotificationList },
  data() {
    return {
      notifications: [],
      activeUser: null,
      showNotificationList: false,
      hasNewNotifications: true,
    }
  },
  watch: {
    async $route() {
      this.showNotificationList = false
      await this.doRetrieveNotifications()
      this.doCheckNotifications()
    },
    currentBusinessID() {
      this.doRetrieveNotifications()
    },
  },
  async mounted() {
    await this.doRetrieveNotifications()
    this.doCheckNotifications()
    this.$root.$on('notification/show', this.doShowNotificationList)
    this.$root.$on('notification/close', this.doCloseNotificationList)
    this.$root.$on('notification/load', this.doRetrieveNotifications)
  },
  methods: {
    async doRetrieveNotifications() {
      if (!this.isLoggedIn) return
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          context: this.getGraphQLContext(),
          query: gql`
            query {
              Me {
                Notifications(count: 20) {
                  count
                  next
                  items {
                    id
                    isRead
                    isSeen
                    kind
                    objectID
                    objectType
                    timestamp
                    message
                    Profiles {
                      objectID
                      objectType
                      Business {
                        id
                        name
                        slug
                        profilePhotoURL
                        isFollowed
                      }
                      Member {
                        id
                        name
                        slug
                        profilePhotoURL
                        isFollowed
                      }
                    }
                    Update {
                      id
                      slug
                    }
                    Article {
                      id
                      slug
                    }
                  }
                }
                Profile {
                  Business {
                    name
                    slug
                  }
                  Member {
                    name
                    slug
                  }
                }
              }
            }
          `,
        })
        this.notifications = data?.Me?.Notifications?.items
        this.activeUser = data?.Me?.Profile
      } catch (error) {
        this.doTrackSegmentError(error, 'Notification')
      }
    },
    doShowNotificationList() {
      this.hasNewNotifications = true
      this.showNotificationList = !this.showNotificationList
    },
    doCloseNotificationList() {
      this.showNotificationList = false
    },
    doCheckNotifications() {
      if (this.notifications.length <= 0) return
      const isSeen = this.notifications.map((object) => {
        return object.isSeen
      })

      this.hasNewNotifications = isSeen.every(Boolean)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-header-notification-button::v-deep {
  position: relative;
  display: flex;

  > .icon {
    cursor: pointer;
    position: relative;

    .count {
      background-color: $primary;
      color: $white;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      right: -3px;
      border: 1px solid $white;
      font-size: 11px;
      width: 15px;
      height: 15px;
    }
  }

  .no-notifications {
    background-color: $secondary;
    color: $white;
    border-radius: 5px;
    padding: 5px 10px;
    width: 180px;
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 2;

    img {
      margin-right: 5px;
    }
  }

  // @media screen and (max-width: 1023px) {
  //   > .icon {
  //     display: none;
  //   }

  //   .no-notifications {
  //     display: none;
  //   }
  // }
}
</style>
