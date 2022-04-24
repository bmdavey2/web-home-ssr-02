<template lang="pug">
.xm-marketplace-index-banner
  img(src="~assets/images/MarketPlace/Index/banner.webp")
  h1 Find your next active experience
</template>

<script>
export default {
  name: 'XMMarketPlaceIndexBanner',
}
</script>

<style lang="scss" scoped>
.xm-marketplace-index-banner::v-deep {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: $white;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  h1 {
    position: relative;
    z-index: 2;
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 50px;
    min-height: 375px;
  }

  @media screen and (max-width: 427px) {
    h1 {
      font-size: 2.2857rem !important;
      line-height: 2.5714rem !important;
    }
  }
}
</style>
