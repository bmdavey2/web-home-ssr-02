<template lang="pug">
XPLandingMentors
</template>

<script>
import meta from '~/mixins/meta'
import XPLandingMentors from '~/components/pages/Landing/Mentors'

export default {
  components: { XPLandingMentors },
  mixins: [meta],
  layout: 'blank',
  created() {
    this.metaTitle = 'Mentors'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Mentors' })
  },
}
</script>
