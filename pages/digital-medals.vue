<template lang="pug">
.x-app
  XONFTHeader
  XPNFTMedals
  XOLayoutsFooter
  XOFullPageLoader
</template>

<script>
import meta from '~/mixins/meta'
import XPNFTMedals from '~/components/pages/NFTMedals'
import XMFooterMarketPlace from '~/components/organisms/FooterMarketPlace'
import XOLayoutsFooter from '~/components/organisms/v2/Layouts/Footer'
import XONFTHeader from '~/components/organisms/NFTHeader'
import XOFullPageLoader from '~/components/organisms/FullPageLoader'

export default {
  components: { XOFullPageLoader, XONFTHeader, XMFooterMarketPlace, XPNFTMedals, XOLayoutsFooter },
  mixins: [meta],
  layout: 'blank',
  created() {
    this.metaTitle = 'Digital Medals'
    this.$store.commit('control/setLoading', { name: `app/loading`, value: true })
  },
  mounted() {
    this.$zendesk.hide()
    setTimeout(() => {
      this.$store.commit('control/setLoading', { name: `app/loading`, value: false })
    }, 3000)
  },
  beforeDestroy() {
    this.$zendesk.show()
  },
}
</script>

<style lang="scss" scoped>
.x-app::v-deep {
  @media screen and (max-width: 1023px) {
    .xm-footer-marketplace {
      &.footer-marketplace-p-slug {
        display: none;
      }
    }
  }
}
</style>
