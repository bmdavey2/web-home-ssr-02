<template lang="pug">
.xp-event-medal
  XPMedalsPast(v-if="MedalDetails.isFinished")
  XPEventMedal(v-else)
</template>

<script>
import XPEventMedal from '~/components/pages/EventMedal'
import XPMedalsPast from '~/components/pages/Medals/Past'

import meta from '~/mixins/meta'
export default {
  components: { XPEventMedal, XPMedalsPast },
  mixins: [meta],
  async asyncData({ app, route, redirect }) {
    app.$app.setPageLoader()
    const slug = route?.params?.slug
    const { getNFTMedal } = await app?.$api.getNFTMedal({ slug })

    if (getNFTMedal === null) {
      redirect('/404')
    }
    return { MedalDetails: getNFTMedal }
  },
  watch: {
    currentBusinessID() {
      this.doRetrieveMedalDetails()
    },
  },
  created() {
    const photoURL = this.MedalDetails?.Media.filter((media) => {
      return media?.objectType === 'Video'
    })

    this.metaTitle = this.MedalDetails?.Product?.title || ''
    this.metaImage = photoURL[0]?.VideoThumbnail || null
    this.metaDescription = '&nbsp;'
  },
  beforeMount() {
    window.addEventListener('resize', this.doHandleViewportHeight)
  },
  mounted() {
    this.doHandleViewportHeight()
    this.$appClient.segment.trackPageView({ page: 'Event Medal' })
  },
  methods: {
    async doRetrieveMedalDetails() {
      const slug = this.$route.params?.slug
      const { getNFTMedal } = await this.$api.getNFTMedal({ slug })
      this.MedalDetails = getNFTMedal
    },
    doHandleViewportHeight() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-event-medal::v-deep {
  min-height: calc(100vh - 533px);
}
</style>
