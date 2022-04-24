<template lang="pug">
.auth
</template>

<script>
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteEnter(to, from, next) {
    if (to.query.mode === 'resetPassword') {
      next(`/reset-password?code=${to.query.oobCode}`)
    } else {
      next((vm) => {
        vm.doCheckAuthMode()
      })
    }
  },
  methods: {
    async doCheckAuthMode() {
      await this.$router.push('/')
      this.$toast.error('Invalid auth mode.', { position: 'top-center' })
    },
  },
}
</script>
