<template lang="pug">
.xm-feed-item-delete-dialog
  .card
    .card-content
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      h1 Are you want to delete this {{ details.objectType }}?
      .actions
        b-button(type="is-primary" @click.prevent="doDeletePost()", :loading="isSubmitting") Yes
        b-button(type="is-primary" outlined @click.prevent="$parent.close()", :disabled="isSubmitting") No
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'XMFeedItemDeleteDialog',
  props: {
    details: Object,
  },
  data() {
    return {
      isSubmitting: false,
    }
  },
  methods: {
    async doDeletePost() {
      const objectType = this.details?.objectType
      this.isSubmitting = true

      if (objectType === 'Update') {
        await this.doDeletePostUpdate()
        this.$root.$emit('DoRemoveUpdate', this.details)
        this.$root.$emit('DoCountUpdate')
      }

      if (objectType === 'Article') {
        await this.doDeletePostArticle()
        this.$root.$emit('DoRemoveArticle', this.details)
        this.$root.$emit('DoCountArticle')
      }

      if (objectType === 'Achievement') {
        await this.doDeleteAchievement()
      }
      this.$parent.close()
      this.isSubmitting = false
    },
    async doDeletePostUpdate() {
      try {
        await this.$apollo.mutate({
          variables: {
            id: this.details?.objectID,
          },
          mutation: gql`
            mutation ($id: String!) {
              deleteUpdate(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        await this.$root.$emit('reload')
      }
    },
    async doDeletePostArticle() {
      try {
        await this.$apollo.mutate({
          variables: {
            id: this.details?.Article?.id,
          },
          mutation: gql`
            mutation ($id: String!) {
              deleteArticle(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        await this.$root.$emit('reload')
      }
    },
    async doDeleteAchievement() {
      try {
        await this.$apollo.mutate({
          variables: {
            id: this.details?.Achievement?.id,
          },
          mutation: gql`
            mutation ($id: String!) {
              deleteAchievement(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        await this.$root.$emit('reload')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-feed-item-delete-dialog::v-deep {
  text-align: center;

  h1 {
    font-size: 1.5714rem;
    font-weight: 500;
    line-height: 1.2;
    color: $secondary;
    margin-bottom: 30px;
  }

  .close {
    text-align: right;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;

    button {
      width: 100%;
      max-width: 120px;
      margin: 0 10px;
    }
  }

  @media screen and (max-width: 767px) {
    .actions {
      button {
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
