<template lang="pug">
transition(name="fade")
  .xm-header-notification-list
    .header
      .back(@click.prevent="doCloseNotificationList()"): b-icon(icon="arrow-left")
      .close(@click.prevent="doCloseNotificationList()"): b-icon(icon="close")
      h3 Notifications
    simplebar.custom-scrollbar(data-simplebar-auto-hide="false")
      .new.list.py-5.px-3(v-if="notificationsNew.length > 0")
        ._title.mb-3 New
        template(v-for="(notification, index) in notificationsNew")
          XAHeaderNotificationItemGroup(
            v-if="notification.Profiles.length >= 3",
            :profiles="notification.Profiles",
            :notification="notification",
            :active-user="activeUser")
          XAHeaderNotificationItem(
            v-for="(profile, index) in notification.Profiles",
            :notification="notification",
            :profile="profile",
            :active-user="activeUser",
            :key="profile.id"
            v-else)
      .this-week.list.py-5.px-3(v-if="notificationsThisWeek.length > 0")
        ._title.mb-3 This Week
        template(v-for="(notification, index) in notificationsThisWeek")
          XAHeaderNotificationItemGroup(
            v-if="notification.Profiles.length >= 3",
            :profiles="notification.Profiles",
            :notification="notification",
            :active-user="activeUser")
          XAHeaderNotificationItem(
            v-for="(profile, index) in notification.Profiles",
            :notification="notification",
            :profile="profile",
            :active-user="activeUser",
            :key="profile.id"
            v-else)
      .earlier.list.py-5.px-3(v-if="notificationsEarlier.length > 0")
        ._title.mb-3 Earlier
        template(v-for="(notification, index) in notificationsEarlier")
          XAHeaderNotificationItemGroup(
            v-if="notification.Profiles.length >= 3",
            :profiles="notification.Profiles",
            :notification="notification",
            :active-user="activeUser")
          XAHeaderNotificationItem(
            v-for="(profile, index) in notification.Profiles",
            :notification="notification",
            :profile="profile",
            :active-user="activeUser",
            :key="profile.id"
            v-else)
</template>

<script>
import gql from 'graphql-tag'
import simplebar from 'simplebar-vue'
import moment from 'moment'
import XAHeaderNotificationItem from '~/components/atoms/Header/NotificationItem'
import XAHeaderNotificationItemGroup from '~/components/atoms/Header/NotificationItemGroup'
import 'simplebar/dist/simplebar.min.css'

const startOfWeek = moment().startOf('week').isoWeekday(7).toDate().getTime()
const endOfWeek = moment().endOf('week').isoWeekday(7).toDate().getTime()
const today = moment().add(-1, 'days')

export default {
  name: 'XMHeaderNotificationList',
  components: { XAHeaderNotificationItem, XAHeaderNotificationItemGroup, simplebar },
  computed: {
    activeUser() {
      return this.$parent?.activeUser || null
    },
    notifications() {
      return this.$parent?.notifications || null
    },
    notificationsNew() {
      const notificationsNew = this.notifications.filter((notification) => {
        return new Date(notification.timestamp) >= today
      })

      return notificationsNew
    },
    notificationsThisWeek() {
      const notificationsThisWeek = this.notifications.filter((notification) => {
        const notificationDate = new Date(notification.timestamp).getTime()
        return notificationDate <= endOfWeek && notificationDate >= startOfWeek && notificationDate <= today
      })

      return notificationsThisWeek
    },
    notificationsEarlier() {
      const notificationsEarlier = this.notifications.filter((notification) => {
        return new Date(notification.timestamp).getTime() <= startOfWeek
      })

      return notificationsEarlier
    },
  },
  async mounted() {
    await this.$root.$emit('notification/load')
    this.doMarkNotificationListSeen()
  },
  methods: {
    doCloseNotificationList() {
      this.$root.$emit('notification/close')
    },
    async doMarkNotificationListSeen() {
      try {
        await this.$apollo.mutate({
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation {
              markNotificationsSeen {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Notification')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-header-notification-list::v-deep {
  position: absolute;
  top: 45px;
  right: -48px;
  z-index: 5;
  background-color: $white;
  box-shadow: 0 2px 20px rgb(39 85 96 / 10%);
  padding: 0;
  width: 420px;

  &::after {
    bottom: 100%;
    right: 43px;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 15px;
    margin-left: -15px;
  }

  .header {
    padding: 10px 20px;
    position: relative;

    .back {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20px;
      display: none;
      flex-wrap: wrap;
      align-items: center;
    }

    .close {
      text-align: right;
      cursor: pointer;
    }

    h3 {
      font-size: 1.5714rem;
      line-height: 1.2;
    }
  }

  .list {
    &.new {
      background-color: #f8f8f8;
    }
  }

  .custom-scrollbar {
    max-height: calc(100vh - 300px);

    .simplebar-track {
      &.simplebar-vertical {
        width: 7px;
      }

      .simplebar-scrollbar {
        &::before {
          background-color: $primary;
          opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::after {
      content: none;
    }

    .header {
      padding: 15px 20px;
      min-height: 54px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      .back {
        display: flex;
      }

      .close {
        display: none;
      }

      h3 {
        text-align: center;
        font-size: 1rem;
        text-transform: uppercase;
      }
    }

    .custom-scrollbar {
      max-height: calc(100vh - 55px);
    }
  }
}
</style>
