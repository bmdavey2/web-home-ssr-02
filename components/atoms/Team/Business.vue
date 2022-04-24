<template lang="pug">
.xa-team-business
  .details
    XAProfileAvatar(:image="profilePhotoURL", :label="initials" size="40px")
    .name {{ name }}
    //- XAMentorBadge(:badge="`Black`" v-if="hasBadge")w
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAMentorBadge from '~/components/atoms/MentorBadge'

export default {
  name: 'XATeamBusiness',
  components: { XAProfileAvatar, XAMentorBadge },
  props: {
    business: Object,
    hasBadge: Boolean,
  },
  computed: {
    profile() {
      return this.business?.Business || this.business || null
    },
    name() {
      return this.profile?.name || null
    },
    profilePhotoURL() {
      return this.profile?.profilePhotoURL || null
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    // badge() {
    //   return this.profile?.badge || null
    // },
  },
}
</script>

<style lang="scss" scoped>
.xa-team-business::v-deep {
  padding: 0;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: transparent;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .name {
      margin: 0 5px 0 8px;
      flex: 10000 1 0;
    }
  }
}
</style>
