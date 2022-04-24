<template lang="pug">
XPMarketPlaceCategory(:title="title")
</template>

<script>
import XPMarketPlaceCategory from '~/components/pages/MarketPlace/Category'
export default {
  components: { XPMarketPlaceCategory },
  computed: {
    title() {
      const url = this.$route.params?.category

      switch (url) {
        case 'outdoor-adventure':
          return 'Outdoor & Adventure'
        case 'health-wellness':
          return 'Health & Wellness'
        case 'health-nutrition':
          return 'Health & Nutrition'
      }

      const words = url.split('-')
      const wordsUppercase = words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1)
        })
        .join(' ')

      return wordsUppercase
    },
  },
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'MarketPlace Category' })
  },
  head() {
    return {
      title: `${this.title} | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${this.title} | ActivePlace` },
        { hid: 'og:description', property: 'og:description', content: `The World's Active Community` },
        { hid: 'og:image', property: 'og:image', content: this.activeplaceLogo },
      ],
    }
  },
}
</script>
