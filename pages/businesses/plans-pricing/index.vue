<template lang="pug">
XPPlansPricing
</template>

<script>
import XPPlansPricing from '~/components/pages/PlansPricing'
export default {
  components: { XPPlansPricing },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Plans and Pricing' })
    const fullScreen = this.lt('tabletLG')
    if (this.$store.getters['signup/getPurchaseBusiness']) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/BusinessStarterPurchase').default,
        parent: this,
        width: 635,
        canCancel: false,
        customClass: 'bg-white',
        fullScreen,
        props: {
          fullScreen,
        },
      })
    }
  },
  head() {
    return {
      title: 'Plans and Pricing | ActivePlace',
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Plans and Pricing | ActivePlace',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.activeplaceLogo,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Plans and Pricing | ActivePlace',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Plans and Pricing | ActivePlace',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.activeplaceLogo,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.activeplaceLogo,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Plans and Pricing | ActivePlace',
        },
      ],
    }
  },
}
</script>
