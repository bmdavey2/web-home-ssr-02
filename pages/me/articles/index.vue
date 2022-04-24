<template lang="pug">
XPArticleLibrary
</template>

<script>
import XPArticleLibrary from '~/components/pages/ArticleLibrary'
export default {
  components: { XPArticleLibrary },
  middleware: ['registeredOnly'],
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'My Articles' })
  },
  created() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  head() {
    return {
      title: 'My Articles | ActivePlace',
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'My Articles | ActivePlace',
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
          content: 'My Articles | ActivePlace',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'My Articles | ActivePlace',
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
          content: 'My Articles | ActivePlace',
        },
      ],
    }
  },
}
</script>
