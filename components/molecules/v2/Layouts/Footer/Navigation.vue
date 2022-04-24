<template lang="pug">
.xm-layouts-footer-navigation
  .container.is-max-widescreen
    .row.justify-between.desktop
      .logo: img(src="~assets/images/v2/Layouts/activeplace-min.svg" alt="ActivePlace" width="55" height="55")

      .company
        ._title Company
        //- nuxt-link(to="/about") About
        nuxt-link(to="/contact") Contact Us
        nuxt-link(to="/terms-conditions") Terms
        nuxt-link(to="/privacy-policy") Privacy

      .community
        ._title Community
        nuxt-link(to="/businesses") Businesses
        //- nuxt-link(to="/faq") FAQ
        //- nuxt-link(to="/plans-pricing") Plans and Pricing
        nuxt-link(to="/digital-medals") Digital Medals
        nuxt-link(to="/medals/order") Medal Order Form

      .content
        ._title Content
        nuxt-link(to="/articles") Articles

      .goto
        ._title Go To
        nuxt-link(to="/community-interests" v-show="isLoggedIn") Community Interests
        nuxt-link(to="/marketplace") Find Events

  .mobile
    .links(v-for="(link, index) in mobileLinks", :key="index", :class="`_${convertStringToSlug(link.name)}`")
      .accordion-title.row.items-center.justify-between(@click.prevent="link.open = !link.open")
        ._label {{ link.name }}
        ._icon: b-icon(:icon="link.open ? 'chevron-up' : 'chevron-down'")
      transition(name="fade")
        .accordion-content(v-if="link.open")
          nuxt-link(v-for="(item, indexItem) in link.items", :to="`/${item.url}`", :key="indexItem" exact) {{ item.label }}
</template>

<script>
export default {
  name: 'XMLayoutsFooterNavigation',
  data() {
    return {
      mobileLinks: [
        {
          name: 'Company',
          open: false,
          items: [
            // { label: 'About', url: 'about' },
            { label: 'Contact Us', url: 'contact' },
            { label: 'Terms', url: 'terms-conditions' },
            { label: 'Privacy', url: 'privacy-policy' },
            // { label: 'Payment', url: 'payment-terms' },
          ],
        },
        {
          name: 'Community',
          open: false,
          items: [
            { label: 'Businesses', url: 'businesses' },
            // { label: 'Mentors', url: 'mentors' },
            // { label: 'FAQ', url: 'faq' },
            // { label: 'Plans and Pricing', url: 'businesses/plans-pricing' },
            { label: 'Digital Medals', url: 'digital-medals' },
            { label: 'Medal Order Form', url: 'medals/order' },
          ],
        },
        {
          name: 'Content',
          open: false,
          items: [
            { label: 'Articles', url: 'articles' },
            // { label: 'Videos', url: 'videos' },
            // { label: 'Podcasts', url: 'podcasts' },
          ],
        },
        {
          name: 'Go To',
          open: false,
          items: [
            // { label: 'Trending', url: 'trending' },
            // { label: 'Community Interests', url: 'community-interests' },
            { label: 'Find Events', url: 'marketplace' },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.xm-layouts-footer-navigation {
  padding: 50px 0;

  ._title {
    font-size: 1.1429rem;
    margin-bottom: 10px;
    color: $white;
  }

  a {
    display: flex;
    flex-wrap: wrap;
    color: #839295;
    font-weight: 100;
    margin-bottom: 10px;
    font-size: 1.1429rem;
  }

  .desktop {
    @include max-width(767px) {
      display: none;
    }
  }

  .mobile {
    display: none;
    color: $white;

    @include max-width(767px) {
      display: block;
    }

    .links {
      margin-bottom: 5px;

      .accordion-title {
        font-size: 1.1429rem;
        margin-bottom: 10px;
      }

      .accordion-content {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
