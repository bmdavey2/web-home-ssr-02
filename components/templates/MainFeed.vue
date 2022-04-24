<template lang="pug">
.xt-main-feed.container
  .columns
    .column.is-one-quarter
      XOMainFeedActionBar.mobile-action-bar
      XOFeedFilter(:show.sync="showFilters", :categories="categories")
    #feed-list.column.is-one-half
      XOMainFeedActionBar
      XOFeed(:items="items", :loading="loadingFeed" @next="loadMore", :has-more="hasMore")
    .column.is-one-quarter.is-hidden-touch(ref="sidebar")
      client-only
        affix(
          relative-element-selector="#feed-list",
          :offset="{ top: 95, bottom: 0 }"
          scroll-affix,
          :style="{ width: `${sidebarWidth}px` }")
          template(v-if="isLoggedIn")
            XOMainFeedMyProfileCard
            XOMainFeedRecommendedProfiles
          template(v-else)
            XOMainFeedSignUpCard
          XOMainFeedQuickLinks
</template>

<script>
import XOFeedFilter from '~/components/organisms/MainFeed/Filter'
import XOMainFeedMyProfileCard from '~/components/organisms/MainFeed/MyProfileCard'
import XOFeed from '~/components/organisms/Feed'
import XOMainFeedActionBar from '~/components/organisms/MainFeed/ActionBar'
import XOMainFeedRecommendedProfiles from '~/components/organisms/MainFeed/RecommendedProfiles'
import XOMainFeedSignUpCard from '~/components/organisms/MainFeed/SignUpCard'
import XOMainFeedQuickLinks from '~/components/organisms/MainFeed/QuickLinks'

export default {
  name: 'XTMainFeed',
  components: {
    XOMainFeedSignUpCard,
    XOMainFeedRecommendedProfiles,
    XOMainFeedActionBar,
    XOFeed,
    XOFeedFilter,
    XOMainFeedMyProfileCard,
    XOMainFeedQuickLinks,
  },
  props: {
    loadingFeed: Boolean,
    categories: Array,
    items: Array,
    hasMore: Boolean,
  },
  data() {
    return {
      showFilters: true,
      sidebarWidth: 315,
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleWindowResize)
  },
  mounted() {
    this.handleWindowResize()
  },
  methods: {
    loadMore() {
      this.$emit('next')
    },
    handleWindowResize() {
      if (this.$refs.sidebar) {
        this.sidebarWidth = this.$refs.sidebar.clientWidth - 20
      }
      if (window.outerWidth < 768) {
        this.showFilters = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xt-main-feed::v-deep {
  .mobile-action-bar {
    display: none;
  }

  @media screen and (max-width: 767px) {
    padding-left: 0;
    padding-right: 0;

    > .columns {
      margin: 0;

      > .column {
        padding: 0;
      }
    }

    .mobile-action-bar {
      display: flex;
    }

    #feed-list {
      .xo-main-feed-action-bar {
        display: none;
      }
    }
  }
}
</style>
