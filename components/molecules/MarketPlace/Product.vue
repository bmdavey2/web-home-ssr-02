<template lang="pug">
.xm-marketplace-product.card(v-view="doSegmentImpression")
  .card-image
    img.lozad.cover-photo(
      data-placeholder-background="lightgrey",
      :src="coverPhotoURL"
      width="500"
      height="225"
      @error="doCheckIfImageIsLoaded"
      v-if="imageLoaded")
    img.lozad.cover-photo(
      :src="categoryPhotoURL"
      width="500"
      height="255"
      data-placeholder-background="lightgrey"
      v-else)
    .actions.row.items-center.justify-between
      .left-action
        .has-medal.row.items-center(v-if="hasMedal")
          ._icon.row.items-center.mr-2: img(src="~assets/images/MarketPlace/has-medal.svg")
          ._label Digital Medal Event
      .right-action.row.items-center
        .save(@click.prevent="doSaveProduct()" v-if="currentBusinessID === null")
          img(src="~assets/images/MarketPlace/saves-light.png" v-if="isSaved")
          img(src="~assets/images/MarketPlace/saves-outline-light.png" v-else)
        .share(@click.prevent="doShowShareTo()"): img(src="~assets/images/MarketPlace/share-outline-light.png")
  .card-content.is-flex-width-auto(:class="hasTag && 'has-tag'")
    .item-tag(:class="convertStringToSlug(type)" v-if="hasTag")
      ._value {{ type }}
    ._title
      nuxt-link(:to="`/b/${profileLink}`"): XAProfileAvatar.is-cursor-pointer(
        size="32px",
        :image="profilePhoto",
        :label="initials")
      h3.is-flex-width-auto: nuxt-link(:to="`/marketplace/p/${slug}`" @click.native="doSetMarketPlaceCategory()") {{ title }}
    .date.details-row(v-if="(startDate && endDate) !== null")
      ._icon: img(src="~assets/images/MarketPlace/calendar.svg" width="16" height="16")
      ._value {{ startDate }} - {{ endDate }}
    .time.details-row(v-if="startTime !== null")
      ._icon: img(src="~assets/images/MarketPlace/clock.svg" width="16" height="16")
      ._value {{ startTime }}
    .location.details-row(v-if="(state && country) !== null")
      ._icon: img(src="~assets/images/MarketPlace/navigations.svg" width="16" height="16")
      ._value #[span(v-if="state !== null && state !== 'null'") {{ state }},] #[span(v-if="country !== null && country !== 'null'") {{ country }}]
    .price.details-row(v-if="pricing === 'Paid'")
      ._icon: img(src="~assets/images/MarketPlace/price.svg" width="16" height="16")
      //._value.free(v-if="pricing === 'Free'") {{ pricing }}
      ._value {{ viewerCurrency }} &dollar;{{ viewerPrice }} #[span(v-if="viewerPriceMax !== '0.00'") &mdash; &dollar;{{ viewerPriceMax }}]
  //- .card-footer
    .views.details-row
      ._icon: img(src="~assets/images/MarketPlace/views.webp" width="16" height="16")
      ._value {{ viewsCount }} Views
    .saves.details-row
      ._icon: img(src="~assets/images/MarketPlace/saves.webp" width="16" height="16")
      ._value {{ savesCount }} Saves
    .rating.details-row(v-if="showRating")
      ._value Rating {{ rating }}
      ._icon: b-icon(icon="star" custom-size="mdi-18px")
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import lozad from 'lozad'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XPShareTo from '~/components/pages/ShareTo'

export default {
  name: 'XMMarketPlaceProduct',
  components: { XAImageNotLoaded, XAProfileAvatar },
  props: {
    product: Object,
    showRating: Boolean,
    hasTag: Boolean,
  },
  data() {
    return {
      imageLoaded: true,
      isSaved: this.product?.isSaved,
      savesCount: this.product?.savesCount || 0,
    }
  },
  computed: {
    category() {
      return this.product?.Categories[0]?.name || null
    },
    type() {
      return this.product?.type || ''
    },
    coverPhotoURL() {
      return this.product?.coverPhotoURL || ''
    },
    categoryPhotoURL() {
      return this.product?.Categories[0]?.PhotoURL || null
    },
    title() {
      return this.product?.title || 'Marketplace Product'
    },
    slug() {
      return this.product?.slug || '/'
    },
    startDate() {
      if (this.product?.startDate === null) return null
      const start = moment(this.product?.startDate).format('YYYY')
      const end = moment(this.product?.endDate).format('YYYY')

      if (start === end) {
        return moment(this.product?.startDate).format('MMM DD') || null
      }
      return moment(this.product?.startDate).format('MMM DD, YYYY') || null
    },
    endDate() {
      if (this.product?.endDate === null) return null
      return moment(this.product?.endDate).format('MMM DD, YYYY') || null
    },
    startTime() {
      return this.product?.startTime || null
    },
    virtual() {
      return this.product?.virtual || true
    },
    state() {
      return this.product?.state || null
    },
    country() {
      return this.product?.country || null
    },
    currency() {
      return this.product?.currency || null
    },
    pricing() {
      return this.product?.pricing || null
    },
    priceAmount() {
      if (this.product?.priceAmount === 'Free') {
        return 'Free'
      }
      return parseFloat(this.product?.priceAmount || 0).toFixed(2)
    },
    priceAmountMax() {
      return parseFloat(this.product?.priceAmountMax || 0).toFixed(2)
    },
    viewerPrice() {
      return parseFloat(this.product?.viewerPrice || 0).toFixed(2)
    },
    viewerPriceMax() {
      return parseFloat(this.product?.viewerPriceMax || 0).toFixed(2)
    },
    viewerCurrency() {
      return this.product?.viewerCurrency || null
    },
    viewsCount() {
      return this.product?.viewsCount || 0
    },
    rating() {
      return this.product?.rating || 0
    },
    user() {
      return this.product?.Member || this.product?.Business
    },
    profileLink() {
      return this.user?.slug
    },
    profilePhoto() {
      return this.user?.profilePhotoURL || null
    },
    initials() {
      return this.$app.getNameInitials(this.user?.name)
    },
    rate() {
      return this.product?.rate || null
    },
    hasMedal() {
      return this.product?.isNFTMedal || false
    },
  },
  mounted() {
    const observer = lozad('.lozad', {
      rootMargin: '10px 0px',
      threshold: 0.1,
      enableAutoReload: true,
    })
    observer.observe()
  },
  methods: {
    doCheckIfImageIsLoaded() {
      this.imageLoaded = false
    },
    async doSaveProduct() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      this.isSaved = !this.isSaved
      if (this.isSaved) {
        this.savesCount++
      } else {
        this.savesCount--
      }
      try {
        await this.$apollo.mutate({
          variables: {
            id: this.product?.id,
          },
          context: this.getGraphQLContext(),
          mutation: this.isSaved
            ? gql`
                mutation ($id: String!) {
                  saveProduct(id: $id) {
                    success
                  }
                }
              `
            : gql`
                mutation ($id: String!) {
                  unsaveProduct(id: $id) {
                    success
                  }
                }
              `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    doShowShareTo() {
      this.$buefy.modal.open({
        parent: this,
        component: XPShareTo,
        width: 500,
        canCancel: false,
        props: {
          details: this.product,
          type: 'Product',
        },
      })
    },
    doSetMarketPlaceCategory() {
      if (['index', 'p-slug', 'b-slug', 'marketplace'].includes(this.$route.name)) return
      this.$store.dispatch('marketplace/setMarketPlaceParentCategory', this.$route.params?.category)
      this.$store.dispatch('marketplace/setMarketPlaceSubCategory', this.$route.params?.sub)
    },
    doSegmentImpression(e) {
      if (e.scrollPercent === 0) return
      if (this.product) {
        if (e.type === 'exit') {
          this.product.objectType = 'Product'
          this.$appClient.segment.trackProductImpression(this.product)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-product::v-deep {
  height: 100%;
  display: flex;
  flex-direction: column;

  &.is-large-product {
    .card-content {
      ._title {
        .avatar-container {
          .left-avatar {
            .avatar {
              width: 48px !important;
              height: 48px !important;
            }
          }
        }

        h3 {
          font-size: 1.2857rem;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;

          a {
            color: inherit;
          }
        }
      }
    }
  }

  .card-image {
    position: relative;
    height: 120px;

    .cover-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .actions {
      position: absolute;
      z-index: 1;
      width: 100%;
      top: 0;
      padding: 15px 10px;

      .has-medal {
        background-color: $primary;
        color: $white;
        font-size: 0.8571rem;
        font-weight: 300;
        border-radius: 50px;
        width: 100%;
        max-width: 175px;
        height: 32px;
        padding: 5px 10px;
      }

      .save,
      .share {
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
        margin-left: 10px;
      }
    }

    .image-not-loaded {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f1f1f1;

      img {
        position: unset;
      }
    }
  }

  .card-content {
    position: relative;
    padding: 20px;

    &.has-tag {
      padding-top: 30px;
    }

    .item-tag {
      font-size: 0.8571rem;
      font-weight: 300;
      line-height: 1;
      position: absolute;
      top: 0;
      right: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 7px 5px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;

      ._icon {
        margin-right: 5px;
      }

      &.event {
        background-color: #fff1c3;
        color: #f15a29;
      }

      &.experience {
        background-color: #e4f5c8;
        color: #219653;
      }

      &.active-program {
        background-color: #fedddd;
        color: #f85454;
      }
    }

    ._title {
      margin-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .xa-profile-avatar {
        margin-right: 10px;

        .right-avatar {
          display: none;
        }
      }

      h3 {
        font-size: 1.1429rem;
        line-height: 1.4286rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        a {
          color: inherit;
        }
      }
    }

    .details-row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 7px;
      font-weight: 300;

      ._icon {
        width: 30px;
        display: flex;
        align-items: center;
      }

      ._value {
        width: calc(100% - 30px);

        &.free {
          color: #219653;
        }
      }
    }
  }

  .card-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    border: 0;
    min-height: 46px;
    padding: 10px;

    .details-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-weight: 300;
      line-height: 1;

      ._icon {
        width: 25px;
      }

      &.views {
        border-right: 1px solid rgba(#65676b, 0.1);
        padding-right: 10px;
        margin-right: 10px;
      }

      &.rating {
        border-left: 1px solid rgba(#65676b, 0.1);
        padding-left: 10px;
        margin-left: 10px;

        ._icon {
          color: #f2c94c;
          margin-bottom: 3px;
          margin-left: 3px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    &.is-large-product {
      .card-content {
        ._title {
          .avatar-container {
            .left-avatar {
              .avatar {
                width: 35px !important;
                height: 35px !important;
              }
            }
          }

          h3 {
            font-size: 1.1429rem !important;
            line-height: 1.4286rem !important;
          }
        }
      }
    }
  }

  @media screen and (max-width: 427px) {
    .card-image {
      height: 150px;
    }
  }
}
</style>
