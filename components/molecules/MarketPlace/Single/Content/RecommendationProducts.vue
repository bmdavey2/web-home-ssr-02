<template lang="pug">
.xm-marketplace-single-content-recommendation-products
  .header
    h3 If you like this you'll also like...
    .navigation-actions
      .prev(@click.prevent="$refs.carousel.prev()"): b-icon(icon="chevron-left")
      .next(@click.prevent="$refs.carousel.next()"): b-icon(icon="chevron-right")
  .slider-container(v-if="!isRetrieving")
    vue-slick-carousel(v-bind="sliderSettings" ref="carousel")
      .slide-item(v-for="(product, index) in products", :key="index")
        XMMarketPlaceProduct(:product="product" has-tag)
</template>

<script>
import gql from 'graphql-tag'
import VueSlickCarousel from 'vue-slick-carousel'
import XMMarketPlaceProduct from '~/components/molecules/MarketPlace/Product'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'XMMarketPlaceSingleContentRecommendationProducts',
  components: { XMMarketPlaceProduct, VueSlickCarousel },
  props: {
    product: Object,
  },
  data() {
    return {
      products: null,
      isRetrieving: true,
    }
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 1216,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              centerMode: true,
              centerPadding: '30px',
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '30px',
            },
          },
        ],
      }

      return sliderSettings
    },
  },
  mounted() {
    this.doRetrieveProducts()
  },
  methods: {
    async doRetrieveProducts() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            id: this.product?.id,
          },
          query: gql`
            query ($id: String!) {
              RecommendedProducts(id: $id, count: 20) {
                id
                Categories {
                  id
                  name
                  PhotoURL
                }
                Business {
                  id
                  name
                  slug
                  profilePhotoURL
                }
                createdAt
                slug
                type
                title
                coverPhotoURL
                description
                AdditionalInformation {
                  objectType
                  objectID
                  fileName
                  fileSize
                  fileType
                }
                UserID
                actorType
                parentID
                repeats
                hibernation
                status
                hidden
                inquiryType
                externalURL
                startDate
                endDate
                startTime
                endTime
                timezone
                virtual
                address1
                address2
                city
                state
                country
                postcode
                pricing
                priceAmount
                priceAmountMax
                viewerPrice(preferredCurrency: "AUD")
                viewerPriceMax(preferredCurrency: "AUD")
                currency
                viewerCurrency(preferredCurrency: "AUD")
                Media {
                  PhotoURL
                  VideoURL
                  FileURL
                  objectType
                  fileName
                }
                recommendsCount
                viewsCount
                savesCount
                businessPaidPlan
                isNFTMedal
              }
            }
          `,
        })
        this.products = data?.RecommendedProducts
      } catch (error) {
        this.doTrackSegmentError(error, 'MarketPlace Product')
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-content-recommendation-products::v-deep {
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;

    h3 {
      font-size: 2.2857rem;
      color: $secondary;
      flex: 10000 1 0;
      padding-right: 20px;
    }

    .navigation-actions {
      display: flex;
      flex-wrap: wrap;

      > div {
        width: 32px;
        height: 32px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        cursor: pointer;

        &:hover {
          background-color: $secondary;
          color: $white;
        }

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  .slider-container {
    .slick-slider {
      margin: 0 -10px;

      .slick-list {
        padding-bottom: 30px;

        .slick-track {
          display: flex;
          flex-wrap: wrap;

          .slick-slide {
            float: none;
            height: auto;

            > div {
              height: 100%;

              .slide-item {
                padding: 0 10px;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .slider-container {
      .slick-slider {
        .slick-list {
          padding: 0 1% 30px 0 !important;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .header {
      h3 {
        font-size: 1.5714rem;
      }
    }
  }
}
</style>
