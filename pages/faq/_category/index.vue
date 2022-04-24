<template lang="pug">
XPFAQCategory
</template>

<script>
import XPFAQCategory from '~/components/pages/FAQCategory'
export default {
  components: { XPFAQCategory },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'FAQ' })
  },
  head() {
    return {
      title: 'FAQ | ActivePlace',
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'FAQ | ActivePlace',
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
          content: 'FAQ | ActivePlace',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'FAQ | ActivePlace',
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
          content: 'FAQ | ActivePlace',
        },
      ],
    }
  },
}
</script>
