<template lang="pug">
.xm-marketplace-product-slider
  template(v-if="isRetrieving")
    .header
      h2 {{ sliderTitle }}
      .actions.row.items-center
        nuxt-link.see-all(:to="`/marketplace/${categorySlug}`") See all
        .slider-nav-button(v-if="products.length > 4")
          .btn-prev.btn-nav(@click.prevent="$refs.carousel.$swiper.slidePrev()"): b-icon(icon="chevron-left")
          .btn-next.btn-nav(@click.prevent="$refs.carousel.$swiper.slideNext()"): b-icon(icon="chevron-right")

    .loader-container.row.justify-between
      XMMarketPlaceProductLoader(v-for="n in 4", :key="n")

  template(v-else)
    template(v-if="products.length")
      .header
        h2 {{ sliderTitle }}
        .actions.row.items-center
          nuxt-link.see-all(:to="`/marketplace/${categorySlug}`") See all
          .slider-nav-button(v-if="products.length > 4")
            .btn-prev.btn-nav(@click.prevent="$refs.carousel.$swiper.slidePrev()"): b-icon(icon="chevron-left")
            .btn-next.btn-nav(@click.prevent="$refs.carousel.$swiper.slideNext()"): b-icon(icon="chevron-right")

      swiper(ref="carousel", :options="swiperSettings")
        swiper-slide(v-for="(product, index) in products", :key="index")
          XMMarketPlaceProduct(:product="product", :has-tag="hasTag", :is-retrieving="isRetrieving")
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import XMMarketPlaceProduct from '~/components/molecules/MarketPlace/Product'
import XMMarketPlaceProductLoader from '~/components/molecules/MarketPlace/ProductLoader'
import 'swiper/swiper-bundle.css'

export default {
  name: 'XMMarketPlaceProductSlider',
  components: { XMMarketPlaceProduct, Swiper, SwiperSlide, XMMarketPlaceProductLoader },
  props: {
    type: String,
    category: String,
    hasTag: Boolean,
    sliderCount: { type: Number, default: 4 },
  },
  data() {
    return {
      products: [],
      isRetrieving: true,
    }
  },
  computed: {
    swiperSettings() {
      const swiperSettings = {
        loop: true,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
      }

      return swiperSettings
    },
    sliderTitle() {
      if (this.type) {
        switch (this.type) {
          case 'Event':
            return 'Active Events'
          case 'Experience':
            return 'Active Experiences'
          case 'Active Program':
            return 'Active Programs'
        }
      }
      return this.category
    },
    categorySlug() {
      if (this.type) {
        switch (this.type) {
          case 'Event':
            return 'active-events'
          case 'Experience':
            return 'active-experiences'
          case 'Active Program':
            return 'active-programs'
        }
      }
      return this.convertStringToSlug(this.category)
    },
    categoryArgs() {
      switch (this.category) {
        case 'Endurance Sports':
          return 'enduranceSports'
        case 'Outdoor & Adventure':
          return 'outdoorAndAdventure'
        case 'Health & Wellness':
          return 'healthAndWellness'
        case 'General Fitness':
          return 'generalFitness'
        case 'Technology & Gear':
          return 'technologyAndGear'
        default:
          return ''
      }
    },
  },
  async mounted() {
    await this.doRetrieveProducts()
  },
  methods: {
    async doRetrieveProducts() {
      this.isRetrieving = true

      try {
        const params = {
          type: this.type || null,
          category: this.category || null,
          coverPhotoSize: '280',
          count: 8,
          filterType: 'cachedByCategory',
        }

        const {
          Products: { items },
        } = await this.$api.getProducts(params)

        this.products = items
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-product-slider::v-deep {
  margin-bottom: 30px;

  h2 {
    color: $secondary;
  }

  .header {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      a {
        color: #65676b;
        display: block;
        padding-top: 3px;
      }

      .slider-nav-button {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-left: 15px;

        .btn-nav {
          width: 32px;
          height: 32px;
          background-color: transparent;
          color: $secondary;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          transition: 0.3s;
          margin: 0 5px;

          &.btn-next {
            background-color: $secondary;
            color: $white;
          }
        }
      }
    }
  }

  .swiper-container {
    .swiper-wrapper {
      padding-bottom: 30px;

      .swiper-slide {
        width: calc(100% / 4 - 30px);
        height: auto;

        @include max-width(1215px) {
          width: calc(100% / 3 - 30px);
        }

        @include max-width(1023px) {
          width: calc(100% / 2 - 50px);
        }

        @include max-width(767px) {
          width: calc(100% - 50px);
        }
      }
    }
  }

  .loader-container {
    .xm-marketplace-product-loader {
      width: calc(100% / 4 - 10px);

      @include max-width(1215px) {
        width: calc(100% / 3 - 10px);
      }

      @include max-width(1023px) {
        width: calc(100% / 2 - 10px);
      }

      @include max-width(767px) {
        width: 100%;
      }

      &:last-child {
        @include max-width(1215px) {
          display: none;
        }
      }

      &:nth-child(3) {
        @include max-width(1023px) {
          display: none;
        }
      }

      &:nth-child(2) {
        @include max-width(767px) {
          display: none;
        }
      }
    }
  }
}
</style>
