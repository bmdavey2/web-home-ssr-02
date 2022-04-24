<template lang="pug">
.xo-profile-feed
  XOFeedItem(v-for="item in items", :item="item")
</template>

<script>
import XOFeedItem from '~/components/organisms/Feed/Item'
export default {
  name: 'XOProfileFeed',
  components: { XOFeedItem },
  props: {
    items: Array,
  },
}
</script>
