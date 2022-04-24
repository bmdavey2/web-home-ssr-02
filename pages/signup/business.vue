<template lang="pug">
XPSignUpAccount(v-if="!isLoggedIn") You’ll need a Personal Profile to set up your Business.
XPSignUpBusiness(v-else)
</template>

<script>
import meta from '~/mixins/meta'
import XPSignUpBusiness from '~/components/pages/SignUpBusiness'
import XPSignUpAccount from '~/components/pages/SignUpAccount'
export default {
  components: { XPSignUpAccount, XPSignUpBusiness },
  mixins: [meta],
  layout: 'signup',
  watch: {
    $route() {
      this.$appClient.segment.trackPageView({ page: 'Business Profile Signup' })
    },
  },
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Business Profile Signup' })
  },
  created() {
    this.metaTitle = 'Business Profile Signup'
  },
}
</script>
