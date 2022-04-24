<template lang="pug">
.xm-articles-item(:class="[isColumn && 'is-column', imagePosition]")
  //v-view="doSegmentImpression"
  .cover-photo
    nuxt-link(:to="`/a/${slug}`" @click.native="doSetArticleCategory()")
      img.lozad(
        :src="coverPhotoURL"
        @error="doCheckIfImageIsLoaded"
        data-placeholder-background="lightgrey"
        v-if="imageLoaded")
      XAImageNotLoaded(v-else)
  .contents
    slot(name="title")
    //- .aggregates
      .published {{ publishedAt | dateFormat }}
      .high-fives
        ._icon: b-icon(icon="hand-left" custom-size="mdi-18px")
        .value {{ highFiveCounts }}
      .views
        ._icon: b-icon(icon="eye" custom-size="mdi-18px")
        .value {{ viewsCount }}
    h2(v-if="!isColumn"): nuxt-link(:to="`/a/${slug}`" @click.native="doSetArticleCategory()") {{ title }}
    .description {{ content | truncate(charLimit) }} #[nuxt-link(:to="`/a/${slug}`" @click.native="doSetArticleCategory()" v-if="content.length > charLimit") Read More]
    nuxt-link.user-details(:to="profileLink")
      XAProfileAvatar(:image="profilePhotoURL", :label="initials" size="34px")
      .name {{ name }}
      //- XAMentorBadge(:badge="badge")
</template>

<script>
import { mapActions } from 'vuex'
import lozad from 'lozad'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAMentorBadge from '~/components/atoms/MentorBadge'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMArticlesItem',
  components: { XAProfileAvatar, XAMentorBadge, XAImageNotLoaded },
  props: {
    isColumn: Boolean,
    imagePosition: String,
    article: Object,
    charLimit: { type: Number, default: 120 },
  },
  data() {
    return {
      imageLoaded: true,
    }
  },
  computed: {
    coverPhotoURL() {
      return this.article?.coverPhotoURL
    },
    publishedAt() {
      return this.article?.createdAt || new Date()
    },
    highFiveCounts() {
      return this.article?.Aggregates?.highfives || 0
    },
    viewsCount() {
      return this.article?.Aggregates?.views || 0
    },
    title() {
      return this.article?.title || 'Article Title'
    },
    content() {
      // return this.article?.content ? this.doRemoveHTMLTags(this.article?.content) : ''
      return this.article?.excerpt || ''
    },
    slug() {
      return this.article?.slug || '/'
    },
    user() {
      return this.article?.Member || this.article?.Business
    },
    name() {
      return this.user?.name || 'ActivePlace Member'
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    profilePhotoURL() {
      return this.user?.profilePhotoURL || null
    },
    // badge() {
    //   return this.user?.badge || this.user?.Mentor?.badge || null
    // },
    actorType() {
      return this.article?.FeedItem?.actorType || null
    },
    profileLink() {
      if (this.article?.Member) {
        return `/p/${this.user?.slug}`
      }
      return `/b/${this.user?.slug}`
    },
  },
  mounted() {
    const observer = lozad('.lozad', {
      rootMargin: '10px 0px',
      threshold: 0.1,
      enableAutoReload: true,
    })
    observer.observe()
  },
  methods: {
    ...mapActions({
      setIsFromArticles: 'articles/setIsFromArticles',
    }),
    doRemoveHTMLTags(value) {
      return value
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim()
    },
    doCheckIfImageIsLoaded() {
      this.imageLoaded = false
    },
    doSetArticleCategory() {
      if (['discover'].includes(this.$route.name)) return
      this.setIsFromArticles(true)
      this.$store.dispatch('articles/setArticleParentCategory', this.$route.params?.category)
      this.$store.dispatch('articles/setArticleSubCategory', this.$route.params?.sub)
    },
    doSegmentImpression(e) {
      if (e.scrollPercent === 0) return
      if (this.article) {
        if (e.type === 'exit') {
          this.article.objectType = 'Article'
          this.$appClient.segment.trackArticleImpression(this.article)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-articles-item::v-deep {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  .cover-photo {
    width: 100%;
    height: 225px;
    margin-bottom: 10px;

    a {
      display: block;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .contents {
    flex: 10000 1 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    .aggregates {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      color: #65676b;
      font-weight: 300;
      margin-bottom: 10px;

      > div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &:not(:last-child) {
          &::after {
            content: '';
            width: 5px;
            height: 5px;
            background-color: #65676b;
            border-radius: 50%;
            display: block;
            margin: 0 10px;
          }
        }

        ._icon {
          margin-right: 3px;
        }
      }
    }

    h2 {
      font-size: 1.5714rem;
      line-height: 1.45;
      font-family: 'Georgia', sans-serif;
      color: #050505;
      margin-bottom: 10px;

      a {
        color: inherit;
      }

      &._title {
        font-size: 2.2857rem;
      }
    }

    .description {
      font-weight: 300;
      color: #050505;
      margin-bottom: 15px;
      flex: 10000 1 0;
      word-break: break-word;

      a {
        color: $secondary;
        font-weight: 400;
      }
    }

    .user-details {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      color: inherit;

      > div {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }

  &.is-column {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;

    .cover-photo {
      width: 49%;
      order: 2;
    }

    .contents {
      width: 49%;
      order: 1;
      flex: none;
      display: block;
    }
  }

  @media screen and (max-width: 1024px) {
    .contents {
      h1,
      h2 {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .contents {
      h1 {
        font-size: 1.5714rem;
      }

      h2 {
        font-size: 1.2857rem;

        &._title {
          font-size: 1.5714rem;
        }
      }

      .user-details {
        .name {
          flex: 10000 1 0;
        }
      }
    }
  }
}
</style>
