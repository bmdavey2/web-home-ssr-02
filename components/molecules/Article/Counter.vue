<template lang="pug">
div
  .published-header.is-flex.is-align-items-center.pt-5
    .is-size-4.has-text-secondary.mr-2 {{ title }}
    img.icon-pipe.mr-2(src="~/assets/icons/pipe.svg" width="1" height="20")
    .is-size-5.has-text-secondary {{ count }}
</template>

<script>
export default {
  name: 'XMArticleCounter',
  props: {
    title: String,
    count: Number,
  },
}
</script>

<style lang="scss" scoped>
.published-header {
  color: #0c353e !important;
}
</style>
