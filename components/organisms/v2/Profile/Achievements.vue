<template lang="pug">
.xo-profile-achievements.box
  ._header.row.items-center.justify-between
    .left-header
      .flex.align-center
        img(src="~assets/icons/checked-cup.svg" width="44" height="44")
        .header Medals #[span.text-weight-light(style="color: #65676b") {{ medalsCount }}]

    .right-header.row.items-center
      router-link(to="/marketplace") Explore events
      .see-all(@click.prevent="setMedalActiveTab('medals')") See all
      .slider-nav.row.items-center(v-if="medals.length > 3")
        .btn-prev.btn-nav.row.items-center.justify-center(@click.prevent="$refs.carousel.prev()"): b-icon(
          icon="chevron-left")
        .btn-next.btn-nav.row.items-center.justify-center(@click.prevent="$refs.carousel.next()"): b-icon(
          icon="chevron-right")

  .list(v-if="medals.length")
    template(v-if="!isRetrieving")
      vue-slick-carousel(v-bind="sliderSettings" ref="carousel")
        .slide-item(v-for="(medal, index) in medals", :key="index"): XAProfileMedal(:details="medal" type="Member")
</template>

<script>
import { mapActions } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import XAProfileMedal from '~/components/atoms/Profile/Medal'

export default {
  name: 'XOProfileAchievements',
  components: { VueSlickCarousel, XAProfileMedal },
  props: {
    medalsCount: Number,
  },
  data() {
    return {
      medals: [],
      isRetrieving: true,
    }
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        dots: false,
        centerPadding: '60px',
        centerMode: this.medals.length > 3,
        responsive: [
          {
            breakpoint: 1407,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              centerPadding: '30px',
            },
          },
          {
            breakpoint: 1215,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '60px',
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 560,
            settings: {
              centerPadding: '30px',
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '80px',
            },
          },
          {
            breakpoint: 427,
            settings: {
              centerPadding: '50px',
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      }

      return sliderSettings
    },
  },
  mounted() {
    this.doRetrieveMedals()
  },
  methods: {
    ...mapActions({
      setMedalActiveTab: 'medals/setMedalActiveTab',
    }),
    async doRetrieveMedals() {
      this.isRetrieving = true
      try {
        const slug = this.$route.params?.slug
        const count = 8

        const {
          Member: {
            Medals: { items },
          },
        } = await this.$api.getMemberMedals({ slug, count })

        this.medals = items
      } catch (error) {
      } finally {
        this.isRetrieving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-profile-achievements::v-deep {
  ._header {
    .right-header {
      color: #65676b;

      a {
        color: #65676b;
        margin-right: 15px;

        @include max-width(767px) {
          display: none;
        }
      }

      .see-all {
        cursor: pointer;
      }

      .slider-nav {
        margin-left: 15px;

        .btn-nav {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;

          &:last-child {
            margin-left: 5px;
          }

          &.btn-next {
            background-color: $secondary;
            color: $white;
          }
        }
      }
    }
  }

  .list {
    .slick-slider {
      .slick-list {
        padding: 0 1% 30px 0 !important;

        .slick-track {
          display: flex;
          flex-wrap: wrap;

          .slick-slide {
            float: none;
            height: auto;

            > div {
              height: 100%;

              .slide-item {
                padding: 0 5px;
                height: 100%;

                .xa-profile-medal {
                  .card-content {
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
                          }

                          .vjs-poster {
                            background-size: 150%;
                          }
                        }

                        .video-js {
                          height: 370px;

                          @include max-width(1215px) {
                            height: 450px;
                          }

                          @include max-width(600px) {
                            height: 350px;
                          }

                          @include max-width(500px) {
                            height: 450px;
                          }

                          @include max-width(375px) {
                            height: 350px;
                          }

                          video {
                            border-radius: 5px;
                            box-shadow: none;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
