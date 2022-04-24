<template lang="pug">
.xm-guest-menu
  .header
    b-dropdown-item: img(src="~assets/images/Header/menu-burger-open.svg")
  .contents
    .navigation
      .content-links
        b-dropdown-item(has-link)
          nuxt-link(to="/marketplace")
            span._icon.mr-5: img(src="~assets/icons/navigation/active-marketplace.webp")
            span._label Find Events

        b-dropdown-item(has-link)
          nuxt-link(to="/articles")
            span._icon.mr-5: img(src="~assets/images/Header/discover.svg")
            span._label Articles

        b-dropdown-item(has-link)
          nuxt-link(to="/businesses")
            span._icon.mr-5: img(src="~assets/images/v2/Layouts/business-nav-icon.svg")
            span._label For Business

        b-dropdown-item.link-signin(has-link)
          .action-link(@click.prevent="doClickSignin()")
            span._icon.mr-5: img(src="~assets/images/Header/account.svg")
            span._label Sign In

        b-dropdown-item.link-get-started(has-link)
          .action-link(@click.prevent="doClickGetStarted()")
            span._icon.mr-5: img(src="~assets/images/Header/edit.svg")
            span._label Get Started
      .footer-links.row
        //- b-dropdown-item(has-link)
          nuxt-link(to="/businesses") Businesses
        //- b-dropdown-item(has-link)
          nuxt-link(to="/about") About
        //- b-dropdown-item(has-link)
          nuxt-link(to="/faq") FAQ
        b-dropdown-item(has-link)
          nuxt-link(to="/contact") Contact Us
        b-dropdown-item(has-link)
          nuxt-link(to="/privacy") Privacy
        b-dropdown-item(has-link)
          nuxt-link(to="/terms-conditions") Terms
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XMGuestMenu',
  props: {
    medalDetails: null,
  },
  methods: {
    ...mapActions({
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
      setMedalIsClaiming: 'medals/setMedalIsClaiming',
    }),
    doClickSignin() {
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
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-guest-menu::v-deep {
  padding: 0 20px;
  width: 375px;

  @include max-width(767px) {
    width: 100%;
  }

  .header {
    display: none;
    padding-bottom: 20px;
    border-bottom: 1px solid #65676b;
    margin-bottom: 20px;

    @include max-width(767px) {
      display: block;
    }

    a {
      padding: 0;
      text-align: right;
      background-color: transparent;
    }
  }

  .contents {
    .navigation {
      .content-links {
        .has-link {
          &:not(:last-child) {
            margin-bottom: 15px;
          }

          &.link-signin,
          &.link-get-started {
            display: none;

            @include max-width(767px) {
              display: block;
            }
          }

          a,
          .action-link {
            font-size: 1.1429rem;
            text-transform: uppercase;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 0;
            font-weight: 500;
            background-color: transparent;

            ._icon {
              width: 28px;
              height: 28px;
              background-color: $white;
              border-radius: 50%;
              box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;

              img {
                width: 12px;
              }
            }
          }
        }
      }
    }
  }

  .footer-links {
    border-top: 1px solid #65676b;
    padding-top: 20px;
    margin-top: 20px;
    display: none;

    @include max-width(767px) {
      display: flex;
    }

    .has-link {
      margin-right: 20px;
      margin-bottom: 10px;

      a {
        padding: 0;
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }
}
</style>
