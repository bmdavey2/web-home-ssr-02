<template lang="pug">
.xo-header.is-user-select-none
  .box.desktop.py-4
    .container
      .level
        .level-left
          .level-item
            nuxt-link(to="/"): img(src="~/assets/images/v2/Layouts/activeplace.svg" alt="ActivePlace")

        .level-right
          .is-logged-in(v-if="isLoggedIn")
            .level-item._notification
              XMHeaderNotificationButton
            .level-item.avatar-desktop(@click.prevent="doCloseNotificationList()")
              b-dropdown(position="is-bottom-left" scrollable max-height="calc(100vh - 110px)" aria-role="menu")
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
                b-button.sign-in.has-text-weight-medium(
                  type="is-text"
                  style="font-size: 14px; border: 0"
                  @click="clickSignIn") SIGN IN
              .level-item
                b-button.has-text-weight-medium(
                  type="is-primary"
                  style="font-size: 14px; border-radius: 6px"
                  @click="clickGetStarted") GET STARTED
            .mobile
              b-dropdown(aria-role="menu" scrollable)
                template(#trigger): img(src="~assets/images/Header/menu-burger-close.svg")
                XOGuestMenu
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAHeaderNavigationButton from '~/components/atoms/Header/NavigationButton'
import XMHeaderSearchBar from '~/components/molecules/Header/SearchBar'
import XMHeaderNotificationButton from '~/components/molecules/Header/NotificationButton'
import XDLogIn from '~/components/pages/LogIn'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import XOMyProfileMenu from '~/components/organisms/MyProfileMenu'
import XOGuestMenu from '~/components/organisms/GuestMenu'
import XMHeaderMobileSearch from '~/components/atoms/Header/MobileSearch'

export default {
  name: 'XONFTHeader',
  components: {
    XMHeaderMobileSearch,
    XOMyProfileMenu,
    XOMyProfileAvatar,
    XMHeaderNotificationButton,
    XMHeaderSearchBar,
    XAHeaderNavigationButton,
    XAProfileAvatar,
    XOGuestMenu,
  },
  data() {
    return {
      showProfileMenu: false,
      showSearch: false,
    }
  },
  methods: {
    clickSignIn() {
      this.$buefy.modal.open({
        parent: this,
        component: XDLogIn,
        width: 600,
      })
    },
    clickGetStarted() {
      this.$router.push('/signup/user?step=1')
    },
    doCloseNotificationList() {
      this.$root.$emit('notification/close')
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-header::v-deep {
  //position: sticky;
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

  .box {
    border-radius: 0;
    background-color: #2a4e55;

    &.desktop {
      min-height: 90px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding-left: 0;
      padding-right: 0;
    }

    .level {
      display: flex;
      flex-wrap: nowrap;

      .level-item {
        &.navigation {
          justify-content: center;
          margin-bottom: 0;
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
        margin-top: 0 !important;
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
            }
            .sign-in {
              color: $white;
              text-decoration: none;
              background-color: transparent;
            }
          }

          .mobile {
            display: none;
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
      }
    }
  }

  @media screen and (max-width: 767px) {
    .box {
      .level {
        .level-item {
          &.navigation {
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
