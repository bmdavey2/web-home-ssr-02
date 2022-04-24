<template lang="pug">
.article-header
  .article-title
    h1.is-size-1.has-text-centered.article-heading.is-family-secondary.has-text-secondary.pt-5 {{ title }}
  .article-subtitle
    h2.has-text-centered.article-subheading.has-text-weight-light.has-text-grey.pt-2.pb-3 {{ subtitle }}

  XMArticleViewDetails.pl-2

  .article-cover.pt-5
    .content-image
      img(:src="coverPhotoURL" width="776" height="515")
    .image-caption
      .article-caption.has-text-weight-normal.pt-4.has-text-grey-dark {{ coverCaption }}
</template>

<script>
import moment from 'moment'
import XMArticleViewDetails from '~/components/molecules/Article/View/Details'

export default {
  name: 'XMArticleViewHeader',
  components: { XMArticleViewDetails },
  computed: {
    article() {
      return this.$parent?.article
    },
    id() {
      return this.article?.id
    },
    title() {
      return this.article?.title.replace(/&amp;/g, 'and') || ''
    },
    subtitle() {
      return this.article?.subtitle.replace(/&amp;/g, 'and') || ''
    },
    coverPhotoURL() {
      return this.article?.coverPhotoURL
    },
    coverCaption() {
      return this.article?.coverCaption
    },
    createdAt() {
      return moment(this.article?.createdAt).format('MMM DD, YYYY')
    },
    content() {
      return this.article?.content
    },
    link() {
      return this.$route.params.article
    },
  },
}
</script>

<style lang="scss" scoped>
.profile::v-deep {
  .profile-image-view {
    background: $white;
    border: 1px solid #000;
    padding-top: 8px;
    font-size: 17px;
    width: 47px;
    height: 47px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 20px;
    text-align: center;
    top: 7px;
  }

  .profile-photo {
    width: 47px;
    height: 47px;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
  }
}

.article-subheading {
  font-size: 1.1429rem !important;
}

.article-caption {
  font-size: 1rem !important;
  text-align: center;
  width: 100%;
}

.social-container {
  li {
    background: #eef1f1;
    border-radius: 30px;
    border: 1px solid #eef1f1;
    padding: 5px 8px;
    color: $secondary !important;
    margin-bottom: 13px;
    margin-right: 8px;
    cursor: pointer;
    font-size: 0.8571rem;
    font-weight: 300;
    max-height: 32px;
  }
}

.content-media {
  min-height: 480px;
  background: #f8f8f8;
}

.content-image {
  height: auto;
  max-width: 776px;
  width: 100%;
  margin: 0 auto;

  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
}
</style>
