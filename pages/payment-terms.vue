<template lang="pug">
XPPaymentTerms
</template>

<script>
import meta from '~/mixins/meta'
import XPPaymentTerms from '~/components/pages/PaymentTerms'
export default {
  components: { XPPaymentTerms },
  mixins: [meta],
  created() {
    this.metaTitle = 'Payment Terms'
  },
  mounted() {
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Payment Terms' })
  },
}
</script>
