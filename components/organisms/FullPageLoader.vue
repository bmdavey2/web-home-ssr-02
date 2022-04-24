<template lang="pug">
b-loading.loading-container(:is-full-page="true" v-model="isLoading", :can-cancel="false")
  .loading-logo.is-flex.is-align-items-center
    img.loading-icon(src="~assets/icons/activeplace-logo-grey.svg" alt="ActivePlace")

    .loading-animation
      img(src="~assets/icons/bullet-loader.svg" alt="ActivePlace")
</template>

<script>
export default {
  name: 'XOFullPageLoader',
  computed: {
    isLoading() {
      return this.$store.getters['control/isLoading']('app/loading')
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-icon {
  z-index: 20;
  height: 90px !important;
  opacity: 0.4;
}
.loading-logo {
  position: relative;
}

.loading-container {
  background-color: $white !important;

  .loading-animation {
    position: absolute;
    top: 80%;
    left: 30%;
    img {
      height: 60px;
    }
  }
}
</style>
