<template lang="pug">
.home-page
  XOHomeLoginBanner.mb-5
  .container.my-5.is-max-widescreen
    XOHomeCarousel(
      v-if="popularEndurance.length"
      title="Popular & upcoming endurance events"
      link="/marketplace"
      type="event",
      :items="popularEndurance")
    XOHomeCarousel(
      v-if="featuredArticles.length"
      title="Featured articles"
      type="article"
      link="/discover",
      :items="featuredArticles")

  XMHomeActiveBanner
  .container.is-max-widescreen
    XOHomeCarousel(
      v-if="activePrograms.length"
      title="Active Programs"
      link="/marketplace/active-programs"
      type="event",
      :items="activePrograms")
    XOHomeCarousel(
      link="/"
      v-if="recommendedMembers.length"
      title="Suggested people to follow"
      type="suggested"
      itemType="Member",
      :items="recommendedMembers")
    XOHomeCarousel(
      v-if="activeExperience.length"
      title="Active Experiences"
      link="/marketplace/active-experiences"
      type="event",
      :items="activeExperience")
    XOHomeCarousel(
      link="/"
      v-if="recommendedBusiness.length"
      title="Suggested businesses to follow"
      type="suggested"
      itemType="Business",
      :items="recommendedBusiness")
    .columns.banners.mb-5
      .column
        XMHomeAppBanner
</template>

<script>
import gql from 'graphql-tag'
import fragmentProductItemContents from '~/assets/graphql/fragmentProductItemContents.graphql'
import XOHomeLoginBanner from '~/components/organisms/HomePage/LoginBanner'
import XOHomeCarousel from '~/components/organisms/HomePage/CarouselEvents'
import XMHomeActiveBanner from '~/components/molecules/HomePage/ActiveBanner'
import XMHomeMentorBanner from '~/components/molecules/HomePage/MentorBanner'
import XMHomeAppBanner from '~/components/molecules/HomePage/AppBanner'

export default {
  name: 'XPNewHomePage',
  components: { XMHomeAppBanner, XMHomeMentorBanner, XMHomeActiveBanner, XOHomeCarousel, XOHomeLoginBanner },
  data() {
    return {
      error: null,
      popularEndurance: [],
      activePrograms: [],
      featuredArticles: [],
      recommendedMembers: [],
      recommendedBusiness: [],
      activeExperience: [],
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.loadEndurance()
      this.loadArticles()
      this.loadPrograms()

      this.loadMembers()
      this.loadBusiness()
      this.loadExperience()
    },
    async loadEndurance() {
      try {
        // TODO: add loading behavior
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            category: null,
            count: 10,
            preferredCurrency: 'AUD',
          },
          query: gql`
            ${fragmentProductItemContents}
            query ($count: Int, $category: String, $preferredCurrency: String) {
              Products(count: $count, category: $category, preferredCurrency: $preferredCurrency) {
                count
                next
                ...ProfileProductContents
              }
            }
          `,
        })
        this.popularEndurance = data.Products?.items || []
      } catch (error) {
        this.error = error
        this.doTrackSegmentError(error, 'HomePage')
      } finally {
        // TODO: add loading behavior
      }
    },
    async loadMembers() {
      try {
        // TODO: add loading behavior
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              RecommendedMembers(count: 10, skip: 0) {
                id
                firstName
                lastName
                coverPhotoURL(type: "250")
                profilePhotoURL(type: "100")
                slug
              }
            }
          `,
        })
        this.recommendedMembers = data.RecommendedMembers || []
      } catch (error) {
        this.error = error
        this.doTrackSegmentError(error, 'HomePage')
      } finally {
        // TODO: add loading behavior
      }
    },
    async loadBusiness() {
      try {
        // TODO: add loading behavior
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              RecommendedBusinesses(count: 10, skip: 0) {
                id
                name
                isFollowed
                coverPhotoURL(type: "250")
                profilePhotoURL(type: "100")
                slug
              }
            }
          `,
        })
        this.recommendedBusiness = data.RecommendedBusinesses || []
      } catch (error) {
        this.error = error
        this.doTrackSegmentError(error, 'HomePage')
      } finally {
        // TODO: add loading behavior
      }
    },
    async loadArticles() {
      try {
        // TODO: add loading behavior
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Articles(sortBy: "trending", count: 10, offset: 0, categories: null) {
                count
                next
                items {
                  id
                  slug
                  title
                  coverPhotoURL(type: "450")
                  Categories {
                    id
                    name
                  }
                  UserID
                }
              }
            }
          `,
        })
        this.featuredArticles = data.Articles?.items || []
      } catch (error) {
        this.error = error
        this.doTrackSegmentError(error, 'HomePage')
      } finally {
        // TODO: add loading behavior
      }
    },
    async loadPrograms() {
      // TODO: add loading behavior
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            type: 'Active Program',
            count: 10,
            preferredCurrency: 'AUD',
          },
          query: gql`
            ${fragmentProductItemContents}
            query ($count: Int, $type: String, $preferredCurrency: String) {
              Products(count: $count, type: $type, preferredCurrency: $preferredCurrency) {
                count
                next
                ...ProfileProductContents
              }
            }
          `,
        })
        this.activePrograms = data.Products?.items || []
      } catch (error) {
        this.error = error
        this.doTrackSegmentError(error, 'HomePage')
      } finally {
        // TODO: add loading behavior
      }
    },
    async loadExperience() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            type: 'Experience',
            count: 10,
            preferredCurrency: 'AUD',
          },
          query: gql`
            ${fragmentProductItemContents}
            query ($count: Int, $type: String, $preferredCurrency: String) {
              Products(count: $count, type: $type, preferredCurrency: $preferredCurrency) {
                count
                next
                ...ProfileProductContents
              }
            }
          `,
        })
        this.activeExperience = data.Products?.items || []
      } catch (error) {
        this.error = error
        this.doTrackSegmentError(error, 'HomePage')
      } finally {
        // TODO: add loading behavior
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.banners {
  margin-top: 100px;
}
@media (max-width: '520px') {
  .banners {
    margin-top: 50px !important;
  }
}
</style>
