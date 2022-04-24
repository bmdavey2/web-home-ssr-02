<template lang="pug">
.x-app
  XOLayoutsHeaderMedalOrder(v-if="routeName === 'medals-order'")
  XOLayoutsHeader(v-else)
  nuxt
  XOLayoutsFooter(v-if="routeName !== 'medals-order'")
  XOFullPageLoader
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import XOLayoutsHeader from '~/components/organisms/v2/Layouts/Header'
import XOLayoutsHeaderMedalOrder from '~/components/organisms/v2/Layouts/HeaderMedalOrder'
import XOLayoutsFooter from '~/components/organisms/v2/Layouts/Footer'
import XOFullPageLoader from '~/components/organisms/FullPageLoader'

export default {
  middleware: ['hasDetails'],
  components: { XOLayoutsHeader, XOLayoutsHeaderMedalOrder, XOLayoutsFooter, XOFullPageLoader },
  data() {
    return {
      routeName: this.$route.name,
    }
  },
  computed: {
    ...mapGetters({
      getUserOwnerDetails: 'user/getUserOwnerDetails',
    }),
  },
  watch: {
    currentBusinessID() {
      this.getActiveBusinessDetails()
    },
    $route() {
      this.routeName = this.$route.name
    },
  },
  async mounted() {
    if (this.currentBusinessID) this.getActiveBusinessDetails()
    if (this.isLoggedIn) {
      const {
        Me: { Owner },
      } = await this.$api.getMyProfile()

      if (Owner) {
        this.setUserOwnerDetails(Owner)
      } else {
        this.logOut()
      }
    } else {
      this.setUserOwnerDetails(null)
    }
  },
  methods: {
    ...mapActions({
      setUserOwnerDetails: 'user/setUserOwnerDetails',
      logOut: 'auth/logOut',
    }),
  },
}
</script>
