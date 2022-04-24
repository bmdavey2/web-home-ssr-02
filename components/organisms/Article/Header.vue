<template lang="pug">
.article-header
  .article-title.pt-5
    input.form-control-article.article-heading.is-family-secondary(
      v-model="title"
      maxlength="76"
      placeholder="Add your heading..."
      onfocus="this.placeholder = ''"
      onblur="this.placeholder = 'Add your heading...'")
  .article-subtitle.pt-4
    input.form-control-article.article-subheading.has-text-weight-light.pt-2.pb-3.has-text-grey(
      v-model="subtitle"
      maxlength="190"
      placeholder="Add subheading here ..."
      onfocus="this.placeholder = ''"
      onblur="this.placeholder = 'Add subheading here ...'")

  .article-categories.pt-5.px-5
    .columns.is-mobile
      .column.is-9
        .is-size-6.is-uppercase ADD TO CATEGORIES
        .has-text-grey.pt-2(style="font-size: 0.8571rem" v-if="selectedCategory.length == 0") Select up to 5 categories so readers know what your article is about
        ul.is-flex.is-flex-wrap-wrap.category-list.pt-2(v-if="selectedCategory.length")
          li(v-for="category in selectedCategories"): a {{ category.name }}

      .column.is-3
        a(@click="onClickCategories"): img(src="~assets/images/Article/edit-category.svg" width="60" height="60")

  .article-cover(ref="articleCover")
    b-upload(drag-drop @input="addImage" accept="image/*" expanded)
      .content-media.has-text-centered.has-text-color-grey.is-flex.is-flex-direction-column.is-justify-content-center(
        v-if="coverUrl == null")
        p: img(src="~/assets/images/Article/article-cover-upload.svg" width="40" height="40")
        p.pt-3.has-text-grey Upload cover image
        p.pt-3.has-text-grey You can't publish without an image
      .content-image(v-if="coverUrl")
        img(:src="coverUrl" width="893" height="480")

    .edit(v-if="coverUrl")
      input.file-browser(type="file" accept="image/*" ref="changeCover" @change="uploadImage")
      img.is-clickable(
        src="~/assets/images/Article/circle-edit.svg"
        @click="$refs.changeCover.click()"
        width="44"
        height="44")

    .image-caption
      input.form-control-article.article-caption.has-text-weight-light.pt-2(
        placeholder="Add image caption (optional) ..."
        maxlength="80"
        v-model="coverCaption"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Add image caption (optional) ...'")
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XOArticleHeader',
  props: {
    articleId: String,
    initialcoverURL: String,
    categories: Array,
  },
  data() {
    return {
      photos: [],
      coverUrl: null,
    }
  },
  computed: {
    isEdit() {
      return this.$parent.isEdit
    },
    article: {
      get() {
        return this.$parent.article
      },
    },

    title: {
      get() {
        return this.article?.title
      },
      set(value) {
        this.$emit('setData', { value, name: 'title' })
      },
    },

    subtitle: {
      get() {
        return this.article?.subtitle
      },
      set(value) {
        this.$emit('setData', { value, name: 'subtitle' })
      },
    },

    selectedCategory: {
      get() {
        return this.article?.selectedCategory
      },
      set(value) {
        this.$emit('setData', { value, name: 'selectedCategory' })
      },
    },

    selectedCategories() {
      return this.categories?.filter((x) => this.selectedCategory.includes(x.id))
    },

    coverId: {
      get() {
        return this.article?.coverId
      },
      set(value) {
        this.$emit('setData', { value, name: 'coverId' })
      },
    },
    coverCaption: {
      get() {
        return this.article?.coverCaption
      },
      set(value) {
        this.$emit('setData', { value, name: 'coverCaption' })
      },
    },
  },
  created() {
    this.loadInitialCover()
  },
  methods: {
    loadInitialCover() {
      setTimeout(() => {
        const load = this.isEdit ? (this.coverUrl = this.initialcoverURL) : ''
        return load
      }, 1 * 4000)
    },
    onClickCategories() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/organisms/Article/Categories').default,
        width: 700,
        props: {
          initialCategories: this.selectedCategory,
        },
        // fullScreen: this.$viewport.lt.tabletLG,
        // canCancel: !this.$viewport.lt.tabletLG,
        events: {
          doAddCategories: (value) => {
            this.selectedCategory = value
          },
        },
      })
    },
    async addImage(data) {
      await this.uploadPhotos(data)
    },
    async uploadImage() {
      await this.uploadPhotos(this.$refs.changeCover.files[0])
    },
    async uploadPhotos(files) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.articleCover,
      })
      try {
        const newFiles = []
        newFiles.push(files)
        files = newFiles
        const uploads = files.map((file) => this.$store.dispatch('media/upload', { file }))
        const waitForCompletion = (await Promise.all(uploads)).map(({ waitForUpload, waitForProcess }) =>
          waitForUpload.then(() => waitForProcess)
        )
        const allCompleted = (await Promise.allSettled(waitForCompletion)).map(({ value }) => value).filter((x) => !!x)
        const photos = allCompleted.filter(({ objectType }) => objectType === 'Photo')
        if (photos.length > 0) {
          const { data } = await this.$apollo.query({
            query: gql`
              query ($id: String!) {
                PhotoURL(id: $id)
              }
            `,
            fetchPolicy: 'cache-first',
            variables: { id: photos[0].objectID },
          })
          const result = data.PhotoURL
          this.coverId = photos[0].objectID
          this.coverUrl = result
        } else {
          // TODO: no valid photos uploaded
          this.$toast?.error(`No Valid Photos Uploaded`, { duration: 3 * 1000, position: 'bottom-right' })
        }
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isLoading = false
        setTimeout(() => loadingComponent.close(), 2 * 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.article-header::v-deep {
  max-width: 900px;
  width: 100%;
  margin: auto;

  .upload-draggable {
    border: none !important;
  }
}

.form-control-article {
  border: none;
  box-shadow: none;
  outline: none;
  font-size: 3rem;
  text-align: center;
  width: 100%;
}

.article-cover {
  position: relative;

  .edit {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;

    .file-browser {
      display: none;
    }
  }
}

.article-heading::placeholder {
  color: $secondary;
}

.article-subheading::placeholder {
  color: grey;
}

.article-subheading {
  font-size: 1.1429rem !important;
}

.article-caption {
  font-size: 0.8571rem !important;
}

.category-list {
  a {
    background: #eef1f1;
    border-radius: 30px;
    border: 1px solid #eef1f1;
    padding: 4px 8px !important;
    color: $secondary;
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
  height: 480px;

  img {
    width: 100%;
    height: 480px;
    object-fit: contain;
    object-position: center;
    background: rgba(138, 141, 145, 0.8);
    cursor: pointer;
  }
}

@media screen and (max-width: $tabletLG) {
  .article-heading {
    font-size: 26px !important;
    text-align: left !important;
    padding-left: 15px;
  }
  .article-subheading {
    text-align: left !important;
    padding-left: 15px;
  }
}
</style>
