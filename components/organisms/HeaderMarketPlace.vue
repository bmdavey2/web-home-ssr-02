<template lang="pug">
.xo-header-marketplace.is-user-select-none
  .header-message.py-2.is-hidden-mobile Together we're building the world's healthiest social network

  .box.desktop.py-4(:class="cutString($route.path) === '/me/articles/drafts/' ? 'remove-shadow' : ''")
    .container.is-max-widescreen
      .level
        .level-left
          .level-item
            nuxt-link(to="/")
              img(src="~/assets/images/logo.svg" alt="ActivePlace")

        .level-item.level-center.is-flex-width-auto
          .navigation
            XAHeaderNavigationButton(
              route="/my-feed"
              label="My Feed",
              :active="$route.path === '/my-feed'",
              :icon="require('~/assets/icons/navigation/home.svg')",
              :icon-active="require('~/assets/icons/navigation/home-active.svg')",
              :disabled="!isLoggedIn")
            XAHeaderNavigationButton(
              route="/trending"
              label="Trending",
              :active="$route.path === '/trending'",
              :icon="require('~/assets/icons/navigation/trending.svg')",
              :icon-active="require('~/assets/icons/navigation/trending-active.svg')")
            XAHeaderNavigationButton(
              route="/discover"
              label="Discover",
              :active="$route.path === '/discover'",
              :icon="require('~/assets/icons/navigation/discover.svg')",
              :icon-active="require('~/assets/icons/navigation/discover-active.svg')",
              :disabled="!isLoggedIn")
            //-
              XAHeaderNavigationButton(
                route="/community-interests"
                label="Community Interests",
                :active="$route.path === '/community-interests'",
                :icon="require('~/assets/icons/navigation/inactive-community-interests.webp')",
                :icon-active="require('~/assets/icons/navigation/active-community-interests.webp')",
                :disabled="!isLoggedIn")
            XAHeaderNavigationButton(
              route="/marketplace"
              label="Marketplace",
              :active="$route.path === '/marketplace'",
              :icon="require('~/assets/icons/navigation/marketplace.svg')",
              :icon-active="require('~/assets/icons/navigation/marketplace-active.svg')",
              :disabled="!isLoggedIn")
          XMHeaderSearchBar

        .level-right
          .level-item.search(@click="showSearch = true"): b-icon(icon="magnify")
          XAHeaderMobileSearch(v-if="showSearch" @DoShowSearch="showSearch = $event")
          .is-logged-in(v-if="isLoggedIn")
            .level-item._notification
              XMHeaderNotificationButton
            .level-item.avatar-desktop(@click.prevent="doCloseNotificationList()")
              b-dropdown(position="is-bottom-left" max-height="calc(100vh - 110px)" scrollable aria-role="menu")
                template(#trigger)
                  XOMyProfileAvatar.is-cursor-pointer(size="32px")
                XOMyProfileMenu

            .level-item.avatar-mobile: XOMyProfileAvatar(size="32px")
            .level-item.mobile-menu
              b-dropdown(aria-role="menu" scrollable)
                template(#trigger): img(src="~assets/images/Header/menu-burger-close.svg")
                XOMyProfileMenu

          .is-logged-out(v-else)
            .desktop
              .level-item
                b-button.btn-signin(type="is-ghost" @click="clickSignIn") SIGN IN
              .level-item
                b-button(
                  type="is-primary"
                  style="font-size: 14px; font-weight: bold; border-radius: 6px"
                  @click="clickGetStarted") GET STARTED
            .mobile
              b-dropdown(aria-role="menu" scrollable)
                template(#trigger): img(src="~assets/images/Header/menu-burger-close.svg")
                XOGuestMenu
    .container.desktop-navigation-container.is-max-widescreen
      .navigation
        XAHeaderNavigationButton(
          route="/my-feed"
          label="My Feed",
          :active="$route.path === '/my-feed'",
          :icon="require('~/assets/icons/navigation/home.svg')",
          :icon-active="require('~/assets/icons/navigation/home-active.svg')",
          :disabled="!isLoggedIn")
        XAHeaderNavigationButton(
          route="/trending"
          label="Trending",
          :active="$route.path === '/trending'",
          :icon="require('~/assets/icons/navigation/trending.svg')",
          :icon-active="require('~/assets/icons/navigation/trending-active.svg')")
        XAHeaderNavigationButton(
          route="/discover"
          label="Discover",
          :active="$route.path === '/discover'",
          :icon="require('~/assets/icons/navigation/discover.svg')",
          :icon-active="require('~/assets/icons/navigation/discover-active.svg')")
        //XAHeaderNavigationButton(
          route="/community-interests"
          label="Community Interests",
          :active="$route.path === '/discover'",
          :icon="require('~/assets/icons/navigation/inactive-community-interests.webp')",
          :icon-active="require('~/assets/icons/navigation/active-community-interests.webp')",
          :disabled="!isLoggedIn")
        XAHeaderNavigationButton(
          route="/marketplace"
          label="Marketplace",
          :active="$route.path === '/discover'",
          :icon="require('~/assets/icons/navigation/marketplace.svg')",
          :icon-active="require('~/assets/icons/navigation/marketplace-active.svg')")
</template>

<script>
import { mapActions } from 'vuex'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAHeaderNavigationButton from '~/components/atoms/Header/NavigationButton'
import XMHeaderSearchBar from '~/components/molecules/Header/SearchBar'
import XMHeaderNotificationButton from '~/components/molecules/Header/NotificationButton'
import XDLogIn from '~/components/pages/LogIn'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import XOMyProfileMenu from '~/components/organisms/MyProfileMenu'
import XOGuestMenu from '~/components/organisms/GuestMenu'
import XAHeaderMobileSearch from '~/components/atoms/Header/MobileSearch'

export default {
  name: 'XOHeaderMarketPlace',
  components: {
    XAHeaderMobileSearch,
    XOMyProfileMenu,
    XOMyProfileAvatar,
    XMHeaderNotificationButton,
    XMHeaderSearchBar,
    XAHeaderNavigationButton,
    XAProfileAvatar,
    XOGuestMenu,
  },
  props: {
    isMarketplace: Boolean,
  },
  data() {
    return {
      showProfileMenu: false,
      showSearch: false,
      medalDetails: null,
    }
  },
  mounted() {
    if (this.$route.name === 'medals-event-user') {
      this.$root.$on('set/medalClaim/details', (value) => {
        this.doRetrieveMedalClaimDetails(value)
      })
    }
  },
  methods: {
    ...mapActions({
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
      setMedalIsClaiming: 'medals/setMedalIsClaiming',
    }),
    cutString(text) {
      return text.slice(0, 20)
    },
    clickSignIn() {
      this.$buefy.modal.open({
        parent: this,
        component: XDLogIn,
        width: 600,
      })

      const claimID = this.$route.query?.claim
      if (this.$route.name === 'medals-event-user' && claimID) {
        this.setMedalIsClaiming(true)
        if (this.$route.name === 'medals-event-user') {
          this.$root.$emit('set/click/popup', true)
          this.setMedalClaimDetails(this.medalDetails)
        }
      }
    },
    async clickGetStarted() {
      const claimID = this.$route.query?.claim
      if (this.$route.name === 'medals-event-user' && claimID) {
        this.$root.$emit('set/click/popup', true)
        await this.setMedalClaimDetails(this.medalDetails)
      }
      this.$router.push('/signup/user?step=1')
      this.$store.dispatch('plans-pricing/setPlansPricingPurchasing', null)
    },
    doCloseNotificationList() {
      this.$root.$emit('notification/close')
    },
    doRetrieveMedalClaimDetails(value) {
      this.medalDetails = value
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-header-marketplace::v-deep {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 40;
  width: 100%;

  .header-message {
    text-align: center;
    background-color: #eef1f1;
    text-transform: uppercase;
    color: $secondary;
  }

  .remove-shadow {
    box-shadow: none !important;
  }
  .box {
    border-radius: 0;

    &.desktop {
      padding-left: 0;
      padding-right: 0;
    }

    .level {
      display: flex;
      flex-wrap: wrap;

      .level-item {
        &.level-center {
          justify-content: center;
          margin-bottom: 0;
          flex-wrap: wrap;
          width: 100%;
          max-width: 715px;
          padding: 0 40px;

          .navigation {
            display: none;
            flex-wrap: wrap;
            align-items: center;

            a {
              margin-bottom: -7px;

              &.active {
                border-bottom: 2px solid $primary;
              }

              ._icon {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
              }

              ._label {
                display: none;
              }
            }
          }
        }

        &.search {
          display: none;
          align-items: center;
          justify-content: center;
          margin-bottom: 0;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: $white;
          box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
          margin-right: 15px;
        }
      }

      .level-right {
        .is-logged-in {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          .level-item {
            margin-bottom: 0;

            &:not(:last-child) {
              margin-right: 15px;
            }

            &.avatar-desktop {
              margin-right: 0;

              .dropdown {
                .dropdown-menu {
                  padding-top: 0;
                  margin-top: 10px;
                }
              }
            }

            &.avatar-mobile,
            &.mobile-menu {
              display: none;
            }
          }
        }

        .is-logged-out {
          .desktop {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .level-item {
              margin-bottom: 0;

              .btn-signin {
                color: $secondary;
                font-weight: 500;
                text-decoration: none;
              }
            }
          }

          .mobile {
            display: none;
          }
        }
      }
    }

    .desktop-navigation-container {
      width: 100%;

      .navigation {
        width: 100%;
        max-width: 745px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 15px 0 0 120px;

        .xa-header-navigation-button {
          a {
            padding-bottom: 0;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .box {
      .level {
        .level-right {
          .dropdown-menu {
            background-color: $white;
            width: 100%;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
          }

          .is-logged-in {
            .level-item {
              &.avatar-desktop {
                display: none;
              }

              &.avatar-mobile,
              &.mobile-menu {
                display: block;
              }

              &._notification {
                width: 0;
                margin: 0;
                display: block;
              }
            }
          }

          .is-logged-out {
            .desktop {
              display: none;
            }

            .mobile {
              display: block;
            }
          }
        }

        .level-item {
          &.level-center {
            max-width: none;

            .navigation {
              display: flex;
            }
          }
        }
      }

      .desktop-navigation-container {
        display: none;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .box {
      .level {
        .level-item {
          &.level-center {
            display: none;
          }

          &.search {
            display: flex;
          }
        }

        .level-right {
          display: flex;
        }
      }
    }
  }

  @media screen and (max-width: 427px) {
    .box {
      .level-left {
        .level-item {
          max-width: 160px;
        }
      }
    }
  }
}
</style>
