<template lang="pug">
.xo-profile-medals(:class="type.toLowerCase()")
  .list.row.justify-between(
    :class="`list-${medals.length}`"
    v-infinite-scroll="doRetrieveMoreMedals"
    infinite-scroll-disabled="nextLoading",
    :infinite-scroll-distance="500")
    .item(v-for="(medal, index) in medals")
      XAProfileMedal(:details="medal", :type="type", :key="index")

    template(v-if="nextLoading")
      .item(v-for="n in 1", :key="n", :class="`loader-${n}`")
        XAProfileMedal(:details="null", :type="type")

  XOProfileExploreEvents
</template>

<script>
import { mapGetters } from 'vuex'
import XAProfileMedal from '~/components/atoms/Profile/Medal'
import XOProfileExploreEvents from '~/components/organisms/Profile/ExploreEvents'

export default {
  name: 'XOProfileMedals',
  components: { XAProfileMedal, XOProfileExploreEvents },
  props: {
    type: String,
    activeTab: String,
  },
  data() {
    return {
      medals: [],
      infiniteScroll: true,
      nextLoading: false,
      nextCursor: null,
      isRetrieving: true,
    }
  },
  computed: {
    ...mapGetters({
      getMedalActiveTab: 'medals/getMedalActiveTab',
    }),
  },
  mounted() {
    this.doRetrieveMedals()
  },
  methods: {
    async doRetrieveMedals() {
      const slug = this.$route.params?.slug
      const count = 6

      try {
        const { Member, Business } =
          this.type === 'Member'
            ? await this.$api.getMemberMedals({ slug, count })
            : await this.$api.getBusinessMedals({ slug, count })

        const {
          Medals: { items, next },
        } = Member || Business

        this.medals = items
        this.nextCursor = next
      } catch (error) {
        this.doTrackSegmentError(error, `${this.type} Medals Profile`)
      } finally {
        this.isRetrieving = false
      }
    },
    async doRetrieveMoreMedals() {
      if (this.getMedalActiveTab !== 'medals') return
      if (this.isRetrieving) return
      const slug = this.$route.params?.slug
      const count = 6

      if (this.infiniteScroll) {
        this.nextLoading = true

        try {
          const { Member, Business } =
            this.type === 'Member'
              ? await this.$api.getMemberMedals({ slug, count, next: this.nextCursor })
              : await this.$api.getBusinessMedals({ slug, count, next: this.nextCursor })

          const {
            Medals: { items, next },
          } = Member || Business

          if (items.length) {
            items.forEach((item) => {
              this.medals.push(item)
            })
            this.nextCursor = next
            this.nextLoading = false
          } else {
            this.infiniteScroll = false
            this.nextLoading = false
          }
        } catch (error) {
          this.doTrackSegmentError(error, `${this.type} Medals Profile`)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-profile-medals::v-deep {
  @include max-width(1407px) {
    padding: 0;
  }

  @include max-width(768px) {
    padding: 0 50px;
  }

  @include max-width(540px) {
    padding: 0;

    .xo-profile-explore-events {
      margin: 0 -15px;
      border-radius: 0;
    }
  }

  .list {
    &::after {
      content: '';
      width: calc(100% / 3 - 10px);
    }

    &.list-1,
    &.list-2 {
      padding: 0 1.2rem;

      &::after {
        content: none;
      }

      @include max-width(767px) {
        padding: 0;
      }

      .item {
        width: calc(50% - 10px);

        @include max-width(500px) {
          width: 100%;
        }

        .xa-profile-medal {
          .card-content {
            .details {
              .xa-medals-video {
                .video-js {
                  height: 370px;
                }
              }
            }
          }
        }
      }
    }

    .item {
      width: calc(100% / 3 - 10px);
      margin-bottom: 10px;

      @include max-width(1407px) {
        width: calc(50% - 10px);
      }

      @include max-width(768px) {
        width: calc(50% - 15px);
      }

      @include max-width(600px) {
        width: calc(50% - 10px);
      }

      @include max-width(500px) {
        width: 100%;
        max-width: 320px;
        margin: 0 auto 20px;
      }

      &.loader-2 {
        @include max-width(500px) {
          display: none;
        }
      }

      &.loader-3 {
        @include max-width(1407px) {
          display: none;
        }
      }

      .xa-profile-medal {
        .card-content {
          padding: 15px;

          .details {
            .xa-medals-video {
              border-radius: 5px;

              &.landscape {
                background-color: $black;

                .video-js {
                  &.vjs-fullscreen {
                    video {
                      object-fit: contain;
                    }
                  }

                  video {
                    object-fit: none;
                  }

                  .vjs-poster {
                    background-size: 150%;
                  }
                }
              }

              .video-js {
                height: 320px;

                @include max-width(1407px) {
                  height: 420px;
                }

                @include max-width(1215px) {
                  height: 320px;
                }

                @include max-width(768px) {
                  height: 420px;
                }

                @include max-width(600px) {
                  height: 370px;
                }

                @include max-width(500px) {
                  height: 480px;
                }

                video {
                  box-shadow: none;
                  border-radius: 10px;
                }
              }
            }
          }
        }
      }
    }
  }

  .load-more {
    margin-top: 20px;
  }
}
</style>
