<template lang="pug">
.image-not-loaded
  img(src="~assets/icons/image-not-loaded.svg")
</template>

<script>
export default {
  name: 'XAImageNotLoaded',
}
</script>

<style lang="scss" scoped>
.image-not-loaded::v-deep {
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  color: #4a4a4a;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  img {
    width: 100% !important;
    height: 40% !important;
    object-fit: unset !important;
  }
}
</style>
