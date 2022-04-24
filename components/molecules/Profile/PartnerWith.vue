<template lang="pug">
.xm-profile-partner-with
  .card
    .card-content
      .header
        ._title {{ $route.name === 'b-slug' ? 'We partner with' : 'I partner with' }}
        .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      .content
        template(v-if="isRetrieving"): b-loading(:is-full-page="false" v-model="isRetrieving")
        .list(v-else)
          .list-item(v-for="partner in partners", :key="partner.id"): XOMainFeedProfileFollowCard(:value="partner")
</template>

<script>
import gql from 'graphql-tag'
import XOMainFeedProfileFollowCard from '~/components/organisms/MainFeed/ProfileFollowCard'

export default {
  name: 'XMProfilePartnerWith',
  components: { XOMainFeedProfileFollowCard },
  data() {
    return {
      partners: [],
      isRetrieving: true,
    }
  },
  mounted() {
    this.doRetrievePartners()
  },
  methods: {
    async doRetrievePartners() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            slug: this.$route.params.slug,
          },
          context: this.getGraphQLContext(),
          query:
            this.$route.name === 'b-slug'
              ? gql`
                  query ($slug: String!) {
                    Business(slug: $slug) {
                      Partners {
                        objectID
                        objectType
                        Business {
                          id
                          name
                          slug
                          profilePhotoURL
                          Aggregates {
                            articlesPublished
                            likesReceived
                            updates
                          }
                          isFollowed
                        }
                        Member {
                          id
                          name
                          slug
                          profilePhotoURL
                          Aggregates {
                            articlesPublished
                            likesReceived
                            updates
                          }
                          isFollowed
                        }
                      }
                    }
                  }
                `
              : gql`
                  query ($slug: String!) {
                    Member(slug: $slug) {
                      Partners {
                        objectID
                        objectType
                        Business {
                          id
                          name
                          slug
                          profilePhotoURL
                          Aggregates {
                            articlesPublished
                            likesReceived
                            updates
                          }
                          isFollowed
                        }
                        Member {
                          id
                          name
                          slug
                          profilePhotoURL
                          Aggregates {
                            articlesPublished
                            likesReceived
                            updates
                          }
                          isFollowed
                        }
                      }
                    }
                  }
                `,
        })

        const result = data?.Business?.Partners || data?.Member?.Partners

        this.partners = result.map(({ objectType, Member, Business }) => {
          if (Member !== null) {
            Member.objectType = objectType
            return Member
          }
          if (Business !== null) {
            Business.objectType = objectType
            return Business
          }
        })
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
.xm-profile-partner-with::v-deep {
  .card {
    .card-content {
      padding: 0;

      .header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-bottom: 1px solid #c2c8c9;
        padding: 15px;

        ._title {
          font-size: 1.5714rem;
          line-height: 1;
          font-weight: 400;
          color: $secondary;
        }

        .close {
          cursor: pointer;
        }
      }

      .content {
        padding: 20px;
        position: relative;
        min-height: 100px;
        max-height: 400px;
        overflow-y: auto;

        .list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .list-item {
            width: calc(50% - 10px);
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;

    .card {
      .card-content {
        .content {
          .list {
            .list-item {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
