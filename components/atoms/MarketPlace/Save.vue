<template lang="pug">
.xa-marketplace-save(v-if="currentBusinessID === null" @click.prevent="doToggleSaveProduct()")
  img(src="~assets/images/MarketPlace/saves-light.png" v-if="saved" alt="Saved Product" width="14" height="18")
  img(src="~assets/images/MarketPlace/saves-outline-light.png" v-else alt="Unsaved Product" width="14" height="18")
</template>

<script>
export default {
  name: 'XAMarketPlaceSave',
  props: {
    isSaved: Boolean,
  },
  data() {
    return {
      saved: this.isSaved,
    }
  },
  computed: {
    id() {
      return this.$parent?.$parent?.upcomingEvent?.id || this.$parent?.id || null
    },
  },
  methods: {
    async doToggleSaveProduct() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }

      try {
        this.saved = !this.saved

        if (!this.id) return

        this.saved ? await this.$api.saveProduct({ id: this.id }) : await this.$api.unsaveProduct({ id: this.id })
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-marketplace-save::v-deep {
  background-color: rgba(12, 53, 62, 0.3);
  width: 32px;
  height: 32px;
  border-radius: 100px;
  box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
}
</style>
