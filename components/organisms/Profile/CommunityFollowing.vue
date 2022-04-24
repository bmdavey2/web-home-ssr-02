<template lang="pug">
.xo-profile-community-following
  template(v-if="items.length > 0"): XMProfileListInfoCard(v-for="(item, index) in items", :key="index", :item="item")
  template(v-else): .is-size-4.has-text-grey.has-text-centered Haven’t followed anyone yet.
</template>

<script>
import gql from 'graphql-tag'
import XMProfileListInfoCard from '~/components/molecules/Profile/ListInfoCard'
import fragment from '~/assets/graphql/fragmentSocialProfileCardList.graphql'
export default {
  name: 'XOProfileCommunityFollowing',
  components: { XMProfileListInfoCard },
  props: {
    type: String,
    filter: String,
  },
  data() {
    return {
      items: [],
      loading: false,
      error: null,
    }
  },
  watch: {
    filter() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      try {
        this.loading = true
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            slug: this.$route.params.slug,
            type: this.filter,
          },
          context: this.getGraphQLContext(),
          query:
            this.type === 'Business'
              ? gql`
                  ${fragment}
                  query ($slug: String!, $filter: String) {
                    Business(slug: $slug) {
                      id
                      Aggregates {
                        follows
                      }
                      Follows(type: $filter) {
                        ...SocialProfileCardList
                      }
                    }
                  }
                `
              : gql`
                  ${fragment}
                  query ($slug: String!, $filter: String) {
                    Member(slug: $slug) {
                      id
                      Aggregates {
                        follows
                      }
                      Follows(type: $filter) {
                        ...SocialProfileCardList
                      }
                    }
                  }
                `,
        })
        const profile = data[this.type]
        this.items = profile.Follows
        this.$emit('update:count', profile.Aggregates.follows)
      } catch (error) {
        this.error = error
        this.doTrackSegmentError(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-profile-community-following::v-deep {
  .xm-profile-list-info-card {
    .xm-category-pill {
      font-size: 0.8571rem;
      padding: 5px 10px !important;

      img {
        width: 18px !important;
        height: auto !important;
      }
    }
  }
}
</style>
