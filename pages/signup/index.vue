<template lang="pug">
XPSignUpOptions
</template>

<script>
import meta from '~/mixins/meta'
import XPSignUpOptions from '~/components/pages/SignUpOptions'
export default {
  components: { XPSignUpOptions },
  mixins: [meta],
  layout: 'full',
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Signup' })
  },
  created() {
    this.metaTitle = 'Signup'
  },
}
</script>
