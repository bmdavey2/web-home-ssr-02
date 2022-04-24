<template lang="pug">
XPFAQSubCategory
</template>

<script>
import XPFAQSubCategory from '~/components/pages/FAQSubCategory'
export default {
  components: { XPFAQSubCategory },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'FAQ' })
  },
  head() {
    return {
      title: `${
        this.$store.getters['faq/getCategoryQuestion'](this.$route.params?.category, this.$route.params?.sub)?.question
      } | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${
            this.$store.getters['faq/getCategoryQuestion'](this.$route.params?.category, this.$route.params?.sub)
              ?.question
          } | ActivePlace`,
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
          content: `${
            this.$store.getters['faq/getCategoryQuestion'](this.$route.params?.category, this.$route.params?.sub)
              ?.question
          } | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${
            this.$store.getters['faq/getCategoryQuestion'](this.$route.params?.category, this.$route.params?.sub)
              ?.question
          } | ActivePlace`,
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
          content: `${
            this.$store.getters['faq/getCategoryQuestion'](this.$route.params?.category, this.$route.params?.sub)
              ?.question
          } | ActivePlace`,
        },
      ],
    }
  },
}
</script>
