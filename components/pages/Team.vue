<template lang="pug">
.xp-team.py-6
  .container(v-if="!isRetrieving")
    .header
      .left-header
        h1 Team
        XMTeamBusinesses.desktop(:businesses="businesses" v-if="businesses.length" @selected="setSelectedBusiness")
      .right-header
        template(v-if="currentMemberRole[0] !== 'User'")
          b-button.is-uppercase(
            type="is-primary"
            @click="doShowInvitationModal"
            v-if="getBusinessSubscription.plan !== null") Invite
    XMTeamBusinesses.mobile(:businesses="businesses" v-if="businesses.length" @selected="setSelectedBusiness")
    XMTeamTable(:members="members", :current-member="currentMember")
    XMTeamCardTable(:members="members", :current-member="currentMember")
</template>

<script>
import { mapGetters } from 'vuex'
import XMTeamBusinesses from '~/components/molecules/Team/Businesses'
import XMTeamTable from '~/components/molecules/Team/TeamTable'
import XMTeamCardTable from '~/components/molecules/Team/TeamCardTable'
export default {
  name: 'XPTeam',
  components: { XMTeamBusinesses, XMTeamTable, XMTeamCardTable },
  props: {
    members: Array,
    businesses: Array,
    currentMember: Object,
    isRetrieving: Boolean,
  },
  data() {
    return {
      selectedBusiness: null,
      details: null,
    }
  },
  computed: {
    ...mapGetters({
      getBusinessSubscription: 'business/getBusinessSubscription',
    }),
    currentMemberRole() {
      const currentMemberRole = this.members.filter((member) => {
        return member?.Member?.id === this.currentMember?.id
      })
      return currentMemberRole.map((member) => {
        return member?.role
      })
    },
  },
  methods: {
    setSelectedBusiness(value) {
      this.selectedBusiness = value
    },
    doShowInvitationModal() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.doCheckMembersCount()) {
        this.$buefy.modal.open({
          component: require('~/components/organisms/PlanLimit').default,
          parent: this,
          width: 600,
          canCancel: false,
          props: { details: this.details },
        })
        return
      }
      this.$buefy.modal.open({
        component: require('~/components/molecules/Team/InvitationCard').default,
        parent: this,
        width: 637,
        props: {
          business: this.selectedBusiness,
          members: this.members,
        },
        canCancel: false,
      })
    },
    doCheckMembersCount() {
      const plan = this.selectedBusiness?.plan || this.selectedBusiness?.Business?.plan || null
      switch (plan) {
        case 'starter':
          if (this.members.length >= 2) {
            this.details = {
              type: 'invite',
              limit: 2,
            }
            return true
          }
          return false

        default:
          return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-team::v-deep {
  min-height: calc(100vh - 505px);
  background-color: $white;

  h1 {
    font-size: 2.8571rem;
    color: $secondary;
    line-height: 1;
  }

  .xm-team-businesses {
    &.mobile {
      display: none;
      margin-bottom: 30px;
    }
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 30px;

    .left-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding-bottom: 5px;

      h1 {
        border-right: 1px solid $secondary;
        padding-right: 20px;
        margin-right: 20px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 2.2857rem;
    }

    .xm-team-businesses {
      &.desktop {
        display: none;
      }

      &.mobile {
        display: block;
      }
    }

    .header {
      margin-bottom: 10px;

      .left-header {
        flex: 10000 1 0;

        h1 {
          border: 0;
          padding-right: 0;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
