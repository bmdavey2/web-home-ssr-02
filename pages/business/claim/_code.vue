<template lang="pug">
.xp-business-claim
</template>

<script>
import meta from '~/mixins/meta'

export default {
  mixins: [meta],
  mounted() {
    this.$buefy.modal.open({
      component: require('~/components/pages/BusinessClaim').default,
      parent: this,
      canCancel: false,
      width: 500,
      fullScreen: this.lt('tabletLG'),
    })
  },
  created() {
    this.metaTitle = 'Business Claim'
  },
}
</script>

<style lang="scss" scoped>
.xp-business-claim::v-deep {
  min-height: calc(100vh - 505px);
}
</style>
