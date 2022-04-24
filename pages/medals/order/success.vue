<template lang="pug">
XPMedalsOrderSuccess
</template>

<script>
import meta from '~/mixins/meta'
import XPMedalsOrderSuccess from '~/components/pages/Medals/Order/Success'

export default {
  components: { XPMedalsOrderSuccess },
  mixins: [meta],
  asyncData({ store, redirect }) {
    const isSuccess = store.getters['medals/getMedalOrder']?.isSuccess

    if (!isSuccess) {
      redirect('/medals/order')
    }
  },
  created() {
    this.metaTitle = 'Medals Order Success'
  },
  beforeMount() {
    window.addEventListener('resize', this.doHandleViewportHeight)
  },
  mounted() {
    this.doHandleViewportHeight()
    this.getAllExternalLinks()
    this.$appClient.segment.trackPageView({ page: 'Digital NFT Medals ordering form success' })
  },
  methods: {
    doHandleViewportHeight() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
    },
  },
}
</script>
