<template lang="pug">
.publish-details.pt-5
  .is-flex.is-flex-wrap-wrap.is-align-items-center.is-justify-content-space-between
    .profile-details
      nuxt-link(:to="publisherLink"): XAProfileAvatar(size="50px", :label="initials", :image="photoUrl")
      .content.ml-3
        .is-flex
          .name.is-family-secondary.is-italic.mr-1 Published by #[nuxt-link(:to="publisherLink") {{ name }}]
          //- img(v-if="badge", :src="require(`~/assets/icons/mentor/${badge}.svg`)" width="19" height="19")
        .has-text-grey on {{ createdAt }}

        template.follow-content
          template(v-if="!Me && hasSocialMedia")
            b-button.follow-button.is-following.mt-3(
              icon-left="check"
              v-if="isFollowing"
              @click.prevent="doToggleFollow()",
              :loading="isSubmitting") Following
            b-button.follow-button.mt-3.is-secondary(
              outlined
              v-else
              @click.prevent="doToggleFollow()",
              :loading="isSubmitting") Follow

    template(v-if="hasSocialMedia")
      ul.social-container.is-flex.is-flex-wrap-wrap.is-align-items-center.has-text-grey
        li: ._circle.save(@click.prevent="doSaveArticle()", :class="isSaving && 'is-disabled'")
          b-icon(icon="bookmark" v-if="isSaved")
          b-icon(icon="bookmark-outline" v-else)
        li(@click.prevent="doLoadSegment()"): share-network._circle(
          network="linkedin",
          :title="title",
          :description="content",
          :media="coverPhotoURL",
          :url="`${baseURL}/a/${link}`"): img(
          src="~assets/icons/social/article/linkedin.svg"
          width="16"
          height="16")
        li(@click.prevent="doLoadSegment()"): share-network._circle(
          network="twitter",
          :title="title",
          :description="content",
          :media="coverPhotoURL",
          :url="`${baseURL}/a/${link}`"): img(
          src="~assets/icons/social/article/twitter.svg"
          width=icons
          height="16")
        li(@click.prevent="doLoadSegment()"): share-network._circle(
          network="facebook",
          :title="title",
          :description="content",
          :media="coverPhotoURL",
          :url="`${baseURL}/a/${link}`"): img(
          src="~assets/icons/social/article/facebook.svg"
          width="16"
          height="16")
        li.last-child(v-click-outside="hideDotActions" v-if="!Me")
          ._circle(@click.prevent="showDotActions = !showDotActions"): b-icon(icon="dots-vertical")
          transition(name="fade")
            .dot-actions(v-if="showDotActions")
              .action(@click.prevent="doShowReportContentModal()") Report this Content

    template(v-else)
      template(v-if="!Me && !hasSocialMedia")
        b-button.follow-button.is-following.mt-3(
          icon-left="check"
          v-if="isFollowing"
          @click.prevent="doToggleFollow()",
          :loading="isSubmitting") Following
        b-button.follow-button.mt-3.is-secondary(
          outlined
          v-else
          @click.prevent="doToggleFollow()",
          :loading="isSubmitting") Follow
</template>

<script>
import moment from 'moment'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XMArticleViewDetails',
  components: { XAProfileAvatar },
  props: {
    hasSocialMedia: { type: Boolean, default: true },
  },
  data() {
    return {
      isFollowing: this.$parent?.article?.Business?.isFollowed || this.$parent?.article?.Member?.isFollowed || false,
      isSubmitting: false,
      isSaved: this.$parent?.article?.FeedItem?.isSaved || false,
      isSaving: false,
      showDotActions: false,
      CurrentProfile: [],
    }
  },
  computed: {
    article() {
      return this.$parent?.article
    },
    publisher() {
      return this.article?.Member || this.article?.Business
    },
    name() {
      return this.publisher?.name
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    // badge() {
    //   return this.publisher?.Mentor?.badge || this.publisher?.badge || null
    // },
    Me() {
      return this.publisher?.id === this.CurrentProfile?.id
    },
    photoUrl() {
      return this.publisher?.profilePhotoURL
    },
    createdAt() {
      return moment(this.article?.createdAt).format('MMM DD, YYYY')
    },
    title() {
      return this.article?.title || ''
    },
    coverPhotoURL() {
      return this.article?.coverPhotoURL
    },
    content() {
      return this.article?.content
    },
    link() {
      return this.$route.params.slug
    },
    publisherLink() {
      if (this.article?.Member) return `/p/${this.publisher?.slug}` || ''
      if (this.article?.Business) return `/b/${this.publisher?.slug}` || ''
      return null
    },
  },
  mounted() {
    this.$root.$on('article/save', this.doSaveArticleGlobal)
    this.$root.$on('article/unsave', this.doUnsaveArticleGlobal)
    this.$root.$on('article/follow', this.doFollowGlobal)
    this.$root.$on('article/unfollow', this.doUnfollowGlobal)
    this.getCurrentProfile()
  },
  methods: {
    async getCurrentProfile() {
      this.CurrentProfile = await this.getMyDisplayProfile()
    },
    async doToggleFollow() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.getFollowLimit(this.isFollowing)) return
      this.isSubmitting = true
      const MemberID = this.article?.Member ? this.publisher?.id : undefined
      const BusinessID = this.article?.Business ? this.publisher?.id : undefined

      if (this.isFollowing) {
        try {
          await this.$api.unfollow({ MemberID, BusinessID })
          this.isFollowing = false
          this.isSubmitting = false
          this.$root.$emit('article/unfollow')
        } catch (error) {
          this.doTrackSegmentError(error, 'Article')
        }
      } else {
        try {
          await this.$api.follow({ MemberID, BusinessID })
          this.isFollowing = true
          this.isSubmitting = false
          this.$root.$emit('article/follow')
        } catch (error) {
          this.doTrackSegmentError(error, 'Article')
        }
      }
    },
    async doSaveArticle() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      this.isSaving = true
      const targetGetStreamActivityID = this.article?.FeedItem?.id

      try {
        if (this.isSaved) {
          this.isSaved = false
          this.$root.$emit('article/subtractSavesCount')
          await this.$api.unsave({ targetGetStreamActivityID })
        } else {
          this.isSaved = true
          this.$root.$emit('article/addSavesCount')
          await this.$api.save({ targetGetStreamActivityID })
        }
      } catch (error) {
        this.doTrackSegmentError(error, 'Article')
      } finally {
        this.isSaving = false
      }
    },
    doShowReportContentModal() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      const details = {
        GetStreamActivityID: this.article?.id,
        objectID: this.publisher?.id,
        objectType: this.article?.FeedItem?.actorType,
        name: this.publisher?.name,
      }

      this.$buefy.modal.open({
        parent: this,
        component: () => import('~/components/pages/ReportContent'),
        width: 600,
        props: {
          details,
        },
      })
    },
    hideDotActions() {
      this.showDotActions = false
    },
    doSaveArticleGlobal() {
      this.isSaved = true
    },
    doUnsaveArticleGlobal() {
      this.isSaved = false
    },
    doFollowGlobal() {
      this.isFollowing = true
    },
    doUnfollowGlobal() {
      this.isFollowing = false
    },
    doLoadSegment() {
      let userId, groupId
      if (this.isLoggedIn) {
        if (this.currentBusinessID) {
          groupId = this.currentBusinessID
        } else {
          userId = this.$store.state.auth?.uid
        }
      }
      const details = {
        id: this.article?.id,
        slug: this.article?.slug,
        title: this.article?.title,
        userId,
        groupId,
      }
      this.$appClient.segment.trackArticleShareClick(details)
    },
  },
}
</script>

<style lang="scss" scoped>
.publish-details::v-deep {
  .profile-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .name {
    a {
      color: inherit;
    }
  }

  .follow-button {
    text-transform: uppercase;
    border-radius: 5px;
    padding: 8px 10px;
    height: 30px;
    font-size: 0.8571rem;
    line-height: 1;

    &.is-following {
      background-color: #eef1f1;
      color: $secondary;
      border-color: transparent;
      box-shadow: none;
    }
  }

  .social-container {
    position: relative;

    li {
      margin-right: 16px;

      &.last-child,
      &:last-child {
        margin-right: 0;
      }
    }

    ._circle {
      font-size: 1rem;
      border-radius: 50%;
      border: 1px solid #65676b;
      padding: 8px 7px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s;
      cursor: pointer;
      color: #65676b;

      &.is-disabled {
        pointer-events: none;
      }
    }

    .dot-actions {
      position: absolute;
      top: 50px;
      right: 0;
      background-color: $white;
      box-shadow: 0 2px 20px rgba($secondary, 0.1);
      width: 240px;
      border-radius: 5px;
      font-size: 0.8571rem;

      .action {
        display: block;
        color: inherit;
        cursor: pointer;
        padding: 15px;
        transition: 0.3s;

        &::before {
          content: '○';
          margin-right: 5px;
          color: $secondary;
        }

        &:hover {
          background-color: #f8f8f8;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    padding: 1.5rem 15px 0 !important;
  }

  @media screen and (max-width: 767px) {
    .profile-details {
      order: 2;
      width: 100%;
    }

    .social-container {
      order: 1;
      width: 100%;
      margin-bottom: 20px;
    }

    .follow-button {
      order: 3;
    }
  }
}
</style>
