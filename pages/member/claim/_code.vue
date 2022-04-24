<template lang="pug">
.xp-member-claim
</template>

<script>
import gql from 'graphql-tag'
import meta from '~/mixins/meta'

export default {
  mixins: [meta],
  data() {
    return {
      credentials: null,
    }
  },
  created() {
    this.$store.dispatch('auth/logOut')
    this.metaTitle = 'Member Claim'
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  async mounted() {
    await this.doClaimMember()
    this.doLogin()
  },
  methods: {
    async doClaimMember() {
      try {
        const { data } = await this.$apollo.mutate({
          variables: {
            challenge: this.$route.params?.code,
          },
          mutation: gql`
            mutation ($challenge: String!) {
              decodeMemberClaim(challenge: $challenge) {
                objectID
                objectType
                success
              }
            }
          `,
        })
        const url = data?.decodeMemberClaim?.objectID
        const urlSearchParams = new URLSearchParams(url)
        this.credentials = Object.fromEntries(urlSearchParams.entries())
      } catch (error) {
        error.graphQLErrors.forEach((error) => {
          this.$toast.error(error.message, { position: 'top-center' })
        })
        this.doTrackSegmentError(error, 'Business Claim')
      }
    },
    async doLogin() {
      try {
        const result = await this.$store.dispatch('auth/logInWithEmail', {
          email: this.credentials?.email,
          password: this.credentials?.password,
        })
        this.doAfterLogin(result?.user?.uid)
      } catch (error) {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/too-many-requests') {
          await this.$store.commit('control/setLoading', {
            name: `app/loading`,
            value: false,
          })
          this.$buefy.modal.open({
            component: require('~/components/molecules/MemberClaim/InvalidLink').default,
            parent: this,
            canCancel: false,
            width: 500,
          })
        }
        this.doTrackSegmentError(error, 'RaceRoster Login')
      }
    },
    async doAfterLogin(UserID) {
      const { data } = await this.$apollo.query({
        variables: {
          UserID,
        },
        query: gql`
          query ($UserID: String) {
            Member(UserID: $UserID) {
              slug
              claimed
            }
          }
        `,
      })
      await this.$appClient.segment.trackRaceRosterLogin()

      if (data?.Member?.claimed) {
        await this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: false,
        })
        this.$buefy.modal.open({
          component: require('~/components/molecules/MemberClaim/InvalidLink').default,
          parent: this,
          canCancel: false,
          width: 500,
        })
        return
      }

      this.$router.push({
        path: `/p/${data?.Member?.slug}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-member-claim::v-deep {
  min-height: calc(100vh - 505px);
}
</style>
