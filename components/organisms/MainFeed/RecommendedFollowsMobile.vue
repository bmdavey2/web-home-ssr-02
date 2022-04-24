<template lang="pug">
.xo-feed-recommended-follows-mobile
  .box
    .header
      ._title Recommended {{ isEvenNumber ? 'Businesses' : 'People' }}
      .actions
        .btn-nav.btn-prev(@click.prevent="$refs.carousel.prev()"): b-icon(icon="chevron-left")
        .btn-nav.btn-next(@click.prevent="$refs.carousel.next()"): b-icon(icon="chevron-right")
    vue-slick-carousel(v-bind="sliderSettings" ref="carousel" v-if="!isRetrieving")
      .slide-item(v-for="profile in profiles"): XOMainFeedProfileFollowCard(:value="profile", :key="profile.id")
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import gql from 'graphql-tag'
import XOMainFeedProfileFollowCard from '~/components/organisms/MainFeed/ProfileFollowCard'

export default {
  name: 'XOFeedRecommendedFollowsMobile',
  components: { VueSlickCarousel, XOMainFeedProfileFollowCard },
  props: {
    isEvenNumber: Boolean,
  },
  data() {
    return {
      profiles: [],
      isRetrieving: true,
    }
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 2,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: '30px',
        responsive: [
          {
            breakpoint: 551,
            settings: {
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
    this.doRetrieveRecommendedFollows()
  },
  methods: {
    async doRetrieveRecommendedFollows() {
      this.isRetrieving = true
      if (this.isEvenNumber) {
        try {
          const { data } = await this.$apollo.query({
            fetchPolicy: 'no-cache',
            context() {
              return this.getGraphQLContext()
            },
            query: gql`
              query {
                Me {
                  RecommendedBusinesses {
                    Business {
                      name
                      isFollowed
                      profileType
                      profilePhotoURL(type: "100")
                      Aggregates {
                        articlesPublished
                        updates
                        likesReceived
                      }
                    }
                    objectID
                    objectType
                  }
                }
              }
            `,
          })
          this.profiles = data.Me.RecommendedBusinesses
        } catch (error) {
          this.doTrackSegmentError(error)
        }
      } else {
        try {
          const { data } = await this.$apollo.query({
            fetchPolicy: 'no-cache',
            context() {
              return this.getGraphQLContext()
            },
            query: gql`
              query {
                Me {
                  RecommendedMembers(count: 10) {
                    Member {
                      name
                      isFollowed
                      profilePhotoURL(type: "100")
                      Aggregates {
                        articlesPublished
                        updates
                        likesReceived
                      }
                    }
                    objectID
                    objectType
                  }
                }
              }
            `,
          })
          this.profiles = data.Me.RecommendedMembers
        } catch (error) {
          this.doTrackSegmentError(error)
        }
      }
      this.isRetrieving = false
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-feed-recommended-follows-mobile::v-deep {
  display: none;

  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;

    ._title {
      flex: 10000 1 0;
      text-transform: uppercase;
      font-weight: 500;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;

      .btn-nav {
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
    }
  }

  .slick-slider {
    margin: 0 -10px;

    .slick-list {
      padding: 0 1% 30px 0 !important;

      .slick-slide {
        .slide-item {
          padding: 0 10px;

          .box {
            box-shadow: none;
            border: 1px solid #eef1f1;
            border-radius: 5px;
            height: 100%;
            padding: 1rem !important;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
}

.xo-feed-item {
  .xo-feed-recommended-follows-mobile {
    .box {
      padding: 1.25rem !important;
    }
  }
}
</style>
