<template lang="pug">
.xp-nft-medals
  XONFTMedalsIntroduction(:vote-status="voteStatus" @DoUpdateVoteStatus="voteStatus = $event")
  XONFTMedalsPartners
  XONFTMedalsDigitalWorld
  XONFTMedalsSection4
  XONFTMedalsSection5
  XONFTMedalsSection6(:vote-status="voteStatus" @DoUpdateVoteStatus="voteStatus = $event")
  XONFTMedalsSection7
  XONFTMedalsSection8(:vote-status="voteStatus" @DoUpdateVoteStatus="voteStatus = $event")
  XDMedal(v-show="showModalMedal", :url="videoURL")
</template>

<script>
import gql from 'graphql-tag'
import XONFTMedalsIntroduction from '~/components/organisms/NFTMedals/Introduction'
import XONFTMedalsPartners from '~/components/organisms/NFTMedals/Partners'
import XONFTMedalsDigitalWorld from '~/components/organisms/NFTMedals/DigitalWorld'
import XONFTMedalsSection4 from '~/components/organisms/NFTMedals/Section4'
import XONFTMedalsSection5 from '~/components/organisms/NFTMedals/Section5'
import XONFTMedalsSection8 from '~/components/organisms/NFTMedals/Section8'
import XONFTMedalsSection7 from '~/components/organisms/NFTMedals/Section7'
import XONFTMedalsSection6 from '~/components/organisms/NFTMedals/Section6'
import XDMedal from '~/components/dialogs/Medal'

export default {
  name: 'XPNFTMedals',
  components: {
    XONFTMedalsIntroduction,
    XONFTMedalsPartners,
    XONFTMedalsDigitalWorld,
    XONFTMedalsSection4,
    XONFTMedalsSection5,
    XONFTMedalsSection6,
    XONFTMedalsSection7,
    XONFTMedalsSection8,
    XDMedal,
  },
  data() {
    return {
      voteStatus: '',
      feedback: '',
      showModalMedal: false,
      videoURL: 'https://api.activeplace.com/videos/nftmedal.m3u8/Final%20with%20BG.m3u8',
    }
  },
  watch: {
    currentBusinessID() {
      this.doRetrieveVoteStatus()
    },
    isLoggedIn() {
      this.doRetrieveVoteStatus()
    },
    showModalMedal(value) {
      if (value) {
        document.querySelector('html').style.overflowY = 'hidden'
      } else {
        document.querySelector('html').removeAttribute('style')
      }
    },
  },
  mounted() {
    this.doRetrieveVoteStatus()
    this.$root.$on('vote/up', (feedback) => {
      this.feedback = feedback
      this.doUpvote()
    })
    this.$root.$on('vote/down', (feedback) => {
      this.feedback = feedback
      this.doDownVote()
    })

    if (this.lt('tabletLG')) {
      this.$zendesk.hide()
    }

    this.$root.$on('show/modal/medal', (value) => {
      this.doToggleModalMedal(value)
    })
  },
  methods: {
    async doRetrieveVoteStatus() {
      try {
        const {
          data: { getNFTVoteStatus },
        } = await this.$apollo.query({
          context: this.getGraphQLContext(),
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              getNFTVoteStatus {
                type
                feedback
              }
            }
          `,
        })

        this.voteStatus = getNFTVoteStatus?.type || ''
      } catch (error) {
        this.doTrackSegmentError(error, 'NFT Vote')
      }
    },
    async doUpvote() {
      try {
        await this.$apollo.mutate({
          variables: {
            feedback: this.feedback,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($feedback: String) {
              upvoteNFT(feedback: $feedback) {
                timestamp
                success
                objectID
                objectType
              }
            }
          `,
        })
      } catch (error) {
        error.graphQLErrors.forEach((error) => {
          this.$toast.error(error.message, { duration: 5000, position: 'top-center' })
        })
        this.doTrackSegmentError(error, 'NFT Vote')
      }
    },
    async doDownVote() {
      try {
        await this.$apollo.mutate({
          variables: {
            feedback: this.feedback,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($feedback: String) {
              downvoteNFT(feedback: $feedback) {
                timestamp
                success
                objectID
                objectType
              }
            }
          `,
        })
      } catch (error) {
        error.graphQLErrors.forEach((error) => {
          this.$toast.error(error.message, { duration: 5000, position: 'top-center' })
        })
        this.doTrackSegmentError(error, 'NFT Vote')
      }
    },
    doToggleModalMedal(value) {
      this.showModalMedal = value
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-nft-medals::v-deep {
  min-height: calc(100vh - 533px);

  h1 {
    font-size: 5rem;

    @include max-width(1024px) {
      font-size: 2.8571rem;
    }

    @include max-width(767px) {
      font-size: 2.2857rem;
    }
  }

  h3 {
    font-size: 2.2857rem;
    letter-spacing: -0.8px;
    margin-bottom: 20px;
    color: $secondary;

    @include max-width(767px) {
      font-size: 1.7143rem;
    }
  }

  img {
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
