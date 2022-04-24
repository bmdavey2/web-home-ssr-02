<template lang="pug">
XAProfileAvatar(v-bind="$attrs", :image="image", :label="label")
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
export default {
  name: 'XOMyProfileAvatar',
  components: { XAProfileAvatar },
  data() {
    return {
      profile: null,
      business: null,
    }
  },
  computed: {
    ...mapGetters({
      getUserOwnerDetails: 'user/getUserOwnerDetails',
    }),
    image() {
      if (this.currentBusinessID !== null) return this.business?.profilePhotoURL || null
      return this.profile?.profilePhotoURL || this.getUserOwnerDetails?.profilePhotoURL || null
    },
    label() {
      const initials = this.business?.name || this.profile?.name || this.getUserOwnerDetails?.name || ''
      if (!initials) return ''
      return initials
        .split(' ')
        .map((x) => x.substring(0, 1))
        .slice(0, 2)
        .join('')
    },
  },
  watch: {
    currentBusinessID() {
      this.doRetrieveBusiness()
      this.doRetrieveProfile()
    },
  },
  mounted() {
    this.doRetrieveBusiness()
    this.doRetrieveProfile()
  },
  methods: {
    async doRetrieveBusiness() {
      if (this.currentBusinessID === null || this.currentBusinessID === undefined) {
        this.business = null
        return
      }
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            id: this.currentBusinessID,
          },
          query: gql`
            query ($id: String!) {
              Business(id: $id) {
                profilePhotoURL
                name
              }
            }
          `,
        })
        this.business = data?.Business
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    async doRetrieveProfile() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Me {
                Profile {
                  objectType
                  Member {
                    name
                    profilePhotoURL
                  }
                }
              }
            }
          `,
        })
        this.profile = data?.Me?.Profile?.Member
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
  apollo: {
    avatar: {
      query: gql`
        query {
          Me {
            Profile {
              objectType
              Member {
                name
                profilePhotoURL
              }
              Business {
                name
                profilePhotoURL
              }
            }
          }
        }
      `,
      skip() {
        return !!this.currentBusiness || !this.isLoggedIn
      },
      update(data) {
        if (!data.Me?.Profile) return {}
        const object = data.Me.Profile[data.Me.Profile.objectType]
        return {
          image: object?.profilePhotoURL,
          label: object?.name,
        }
      },
    },
  },
}
</script>
