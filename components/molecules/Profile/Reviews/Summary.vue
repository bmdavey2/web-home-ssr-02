<template lang="pug">
.summary.mb-5
  .is-flex.is-flex-wrap-wrap.is-justify-content-space-between.is-align-items-center
    .count
      .reviews.mr-5
        ._label.mr-2 Reviews
        ._value.is-size-2 {{ reviewsCount }}
      .rating
        ._label.mr-2 Rating
        ._value.is-size-2.mr-2 {{ ratingsCount }}
        .star.pb-2: b-rate(v-model="ratingsCount" disabled)
    .actions(v-if="!isBusiness")
      b-button.is-uppercase(type="is-primary" outlined @click.prevent="doShowWriteReviewModal()") Leave a Review
</template>

<script>
import XMProfileReviewBusiness from '~/components/molecules/Profile/Reviews/BusinessReview'
export default {
  name: 'XMProfileReviewSummary',
  components: { XMProfileReviewBusiness },
  props: {
    profile: Object,
  },
  computed: {
    aggregates() {
      return this.profile?.Aggregates
    },
    reviewsCount() {
      return parseFloat(this.aggregates?.reviews || 0) + parseFloat(this.$parent.addedReview)
    },
    ratingsCount() {
      return parseFloat((parseFloat(this.aggregates?.rating || 0) + parseFloat(this.$parent.addedRate)).toFixed(1))
    },
    isBusiness() {
      return this.currentBusinessID
    },
    businessName() {
      return this.profile?.name || 'ActivePlace Member'
    },
    businessID() {
      return this.profile?.id
    },
  },
  methods: {
    doShowWriteReviewModal() {
      if (this.isLoggedIn) {
        this.$buefy.modal.open({
          parent: this,
          component: XMProfileReviewBusiness,
          width: 600,
          fullScreen: this.lt('tabletLG'),
          props: {
            businessName: this.businessName,
            businessID: this.businessID,
          },
          events: {
            loadReviews: (value) => {
              this.$emit('loadReviews', value)
            },
          },
        })
      } else {
        this.showSignUpNagDialog()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.summary::v-deep {
  .count {
    display: flex;
    flex-wrap: wrap;

    .reviews,
    .rating {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      ._label {
        color: $grey;
        font-weight: 300;
      }

      ._value {
        color: $secondary;
        font-weight: 500;
      }
    }
  }
}
</style>
