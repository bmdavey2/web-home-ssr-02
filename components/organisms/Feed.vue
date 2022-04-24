<template lang="pug">
.xt-feed(v-infinite-scroll="onNext", :infinite-scroll-disabled="loading", :infinite-scroll-distance="scrollDistance")
  XOFeedItem(
    v-for="(item, i) in items",
    :key="item.id",
    :item="item",
    :position="i + 1",
    :loading="loading"
    v-if="(item.Article || item.Update || item.Achievement) !== null")
  XOFeedItem(v-for="n in 1", :key="n" v-show="hasMore")
  template(v-if="!hasMore && !items.length"): XANoResultFound
</template>

<script>
import XOFeedItem from '~/components/organisms/Feed/Item'
import XANoResultFound from '~/components/atoms/NoResultFound'

export default {
  name: 'XOFeed',
  components: { XOFeedItem, XANoResultFound },
  props: {
    loading: Boolean,
    scrollDistance: { type: Number, default: () => 700 },
    items: { type: Array, default: () => [] },
    hasMore: Boolean,
  },
  data() {
    return {
      position: null,
    }
  },
  methods: {
    onNext() {
      this.$emit('next')
    },
  },
}
</script>
