<template lang="pug">
XPResetPassword
</template>

<script>
import meta from '~/mixins/meta'
import XPResetPassword from '~/components/pages/ResetPassword'
export default {
  layout: 'blank',
  components: { XPResetPassword },
  mixins: [meta],
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Reset Password' })
  },
  created() {
    this.metaTitle = 'Reset Password'
  },
}
</script>
