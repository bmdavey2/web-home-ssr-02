<template lang="pug">
.xm-product-slider(v-if="products.length")
  .header.row.items-center.justify-between
    h3 {{ category }}
    .actions.row.items-center
      nuxt-link(:to="`/marketplace/${categorySlug}`") Explore all
      .slider-nav-button.row.items-center(v-if="products.length > 3")
        .btn-nav.btn-prev.row.items-center.justify-center(@click.prevent="$refs.carousel.$swiper.slidePrev()"): b-icon(
          icon="chevron-left")
        .btn-nav.btn-next.row.items-center.justify-center(@click.prevent="$refs.carousel.$swiper.slideNext()"): b-icon(
          icon="chevron-right")

  swiper(ref="carousel", :options="swiperSettings")
    swiper-slide(v-for="(product, index) in products", :key="index")
      XAProduct(:product="product", :category="category")
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import XAProduct from '~/components/atoms/v2/Product'
import 'swiper/swiper-bundle.css'

export default {
  name: 'XMProductSlider',
  components: { Swiper, SwiperSlide, XAProduct },
  props: {
    category: String,
  },
  data() {
    return {
      products: [],
    }
  },
  computed: {
    ...mapFields('app', ['geoLocation.country', 'geoLocation']),
    categorySlug() {
      return this.convertStringToSlug(this.category)
    },
    swiperSettings() {
      const swiperSettings = {
        loop: true,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
      }

      return swiperSettings
    },
  },
  watch: {
    country() {
      this.doRetrieveProducts()
    },
  },
  mounted() {
    this.doRetrieveProducts()
  },
  methods: {
    async doRetrieveProducts() {
      try {
        this.products = []
        const params = {
          type: this.type || null,
          category: this.category || null,
          coverPhotoSize: '700',
          count: 8,
          // locationCountry: this.country,
          // sortBy: 'homepage',
          // filterType: 'published',
        }

        const {
          Products: { items },
        } = await this.$api.getProducts(params)

        this.products = items
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-product-slider::v-deep {
  margin-bottom: 80px;

  .header {
    margin-bottom: 20px;

    .actions {
      a {
        color: $white;
        font-weight: 300;
        font-size: 1.1429rem;
      }

      .slider-nav-button {
        margin-right: 10px;

        .btn-nav {
          color: $white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-left: 10px;
          cursor: pointer;

          &.btn-next {
            background-color: #2a4e55;
          }
        }
      }
    }
  }

  .swiper-container {
    .swiper-wrapper {
      .swiper-slide {
        width: calc(100% / 3 - 50px);

        @include max-width(768px) {
          width: calc(100% / 2 - 50px);
        }

        @include max-width(599px) {
          width: calc(100% - 100px);
        }
      }
    }
  }
}
</style>
