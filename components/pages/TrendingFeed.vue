<template lang="pug">
XTMainFeed.pt-5.pb-6(
  :items="items",
  :categories="categories"
  @next="onNext"
  @refresh="onReload",
  :loadingFeed="loading",
  :hasMore="hasMore")
</template>

<script>
import gql from 'graphql-tag'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import some from 'lodash/some'
import fragmentFeedItemContents from '~/assets/graphql/fragmentFeedItemContents.graphql'
import XTMainFeed from '~/components/templates/MainFeed'
import reload from '~/mixins/reload'
export default {
  name: 'XPTrendingFeed',
  components: { XTMainFeed },
  mixins: [reload],
  props: {
    categories: Array,
  },
  data() {
    return {
      hasMore: true,
      loading: false,
      feedItems: [],
      nextCursor: null,
      error: null,
    }
  },
  computed: {
    items() {
      if (!this.selectedCategoryID) return this.feedItems
      return filter(this.feedItems || [], ({ Categories }) => {
        return some(Categories, (x) => x.id === this.selectedCategoryID)
      })
    },
  },
  watch: {
    currentBusinessID() {
      window.scrollTo(0, 0)
      this.load()
    },
    selectedCategoryID() {
      const filtered = filter(this.feedItems || [], ({ Categories }) => {
        return some(Categories, (x) => x.id === this.selectedCategoryID)
      })
      if (!filtered.length) {
        this.hasMore = true
        this.load()
      }
    },
  },
  async mounted() {
    await this.$store.commit('app/setSelectedCategory', null)
    this.load()
  },
  methods: {
    onReload() {
      this.load()
    },
    onNext() {
      this.load(true)
    },
    async load(withNext) {
      if (this.loading) return
      if (withNext && !this.hasMore) return
      if (!withNext) {
        this.nextCursor = null
      }
      try {
        this.loading = true
        const {
          data: {
            CategoryFeed: { items, next },
          },
        } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            id: this.selectedCategoryID,
            cursor: this.nextCursor,
          },
          context: this.getGraphQLContext(),
          query: gql`
            ${fragmentFeedItemContents}
            query ($id: String, $cursor: String) {
              CategoryFeed(id: $id, cursor: $cursor, count: 10) {
                ...FeedItemContents
                count
                next
              }
            }
          `,
        })
        this.feedItems = withNext ? concat(this.feedItems, items) : items
        this.nextCursor = next
        this.hasMore = items?.length > 0 || false
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
