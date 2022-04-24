export default {
  mounted() {
    this.$root.$on('reload', this.onReload)
  },
  onBeforeDestroy() {
    this.$root.$off('reload', this.onReload)
  },
}
