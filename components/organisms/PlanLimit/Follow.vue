<template lang="pug">
.xo-plan-limit-follow
  h3 Follow limit reached
  p Based on your subscription tier, you're only allowed up to {{ limit }} follows. To increase your limit please upgrade to a higher plan.
</template>

<script>
export default {
  name: 'XOPlanLimitFollow',
  computed: {
    limit() {
      return this.$parent.details?.limit
    },
  },
}
</script>
