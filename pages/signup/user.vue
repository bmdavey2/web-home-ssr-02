<template lang="pug">
//- XPSignUpAccount(user) Let's get you started.
XPSignupUser
</template>

<script>
import meta from '~/mixins/meta'
import XPSignUpAccount from '~/components/pages/SignUpAccount'
import XPSignupUser from '~/components/pages/v2/SignUp/User'

export default {
  components: { XPSignUpAccount, XPSignupUser },
  mixins: [meta],
  layout: 'v2/signup',
  watch: {
    $route() {
      this.$appClient.segment.trackPageView({ page: 'User Profile Signup' })
    },
  },
  created() {
    this.metaTitle = 'User Profile Signup'
  },
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'User Profile Signup' })
  },
}
</script>
