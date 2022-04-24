<template lang="pug">
.xa-product.flex-column.justify-between(:style="`backgroundImage: url(${coverPhotoURL})`")
  .actions.row.justify-between
    .left-action
      .has-medal.row.items-center(v-if="isNFTMedal")
        ._icon.row.items-center.mr-2: img(
          src="~assets/images/MarketPlace/has-medal.svg",
          :alt="`${title} - Digital Medal`"
          width="16"
          height="16")
        ._label Digital Medal Event

    .right-action.row
      XAMarketPlaceSave(:is-saved="isSaved")
      XAMarketPlaceShare(:details="product")

  .details(:style="{ backgroundColor: categoryColor }", :class="convertStringToSlug(category)")
    h4(:title="title" style="min-height: 55px"): nuxt-link(:to="`/marketplace/p/${slug}`") {{ title }}
    .separator
    ._content-details
      .row
        .date.mr-4 {{ startDate | dateFormat('MMMM DD') }}
        .location.row
          .city.mr-1(v-if="city") {{ city }},
          .country {{ country }}
      .price.row
        template(v-if="pricing === 'Free' || priceAmount === 0")
          .pricing FREE
        template(v-else)
          .currency.mr-1 {{ viewerCurrency }}
          .price-amount.mr-1 ${{ priceAmount }}
          .price-amount-max(v-if="priceAmountMax") &mdash; ${{ priceAmountMax }}
</template>

<script>
import XAMarketPlaceSave from '~/components/atoms/MarketPlace/Save'
import XAMarketPlaceShare from '~/components/atoms/MarketPlace/Share'

export default {
  name: 'XAProduct',
  components: { XAMarketPlaceSave, XAMarketPlaceShare },
  props: {
    product: Object,
    category: String,
  },
  computed: {
    id() {
      return this.product?.id || null
    },
    coverPhotoURL() {
      return this.product?.coverPhotoURL || this.product?.Categories[0]?.PhotoURL || null
    },
    isNFTMedal() {
      return this.product?.isNFTMedal || false
    },
    isSaved() {
      return this.product?.isSaved || false
    },
    categoryColor() {
      switch (this.category) {
        case 'Running':
          return '#886BF2'

        case 'Cycling':
          return '#FFAF23'

        case 'Triathlon':
          return '#F85454'

        default:
          return '#fff'
      }
    },
    title() {
      return this.product?.title || null
    },
    slug() {
      return this.product?.slug || '/'
    },
    startDate() {
      return this.product?.startDate || null
    },
    city() {
      return this.product?.city || null
    },
    country() {
      return this.product?.country || null
    },
    pricing() {
      return this.product?.pricing || null
    },
    viewerCurrency() {
      return this.product?.viewerCurrency || null
    },
    priceAmount() {
      return this.product?.priceAmount || 0
    },
    priceAmountMax() {
      return this.product?.priceAmountMax || 0
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-product::v-deep {
  min-height: 470px;
  position: relative;
  background-color: $white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;

  @include max-width(767px) {
    min-height: 420px;
  }

  &::after {
    content: '';
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      linear-gradient(180deg, rgba(0, 0, 0, 0) 56.77%, #000 100%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    border-radius: 10px;
  }

  .actions {
    width: 100%;

    .left-action,
    .right-action {
      margin-bottom: 10px;
    }

    .left-action {
      .has-medal {
        background-color: $primary;
        color: $white;
        font-weight: 300;
        border-radius: 50px;
        width: 100%;
        max-width: 175px;
        height: 32px;
        padding: 5px 10px;
        font-size: 0.8571rem;
      }
    }
  }

  .details {
    position: relative;
    z-index: 1;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    min-height: 211px;

    @include max-width(767px) {
      min-height: 190px;
      padding: 20px 15px;
    }

    &.swimming {
      h4 {
        color: $secondary;
      }

      .separator {
        background-color: #e5e5e5;
      }

      ._content-details {
        color: rgba($secondary, 0.6);
      }
    }

    h4 {
      line-height: 1.55;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      min-height: 67px !important;

      @include max-width(767px) {
        font-size: 1.2857rem;
        min-height: 55px !important;
      }

      a {
        color: inherit;
      }
    }

    .separator {
      width: 100%;
      height: 1px;
      background-color: rgba($white, 0.2);
      margin: 15px 0;
    }

    ._content-details {
      color: rgba($white, 0.6);
      font-weight: 300;

      @include max-width(767px) {
        font-size: 0.8571rem;
      }

      .location {
        @include max-width(767px) {
          width: 100%;
          margin-top: 5px;
        }
      }

      .price {
        margin-top: 8px;

        @include max-width(767px) {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
