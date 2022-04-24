<template lang="pug">
.xp-marketplace-product.py-6
  .container.is-max-widescreen
    XMMarketPlaceSingleBreadcrumbs
    XMMarketPlaceSingleHeader(:product="product")
    XMMarketPlaceSingleGallery(
      :product="product"
      @DoShowLightbox="showLightbox = $event"
      @LightboxInitialSlide="initialSlide = $event")
    XMMarketPlaceSingleGallerySlider(:product="product")
    XMMarketPlaceSingleGalleryLightBox(
      :product="product"
      v-if="showLightbox"
      @DoShowLightbox="showLightbox = $event",
      :initial-slide="initialSlide")
    XMMarketPlaceSingleContent(:product="product")
    XMMarketPlaceSingleContentScheduleFooter(:product="product")
</template>

<script>
import XMMarketPlaceSingleBreadcrumbs from '~/components/molecules/MarketPlace/Single/Breadcrumbs'
import XMMarketPlaceSingleHeader from '~/components/molecules/MarketPlace/Single/Header'
import XMMarketPlaceSingleGallery from '~/components/molecules/MarketPlace/Single/Gallery'
import XMMarketPlaceSingleGallerySlider from '~/components/molecules/MarketPlace/Single/GallerySlider'
import XMMarketPlaceSingleGalleryLightBox from '~/components/molecules/MarketPlace/Single/LightBox'
import XMMarketPlaceSingleContent from '~/components/molecules/MarketPlace/Single/Content'
import XMMarketPlaceSingleContentScheduleFooter from '~/components/molecules/MarketPlace/Single/Content/ScheduleFooter'

export default {
  name: 'XPMarketPlaceProduct',
  components: {
    XMMarketPlaceSingleBreadcrumbs,
    XMMarketPlaceSingleHeader,
    XMMarketPlaceSingleGallery,
    XMMarketPlaceSingleGallerySlider,
    XMMarketPlaceSingleGalleryLightBox,
    XMMarketPlaceSingleContent,
    XMMarketPlaceSingleContentScheduleFooter,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      showLightbox: false,
      initialSlide: 0,
    }
  },
  mounted() {
    this.$root.$on('marketplace/lightbox/show', (value) => {
      this.showLightbox = value
    })
    this.$root.$on('marketplace/lightbox/active', (value) => {
      this.initialSlide = value
    })
  },
}
</script>

<style lang="scss" scoped>
.xp-marketplace-product::v-deep {
  background-color: $white;
  min-height: calc(100vh - 728px);
}
</style>
