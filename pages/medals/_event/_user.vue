<template lang="pug">
XPMedalsUser
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import meta from '~/mixins/meta'
import XPMedalsUser from '~/components/pages/Medals/User'

export default {
  components: { XPMedalsUser },
  mixins: [meta],
  async asyncData({ app, route, redirect }) {
    app?.$app.setPageLoader()
    const slug = route?.params?.event
    const memberRoute = route?.params?.user
    const claimID = route?.query?.claim

    const { getNFTUserMedal } = await app?.$api.getNFTUserMedal({ slug, profilePhotoSize: '100' })
    const memberSlug = getNFTUserMedal?.userSlug

    const medalID = getNFTUserMedal?.id

    if (memberRoute !== memberSlug) redirect('/404')
    if (claimID) {
      if (claimID !== medalID) redirect(`/medals/${slug}/${memberSlug}`)
    }

    return { userMedalDetails: getNFTUserMedal }
  },
  data() {
    return {
      alreadyClickedPopup: false,
      claimPopup: null,
      userDetails: null,
    }
  },
  computed: {
    ...mapGetters({
      getMedalIsClaiming: 'medals/getMedalIsClaiming',
    }),
  },
  watch: {
    currentBusinessID() {
      this.doRetrieveMedalDetails()
    },
    isLoggedIn(value) {
      if (this.getMedalIsClaiming) return
      if (this.$route.query?.claim && value) {
        this.$store.dispatch('auth/logOut')
      }
    },
    '$store.state.control.waiting': {
      deep: true,
      handler(value) {
        if (!value?.['app/loading']) {
          this.doShowMedalClaimPopup()
        }
      },
    },
    $route: {
      deep: true,
      async handler() {
        if (!this.isLoggedIn) return
        await this.doRetrieveMedalDetails()
        await this.doRetrieveMemberDetails()
      },
    },
  },
  created() {
    const photoURL = this.userMedalDetails?.Medal?.Media.filter((media) => {
      return media?.objectType === 'Video'
    })

    const details = this.userMedalDetails

    this.metaTitle = `${details?.firstName} ${details?.lastName} - ${details?.Product?.title}` || ''
    this.metaImage = photoURL[0]?.VideoThumbnail || null
    this.metaDescription = ' '
  },
  beforeMount() {
    window.addEventListener('resize', this.doHandleViewportHeight)
  },
  async mounted() {
    const claimID = this.$route.query?.claim

    if (claimID) {
      if (this.userMedalDetails?.isClaimed) {
        this.$buefy.modal.open({
          parent: this,
          component: require('~/components/dialogs/Medals/Claimed').default,
          width: 700,
          canCancel: false,
        })
      }

      if (this.isLoggedIn) {
        await this.$store.dispatch('auth/logOut')
      }

      this.setMedalClaimDetails(null)
      this.$root.$emit('set/medalClaim/details', this.userMedalDetails)
    } else {
      this.alreadyClickedPopup = true
    }

    this.doHandleViewportHeight()
    this.$appClient.segment.trackPageView({ page: 'User Medal' })
    this.$root.$on('set/click/popup', (value) => {
      this.doSetAlreadyClickedPopup(value)
    })
    this.doRetrieveMemberDetails()
  },
  methods: {
    ...mapActions({
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
    }),
    async doRetrieveMedalDetails() {
      try {
        const slug = this.$route.params?.event
        const { getNFTUserMedal } = await this.$api.getNFTUserMedal({ slug, profilePhotoSize: '100' })
        this.userMedalDetails = getNFTUserMedal
      } catch (error) {
        console.log(error)
      }
    },
    doHandleViewportHeight() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
    },
    doShowMedalClaimPopup() {
      if (this.lt('tabletLG')) return
      if (this.isLoggedIn) return
      if (this.userMedalDetails?.isClaimed) return
      const claimID = this.$route.query?.claim

      this.claimPopup = setTimeout(() => {
        if (this.alreadyClickedPopup) return
        if (claimID === this.userMedalDetails?.id) {
          this.$buefy.modal.open({
            parent: this,
            component: require('~/components/dialogs/Medals/Claim').default,
            width: 700,
            canCancel: false,
          })
        }
      }, 20000)
    },
    doSetAlreadyClickedPopup(value) {
      this.alreadyClickedPopup = value
    },
    async doRetrieveMemberDetails() {
      if (!this.userMedalDetails?.actor) return
      try {
        const actor = this.userMedalDetails?.actor.split(':')
        const actorID = actor[1]
        const { Member } = await this.$api.getMemberProfile({ id: actorID })
        this.userDetails = Member
      } catch (error) {
        console.log(error)
      }
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteLeave(to, from, next) {
    clearTimeout(this.claimPopup)
    next()
  },
}
</script>
