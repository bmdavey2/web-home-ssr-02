<template lang="pug">
.xo-feed-item-content
  template(v-if="item")
    template(v-if="objectType === 'Update'")
      XMFeedItemContentUpdate(:value="object", :plan="plan", :isMember="isMember")
    template(v-else-if="objectType === 'Article'")
      XMFeedItemContentArticle(:value="object")
    //- template(v-else-if="objectType === 'Achievement'")
      XMFeedItemContentAchievement(:value="object")
  template(v-else)
    .my-4
      div
        b-skeleton(width="100%")
      div
        b-skeleton(width="60%")
      .my-2
        b-skeleton(width="100%" height="300")
      .flex
        .flex-grow
        .flex-auto
          b-skeleton(width="70")
</template>

<script>
import XMFeedItemContentUpdate from '~/components/molecules/FeedItem/Content/Update'
import XMFeedItemContentArticle from '~/components/molecules/FeedItem/Content/Article'
import XMFeedItemContentAchievement from '~/components/molecules/FeedItem/Content/Achievement'
export default {
  name: 'XMFeedItemContent',
  components: { XMFeedItemContentAchievement, XMFeedItemContentArticle, XMFeedItemContentUpdate },
  props: {
    item: Object,
  },
  computed: {
    object() {
      if (!this.item) return null
      return this.item[this.item.objectType]
    },
    plan() {
      return this.item?.Business?.plan || null
    },
    isMember() {
      return this.item?.Member
    },
    objectType() {
      return this.item?.objectType
    },
  },
}
</script>
