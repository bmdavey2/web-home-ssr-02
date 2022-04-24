<template lang="pug">
.xa-feed-image(@click.prevent="$emit('click', $event)")
  XOAddPinTag(v-for="(tag, index) in tags", :key="index", :tag="tag", :edit="false" v-if="showPins")
  img(:src="url" width="509" height="394" data-placeholder-background="grey")
</template>

<script>
import XOAddPinTag from '~/components/organisms/AddPin/Tag'

export default {
  name: 'XAFeedImage',
  components: { XOAddPinTag },
  props: {
    url: String,
    pins: Object,
  },
  computed: {
    showPins() {
      return this.$store.state.media.showPins
    },
    tags() {
      return this.pins?.Tags || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-feed-image::v-deep {
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
  }
}
</style>
