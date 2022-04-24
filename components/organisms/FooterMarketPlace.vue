<template lang="pug">
.xm-footer-marketplace(:class="`footer-${$route.name}`")
  .container
    .logo: img(src="~assets/images/logo-secondary-min.svg")
    .quick-links.desktop-links(
      v-for="(link, index) in linksDesktop",
      :key="`${index}-d`",
      :class="convertStringToSlug(link.name)")
      ._title {{ link.name }}
      nuxt-link(v-for="(item, indexItem) in link.items", :to="`/${item.url}`", :key="`${indexItem}-d`" exact) {{ item.label }}

    .quick-links.mobile-links(
      v-for="(link, index) in linksMobile",
      :key="`${index}-m`",
      :class="convertStringToSlug(link.name)")
      ._title-accordion(@click.prevent="link.open = !link.open")
        ._label {{ link.name }}
        ._icon: b-icon(:icon="link.open ? 'chevron-up' : 'chevron-down'")
      transition(name="fade")
        .links(v-if="link.open")
          nuxt-link(v-for="(item, indexItem) in link.items", :to="`/${item.url}`", :key="`${indexItem}-m`" exact) {{ item.label }}
  .get-app
    ._label Get App
    ._icons
      a.appstore(href="https://apps.apple.com/us/app/activeplace/id1543314003" target="_blank"): img(
        src="~assets/images/Welcome/apple-store.svg")
      a.playstore(href="https://play.google.com/store/apps/details?id=com.activeplace.androidApp" target="_blank"): img(
        src="~assets/images/Welcome/play-store.png")
  .copyright
    .logo: img(src="~assets/images/logo-secondary-min.svg")
    .text &copy; ActivePlace {{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: 'XMFooterMarketPlace',
  data() {
    return {
      linksDesktop: [
        {
          name: 'Company',
          items: [
            { label: 'About', url: 'about' },
            { label: 'Contact Us', url: 'contact' },
            { label: 'Terms', url: 'terms-conditions' },
            { label: 'Privacy', url: 'privacy-policy' },
            { label: 'Payment', url: 'payment-terms' },
          ],
        },
        {
          name: 'Community',
          items: [
            { label: 'Businesses', url: 'businesses' },
            // { label: 'Mentors', url: 'mentors' },
            { label: 'FAQ', url: 'faq' },
            { label: 'Plans and Pricing', url: 'businesses/plans-pricing' },
            { label: 'Digital Medals', url: 'digital-medals' },
          ],
        },
        {
          name: 'Content',
          items: [
            { label: 'Discover', url: 'discover' },
            // { label: 'Videos', url: 'videos' },
            // { label: 'Podcasts', url: 'podcasts' },
          ],
        },
        {
          name: 'Go To',
          items: [
            { label: 'Trending', url: 'trending' },
            // { label: 'Community Interests', url: 'community-interests' },
            { label: 'Marketplace', url: 'marketplace' },
          ],
        },
      ],
      linksMobile: [
        {
          name: 'Company',
          open: false,
          items: [
            { label: 'About', url: 'about' },
            { label: 'Contact Us', url: 'contact' },
            { label: 'Terms', url: 'terms-conditions' },
            { label: 'Privacy', url: 'privacy-policy' },
            { label: 'Payment', url: 'payment-terms' },
          ],
        },
        {
          name: 'Community',
          open: false,
          items: [
            { label: 'Businesses', url: 'businesses' },
            // { label: 'Mentors', url: 'mentors' },
            { label: 'FAQ', url: 'faq' },
            { label: 'Plans and Pricing', url: 'businesses/plans-pricing' },
            { label: 'Digital Medals', url: 'digital-medals' },
          ],
        },
        {
          name: 'Content',
          open: false,
          items: [
            { label: 'Discover', url: 'discover' },
            // { label: 'Videos', url: 'videos' },
            // { label: 'Podcasts', url: 'podcasts' },
          ],
        },
        {
          name: 'Go To',
          open: false,
          items: [
            { label: 'Trending', url: 'trending' },
            // { label: 'Community Interests', url: 'community-interests' },
            { label: 'Marketplace', url: 'marketplace' },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-footer-marketplace::v-deep {
  background-color: #eef1f1;
  padding: 50px 0 20px;

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .quick-links {
      ._title {
        color: #65676b;
        margin-bottom: 10px;
      }

      a {
        display: block;
        color: #050505;
        text-decoration: none;
        font-weight: 300;
        margin-bottom: 7px;
        transition: 0.3s;

        //&:hover,
        &.active {
          color: $secondary;
          text-decoration: underline;
        }
      }

      &.mobile-links {
        display: none;

        ._title-accordion {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
      }
    }
  }

  .get-app {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba($secondary, 0.3);
    border-bottom: 1px solid rgba($secondary, 0.3);
    padding: 20px 0;
    margin-top: 20px;

    ._label {
      font-size: 1.1429rem;
      line-height: 1.4286rem;
      color: #65676b;
    }

    ._icons {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-left: 10px;

      a {
        display: block;
        margin-left: 15px;

        img {
          height: 40px;
          display: flex;
        }
      }
    }
  }

  .copyright {
    font-size: 0.8571rem;
    font-weight: 300;
    text-align: center;
    padding-top: 30px;

    .logo {
      margin-bottom: 15px;
      display: none;
    }
  }

  @media screen and (max-width: 1023px) {
    &.footer-marketplace-product {
      display: none;
    }

    .container {
      .logo {
        display: none;
      }
    }

    .copyright {
      .logo {
        display: block;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .container {
      .quick-links {
        width: 100%;
        margin-bottom: 5px;

        &.desktop-links {
          display: none;
        }

        &.mobile-links {
          display: block;
        }
      }
    }

    .get-app {
      padding: 20px 15px;

      ._label,
      ._icons {
        width: 100%;
      }

      ._label {
        margin-bottom: 10px;
      }

      ._icons {
        margin: 0;

        a {
          margin-left: 0;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
