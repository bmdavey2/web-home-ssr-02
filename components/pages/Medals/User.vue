<template lang="pug">
.xp-medals-user
  XOMedalsUserBanner
  XOMedalsUserDetails
  XOMedalsSponsors
</template>

<script>
import XOMedalsUserBanner from '~/components/organisms/Medals/User/Banner'
import XOMedalsUserDetails from '~/components/organisms/Medals/User/Details'
import XOMedalsUserSponsors from '~/components/organisms/Medals/User/Sponsors'
import XOMedalsSponsors from '~/components/organisms/Medals/Sponsors'

export default {
  name: 'XPMedalsUser',
  components: { XOMedalsUserBanner, XOMedalsUserDetails, XOMedalsUserSponsors, XOMedalsSponsors },
}
</script>

<style lang="scss" scoped>
.xp-medals-user::v-deep {
  min-height: calc(100vh - 533px);
}
</style>
