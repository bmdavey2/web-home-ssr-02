<template lang="pug">
XPContact
</template>

<script>
import { mapActions } from 'vuex'
import meta from '~/mixins/meta'
import XPContact from '~/components/pages/Contact'

export default {
  components: { XPContact },
  mixins: [meta],
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Contact' })
  },
  created() {
    this.metaTitle = 'Contact'
  },
  methods: {
    ...mapActions({
      setMedalEnquiryMessage: 'medals/setMedalEnquiryMessage',
    }),
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteLeave(to, from, next) {
    this.setMedalEnquiryMessage()
    next()
  },
}
</script>
