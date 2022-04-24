<template lang="pug">
b-dropdown.xm-feed-item-menu(position="is-bottom-left" aria-role="menu", :disabled="!item", :mobile-modal="false")
  template(#trigger)
    b-icon.button-icon.is-cursor-pointer(icon="dots-vertical")
  template(v-if="isMe")
    template(v-if="isUpdate")
      b-dropdown-item(aria-role="menu-item" @click="doShowEditUpdateModal()")
        .menu-item Edit
      b-dropdown-item(aria-role="menu-item" has-link)
        nuxt-link.menu-item(:to="itemLink") See update permalink
    b-dropdown-item(v-if="objectType === 'Article'" aria-role="menu-item" has-link)
      nuxt-link.menu-item(:to="`/me/articles/published/${articleID}`") Edit
    b-dropdown-item(aria-role="menu-item" @click="doShowDeletePostModal()")
      .menu-item Delete
  template(v-else)
    b-dropdown-item(aria-role="menu-item")
      .menu-item.isFollowed(v-if="isFollowed" @click="toggleFollow")
        .flex.align-center
          b-icon.mr-1(icon="check" size="is-small")
          span FOLLOWING
      .menu-item(v-else @click="toggleFollow") FOLLOW
    hr.my-2
    b-dropdown-item(aria-role="menu-item" @click="clickHideAllPosts")
      .menu-item Hide all posts from this Profile
    b-dropdown-item(v-if="isUpdate" aria-role="menu-item" has-link)
      nuxt-link.menu-item(:to="itemLink") See update permalink
    b-dropdown-item(aria-role="menu-item" @click="clickReportContent")
      .menu-item Report this Content
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XMFeedItemMenu',
  props: {
    item: Object,
  },
  data() {
    return {
      isFollowed: this.wasFollowed,
      currentProfile: null,
    }
  },
  computed: {
    actorType() {
      return this.item?.actorType
    },
    actor() {
      if (!this.item) return
      return this.item[this.actorType]
    },
    isUpdate() {
      return this.item?.objectType === 'Update' || this.item?.objectType === 'Achievement'
    },
    wasFollowed() {
      return this.actor?.isFollowed || false
    },
    isMe() {
      return this.currentProfile?.id === this.actor?.id
    },
    itemLink() {
      const link = this.item?.Update?.slug
      const AchievementLink = this.item?.Achievement?.id
      if (link) {
        return `/u/${link}`
      } else if (AchievementLink) {
        return `/achievement/${AchievementLink}`
      } else {
        return '/'
      }
    },
    objectType() {
      return this.item?.objectType || null
    },
    articleID() {
      return this.item?.Article?.id || null
    },
  },
  watch: {
    wasFollowed(value) {
      this.isFollowed = value
    },
    item() {
      this.getCurrentProfile()
    },
  },
  async mounted() {
    this.isFollowed = this.item?.[this.item?.actorType]?.isFollowed
    await this.getCurrentProfile()
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
        case 'b-slug':
          placement = 'profile'
          break
        case 'p-slug':
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
        await this.$apollo.mutate({
          variables: {
            MemberID: this.actorType === 'Member' ? this.actor?.id : undefined,
            BusinessID: this.actorType === 'Business' ? this.actor?.id : undefined,
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
    async clickHideAllPosts() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      const loading = this.$buefy.loading.open()
      try {
        await this.$apollo.mutate({
          variables: {
            MemberID: this.actorType === 'Member' ? this.actor?.id : undefined,
            BusinessID: this.actorType === 'Business' ? this.actor?.id : undefined,
          },
          mutation: gql`
            mutation ($MemberID: String, $BusinessID: String) {
              hide(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
                success
              }
            }
          `,
        })
        this.$root.$emit('reload')
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        loading.close()
      }
    },
    clickPermalink() {
      const link = this.item?.Update?.slug
      const AchievementLink = this.item?.Achievement?.id
      if (link) {
        this.$router.push(`/u/${link}`)
      } else if (AchievementLink) {
        this.$router.push(`/achievement/${AchievementLink}`)
      } else {
        // TODO: show error
      }
    },
    clickReportContent() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      const details = {
        GetStreamActivityID: this.item?.id,
        objectID: this.actor?.id,
        objectType: this.actorType,
        name: this.actor?.name,
      }
      const fullScreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: () => import('~/components/pages/ReportContent'),
        width: 600,
        fullScreen,
        canCancel: !fullScreen,
        props: {
          details,
          fullScreen,
        },
      })
    },
    async getCurrentProfile() {
      this.currentProfile = await this.getMyDisplayProfile()
    },
    doShowDeletePostModal() {
      this.$buefy.modal.open({
        component: require('~/components/molecules/FeedItem/DeleteDialog').default,
        parent: this,
        width: 500,
        canCancel: false,
        props: {
          details: this.item,
        },
      })
    },
    doShowEditUpdateModal() {
      const fullscreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/pages/EditUpdate').default,
        width: 600,
        canCancel: !fullscreen,
        fullScreen: fullscreen,
        props: {
          isFullscreen: fullscreen,
          details: this.item,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-feed-item-menu::v-deep {
  .dropdown-trigger {
    .button-icon {
      background-color: transparent;
    }
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #e5e5e5;
  }

  .menu-item {
    font-size: 0.8571rem;
    color: inherit;

    &::before {
      content: '○';
      margin-right: 5px;
      color: #0c353e;
    }
  }
  .isFollowed {
    &::before {
      content: none;
    }
  }
}
</style>
