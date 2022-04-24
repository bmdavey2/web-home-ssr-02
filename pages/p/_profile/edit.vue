<template lang="pug">
XPMemberProfileEdit
</template>

<script>
import XPMemberProfileEdit from '~/components/pages/MemberProfileEdit'

export default {
  components: { XPMemberProfileEdit },
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Profile Edit' })
  },
  head() {
    return {
      title: 'Profile Edit | ActivePlace',
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Profile Edit | ActivePlace',
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
          content: 'Profile Edit | ActivePlace',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Profile Edit | ActivePlace',
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
          content: 'Profile Edit | ActivePlace',
        },
      ],
    }
  },
}
</script>
