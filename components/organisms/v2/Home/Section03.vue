<template lang="pug">
.xo-home-section-03
  LazyHydrate(when-idle)
    .container.is-max-widescreen
      h2._title.mb-5 Browse popular upcoming events
      h4.mb-6.text-weight-light Featured event:

      .event-container(:class="orientation")
        .banner: img(:src="coverPhotoURL", :alt="title")
        .details.flex-column.justify-between
          .actions.row.justify-between
            .left-action
              .has-medal.row.items-center(v-if="isNFTMedal")
                ._icon.row.items-center.mr-2: img(
                  src="~assets/images/MarketPlace/has-medal.svg",
                  :alt="`${title} - Digital Medal}`"
                  width="16"
                  height="16")
                ._label Digital Medal Event

            .right-action.row
              XAMarketPlaceSave(:is-saved="isSaved")
              XAMarketPlaceShare(:details="event")

          ._content.row(:class="orientation")
            .left-content
              h2: nuxt-link(:to="slug") {{ title }}

              .separator

              .business-details.row
                .mr-4: XAProfileAvatar(
                  :label="$app.getNameInitials(businessName)",
                  :image="businessProfilePhotoURL"
                  size="45px")
                .product-details
                  .row
                    .start-date.mr-5 {{ startDate | dateFormat('MMMM DD') }}
                    .location
                      span.mr-1(v-if="city") {{ city }},
                      span {{ country }}

                  .price
                    span.mr-1 {{ viewerCurrency }}
                    span ${{ priceAmount }}
                    span.ml-1(v-if="priceAmountMax") &mdash; ${{ priceAmountMax }}

            .right-content.row.items-center.justify-center(v-if="isNFTMedal"): XAMedalsVideo(
              :video="videoURL",
              :image="imageURL",
              :orientation="orientation",
              :title="title")
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import XAMarketPlaceSave from '~/components/atoms/MarketPlace/Save'
import XAMarketPlaceShare from '~/components/atoms/MarketPlace/Share'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAMedalsVideo from '~/components/atoms/Medals/Video'

export default {
  name: 'XOHomeSection03',
  components: { LazyHydrate, XAMarketPlaceSave, XAMarketPlaceShare, XAProfileAvatar, XAMedalsVideo },
  computed: {
    event() {
      return this.$parent?.upcomingEvent || null
    },
    id() {
      return this.event?.id || null
    },
    coverPhotoURL() {
      return this.event?.coverPhotoURL || null
    },
    isNFTMedal() {
      return this.event?.isNFTMedal || false
    },
    isSaved() {
      return this.event?.isSaved || false
    },
    title() {
      return this.event?.title || null
    },
    business() {
      return this.event?.Business || null
    },
    businessName() {
      return this.business?.name || null
    },
    businessProfilePhotoURL() {
      return this.business?.profilePhotoURL || null
    },
    startDate() {
      return this.event?.startDate || new Date()
    },
    city() {
      return this.event?.city || null
    },
    country() {
      return this.event?.country || null
    },
    viewerCurrency() {
      return this.event?.viewerCurrency || null
    },
    priceAmount() {
      return this.event?.priceAmount || null
    },
    priceAmountMax() {
      return this.event?.priceAmountMax || null
    },
    medal() {
      return this.event?.NFTMedals?.items[0]
    },
    videoURL() {
      const videoURL = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return videoURL[0]?.VideoURL
    },
    imageURL() {
      const imageURL = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return imageURL[0]?.VideoThumbnail
    },
    orientation() {
      const orientation = this.medal?.Media.filter((media) => {
        return media?.objectType === 'Video'
      })

      return orientation[0]?.orientation
    },
    slug() {
      return `/medals/${this.event?.slug}`
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-home-section-03::v-deep {
  margin-bottom: 80px;

  ._title {
    width: 100%;
    max-width: 540px;
  }

  .event-container {
    width: 100%;
    min-height: 760px;
    position: relative;
    display: block;

    @include max-width(768px) {
      min-height: auto;
      background-color: $secondary;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .banner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;

      @include max-width(768px) {
        height: 420px;
        position: relative;
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
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        @include max-width(768px) {
          border-radius: 0;
        }
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 10px;

        @include max-width(768px) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }

    .details {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      padding: 30px;

      @include max-width(768px) {
        position: relative;
        margin-top: -420px;
        flex-direction: row;
      }

      @include max-width(767px) {
        padding: 30px 15px;
      }

      .actions {
        width: 100%;
        position: relative;
        z-index: 1;

        .has-medal {
          background-color: $primary;
          color: $white;
          font-weight: 300;
          border-radius: 50px;
          width: 100%;
          max-width: 175px;
          height: 32px;
          padding: 5px 10px;
        }
      }

      ._content {
        width: 100%;
        background-color: #886bf2;
        padding: 30px;
        border-radius: 10px;
        color: $white;
        position: relative;
        z-index: 1;

        @include max-width(768px) {
          margin-top: 130px;
        }

        @include max-width(767px) {
          padding: 30px 15px;
        }

        &.landscape {
          .left-content,
          .right-content {
            width: calc(100% / 2);

            @include max-width(768px) {
              width: 100%;
            }
          }
        }

        &.portrait {
          .left-content {
            width: 65%;
          }

          .right-content {
            width: 35%;
          }

          .left-content,
          .right-content {
            @include max-width(767px) {
              width: 100%;
            }
          }
        }

        .left-content {
          @include max-width(768px) {
            margin-bottom: 50px;
          }

          @include max-width(767px) {
            margin-bottom: 20px;
          }

          a {
            color: $white;
          }

          .separator {
            width: 275px;
            height: 1px;
            background-color: $white;
            opacity: 0.2;
            margin: 40px 0 30px;
          }

          .business-details {
            .product-details {
              font-weight: 300;
              opacity: 0.6;

              .price {
                margin-top: 8px;
              }
            }
          }
        }

        .right-content {
          .xa-medals-video {
            &.landscape {
              width: 100%;
              height: 265px;

              @include max-width(427px) {
                height: 175px;
              }

              .video-js {
                height: 100%;
              }
            }

            &.portrait {
              width: 205px;
              height: 350px;

              @include max-width(767px) {
                width: 100%;
                max-width: 250px;
                height: 380px;
              }

              .video-js {
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
