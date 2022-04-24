<template lang="pug">
.xp-update.pt-5
  .container
    .columns
      .column.is-3
      .column.is-6
        XOFeedItem(:item="null")
      .column.is-3
</template>

<script>
import XOFeedItem from '~/components/organisms/Feed/Item'
export default {
  components: { XOFeedItem },
}
</script>
