<template lang="pug">
.xt-feed-item-page.container.pt-4
  .columns
    .column.is-3
      XOProfileFeedInfoCard(:profile="profile")
      XOProfileCategoriesCard.mt-4(:profile="profile")
    .column.is-6
      slot
    .column.is-3
      XOMainFeedRecommendedProfiles
</template>

<script>
import XOProfileFeedInfoCard from '~/components/organisms/Profile/FeedInfoCard'
import XOMainFeedRecommendedProfiles from '~/components/organisms/MainFeed/RecommendedProfiles'
import XOProfileCategoriesCard from '~/components/organisms/Profile/CategoriesCard'
export default {
  name: 'XTFeedItemPage',
  components: { XOProfileCategoriesCard, XOMainFeedRecommendedProfiles, XOProfileFeedInfoCard },
  props: {
    profile: Object,
  },
}
</script>
