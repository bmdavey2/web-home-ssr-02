<template lang="pug">
.drafts-container.pb-5
  .no-articles.has-text-centered(v-if="drafts.length === 0")
    .is-size-4.has-text-secondary.has-text-weight-bold You don't have any drafts

    img.pt-5.mt-5.pb-5(src="~assets/images/Article/emptybox.svg" width="105" height="114")

  .drafts-card(v-for="article in drafts")
    img.default-cover(:src="article.coverPhotoURL" v-if="article.coverPhotoURL" width="232" height="160")

    .default-img.is-flex.is-align-items-center.is-justify-content-center(v-if="!article.coverPhotoURL"): img(
      src="~/assets/icons/image.svg"
      width="232"
      height="160")

    .article-details
      ._menu.is-flex.is-justify-content-right
        b-dropdown(aria-role="list" position="is-bottom-left")
          template(#trigger)
            b-icon.has-text-grey.is-clickable(icon="dots-vertical")
          b-dropdown-item.is-flex(aria-role="listitem" @click="onClickEmit('Edit', article.id, article.coverPhotoURL)")
            ._dot
            p.pl-3 Edit
          b-dropdown-item.is-flex(
            aria-role="listitem"
            @click="onClickEmit('Delete', article.id, article.coverPhotoURL)")
            ._dot
            p.pl-3 Delete
          //b-dropdown-item.is-flex(aria-role="listitem" @click="onClickEmit('Edit', article.id, article.coverPhotoURL)")
            ._dot
            p.pl-3 Publish
          //b-dropdown-item(aria-role="listitem" @click="onClickEmit('Publish' , article.id , article.coverPhotoURL )" ).is-flex
            ._dot
            p.pl-3 Publish

      ._header
        .article-title.has-text-secondary {{ article.title }}
        .article-content.article-subtitle.has-text-grey {{ article.subtitle }}
</template>

<script>
export default {
  name: 'XOArticleLibraryDraft',
  props: {
    drafts: Array,
  },
  methods: {
    onClickEmit(name, id, coverPhotoUrl) {
      this.$emit('onEmit', { name, id, coverPhotoUrl, type: 'Drafts' })
    },
    extractContent(s) {
      const span = document.createElement('p')
      span.innerHTML = s
      return span.textContent.slice(0, 180) || span.textContent.slice(0, 180)
    },
  },
}
</script>

<style lang="scss" scoped>
.drafts-container {
  margin: 20px auto;
  max-width: 575px;

  .drafts-card {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 8px 8px;
    background: #fff;
    box-shadow: 0 6px 20px rgb(153 153 153 / 15%);
    border-radius: 5px;
    margin-bottom: 16px;
    img {
      width: 100%;
      max-width: 232px;
      height: 160px;
      object-fit: cover;
      object-position: top;
    }
    .default-img {
      width: 100%;
      max-width: 232px;
      height: 160px;
      background-color: #c2c8c9;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
  .article-details {
    margin-left: 16px;
    position: relative;
    width: 100%;

    ._menu {
      .dropdown {
        margin-left: auto !important;
      }
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
    ._header {
      position: relative;
      width: 100%;
      margin-right: 32px;
    }
    .article-content,
    .article-title {
      width: 100%;
      max-width: 270px;
      font-size: 16px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .article-subtitle {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: $tabletLG) {
  .drafts-card {
    flex-wrap: wrap !important;
    img {
      max-width: 100% !important;
      max-height: 160px !important;
      width: 100% !important;
      padding-bottom: 10px;
    }
    .default-cover {
      margin: 0 auto;
    }
  }

  .default-img {
    max-width: 100% !important;
    height: 160px;
    background-color: #c2c8c9;
    img {
      width: 90px !important;
      height: 100px !important;
    }
  }

  ._menu {
    position: absolute;
    right: 5px;
    top: -155px;
    border-radius: 50%;
    background-color: $white;
    padding: 0 5px;
    padding-top: 3px;
  }
  .article-content,
  .article-title {
    width: 100%;
    max-width: unset !important;
  }
}
</style>
