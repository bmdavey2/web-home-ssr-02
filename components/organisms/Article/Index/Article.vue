<template lang="pug">
.article(:class="isMobileColumn && 'is-mobile-column'")
  nuxt-link.image-container(:to="`/a/${slug}`")
    img(:src="coverPhotoURL" @error="doCheckIfImageIsLoaded" v-if="imageLoaded")
    XAImageNotLoaded(v-else)
  ._content-container
    .aggregates
      .date.details {{ dateCreated | dateFormat }}
      .high-fives.details
        ._icon: img(src="~assets/icons/high-fived.webp")
        .value {{ highFivesCount }}
      .views.details
        ._icon: img(src="~assets/icons/views.webp")
        .value {{ viewsCount }}
    h3._title(:title="title"): nuxt-link(:to="`/a/${slug}`") {{ title }}
    ._content {{ content | truncate(120) }} #[nuxt-link(:to="`/a/${slug}`" v-if="content.length > 120") Read more]
    .user-data.is-flex.is-align-items-center
      XAProfileAvatar.mr-3(size="30px" label="AP")
      p.has-text-secondary Active Place
</template>

<script>
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
export default {
  name: 'XOArticleIndexArticle',
  components: { XAProfileAvatar, XAImageNotLoaded },
  props: {
    article: Object,
    isMobileColumn: Boolean,
  },
  data() {
    return {
      imageLoaded: true,
    }
  },
  computed: {
    coverPhotoURL() {
      return this.article?.coverPhotoURL || ''
    },
    dateCreated() {
      return this.article?.createdAt || new Date()
    },
    highFivesCount() {
      return this.article?.FeedItem?.Aggregates?.likes || 0
    },
    viewsCount() {
      return this.article?.Aggregates?.views || 0
    },
    title() {
      return this.article?.title || 'Article Title'
    },
    content() {
      return this.DO_REMOVE_HTML_TAGS(this.article?.content) || ''
    },
    slug() {
      return this.article?.slug || '/'
    },
    userDetails() {
      let userDetails = {}
      userDetails = this.article?.Member || this.article?.Business
      if (this.article?.Member) userDetails.actorType = '/p'
      if (this.article?.Business) userDetails.actorType = '/b'
      return userDetails
    },
  },
  methods: {
    doCheckIfImageIsLoaded() {
      this.imageLoaded = false
    },
    DO_REMOVE_HTML_TAGS(value) {
      return value
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim()
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.article::v-deep {
  min-height: 395px;

  .image-container {
    width: 100%;
    height: 185px;
    display: block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ._content-container {
    .aggregates {
      margin: 10px 0 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      color: #65676b;
      font-weight: 300;
      font-size: 1rem;

      .details {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &:last-child {
          &::after {
            content: none;
          }
        }

        &::after {
          content: '';
          margin: 0 8px 4px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #65676b;
          display: block;
        }

        ._icon {
          margin-right: 5px;
          display: flex;
          padding-bottom: 5px;
        }
      }
    }

    h3 {
      font-family: $secondary-font;
      color: #050505;
      margin-bottom: 20px !important;

      a {
        color: inherit;
        display: block;
      }
    }

    ._content {
      font-weight: 300;
      margin-bottom: 10px;

      a {
        color: $secondary;
        font-weight: 400;
      }
    }
  }

  @media screen and (max-width: 427px) {
    min-height: 0;
    margin-bottom: 20px;

    &.is-mobile-column {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .image-container {
        width: calc(40% - 10px);
        height: 100px;
      }

      ._content-container {
        width: calc(60% - 10px);
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;

        .aggregates {
          font-size: 0.8571rem;
          margin: 0 0 10px;
          order: 2;
        }

        ._title {
          order: 1;
          margin-bottom: 10px !important;
          font-size: 1rem !important;
          line-height: 1.2857rem !important;
        }
        .user-data {
          order: 3;
        }

        .avatar-container {
          order: 3;

          .left-avatar {
            .avatar {
              width: 28px !important;
              height: 28px !important;
              font-size: 0.8571rem !important;
            }
          }

          .right-avatar {
            .name {
              font-size: 0.8571rem !important;
            }

            .badge {
              max-width: 20px;
            }
          }
        }

        ._content {
          display: none;
        }
      }
    }
  }
}
</style>
