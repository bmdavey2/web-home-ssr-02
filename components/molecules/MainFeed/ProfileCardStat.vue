<template lang="pug">
.xm-main-feed-profile-card-stat.level-item.has-text-centered
  div
    p.heading {{ label }}
    p.title {{ count }}
</template>

<script>
export default {
  name: 'XMMainFeedProfileCardStat',
  props: {
    label: String,
    icon: String,
    count: Number,
  },
}
</script>

<style lang="sass" scoped>
.xm-main-feed-profile-card-stat::v-deep
  .heading
    font-size: 10px
  .title
    font-size: 16px
</style>
