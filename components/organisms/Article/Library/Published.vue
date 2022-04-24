<template lang="pug">
div
  .profile-tabs
    .no-articles.has-text-centered(v-if="!this.published.length")
      .is-size-4.has-text-secondary.has-text-weight-bold You don't have any articles

      b-button.mt-4.has-text-weight-bold(@click="clickPostArticle" type="is-danger" size="is-medium" outlined) START ONE NOW

      p.has-text-grey.pt-5 Click that big red button up there to get one published!

      img.pt-5.mt-5.pb-5(src="~assets/images/Article/emptybox.svg" width="105" height="114")

    .articles-card(v-if="this.published.length")
      XOArticleLibraryArticle(
        @onEmitPublish="onClickEmit"
        v-for="(article, index) in published",
        :data="article",
        :key="index")
</template>

<script>
import gql from 'graphql-tag'
import XOArticleLibraryArticle from '~/components/organisms/Article/Library/Article'

export default {
  name: 'XOArticleLibraryPublished',
  components: { XOArticleLibraryArticle },
  props: {
    published: Array,
  },
  methods: {
    onClickEmit(data) {
      this.$emit('onEmit', { name: data.name, id: data.id, coverPhotoUrl: data.coverPhotoUrl, type: 'Published' })
    },
    async clickPostArticle() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
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
        await this.$router.push(`articles/drafts/${objectID}`)
      } else {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.published-header {
  color: #0c353e !important;
}

.articles-card {
  margin: 20px auto;
  max-width: 575px !important;

  &:last-child {
    padding-bottom: 10px;
  }
}
</style>
