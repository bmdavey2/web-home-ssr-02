<template lang="pug">
.xp-article
  XMArticleViewBreadcrumbs(v-if="getIsFromArticles", :item="article")
  XMArticleViewHeader
  XMArticleViewContent
  hr.divider
  XMFeedItemCategories(:item="article")
  XMArticleViewActions(:comments="comments.length")
  XMArticleViewDetails(:hasSocialMedia="false")
  client-only
    XMArticleViewCommentInput(@submit="onSubmitComment", :submitting="submitting")
    .comments
      .toggle-comment.is-clickable.pl-2(@click.prevent="showComments = !showComments") {{ showComments ? 'Hide' : 'Show' }} all {{ comments.length }} comment(s)
      transition(name="slide")
        .list(v-if="showComments")
          XMArticleViewComment(v-for="(comment, index) in comments", :key="index", :comment="comment")
</template>

<script>
import gql from 'graphql-tag'
import Hls from 'hls.js'
import { mapGetters } from 'vuex'
import XMFeedItemCategories from '~/components/molecules/FeedItem/Categories'
import XMArticleViewHeader from '~/components/molecules/Article/View/Header'
import XMArticleViewContent from '~/components/molecules/Article/View/Content'
import XMArticleViewActions from '~/components/molecules/FeedItem/Content/Actions'
import XMArticleViewDetails from '~/components/molecules/Article/View/Details'
import XMArticleViewCommentInput from '~/components/molecules/Article/View/CommentInput'
import XMArticleViewComment from '~/components/molecules/Article/View/Comment'
import XMArticleViewBreadcrumbs from '~/components/molecules/Article/View/Breadcrumbs'

export default {
  name: 'XPArticle',
  components: {
    XMArticleViewComment,
    XMArticleViewCommentInput,
    XMArticleViewDetails,
    XMArticleViewActions,
    XMArticleViewContent,
    XMArticleViewHeader,
    XMFeedItemCategories,
    XMArticleViewBreadcrumbs,
  },
  props: {
    article: Object,
  },
  data() {
    return {
      submitting: false,
      showComments: true,
      comments: [],
    }
  },
  computed: {
    ...mapGetters({
      getIsFromArticles: 'articles/getIsFromArticles',
    }),
    content() {
      return this.article?.content
    },
    FeedItem() {
      return this.article?.FeedItem
    },
    slug() {
      return this.$route.params.slug
    },
  },
  mounted() {
    this.loadComments()
  },
  methods: {
    async loadComments(arg) {
      const slug = this.slug
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: { slug },
          query: gql`
            query ($slug: String) {
              Article(slug: $slug) {
                FeedItem {
                  id
                  Comments {
                    count
                    next
                    items {
                      id
                      actorID
                      actorType
                      content
                      isLiked
                      timestamp
                      Member {
                        profilePhotoURL
                        name
                        slug
                      }
                      Business {
                        profilePhotoURL
                        name
                        slug
                        plan
                      }
                      Aggregates {
                        likes
                      }
                    }
                  }
                }
              }
            }
          `,
        })
        this.comments = data.Article.FeedItem.Comments.items
      } catch (error) {
        this.doTrackSegmentError(error, 'Article')
      } finally {
        if (arg) this.showComments = true
        this.loadVideo()
      }

      this.$store.commit('control/setLoading', {
        name: `app/loading`,
        value: false,
      })
    },
    loadVideo() {
      setTimeout(() => {
        const vids = document.getElementsByTagName('video')
        for (let i = 0; i < vids.length; i++) {
          const source = vids[i].getElementsByTagName('source')[0]
          if (source) {
            if (Hls.isSupported() && source.src) {
              const hls = new Hls()
              hls.loadSource(source.src)
              hls.attachMedia(vids[i])
              window.hls = hls
            }
          }
        }
      }, 3000)
    },
    async onSubmitComment(content) {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }

      try {
        this.submitting = true
        const {
          data: {
            addComment: { timestamp, objectID: id },
          },
        } = await this.$apollo.mutate({
          context: this.getGraphQLContext(),
          variables: {
            id: this.FeedItem?.id,
            content,
          },
          mutation: gql`
            mutation ($id: String!, $content: String!) {
              addComment(targetGetStreamActivityID: $id, content: $content) {
                objectID
                timestamp
                success
              }
            }
          `,
        })
        const profile = await this.getMyDisplayProfile()
        this.comments.push({
          id,
          actorType: this.currentBusinessID ? 'Business' : 'Member',
          Member: this.currentBusinessID ? null : profile,
          Business: this.currentBusinessID ? profile : null,
          content,
          timestamp,
          isLiked: false,
          Aggregates: {
            likes: 0,
          },
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Article')
      } finally {
        this.submitting = false
        this.loadComments(true)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-article::v-deep {
  max-width: 800px;
  width: 100%;
  margin: auto;

  .divider {
    border-top: 1px solid #cfd4d5;
  }

  .xm-feed-item-categories {
    justify-content: flex-start !important;

    .item {
      font-size: 0.8571rem !important;
    }
  }

  [contenteditable='true']:empty::before {
    content: '' !important;
  }

  p:empty::before {
    content: '' !important;
  }

  .activecardlist0 {
    background: rgba(138, 141, 145, 0.8);
    width: 100%;

    video {
      margin: 0 !important;
      max-width: 640px;

      @media (max-width: 674px) {
        max-width: 420px;
      }

      @media (max-width: 446px) {
        max-width: 320px;
      }

      @media (max-width: 349px) {
        max-width: 260px;
      }
    }

    p {
      width: max-content;
      margin: 0 auto !important;
    }
  }

  .comments {
    padding-bottom: 50px;

    &.guest {
      margin-top: 50px;
    }

    .toggle-comment {
      user-select: none;
    }

    .list {
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 1023px) {
    .comments {
      padding: 0 15px 50px;
    }
  }
}
</style>
