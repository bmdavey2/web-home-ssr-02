<template lang="pug">
.xm-feed-item-categories.flex.is-user-select-none.px-3
  .item.is-cursor-pointer.mr-2.mb-2(v-for="{ id, name } in categories", :key="id" @click="clickCategory(id)") {{ name }}
</template>

<script>
import uniqBy from 'lodash/uniqBy'
export default {
  name: 'XMFeedItemCategories',
  props: {
    item: Object,
  },
  computed: {
    categories() {
      return uniqBy(this.item?.Categories || [], (x) => x.id)
    },
  },
  methods: {
    clickCategory(id) {
      this.$store.commit('app/setSelectedCategory', id)
    },
  },
}
</script>

<style lang="sass" scoped>
.xm-feed-item-categories::v-deep
  flex-wrap: wrap
  flex: 10000 1 0
  align-items: flex-start

  .item
    font-size: 12px
    padding: 2px 10px
    background: #EEF1F1
    color: #0C353E
    border-radius: 11px
</style>
