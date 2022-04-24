<template lang="pug">
.reviews.px-2
  XMProfileReviewSummary(:profile="profile" @loadReviews="loadNewReview")
  XMProfileReviewFilter(@DoUpdateFilterValue="rate = $event")
  template(v-if="isRetrieving")
    ._loader
      .mr-3
        b-skeleton(width="35px" height="35px" circle)
      .is-flex-width-auto
        b-skeleton(width="100%")
        b-skeleton(width="100%")
        b-skeleton(width="80%")
  template(v-else)
    template(v-if="reviews.length > 0")
      XMProfileReviewItem(v-for="(review, index) in reviews", :key="index", :review="review")
    template(v-else)
      .is-size-4.has-text-centered No reviews yet.
</template>

<script>
import gql from 'graphql-tag'
import XMProfileReviewSummary from '~/components/molecules/Profile/Reviews/Summary'
import XMProfileReviewFilter from '~/components/molecules/Profile/Reviews/Filter'
import XMProfileReviewItem from '~/components/molecules/Profile/Reviews/Item'

export default {
  name: 'XOProfileReviews',
  components: { XMProfileReviewItem, XMProfileReviewFilter, XMProfileReviewSummary },
  props: {
    profile: Object,
  },
  data() {
    return {
      isLiked: false,
      isRetrieving: true,
      reviews: [],
      slug: this.$route.params.slug,
      rate: null,
      addedReview: 0,
      addedRate: 0,
    }
  },
  watch: {
    rate() {
      this.loadReviews()
    },
  },
  mounted() {
    this.loadReviews()
  },
  methods: {
    loadNewReview() {
      this.addedReview++
      this.loadReviews()
    },
    async loadReviews() {
      this.isRetrieving = true
      try {
        if (this.rate?.value === 'Show All' || this.rate === 'Show All') this.rate = null

        const { data } = await this.$apollo.query({
          variables: { slug: this.slug, rating: this.rate },
          fetchPolicy: 'no-cache',
          query: gql`
            query ($slug: String, $rating: Int) {
              Business(slug: $slug) {
                Reviews(rating: $rating) {
                  count
                  next
                  items {
                    id
                    actorID
                    actorType
                    content
                    rating
                    Member {
                      name
                      profilePhotoURL
                    }
                    TargetBusiness {
                      name
                      profilePhotoURL
                    }
                  }
                }
              }
            }
          `,
        })
        this.reviews = data?.Business?.Reviews?.items || []
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.reviews::v-deep {
  ._loader {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
