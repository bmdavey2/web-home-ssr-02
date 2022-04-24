<template lang="pug">
.x-app
  //- XOHeaderMarketPlace(
    is-marketplace
    v-if="['marketplace-category', 'marketplace', 'marketplace-p-slug'].includes($route.name)")
  //- XOHeader(v-else)
  XOHeaderMarketPlace(is-marketplace)
  nuxt
  //- XMFooterMarketPlace(v-if="['marketplace-category', 'marketplace', 'marketplace-p-slug'].includes($route.name)")
  //- XOFooter(v-else)
  XMFooterMarketPlace
  XOFullPageLoader
</template>

<script>
import { mapActions } from 'vuex'
import XOHeader from '~/components/organisms/Header'
import XOHeaderMarketPlace from '~/components/organisms/HeaderMarketPlace'
import XOFooter from '~/components/organisms/Footer'
import XMFooterMarketPlace from '~/components/organisms/FooterMarketPlace'
import XOFullPageLoader from '~/components/organisms/FullPageLoader'
export default {
  middleware: ['hasDetails'],
  components: { XOFullPageLoader, XOFooter, XOHeader, XOHeaderMarketPlace, XMFooterMarketPlace },
  watch: {
    currentBusinessID() {
      this.getActiveBusinessDetails()
    },
  },
  mounted() {
    if (this.currentBusinessID) this.getActiveBusinessDetails()
    if (!this.isLoggedIn) {
      this.setUserOwnerDetails(null)
    }
  },
  methods: {
    ...mapActions({
      setUserOwnerDetails: 'user/setUserOwnerDetails',
    }),
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
