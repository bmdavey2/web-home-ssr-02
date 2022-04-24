<template lang="pug">
.card
  .card-content.p-0.py-3.px-5.has-text-centered
    .is-size-4.has-text-secondary.has-text-weight-medium.mt-5 Upload cover image
    .is-size-6.mb-5.has-text-grey Recommended image size is 1440 x 330px

    b-upload(v-model="file" drag-drop @input="viewfile" accept="image/*" expanded)
      .content-media.has-text-centered.is-flex.is-flex-wrap-wrap.is-align-items-center.is-justify-content-center(
        v-if="url == null")
        div
          p: img(src="~/assets/icons/upload.svg" width="48" height="40")
          p Drop your files here or click to upload
      .content-image(v-if="url")
        img(:src="url" width="499" height="321")

    .actions.is-flex.is-flex-wrap.is-justify-content-flex-end.mt-3
      template(v-if="isUploading")
        b-button.is-uppercase(type="is-primary", :loading="isUploading") Loading...
      template(v-else)
        b-button.is-uppercase.mr-3(type="is-primary" outlined @click="$parent.close()") Cancel
        b-button.is-uppercase(type="is-primary", :disabled="!file" @click="onClickSaveProfilePhoto") Save
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    objectType: String,
    businessID: null,
  },
  data() {
    return {
      file: null,
      url: null,
      isUploading: false,
    }
  },
  methods: {
    viewfile(file) {
      this.url = URL.createObjectURL(file)
      this.file = file
    },
    async onClickSaveProfilePhoto() {
      this.isUploading = true
      if (this.objectType === 'MyProfile') {
        const { waitForProcess } = await this.$store.dispatch('media/upload', { file: this.file })
        const { objectType, objectID } = await waitForProcess

        if (objectType === 'Photo') {
          try {
            await this.$apollo.mutate({
              variables: {
                input: {
                  coverPhotoID: objectID,
                },
              },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($input: InputProfile!) {
                  editProfile(input: $input) {
                    success
                  }
                }
              `,
            })
            this.$parent.close()
            this.isUploading = false
            this.$store.commit('control/setLoading', {
              name: `app/loading`,
              value: true,
            })

            location.reload()
          } catch (error) {
            this.doTrackSegmentError(error)
          }
        } else {
          // not a photo, show error
        }
      } else if (this.objectType === 'MyBusiness') {
        const { waitForProcess } = await this.$store.dispatch('media/upload', { file: this.file })
        const { objectType, objectID } = await waitForProcess

        if (objectType === 'Photo') {
          try {
            await this.$apollo.mutate({
              variables: {
                id: this.businessID,
                input: {
                  coverPhotoID: objectID,
                },
              },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($id: String!, $input: InputBusiness!) {
                  editBusiness(id: $id, input: $input) {
                    success
                  }
                }
              `,
            })
            this.$parent.close()
            this.isUploading = false
            this.$store.commit('control/setLoading', {
              name: `app/loading`,
              value: true,
            })

            location.reload()
          } catch (error) {
            this.doTrackSegmentError(error)
          }
        } else {
          // not a photo, show error
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card::v-deep {
  .upload {
    height: 330px;
    width: 100%;

    .upload-draggable {
      width: 100%;
      height: 100%;

      .content-media {
        width: 100%;
        height: 100%;
      }

      .content-image {
        width: 100%;
        height: 100%;

        img {
          image-rendering: auto;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
          image-rendering: -webkit-optimize-contrast;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
