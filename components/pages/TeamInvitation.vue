<template lang="pug">
.xp-team-invitation
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XPTeamInvitation',
  created() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  mounted() {
    this.doAcceptTeamInvite()
  },
  methods: {
    async doAcceptTeamInvite() {
      try {
        await this.$apollo.mutate({
          variables: {
            action: 'responseInvite',
            status: 'Active',
            inactiveReason: undefined,
            id: this.$route?.params?.id,
          },
          mutation: gql`
            mutation ($action: String!, $status: String, $inactiveReason: String, $id: String!) {
              editBusinessTeamMember(action: $action, status: $status, inactiveReason: $inactiveReason, id: $id) {
                success
                objectID
              }
            }
          `,
        })

        await this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: false,
        })

        this.$store.commit('app/setCurrentBusiness', null)
        this.doShowAcceptInvitationModal('success', 'You have successfully accepted a team invitation')
      } catch (error) {
        error.graphQLErrors.forEach(async (error) => {
          if (error.message === 'Authentication required for this field.') {
            await this.$store.commit('control/setLoading', {
              name: `app/loading`,
              value: false,
            })
            this.$buefy.modal.open({
              parent: this,
              component: require('~/components/pages/LogIn').default,
              width: 600,
              canCancel: false,
            })
            return
          }

          await this.$store.commit('control/setLoading', {
            name: `app/loading`,
            value: false,
          })

          this.doShowAcceptInvitationModal('error', error.message)
        })
        this.doTrackSegmentError(error, 'Team Invitation')
      }
    },
    doShowAcceptInvitationModal(status, message) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/Team/AcceptInvitation').default,
        parent: this,
        canCancel: false,
        width: 600,
        props: {
          status,
          message,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-team-invitation::v-deep {
  min-height: calc(100vh - 533px);
}
</style>
