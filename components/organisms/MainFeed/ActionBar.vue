<template lang="pug">
.xo-main-feed-action-bar.box.flex.align-center.is-user-select-none.py-2
  .flex-auto.profile-avatar(v-if="isLoggedIn")
    XOMyProfileAvatar
  .flex-grow.px-4.post-update
    .flex.align-center
      XOMyProfileAvatar(v-if="isLoggedIn")
      XMMainFeedActionBarButton(
        :icon="require('~/assets/icons/post-update.svg')"
        label="Post an Update"
        @click="clickPostUpdate")
    .separator(style="height: 1px; background: #000")
    .flex.align-center
      XMMainFeedActionBarButton(
        v-model="photoFiles"
        upload,
        :icon="require('~/assets/icons/photo.svg')"
        label="Photo"
        accept="image/*",
        :disabled="!isLoggedIn"
        @click="!isLoggedIn ? showSignUpNagDialog() : null")
      XMMainFeedActionBarButton(
        v-model="videoFile"
        upload
        accept="video/*",
        :icon="require('~/assets/icons/video.svg')"
        label="Video",
        :disabled="!isLoggedIn"
        @click="!isLoggedIn ? showSignUpNagDialog() : null")
      XMMainFeedActionBarButton.post-article-mobile(
        :icon="require('~/assets/icons/primary/article.svg')"
        label="Post an Article"
        @click="clickPostArticle")
  .flex-auto.post-article
    .btn-post-article(@click.prevent="clickPostArticle()")
      img(src="~assets/icons/primary/article.svg")
      | Post an Article
      b-loading(:is-full-page="false" v-model="isLoading")
        b-icon.spin-icon(icon="loading")
</template>

<script>
import gql from 'graphql-tag'
import XPAddUpdate from '~/components/pages/AddUpdate'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XMMainFeedActionBarButton from '~/components/molecules/MainFeed/ActionBarButton'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'

export default {
  name: 'XOMainFeedActionBar',
  components: { XOMyProfileAvatar, XMMainFeedActionBarButton, XAProfileAvatar },
  data() {
    return {
      photoFiles: null,
      videoFile: null,
      isLoading: false,
    }
  },
  watch: {
    photoFiles(value) {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (!value) return
      const fullscreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: XPAddUpdate,
        width: 600,
        props: {
          initialPhotoFiles: value,
          isFullscreen: fullscreen,
        },
        canCancel: !fullscreen,
        fullScreen: fullscreen,
      })
      this.photoFiles = null
    },
    videoFile(value) {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (!value) return
      const fullscreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: XPAddUpdate,
        width: 600,
        canCancel: !fullscreen,
        fullScreen: fullscreen,
        props: {
          isFullscreen: fullscreen,
          initialVideoFile: value,
        },
      })
      this.videoFile = null
    },
  },
  methods: {
    clickPostUpdate() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      const fullscreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: XPAddUpdate,
        width: 600,
        canCancel: !fullscreen,
        fullScreen: fullscreen,
        props: {
          isFullscreen: fullscreen,
        },
      })
    },
    async clickPostArticle() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }

      this.isLoading = true
      const {
        data: { createArticle: result },
      } = await this.$apollo.mutate({
        variables: {
          input: {
            title: '',
            subtitle: String,
            content: String,
            CategoryIDs: [],
          },
        },
        mutation: gql`
          mutation ($input: InputArticle!) {
            createArticle(input: $input) {
              success
              objectID
            }
          }
        `,
      })
      const { objectID, success, error } = result
      if (success) {
        this.isLoading = false
        await this.$router.push(`me/articles/drafts/${objectID}`)
      } else {
        // error: unable to create dialog
        this.isLoading = false
        this.$toast.error('Sorry, there’s a problem generating article. Please try again.', {
          duration: 5000,
          position: 'top-center',
        })
        this.doTrackSegmentError(error)
      }
    },
    clickVideo() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
      }
    },
    clickPhoto() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-main-feed-action-bar::v-deep {
  padding: 20px !important;

  .post-update {
    .xa-profile-avatar {
      display: none;
    }
  }

  .post-article-mobile {
    display: none;
  }

  .post-article {
    .btn-post-article {
      position: relative;
      border: 1px solid $primary;
      color: $primary;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 6px 15px;
      border-radius: 4px;
      cursor: pointer;

      img {
        margin-right: 10px;
      }
    }
  }

  .separator {
    margin: 15px 0;
  }

  @media screen and (max-width: 767px) {
    .profile-avatar {
      display: none;
    }

    .post-update {
      flex: none;
      width: 100%;
      padding: 0 !important;

      .xa-profile-avatar {
        display: flex;
        margin-right: 10px;
      }
    }

    .post-article {
      display: none;
    }

    .post-article-mobile {
      display: block;
    }
  }

  @media screen and (max-width: 427px) {
    .xm-main-feed-action-bar-button {
      font-size: 0.8571rem;
      align-items: flex-start;
    }

    .post-article-mobile {
      color: $primary;
    }
  }

  .spin-icon {
    animation: spin-animation 0.5s infinite;
  }
  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
}
</style>
