<template lang="pug">
.xm-marketplace-single-content
  XMMarketPlaceSingleContentNavigation
  .contents
    .left-content(v-scroll-spy="{offset: scrollSpyOffset}")
      div
        XMMarketPlaceSingleDescription(:product="product")
        XMMarketPlaceSingleContentMedal(:product="product" v-if="medalCount > 0")
        XMMarketPlaceSingleContentCreateMedal(:product="product" v-else)
      XMMarketPlaceSingleContentAdditionalInformation(:product="product")
      XMMarketPlaceSingleContentOrganizer(:product="product")
      XMMarketPlaceSingleContentCommunityInterests(:product="product")
    .right-content
      XMMarketPlaceSingleSchedule(:product="product")
      XMMarketPlaceSingleContentClosedRegistration(:product="product" v-if="isClosed && inquiryType !== 'External URL'")
  XMMarketPlaceSingleContentRecommendationProducts(:product="product" v-if="isLoggedIn")
</template>

<script>
import moment from 'moment'
import XMMarketPlaceSingleContentNavigation from '~/components/molecules/MarketPlace/Single/ContentNavigation'
import XMMarketPlaceSingleDescription from '~/components/molecules/MarketPlace/Single/Content/Description'
import XMMarketPlaceSingleContentAdditionalInformation from '~/components/molecules/MarketPlace/Single/Content/AdditionalInformation'
import XMMarketPlaceSingleContentOrganizer from '~/components/molecules/MarketPlace/Single/Content/Organizer'
import XMMarketPlaceSingleContentCommunityInterests from '~/components/molecules/MarketPlace/Single/Content/CommunityInterests'
import XMMarketPlaceSingleSchedule from '~/components/molecules/MarketPlace/Single/Content/Schedule'
import XMMarketPlaceSingleContentClosedRegistration from '~/components/molecules/MarketPlace/Single/Content/ClosedRegistration'
import XMMarketPlaceSingleContentRecommendationProducts from '~/components/molecules/MarketPlace/Single/Content/RecommendationProducts'
import XMMarketPlaceSingleContentMedal from '~/components/molecules/MarketPlace/Single/Content/Medal'
import XMMarketPlaceSingleContentCreateMedal from '~/components/molecules/MarketPlace/Single/Content/CreateMedal'

export default {
  name: 'XMMarketPlaceSingleContent',
  components: {
    XMMarketPlaceSingleContentNavigation,
    XMMarketPlaceSingleDescription,
    XMMarketPlaceSingleContentAdditionalInformation,
    XMMarketPlaceSingleContentOrganizer,
    XMMarketPlaceSingleContentCommunityInterests,
    XMMarketPlaceSingleSchedule,
    XMMarketPlaceSingleContentClosedRegistration,
    XMMarketPlaceSingleContentRecommendationProducts,
    XMMarketPlaceSingleContentMedal,
    XMMarketPlaceSingleContentCreateMedal,
  },
  props: {
    product: Object,
  },
  computed: {
    scrollSpyOffset() {
      if (!this.lt) return
      if (this.lt('desktop')) {
        return 145
      }
      return 225
    },
    inquiryType() {
      return this.product?.inquiryType || null
    },
    endDate() {
      return moment(this.product?.endDate).format('MMM DD, YYYY') || null
    },
    isClosed() {
      return new Date(this.endDate) < new Date()
    },
    medalCount() {
      return this.product?.NFTMedals?.total || 0
    },
    business() {
      return this.product?.Business || null
    },
    isMyProduct() {
      return this.business?.id === this.currentBusinessID || false
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-content::v-deep {
  .contents {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;

    > .left-content {
      flex: 10000 1 0;
      margin-right: 20px;

      .additional-content {
        box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
        border-radius: 6px;
        padding: 30px 20px;
        background-color: $white;
      }

      .content-section {
        &:not(:last-child) {
          // border-bottom: 1px solid #c2c8c9;
          // margin-bottom: 30px;
          // padding-bottom: 30px;
        }

        ._title {
          text-transform: uppercase;
          font-weight: 500;
          color: $secondary;
          margin-bottom: 20px;
        }

        .separator {
          width: 100%;
          height: 1px;
          background-color: #c2c8c9;
          margin: 30px 0 0;
          position: relative;

          &::before,
          &::after {
            content: '';
            background-color: #fff;
            width: 20px;
            height: 3px;
            top: -1px;
            position: absolute;
          }

          &::before {
            left: -20px;
          }

          &::after {
            right: -20px;
          }
        }
      }
    }

    > .right-content {
      width: 100%;
      max-width: 275px;
    }
  }

  @media screen and (max-width: 1023px) {
    padding-bottom: 100px;

    .contents {
      > .left-content {
        margin-right: 0;
      }

      > .right-content {
        display: none;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .contents {
      > .left-content {
        box-shadow: none;
        padding: 0;
      }
    }
  }
}
</style>
