<template lang="pug">
XPArticlesSubCategory(:parent-title="parentTitle", :title="title")
</template>

<script>
import XPArticlesSubCategory from '~/components/pages/Articles/SubCategory'
export default {
  components: { XPArticlesSubCategory },
  computed: {
    title() {
      const url = this.$route.params?.sub

      switch (url) {
        case 'outdoor-adventure':
          return 'Outdoor & Adventure'
        case 'health-wellness':
          return 'Health & Wellness'
        case 'health-nutrition':
          return 'Health & Nutrition'
        case 'technology-gear':
          return 'Technology & Gear'
        case 'recovery-injuries':
          return 'Recovery & Injuries'
      }

      const words = url.split('-')
      const wordsUppercase = words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1)
        })
        .join(' ')

      return wordsUppercase
    },
    parentTitle() {
      const url = this.$route.params?.category

      switch (url) {
        case 'outdoor-adventure':
          return 'Outdoor & Adventure'
        case 'health-wellness':
          return 'Health & Wellness'
        case 'health-nutrition':
          return 'Health & Nutrition'
        case 'technology-gear':
          return 'Technology & Gear'
        case 'recovery-injuries':
          return 'Recovery & Injuries'
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
    this.$appClient.segment.trackPageView({ page: 'Articles' })
  },
  head() {
    return {
      title: `${this.title} Articles | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.title} Articles | ActivePlace`,
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
          content: `${this.title} Articles | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.title} Articles | ActivePlace`,
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
          content: `${this.title} Articles | ActivePlace`,
        },
      ],
    }
  },
}
</script>
