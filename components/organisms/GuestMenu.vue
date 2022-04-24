<template lang="pug">
.xo-guest-menu.is-user-select-none
  .header.p-5
    b-dropdown-item.close: img(src="~assets/images/Header/menu-burger-open.svg")
  .contents
    .navigation
      .content-links.p-5
        b-dropdown-item(has-link)
          nuxt-link(to="/trending")
            span._icon.mr-5: img(src="~assets/images/Header/trending.svg" width="12" height="12")
            span._label Trending
        b-dropdown-item(has-link)
          nuxt-link(to="/discover")
            span._icon.mr-5: img(src="~assets/images/Header/discover.svg" width="12" height="12")
            span._label Discover
        b-dropdown-item(has-link)
          nuxt-link(to="/marketplace")
            span._icon.mr-5: img(src="~assets/icons/navigation/active-marketplace.webp" width="12" height="12")
            span._label Marketplace
        .action-link(@click.prevent="clickSignIn()")
          span._icon.mr-5: img(src="~assets/images/Header/account.svg" width="12" height="12")
          span._label Sign In
        .action-link(@click.prevent="clickGetStarted()")
          span._icon.mr-5: img(src="~assets/images/Header/edit.svg" width="12" height="12")
          span._label Get Started
      .bottom-links.p-5
        b-dropdown-item.mr-5.mb-3(has-link)
          nuxt-link(to="/businesses") Businesses
        //- b-dropdown-item.mr-5.mb-3(has-link)
          nuxt-link(to="/mentors") Mentors
        b-dropdown-item.mr-5.mb-3(has-link)
          nuxt-link(to="/about") About
        b-dropdown-item.mr-5.mb-3(has-link)
          nuxt-link(to="/faq") FAQ
        b-dropdown-item.mr-5.mb-3(has-link)
          nuxt-link(to="/contact") Contact
        b-dropdown-item.mr-5.mb-3(has-link)
          nuxt-link(to="/privacy") Privacy
        b-dropdown-item.mr-5.mb-3(has-link)
          nuxt-link(to="/terms-conditions") Terms
</template>

<script>
import { mapActions } from 'vuex'
import XDLogIn from '~/components/pages/LogIn'

export default {
  name: 'XOGuestMenu',
  components: { XDLogIn },
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
    doRetrieveMedalClaimDetails(value) {
      this.medalDetails = value
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-guest-menu::v-deep {
  width: 375px;
  color: #4a4a4a;

  .header {
    border-bottom: 1px solid;
    border-color: #65676b;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;

    .close {
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

    .bottom-links {
      display: none;

      a {
        font-size: 12px;
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
    }
  }

  @media screen and (max-width: 1023px) {
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
