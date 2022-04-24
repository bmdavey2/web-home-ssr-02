<template lang="pug">
.card
  .is-flex.p-4(v-if="products.length")
    p.is-size-4.has-text-secondary Your products
    b-button.is-uppercase.ml-auto.is-btn-desktop(type="is-primary" tag="router-link" to="/me/products" outlined) GO TO MY PRODUCTS
    b-button.is-uppercase.ml-auto.is-btn-mobile(type="is-primary" tag="router-link" to="/me/products" outlined) PRODUCTS
  .card-content.is-flex.is-align-items-center.is-justify-content-center(style="height: 500px")
    // Reverted changes due to ticket AW-1450

    template(v-if="!products.length")
      .is-size-5.has-text-centered(style="width: 302px" v-if="type === 'default'")
        p Have any products to add to the
        p MarketPlace?
        b-button.is-uppercase.mt-3(type="is-primary" tag="router-link" to="/contact") CONTACT CUSTOMER SUPPORT
      .is-size-5.has-text-centered(style="width: 302px" v-else)
        p You have no products yet.
        p Let’s create some to get started
        b-button.is-uppercase.mt-3(type="is-primary" tag="router-link" to="/me/products") GO TO MY PRODUCTS
    .products.custom-slider(v-if="products.length" style="height: 450px")
      .is-flex
        .products-card(v-for="(item, index) in products", :key="index")
          XMMarketPlaceProduct.m-3.mb-0.custom-product(:product="item" style="width: 300px; height: 400px")
</template>

<script>
import XMMarketPlaceProduct from '~/components/molecules/MarketPlace/Product'

export default {
  name: 'XMSubscriptionProductSlider',
  components: { XMMarketPlaceProduct },
  props: {
    products: { type: Object, default: () => [] },
    subscription: { type: Object, default: () => {} },
  },
  computed: {
    type() {
      return this.subscription?.type || 'default'
    },
  },
}
</script>
<style lang="scss" scoped>
.custom-slider {
  //cursor: grab;
  overflow-x: scroll !important;
  overflow-y: hidden;
}
.is-btn-mobile {
  display: none !important;
}
@media screen and (max-width: 400px) {
  .is-btn-desktop {
    display: none;
  }
  .is-btn-mobile {
    display: block !important;
  }
  .custom-product {
    width: 250px !important;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .custom-slider {
    max-width: 738px !important;
  }
}
</style>
