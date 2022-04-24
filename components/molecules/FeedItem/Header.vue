<template lang="pug">
.xm-feed-item-header
  .left-content
    nuxt-link(:to="profileLink" v-if="item"): XAProfileAvatar.is-cursor-pointer(
      size="36px",
      :image="profilePhoto",
      :label="initials")
    .avatar-loader(v-else): b-skeleton(width="36" height="36" circle)
    .content(v-if="item")
      .is-flex.align-center
        nuxt-link.is-cursor-pointer(:to="profileLink" style="font-size: 13px; font-weight: 500; color: inherit") {{ name }}
        //- img.ml-1(:src="require(`~/assets/icons/mentor/${badge}.svg`)" width="19" height="19" v-if="badge")
      div(style="font-size: 12px; font-weight: 400") {{ timestamp }}
  .right-content(:class="isArticle && 'is-article'")
    template(v-if="item")
      template(v-if="item.objectType === 'Article'")
        .save-container
          .unsave(@click.prevent="doSaveArticle()" v-if="isSaved")
            ._icon: b-icon(icon="check" size="is-small")
            ._label Saved
          .save(@click.prevent="doSaveArticle()" v-else)
            ._icon: b-icon(icon="bookmark-outline" size="is-small")
            ._label Save
      XMFeedItemCategories(:item="item" v-else)
    XMFeedItemMenu(:item="item" v-if="isLoggedIn")
  .article-categories(v-if="item")
    XMFeedItemCategories(v-if="item.objectType === 'Article'", :item="item")
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAFeedSaveButton from '~/components/atoms/Feed/SaveButton'
import XMFeedItemCategories from '~/components/molecules/FeedItem/Categories'
import XMFeedItemMenu from '~/components/molecules/FeedItem/Menu'
export default {
  name: 'XMFeedItemHeader',
  components: { XMFeedItemMenu, XMFeedItemCategories, XAFeedSaveButton, XAProfileAvatar },
  props: {
    item: Object,
  },
  data() {
    return {
      isSaved: this.item?.isSaved,
      isSaving: false,
    }
  },
  computed: {
    actor() {
      if (!this.item?.actorType) return null
      return this.item[this.item.actorType]
    },
    name() {
      return this.actor?.name ? this.actor?.name.replace(/&amp;/g, '&') : ''
    },
    timestamp() {
      if (!this.item?.timestamp) return null
      return moment(this.item?.timestamp).format('MMM D [at] h:mm a')
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    profilePhoto() {
      return this.actor?.profilePhotoURL
    },
    profileLink() {
      switch (this.item?.actorType) {
        case 'Member':
          return `/p/${this.actor?.slug}`
        case 'Business':
          return `/b/${this.actor?.slug}`
        default:
          return '/'
      }
    },
    // badge() {
    //   switch (this.item?.actorType) {
    //     case 'Member':
    //       return this.actor?.Mentor?.badge || null
    //     case 'Business':
    //       return this.actor?.badge || null
    //     default:
    //       return false
    //   }
    // },
    isArticle() {
      if (this.item?.objectType === 'Article') {
        return true
      }
      return false
    },
  },
  watch: {
    item(value) {
      this.isSaved = value?.isSaved
    },
  },
  methods: {
    async doSaveArticle() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      const loader = this.$buefy.loading.open()
      const targetGetStreamActivityID = this.item?.id
      try {
        if (this.isSaved) {
          await this.$apollo.mutate({
            context: this.getGraphQLContext(),
            variables: {
              targetGetStreamActivityID,
            },
            mutation: gql`
              mutation ($targetGetStreamActivityID: String) {
                unsave(targetGetStreamActivityID: $targetGetStreamActivityID) {
                  success
                }
              }
            `,
          })
          this.$root.$emit('DoRemoveSavedArticle', this.item)
          this.$root.$emit('DoCountSavedArticle')
        } else {
          await this.$apollo.mutate({
            context: this.getGraphQLContext(),
            variables: {
              targetGetStreamActivityID,
            },
            mutation: gql`
              mutation ($targetGetStreamActivityID: String) {
                save(targetGetStreamActivityID: $targetGetStreamActivityID) {
                  success
                }
              }
            `,
          })
        }
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        loader.close()
        this.isSaved = !this.isSaved
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-feed-item-header::v-deep {
  display: flex;
  flex-wrap: wrap;

  .left-content {
    display: flex;
    flex-wrap: wrap;

    .content {
      padding-left: 10px;
    }
  }

  .right-content {
    flex: 10000 1 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-end;

    .xm-feed-item-categories {
      justify-content: flex-end;
    }

    .save-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

      .save {
        border: 1px solid $secondary;
        box-shadow: 0 6px 20px hsl(0deg 0% 60% / 15%);
        background-color: $white;
        padding: 0 15px;
        border-radius: 20px;
        height: 32px;
        user-select: none;
        margin-right: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        font-weight: 300;
        cursor: pointer;

        ._icon {
          font-size: 18px;
          margin-right: 3px;
          display: flex;
        }
      }

      .unsave {
        box-shadow: 0 6px 20px hsl(0deg 0% 60% / 15%);
        background-color: #eef1f1;
        padding: 0 15px;
        border-radius: 20px;
        height: 32px;
        user-select: none;
        margin-right: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        font-weight: 300;
        cursor: pointer;

        ._icon {
          font-size: 18px;
          margin-right: 3px;
          display: flex;
        }
      }
    }
  }

  .article-categories {
    width: 100%;

    .xm-feed-item-categories {
      padding: 0 !important;
      margin-top: 15px;
    }
  }

  @media screen and (max-width: 767px) {
    position: relative;

    .right-content {
      flex: none;
      width: 100%;

      .xm-feed-item-categories {
        padding: 0 !important;
        width: 100%;
        flex: none;
        justify-content: flex-start;
        margin-top: 15px;
      }

      .xm-feed-item-menu {
        position: absolute;
        top: 0;
        right: 0;
      }

      &.is-article {
        flex: 10000 1 0;

        .save-container {
          padding-right: 15px;
        }
      }
    }
  }
}
</style>
