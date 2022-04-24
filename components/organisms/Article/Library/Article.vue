<template lang="pug">
.published-article-card.mb-5
  .card
    .card-content
      .is-flex.is-flex-wrap-wrap.is-justify-content-space-between
        .user-details.is-flex
          nuxt-link.mr-3(:to="link"): XAProfileAvatar(:label="initials", :image="ProfilePhoto" size="37px")

          .content
            nuxt-link.name.has-text-weight-medium(:to="link") {{ UserName }}
            .date {{ time }}

          ._menu.is-flex.is-justify-content-right
            b-dropdown(aria-role="list" position="is-bottom-left")
              template(#trigger)
                b-icon.has-text-grey.is-clickable(icon="dots-vertical")

              b-dropdown-item.is-flex(
                aria-role="listitem"
                @click="onClickEmit('Edit', article.id, article.coverPhotoURL)")
                ._dot
                p.pl-3 Edit
              b-dropdown-item.is-flex(
                aria-role="listitem"
                @click="onClickEmit('Delete', article.id, article.coverPhotoURL)")
                ._dot
                p.pl-3 Delete
              b-dropdown-item.is-flex(
                aria-role="listitem"
                @click="onClickEmit('Unpublish', article.id, article.coverPhotoURL)")
                ._dot
                p.pl-3 Unpublish

      XMFeedItemCategories.pt-5.pb-2(:item="article")

      .article-content
        .article-cover: img(:src="article.coverPhotoURL" width="533" height="300")

        .is-flex.is-flex-wrap-wrap.is-justify-content-flex-end
          .post-type.is-flex.is-align-items-center.py-1.px-2.has-background-primary.has-text-white
            template
              img.mr-2(src="~assets/icons/light/book.svg" style="height: 12px" width="12" height="12")
              ._label Article

        .article-content
          nuxt-link.article-title.has-text-secondary.is-family-secondary.mb-2(:to="id") {{ title }}
          .article-description.has-text-weight-light {{ subtitle }}

      .actions.is-flex.pt-5
        ._highfives.is-flex.mr-3
          img.mr-2(src="~assets/icons/primary/high-five.svg" width="16" height="21")
          ._count.has-text-weight-light {{ Aggregates.likes }}
        .comments.is-flex
          img.mr-2(src="~assets/icons/primary/comment.svg" width="16" height="21")
          ._count.has-text-weight-light {{ Aggregates.comments }}
</template>
<script>
import moment from 'moment'
import XMCategoryPill from '~/components/molecules/CategoryPill'
import XMFeedItemCategories from '~/components/molecules/FeedItem/Categories'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XOArticleLibraryArticle',
  components: { XAProfileAvatar, XMFeedItemCategories, XMCategoryPill },
  props: {
    data: Object,
  },
  computed: {
    article() {
      return this.data || []
    },
    title() {
      return this.article?.title.replace(/&amp;/g, 'and') || ''
    },
    subtitle() {
      return this.article?.subtitle.replace(/&amp;/g, 'and') || ''
    },
    feedItem() {
      return this.article?.FeedItem || []
    },
    Aggregates() {
      return this.feedItem?.Aggregates || []
    },
    id() {
      return '/a/' + this.article?.slug
    },
    Member() {
      return this.article?.Member || this.article?.Business
    },
    ProfilePhoto() {
      return this.Member?.profilePhotoURL || null
    },
    UserName() {
      return this.Member?.name || 'ActivePlace Member'
    },
    time() {
      return moment(this.article?.publishedAt).format('MMM D [at] h:mm a')
    },
    initials() {
      return this.$app.getNameInitials(this.UserName)
    },
    categories() {
      return this.article?.Categories || []
    },
    content() {
      return this.extractContent(this.article?.content)
    },
    link() {
      if (this.article?.Member) return `/p/${this.Member?.slug}` || ''
      if (this.article?.Business) return `/b/${this.Member?.slug}` || ''
      return null
    },
  },
  methods: {
    extractContent(s) {
      const span = document.createElement('p')
      span.innerHTML = s
      return span.textContent.slice(0, 400) || span.textContent.slice(0, 400)
    },
    onClickEmit(name, id, coverPhotoUrl) {
      this.$emit('onEmitPublish', { name, id, coverPhotoUrl, type: 'Drafts' })
    },
  },
}
</script>

<style lang="scss" scoped>
.published-article-card::v-deep {
  .article-cover {
    img {
      max-width: unset;
      min-height: unset;
      width: 100%;
      max-height: 527px;
      object-fit: cover;
      object-position: top;
      margin-bottom: -8px;
    }
  }

  .article-title {
    font-size: 22px;
  }

  ._dot {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    left: 12px;
    top: 45%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    border: 1px solid #0c353e;
    box-sizing: border-box;
    border-radius: 50%;
  }

  .card {
    overflow: unset;

    .card-content {
      .user-details {
        width: 100% !important;

        .avatar {
          width: 40px;
          height: 40px;

          img {
            border-radius: 50%;
          }
        }

        .content {
          margin-right: auto;
          margin-bottom: 0 !important;

          .name {
            line-height: 1.2;
            color: inherit;
            display: block;
          }

          .date {
            font-size: 0.8571rem;
            color: #65676b;
          }
        }

        @media screen and (max-width: 767px) {
          max-width: calc(100% - 25px);
        }
      }

      .description {
        font-weight: 300;

        a {
          color: $info;
          text-decoration: underline;
        }
      }

      .video-container {
        height: 500px;
      }

      .actions {
        position: relative;

        .menu {
          cursor: pointer;
        }

        .dot-actions {
          position: absolute;
          top: 30px;
          right: 0;
          background-color: $white;
          box-shadow: 0 2px 20px rgba($secondary, 0.1);
          width: 240px;
          border-radius: 5px;
          font-size: 0.8571rem;

          .follow {
            border-bottom: 1px solid #e5e5e5;
          }
        }

        .can-high-five,
        .can-comment {
          user-select: none;
        }
      }

      .post-type {
        box-shadow: 0 2px 20px rgba(39, 85, 96, 0.1);
        border-radius: 0 0 8px 8px;
      }

      .separator {
        width: 100%;
        background-color: $secondary;
        height: 0.5px;
      }
    }
  }
}
</style>
