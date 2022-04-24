<template lang="pug">
.xo-profile-about-member
  .box
    .flex.align-center
      img(src="~/assets/images/Profile/bio.svg" width="44" height="44")
      .header BIO
    .content-text.px-2.py-2(style="white-space: pre-line" v-linkified) {{ biography }}

  XOProfileAchievements(:medals-count="medalsCount" v-if="medalsCount > 0")
  XOProfileExploreEvents(style="margin-bottom: 1.5rem" v-else)

  .box
    template(v-if="isComplete ? true : isPartialComplete && !isMe")
      .flex.align-center(v-if="isPartialComplete")
        img(src="~/assets/images/Profile/heart.svg" width="44" height="44")
        .header MY ACTIVEPLACE 5:
      .content-header.px-2(v-if="ap5InspiredBy") I'm inspired by
      .content-text.px-4.py-2(v-html="ap5InspiredBy" v-if="ap5InspiredBy")
      .content-header.px-2(v-if="ap5PassionateAbout") I'm passionate about
      .content-text.px-4.py-2(v-html="ap5PassionateAbout" v-if="ap5PassionateAbout")
      .content-header.px-2(v-if="ap5FavoriteEvents") My favourite events
      .content-text.px-4.py-2(v-html="ap5FavoriteEvents" v-if="ap5FavoriteEvents")
      .content-header.px-2(v-if="ap5TrainingWith") I train with
      .content-text.px-4.py-2(v-html="ap5TrainingWith" v-if="ap5TrainingWith")
      .content-header.px-2(v-if="ap5ToughestThing") The toughest thing I've overcome
      .content-text.px-4.py-2(v-if="ap5ToughestThing") {{ ap5ToughestThing }}
    template(v-if="!isComplete && isMe")
      .flex.align-center
        img(src="~/assets/images/Profile/heart.svg" width="44" height="44")
        .header MY ACTIVEPLACE 5:
      .flex.align-center.is-justify-content-center.is-flex-direction-column
        p.mt-3.complete-header.has-text-centered Completing your profile significantly increases your chance of being found by new customers, not to mention starting a life-long relationship with them.
        img.py-5(src="~assets/images/Profile/CompleteMember.svg")
        b-button.mb-5.has-text-centered(
          type="is-primary"
          tag="router-link",
          :to="`/p/${slug}/edit?tab=about`"
          outlined) COMPLETE MY PROFILE

  XOProfileExploreEvents(v-if="medalsCount > 0")

  //- XOProfileAchievements(
    :profile="Achievements",
    :slug="currentProfile"
    @loadAchievement="loadAchievement"
    v-if="renderComponent")
</template>

<script>
import gql from 'graphql-tag'
import XOProfileAchievements from '~/components/organisms/v2/Profile/Achievements'
import XOProfileExploreEvents from '~/components/organisms/Profile/ExploreEvents'

export default {
  name: 'XOProfileAboutMember',
  components: { XOProfileAchievements, XOProfileExploreEvents },
  props: {
    profile: Object,
    isMe: { type: Boolean, default: false },
    medalsCount: Number,
  },
  data() {
    return {
      Achievements: [],
      renderComponent: true,
      currentProfile: null,
    }
  },
  computed: {
    biography() {
      const element = document.createElement('div')
      element.innerHTML = this.profile?.biography
      return element.textContent
    },
    ap5InspiredBy() {
      return this.profile?.ap5InspiredBy
    },
    ap5PassionateAbout() {
      return this.profile?.ap5PassionateAbout
    },
    ap5FavoriteEvents() {
      return this.profile?.ap5FavoriteEvents
    },
    ap5TrainingWith() {
      return this.profile?.ap5TrainingWith
    },
    ap5ToughestThing() {
      const element = document.createElement('div')
      element.innerHTML = this.profile?.ap5ToughestThing
      return element.textContent
    },
    isComplete() {
      return (
        this.ap5InspiredBy &&
        this.ap5PassionateAbout &&
        this.ap5FavoriteEvents &&
        this.ap5TrainingWith &&
        this.ap5ToughestThing
      )
    },
    isPartialComplete() {
      return (
        this.ap5InspiredBy ||
        this.ap5PassionateAbout ||
        this.ap5FavoriteEvents ||
        this.ap5TrainingWith ||
        this.ap5ToughestThing
      )
    },
    slug() {
      return this.profile?.slug
    },
  },
  mounted() {
    // this.loadAchievement()
    this.getCredentials()
  },
  methods: {
    async getCredentials() {
      const data = await this.getMyDisplayProfile()
      this.currentProfile = data?.slug
    },
    async loadAchievement() {
      try {
        const { data } = await this.$apollo.query({
          variables: { slug: this.slug },
          fetchPolicy: 'no-cache',
          query: gql`
            query ($slug: String!) {
              Member(slug: $slug) {
                Achievements {
                  id
                  title
                  summary
                  completionTimeInSeconds
                  dateAccomplished
                  collaboratedWith
                  description
                  CategoryIDs
                  Categories {
                    id
                    name
                  }
                  Media {
                    objectID
                    objectType
                    PhotoURL
                    VideoURL
                  }
                }
              }
            }
          `,
        })

        this.Achievements = []
        this.Achievements = data.Member?.Achievements

        this.renderComponent = false

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-profile-about-member::v-deep {
  .header {
    text-transform: uppercase;
    color: #0c353e;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.8px;
  }

  .content-header {
    color: #0c353e;
    font-size: 18px;
  }

  .content-text {
    font-size: 14px;
    font-weight: 100;
    color: #65676b;
  }

  .complete-header {
    max-width: 450px;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;

    @media (max-width: 488px) {
      font-size: 13px !important;
    }
  }
}
</style>
