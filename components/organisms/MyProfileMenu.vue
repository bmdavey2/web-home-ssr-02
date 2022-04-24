<template lang="pug">
.xo-my-profile-menu.is-user-select-none
  .header.p-5
    XOMainFeedMyProfileMenuBusinessItem(
      v-if="currentBusiness",
      :value="currentBusiness",
      :role="currentRole"
      show-email)
    XOMainFeedMyProfileMenuMemberItem(@DoRetrieveProfile="mainUser = $event" v-else)
    b-dropdown-item.close: img(src="~assets/images/Header/menu-burger-open.svg")
  .contents
    .businesses.p-5
      b-dropdown-item.no-padding(v-if="currentBusiness" @click="onClickSelf")
        XOMainFeedMyProfileMenuMemberItem.menu-item.is-cursor-pointer(@DoRetrieveProfile="mainUser = $event")

      template(v-for="{ Business: business, role } in businesses")
        b-dropdown-item.no-padding(
          v-if="business.id !== $store.state.app.currentBusiness",
          :key="business.id"
          @click="onClickBusiness(business); setMedalActiveTab('about')")
          XOMainFeedMyProfileMenuBusinessItem.menu-item(:value="business", :role="role")

      b-dropdown-item(has-link)
        nuxt-link(:to="addBusinessLink" @click.native="setSignupIsNewUser(false)") #[b-icon.mr-5(icon="plus")] #[span Add Business]

    .navigation
      .content-links.p-5
        b-dropdown-item(has-link)
          nuxt-link(to="/my-feed")
            span._icon.mr-5: img(src="~assets/images/Header/home.svg" width="12" height="12")
            span._label My Feed
        //- b-dropdown-item(has-link)
          nuxt-link(to="/trending")
            span._icon.mr-5: img(src="~assets/images/Header/trending.svg" width="12" height="12")
            span._label Trending
        b-dropdown-item(has-link)
          nuxt-link(to="/articles")
            span._icon.mr-5: img(src="~assets/images/Header/discover.svg" width="12" height="12")
            span._label Articles
        b-dropdown-item(has-link)
          nuxt-link(to="/marketplace")
            span._icon.mr-5: img(src="~assets/icons/navigation/active-marketplace.webp" width="12" height="12")
            span._label Find Events

      .user-links.p-5
        b-dropdown-item(has-link)
          nuxt-link(:to="profileLink" @click.native="setMedalActiveTab('about')")
            span._icon.mr-5: img(src="~assets/images/Header/account-outline-sm.svg" width="12" height="12")
            span._label My Profile

        b-dropdown-item.link-articles(has-link)
          nuxt-link(to="/me/articles")
            span._icon.mr-5: img(src="~assets/images/Header/article-outline-sm.svg" width="12" height="12")
            span._label My Articles

        b-dropdown-item.link-products(has-link v-if="showBusinessLink")
          nuxt-link(to="/me/products")
            span._icon.mr-5: img(src="~assets/images/Header/article-outline-sm.svg" width="12" height="12")
            span._label My Products

        b-dropdown-item.link-products(has-link v-if="showBusinessLink")
          nuxt-link(to="/me/subscription-plan")
            span._icon.mr-5: img(src="~assets/images/Header/article-outline-sm.svg" width="12" height="12")
            span._label My Subscription

        b-dropdown-item.mt-3(has-link)
          nuxt-link(to="/community-interests")
            span._icon.mr-5: img(src="~assets/icons/navigation/active-community-interests.webp" width="12" height="12")
            span._label Community Interests

        b-dropdown-item.link-notifications(@click="doShowNotificationList()")
          span._icon.mr-5: img(src="~assets/images/Header/notifications-outline-sm.svg" width="12" height="12")
          span._label Notifications
          .count(v-if="!hasNewNotifications")

        b-dropdown-item.mt-3(has-link v-if="showBusinessLink")
          nuxt-link(to="/team")
            span._icon.mr-5: img(src="~assets/images/Header/team.svg" width="12" height="12")
            span._label Team

        b-dropdown-item.link-logout(@click="onClickLogOut")
          ._icon.mr-5: img(src="~assets/images/Header/logout-outline.svg")
          ._label Logout

    .logout.p-5
      b-dropdown-item(@click="onClickLogOut")
        ._icon.mr-5: img(src="~assets/images/Header/logout-outline.svg")
        ._label Logout

    .bottom-links.p-5
      b-dropdown-item.mr-5.mb-3(has-link)
        nuxt-link(to="/businesses") Businesses
      //- b-dropdown-item.mr-5.mb-3(has-link)
        nuxt-link(to="/mentors") Mentors
      //- b-dropdown-item.mr-5.mb-3(has-link)
        nuxt-link(to="/about") About
      //- b-dropdown-item.mr-5.mb-3(has-link)
        nuxt-link(to="/faq") FAQ
      b-dropdown-item.mr-5.mb-3(has-link)
        nuxt-link(to="/contact") Contact Us
      b-dropdown-item.mr-5.mb-3(has-link)
        nuxt-link(to="/privacy") Privacy
      b-dropdown-item.mr-5.mb-3(has-link)
        nuxt-link(to="/terms-conditions") Terms
</template>

<script>
import gql from 'graphql-tag'
import find from 'lodash/find'
import { mapGetters, mapActions } from 'vuex'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XOMainFeedMyProfileMenuMemberItem from '~/components/organisms/MyProfileMenu/MemberItem'
import XOMainFeedMyProfileMenuBusinessItem from '~/components/organisms/MyProfileMenu/BusinessItem'
import XDLogIn from '~/components/pages/LogIn'

export default {
  name: 'XOMyProfileMenu',
  components: { XOMainFeedMyProfileMenuBusinessItem, XOMainFeedMyProfileMenuMemberItem, XAProfileAvatar },
  data() {
    return {
      businessID: null,
      mainUser: null,
      businessLink: null,
      hasNewNotifications: false,
      notifications: [],
      showBusinessLink: false,
    }
  },
  computed: {
    ...mapGetters({
      getUserOwnerDetails: 'user/getUserOwnerDetails',
    }),
    currentBusinessRole() {
      const id = this.$store.state.app.currentBusiness
      return find(this.businesses || [], (x) => x.Business.id === id)
    },
    currentBusiness() {
      return this.currentBusinessRole?.Business
    },
    currentRole() {
      return this.currentBusinessRole?.role
    },
    profileLink() {
      if (this.businessLink) return `/b/${this.businessLink}`
      return `/p/${this.mainUser?.slug || this.getUserOwnerDetails?.slug}`
    },
    addBusinessLink() {
      // return '/signup/business'
      return this.currentBusinessID ? '/signup/business' : '/businesses/plans-pricing'
    },
  },
  watch: {
    async $route() {
      await this.doRetrieveNotifications()
      this.doCheckNotifications()
    },
    currentBusinessID: {
      deep: true,
      handler(value) {
        this.doRetrieveBusinessLink()
        this.doRetrieveNotifications()

        if (value) {
          this.showBusinessLink = true
          return
        }
        this.showBusinessLink = false
      },
    },
  },
  async mounted() {
    this.doRetrieveBusinessLink()
    await this.doRetrieveNotifications()
    this.doCheckNotifications()

    if (this.currentBusinessID) {
      this.showBusinessLink = true
    }
  },
  methods: {
    ...mapActions({
      setSignupIsNewUser: 'signup/setSignupIsNewUser',
      setMedalActiveTab: 'medals/setMedalActiveTab',
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
    }),
    onClickSelf() {
      if (this.$route.name === 'my-feed') {
        this.$store.commit('app/setSelectedCategory', null)
        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: true,
        })
      }
      this.$store.commit('app/setCurrentBusiness', null)
      this.$root.$emit('reload')

      if (['p-slug', 'b-slug', 'p-profile-edit', 'b-profile-edit'].includes(this.$route.name)) {
        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: true,
        })
        this.$router.push({
          path: `/p/${this.mainUser?.slug}`,
        })
      }

      if (this.$route?.name === 'team') {
        this.$router.push({
          path: `/p/${this.mainUser?.slug}`,
        })
      }
    },
    onClickBusiness(business) {
      if (this.$route.name === 'my-feed') {
        this.$store.commit('app/setSelectedCategory', null)
        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: true,
        })
      }

      if (this.$route.name === 'team') {
        this.$root.$emit('team/member/retrieve', business?.id)
        this.$root.$emit('team/change/business', business)
      }

      this.$store.commit('app/setCurrentBusiness', business.id)
      this.$root.$emit('reload')

      if (['p-slug', 'b-slug', 'p-profile-edit', 'b-profile-edit'].includes(this.$route.name)) {
        if (this.$route.params?.slug === business.slug) return
        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: true,
        })
        this.$router.push({
          path: `/b/${business.slug}`,
        })
      }
    },
    async onClickLogOut() {
      const loader = this.$buefy.loading.open({
        container: this.$refs.Step2Container,
      })

      await this.$store.dispatch('auth/logOut')
      this.$router.push({
        path: '/',
      })

      loader.close()
    },
    clickSignIn() {
      this.$buefy.modal.open({
        parent: this,
        component: XDLogIn,
      })
    },
    doShowNotificationList() {
      this.hasNewNotifications = true
      this.$root.$emit('notification/show')
    },
    async doRetrieveBusinessLink() {
      if (this.currentBusinessID === null) {
        this.businessLink = null
        return
      }
      try {
        const {
          Business: { slug },
        } = await this.$api.getBusinessProfile({ id: this.currentBusinessID })
        this.businessLink = slug
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
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
        this.doTrackSegmentError(error)
      }
    },
    doCheckNotifications() {
      if (this.notifications.length <= 0) return
      const isSeen = this.notifications.map((object) => {
        return object.isSeen
      })

      this.hasNewNotifications = isSeen.every(Boolean)
    },
  },
  apollo: {
    businesses: {
      prefetch: false,
      skip() {
        return !this.isLoggedIn
      },
      query: gql`
        query {
          Me {
            BusinessRoles {
              Business {
                id
                slug
                profilePhotoURL
                name
                email
                plan
              }
              role
            }
          }
        }
      `,
      update: (data) => data.Me.BusinessRoles,
    },
    profile: {
      prefetch: false,
      skip() {
        return !this.isLoggedIn
      },
      query: gql`
        query {
          Me {
            Profile {
              objectType
              Member {
                slug
              }
              Business {
                slug
              }
            }
          }
        }
      `,
      update(data) {
        if (!data.Me?.Profile) return {}
        const object = data.Me.Profile[data.Me.Profile.objectType]
        return {
          slug: object?.slug,
          objectType: data.Me.Profile?.objectType,
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-my-profile-menu::v-deep {
  width: 375px;

  @include max-width(767px) {
    overflow-y: auto;
    height: 100%;
  }

  .header {
    border-bottom: 1px solid;
    border-color: #65676b;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    justify-content: space-between;

    .close {
      display: none;
      padding: 0;
      width: auto;
    }
  }

  .contents {
    a {
      padding: 0;
      color: inherit;
    }

    a:hover {
      background-color: transparent;
    }

    .logout {
      a {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    .bottom-links {
      display: none;

      a {
        font-size: 12px;
      }
    }

    .businesses {
      border-bottom: 1px solid #65676b;
      max-height: 399px;
      overflow-y: auto;

      @include max-width(767px) {
        max-height: none;
      }

      .dropdown-item {
        margin-bottom: 15px;
      }

      .has-link {
        a {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          text-transform: uppercase;
          font-size: 14px;

          .icon {
            background-color: $white;
            box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }
      }
    }

    .navigation {
      ._icon {
        background-color: $white;
        box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }

      .has-link {
        a {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 15px;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 500;
        }

        &.link-articles {
          a {
            margin-bottom: 0;
          }
        }

        &.link-products {
          a {
            margin-top: 15px;
          }
        }
      }

      .dropdown-item {
        margin-bottom: 15px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 500;

        &.link-notifications {
          display: none;

          .count {
            background-color: $primary;
            color: $white;
            border-radius: 50%;
            font-size: 11px;
            width: 12px;
            height: 12px;
            align-self: flex-start;
            margin-left: 3px;
          }
        }
      }

      .content-links {
        display: none;
        border-bottom: 1px solid #65676b;

        .action-link {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          font-size: 14px;
          margin-bottom: 15px;
          text-transform: uppercase;
          font-weight: 500;
        }
      }

      .user-links {
        border-bottom: 1px solid #65676b;

        .link-logout {
          display: none;

          ._icon {
            box-shadow: none;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    position: fixed;
    top: 0;
    right: 0;
    background-color: $white;
    width: 100%;

    .header {
      .close {
        display: block;
      }
    }

    .contents {
      .navigation {
        .has-link {
          &.link-articles {
            margin-bottom: 15px;
          }
        }

        .dropdown-item {
          &.link-notifications {
            display: flex;
          }
        }

        .content-links {
          display: block;

          .has-link {
            &:last-child {
              a {
                margin-bottom: 0;
              }
            }
          }
        }

        .user-links {
          .link-logout {
            margin-bottom: 0;
            display: flex;
          }
        }
      }

      .bottom-links {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

      .logout {
        display: none;
      }
    }
  }
}
</style>
