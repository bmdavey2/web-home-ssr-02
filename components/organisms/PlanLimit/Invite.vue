<template lang="pug">
.xo-plan-limit-invite
  h3 Team invite limit reached
  p Based on your subscription tier, you're only allowed up to {{ limit }} team invite. To increase your limit please upgrade to a higher plan.
</template>

<script>
export default {
  name: 'XOPlanLimitInvite',
  computed: {
    limit() {
      return this.$parent.details?.limit
    },
  },
}
</script>
