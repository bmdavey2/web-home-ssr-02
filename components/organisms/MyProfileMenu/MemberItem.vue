<template lang="pug">
.flex-center(@click="$emit('click')" v-if="!isRetrieving")
  .flex-auto
    XAProfileAvatar.mr-4(size="48px", :image="profilePhotoURL", :label="initials")
  .flex-grow
    .is-flex.align-center
      div(style="font-size: 16px; line-height: 16px") {{ name }}
      //- .ml-1(v-if="badge"): img(:src="require(`~/assets/icons/mentor/${badge}.svg`)" width="20" height="20")
    div(style="font-size: 12px; font-weight: 300") {{ email }}
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XOMainFeedMyProfileMenuMemberItem',
  components: { XAProfileAvatar },
  data() {
    return {
      profile: null,
      isRetrieving: true,
    }
  },
  computed: {
    ...mapGetters({
      getUserOwnerDetails: 'user/getUserOwnerDetails',
    }),
    // badge() {
    //   return this.profile?.Mentor?.badge || null
    // },
    initials() {
      return (
        this.profile?.name
          ?.split(' ')
          ?.map((x) => x.substring(0, 1))
          ?.slice(0, 2)
          ?.join('') || 'AP'
      )
    },
    email() {
      return this.$store.state.auth.email
    },
    profilePhotoURL() {
      return this.profile?.profilePhotoURL || this.getUserOwnerDetails?.profilePhotoURL || null
    },
    name() {
      return this.profile?.name || this.getUserOwnerDetails?.name || null
    },
  },
  mounted() {
    this.doRetrieveMainUser()
  },
  methods: {
    async doRetrieveMainUser() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Me {
                Profile {
                  Member {
                    id
                    slug
                    name
                    profilePhotoURL
                  }
                }
              }
            }
          `,
        })
        this.profile = data?.Me?.Profile?.Member
        this.isRetrieving = false
      } catch (error) {
        this.doTrackSegmentError(error)
      }
      this.$emit('DoRetrieveProfile', this.profile)
    },
  },
  apollo: {
    image: {
      query: gql`
        query {
          Me {
            Profile {
              Member {
                profilePhotoURL
              }
            }
          }
        }
      `,
      update(data) {
        return data.Me?.Profile?.Member?.profilePhotoURL
      },
    },
  },
}
</script>
