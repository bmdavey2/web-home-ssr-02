<template lang="pug">
.media
  .media-left.is-flex.is-align-items-center.is-justify-content-center(style="width: 36px; height: 36px")
    img(v-if="photoURL", :src="photoURL" style="object-fit: cover; width: 32px; height: 32px")
    img(v-if="coverPhotoURL", :src="coverPhotoURL" style="object-fit: cover; width: 32px; height: 32px")
    img(
      v-if="!(photoURL || coverPhotoURL)"
      src="~assets/icons/activeplace-logo-grey.svg"
      style="object-fit: cover; width: 32px; height: 32px")
  .media-content
    div {{ title }}
    div(style="font-size: smaller; font-weight: bold") {{ type }}
</template>

<script>
export default {
  name: 'XAHeaderSearchBarResultItem',
  props: {
    item: { type: Object, default: () => {} },
  },
  computed: {
    photoURL() {
      return this.item?.photoURL || ''
    },
    coverPhotoURL() {
      return this.item?.coverPhotoURL || ''
    },
    title() {
      return this.item?.title || ''
    },
    type() {
      return this.item?.type || ''
    },
  },
}
</script>
