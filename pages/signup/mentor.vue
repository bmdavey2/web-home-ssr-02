<template lang="pug">
XPSignUpAccount(v-if="!isLoggedIn") You’ll need a Personal Profile to be a Mentor.
XPSignUpMentor(v-else)
</template>

<script>
import meta from '~/mixins/meta'
import XPSignUpAccount from '~/components/pages/SignUpAccount'
import XPSignUpMentor from '~/components/pages/SignUpMentor'
export default {
  components: { XPSignUpMentor, XPSignUpAccount },
  mixins: [meta],
  layout: 'signup',
  watch: {
    $route() {
      this.$appClient.segment.trackPageView({ page: 'Mentor Profile Signup' })
    },
  },
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Mentor Profile Signup' })
  },
  created() {
    this.metaTitle = 'Mentor Profile Signup'
  },
}
</script>
