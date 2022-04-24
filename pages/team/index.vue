<template lang="pug">
XPTeam(:members="members", :businesses="businesses", :current-member="currentMember", :is-retrieving="isRetrieving")
</template>

<script>
import gql from 'graphql-tag'
import meta from '~/mixins/meta'
import XPTeam from '~/components/pages/Team'
export default {
  middleware: ['businessOnly'],
  components: { XPTeam },
  mixins: [meta],
  data() {
    return {
      members: [],
      businesses: [],
      currentMember: null,
      isRetrieving: true,
    }
  },
  async mounted() {
    await this.doRetrieveBusinesses()
    await this.doRetrieveMembers()
    this.$root.$on('team/member/retrieve', (businessID) => {
      this.doRetrieveMembers(businessID)
    })
    this.doCheckIfMember()
  },
  created() {
    this.metaTitle = 'Team'
  },
  methods: {
    async doRetrieveMembers(businessID) {
      const loader = this.$buefy.loading.open()

      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            businessID: businessID || this.currentBusinessID || this.businesses[0]?.Business?.id,
            count: null,
            offset: null,
          },
          query: gql`
            query ($businessID: String!, $count: Int, $offset: Int) {
              getTeamMembers(businessID: $businessID, count: $count, offset: $offset) {
                count
                next
                items {
                  id
                  email
                  inactiveReason
                  invitedBy
                  role
                  status
                  Member {
                    id
                    name
                    profilePhotoURL
                  }
                  Business {
                    id
                    name
                    profilePhotoURL
                  }
                }
              }
            }
          `,
        })
        this.members = data?.getTeamMembers?.items
      } catch (error) {
        this.doTrackSegmentError(error, 'Team')
      } finally {
        loader.close()
      }
    },
    async doRetrieveBusinesses() {
      try {
        const { data } = await this.$apollo.query({
          query: gql`
            query {
              Me {
                BusinessRoles {
                  Business {
                    id
                    name
                    profilePhotoURL
                    plan
                  }
                }
                Profile {
                  Member {
                    id
                  }
                }
              }
            }
          `,
        })
        this.businesses = data?.Me?.BusinessRoles
        this.currentMember = data?.Me?.Profile?.Member
      } catch (error) {
        this.doTrackSegmentError(error, 'Team')
      }
    },
    async doCheckIfMember() {
      this.isRetrieving = true

      const memberIDs = await this.members.map((member) => {
        return member?.Member?.id
      })

      if (memberIDs.includes(this.currentMember?.id)) {
        this.isRetrieving = false
        return
      }

      await this.$store.commit('app/clearCurrentBusiness')
      location.href = '/my-feed'
    },
  },
}
</script>
