<template lang="pug">
.xm-layouts-header-right.row.items-center.justify-end.col
  XMHeaderSearchBar(v-if="showSearchBar")

  .nav-action.search.desktop.row.items-center(@click.prevent="showSearchBar = !showSearchBar" v-if="!showSearchBar"): b-icon(
    icon="magnify")

  //- // this component is not included
  //- //- .nav-action.search.mobile.row.items-center.justify-center(@click.prevent="showSearchBarMobile = true"): b-icon(
  //-   icon="magnify"
  //-   custom-size="mdi-18px")
  .is-logged-in.row.items-center(v-if="isLoggedIn")
    ._notification: XMHeaderNotificationButton
    .avatar.desktop(@click.prevent="doCloseNotificationList()")
      b-dropdown(position="is-bottom-left" scrollable max-height="calc(100vh - 100px)" aria-role="menu")
        template(#trigger)
          XOMyProfileAvatar.is-cursor-pointer(size="32px")
        XOMyProfileMenu

    .avatar.mobile: XOMyProfileAvatar(size="32px")

    .mobile-menu.is-logged-in
      b-dropdown(
        aria-role="menu"
        position="is-bottom-left",
        :mobile-modal="false"
        max-height="calc(100vh - 110px)"
        scrollable)
        template(#trigger): img(src="~assets/images/v2/Layouts/mobile-menu.svg")
        XOMyProfileMenu

  .is-logged-out.row.items-center(v-else)
    .nav-action.btn-signin: b-button.text-uppercase(type="is-text" @click.prevent="doClickSignIn()") Sign In
    .nav-action.btn-get-started: b-button.text-uppercase(type="is-primary" @click.prevent="doClickGetStarted()") Get Started
    .mobile-menu
      b-dropdown(aria-role="menu" position="is-bottom-left", :mobile-modal="false" scrollable)
        template(#trigger): img(src="~assets/images/v2/Layouts/mobile-menu.svg")
        XMGuestMenu(:medal-details="medalDetails")

  XAHeaderMobileSearch(@DoShowSearchMobile="showSearchBarMobile = $event" v-if="showSearchBarMobile")
</template>

<script>
import { mapActions } from 'vuex'
import XMHeaderSearchBar from '~/components/molecules/Header/SearchBar'
import XMHeaderNotificationButton from '~/components/molecules/Header/NotificationButton'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import XOMyProfileMenu from '~/components/organisms/MyProfileMenu'
import XMGuestMenu from '~/components/molecules/v2/Layouts/Header/GuestMenu'
import XAHeaderMobileSearch from '~/components/atoms/Header/MobileSearch'

export default {
  name: 'XMLayoutsHeaderRight',
  components: {
    XMHeaderSearchBar,
    XMHeaderNotificationButton,
    XOMyProfileAvatar,
    XOMyProfileMenu,
    XMGuestMenu,
    XAHeaderMobileSearch,
  },
  props: {
    medalDetails: null,
  },
  data() {
    return {
      showSearchBar: false,
      showSearchBarMobile: false,
    }
  },
  methods: {
    ...mapActions({
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
      setMedalIsClaiming: 'medals/setMedalIsClaiming',
    }),
    doClickSignIn() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/pages/LogIn').default,
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
    async doClickGetStarted() {
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
  },
}
</script>

<style lang="scss" scoped>
.xm-layouts-header-right::v-deep {
  .nav-action {
    cursor: pointer;
    color: $white;

    &:not(:first-child) {
      margin-left: 10px;
    }

    &.search {
      &.desktop {
        @include max-width(767px) {
          display: none;
        }
      }

      &.mobile {
        display: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: $white;
        box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
        color: #2a4e55;

        @include max-width(767px) {
          display: flex;
        }
      }
    }

    &.btn-signin,
    &.btn-get-started {
      @include max-width(767px) {
        display: none;
      }
    }

    &.btn-signin {
      .button {
        text-decoration: none;
        background-color: transparent;
        color: $white;
      }
    }
  }

  .xm-header-search-bar {
    width: 100%;
    max-width: 150px;
    position: sticky;

    @include max-width(1280px) {
      max-width: 120px;
    }

    @include max-width(1215px) {
      max-width: 150px;
    }

    .search-input {
      .dropdown-menu {
        width: 500px;
        left: unset;
        right: 0;
      }
    }
  }

  ._notification {
    color: #4a4a4a;
    margin: 0 20px;

    @include max-width(767px) {
      width: 0;
      margin: 0;
    }

    .xm-header-notification-button {
      > .icon {
        @include max-width(767px) {
          opacity: 0;
        }
      }
    }
  }

  .avatar {
    color: #4a4a4a;
    cursor: pointer;

    &.desktop {
      @include max-width(1215px) {
        display: none;
      }
    }

    &.mobile {
      display: none;

      @include max-width(1215px) {
        display: block;
      }
    }
  }

  .mobile-menu {
    display: none;
    margin-left: 20px;
    color: #4a4a4a;

    @include max-width(1215px) {
      display: block;
    }

    @include max-width(427px) {
      margin-left: 10px;
    }

    .dropdown {
      .dropdown-menu {
        @include max-width(767px) {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 0;
        }

        .dropdown-content {
          padding: 20px 0;

          @include max-width(767px) {
            max-height: unset !important;
            height: 100%;
            border-radius: 0;
          }
        }
      }
    }
  }
}
</style>
