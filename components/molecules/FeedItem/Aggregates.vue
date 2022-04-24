<template lang="pug">
.xm-feed-item-content-aggregates.flex.align-center(style="font-size: 12px")
  .flex-auto.pr-3
    .flex
      template(v-if="item")
        img(src="~assets/icons/highfive.svg" style="width: 14px; height: 14px")
        span.mx-2 {{ highFives }}
      template(v-else)
        b-skeleton(width="40")
  .flex-auto.pr-3.is-cursor-pointer(@click="$emit('comment')")
    .flex
      template(v-if="item")
        img(src="~assets/icons/comment.svg" style="width: 14px; height: 14px")
        span.mx-2 {{ comments }}
      template(v-else)
        b-skeleton(width="40")
</template>

<script>
export default {
  name: 'XMFeedItemAggregates',
  props: {
    item: Object,
    addHighFives: { type: Number, default: 0 },
    addComments: { type: Number, default: 0 },
  },
  computed: {
    aggregates() {
      return this.item?.Aggregates
    },
    highFives() {
      return (this.aggregates?.likes || 0) + this.addHighFives
    },
    comments() {
      return (this.aggregates?.comments || 0) + this.addComments
    },
  },
}
</script>
