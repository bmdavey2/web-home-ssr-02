<template lang="pug">
.xp-edit-update.flex-center
  XHMediaUploader(
    v-model="form.AddedMedia",
    :photoFiles.sync="photoFiles",
    :videoFile.sync="videoFile",
    :mediaStates.sync="mediaStates")

  .box.no-padding
    .text-center.my-2(style="color: #0c353e") EDIT AN UPDATE
    .close.is-flex.is-flex-wrap-wrap.is-align-items-center(@click.prevent="$parent.close()" v-if="isFullscreen"): b-icon(
      icon="close")
    hr.my-2
    .form-container.px-6.pt-4.pb-6
      .flex.align-center.mb-3
        XOMyProfileAvatar(size="36px")
        .ml-3(style="font-size: 14px")
          XOMyProfileName

      client-only
        FormMentionTextarea(
          @input="onInput"
          maxLength="1400",
          :placeholder="`Post an update to tell the world what's going on!`"
          v-model="form.content")

      XOMediaUploads.mt-2(v-model="mediaStates", :media.sync="form.AddedMedia" @onClickRemove="removeFile")
      XMUpdateEditMedias(:medias="form.Media", :is-medal="isMedal", :medal-theme="medalTheme")
      .actions(v-if="hasPhotos && plan !== null")
        .action.add-pin(@click.prevent="doShowAddPinModal()")
          ._icon: b-icon(icon="map-marker-outline")
          | Add Pin
        //.action.order
        //  ._icon: img(src="~assets/icons/reorder.svg")
        //  | Change order
        //.action.crop
        //  ._icon: b-icon(icon="crop-free")
        //  | Crop
      .flex.align-center.my-4
        b-upload.file-upload.ml-2.is-cursor-pointer.is-user-select-none.flex.align-center.has-text-secondary(
          v-model="photoFiles"
          accept="image/*"
          multiple
          v-if="!isMedal")
          b-icon.ml-2(icon="image-outline")
          span.ml-1 ADD IMAGE

        b-upload.file-upload.ml-2.is-cursor-pointer.is-user-select-none.flex.align-center.has-text-secondary(
          v-model="videoFile",
          :disabled="hasVideo",
          :class="hasVideo ? 'disabled' : ''"
          accept="video/*"
          v-if="!isMedal")
          b-icon.ml-2(icon="play-outline")
          span.ml-1 ADD VIDEO

      div(style="font-size: 14px; color: #0c353e") ADD TO CATEGORIES
      div(style="font-weight: 300; font-size: 12px; color: #666") Select up to 5 interest categories

      XOCategoryPillsSelector.my-4(v-model="form.CategoryIDs", :max="5", :clickable="true")
      .flex(style="justify-content: flex-end")
        b-button(
          :disabled="isPostingDisabled",
          :loading="isSubmitting"
          type="is-primary"
          @click.prevent="doEditPostUpdate()") UPDATE
  //- XOAddPin(v-if="showAddPin" @DoShowAddPin="showAddPin = $event", :medias="form.Media.concat(form.AddedMedia)")
</template>

<script>
import gql from 'graphql-tag'
import some from 'lodash/some'
import remove from 'lodash/remove'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import XOMyProfileName from '~/components/organisms/MyProfileName'
import XOCategoryPillsSelector from '~/components/organisms/CategoryPillsSelector'
import XHMediaUploader from '~/components/helpers/MediaUploader'
import XOMediaUploads from '~/components/organisms/MediaUploads'
import FormMentionTextarea from '~/components/atoms/Form/MentionTextarea'
import XOAddPin from '~/components/organisms/AddPin'
import XMUpdateEditMedias from '~/components/molecules/Update/Edit/Medias'

export default {
  name: 'XPAddUpdate',
  components: {
    FormMentionTextarea,
    XOMediaUploads,
    XHMediaUploader,
    XOCategoryPillsSelector,
    XOMyProfileName,
    XOMyProfileAvatar,
    XOAddPin,
    XMUpdateEditMedias,
  },
  props: {
    initialPhotoFiles: null,
    initialVideoFile: null,
    isFullscreen: { type: Boolean, default: false },
    details: Object,
  },
  data() {
    return {
      form: {
        content: this.details?.Update.content,
        Media: this.details?.Update?.Media,
        CategoryIDs: this.details?.CategoryIDs,
        AddedMedia: [],
      },
      isUploading: false,
      contentText: '',
      photoFiles: [this.initialPhotoFiles],
      videoFile: this.initialVideoFile,
      mediaStates: [],
      isSubmitting: false,
      showAddPin: false,
      images: [],
    }
  },
  computed: {
    isPostingDisabled() {
      return !this.form.content?.trim() || this.form.CategoryIDs.length < 1 || this.isUploading
    },
    hasPhotos() {
      return some(this.form.Media, ({ objectType }) => objectType === 'Photo')
    },
    hasVideo() {
      return false
      // return some(this.form.Media, ({ objectType }) => objectType === 'Video')
    },
    plan() {
      return this.$store.getters['business/getBusinessSubscription']?.plan || null
    },
    isMedal() {
      return this.details?.Update?.isNFTMedal || false
    },
    medalTheme() {
      return this.details?.Update?.ProductTheme || null
    },
  },
  watch: {
    mediaStates: {
      deep: true,
      handler() {
        this.checkUpload()
      },
    },
  },
  mounted() {
    console.log('details...', this.details)
  },
  methods: {
    onInput(e) {
      this.form.content = e
      this.contentText = this.form.content
    },
    closeModal() {
      if (this.$parent.close) {
        this.$parent.close()
      }
    },
    removeFile(data) {
      this.form.Media = remove(this.form.Media, (e) => {
        return e.objectID !== data.id
      })

      this.mediaStates = remove(this.mediaStates, (e) => {
        return e.data?.objectID !== data.id
      })
    },
    checkUpload() {
      if (!this.mediaStates.length) {
        this.isUploading = false
      } else {
        const isSeen = this.mediaStates.map((object) => {
          return object?.processed === true
        })
        this.isUploading = !isSeen.every(Boolean)
      }
    },
    async doShowAddPin() {
      await this.form.Media.forEach(async (media) => {
        const { data } = await this.$apollo.query({
          variables: {
            id: media?.objectID,
            type: media.objectType,
          },
          query: gql`
            query ($id: String!, $type: String) {
              getPhotoURL(id: $id, type: $type)
            }
          `,
        })

        const image = data?.getPhotoURL
        this.images.push(image)
      })
      this.showAddPin = true
    },
    async doEditPostUpdate() {
      this.isSubmitting = true
      const oldMedia = this.form?.Media.map((media) => ({
        objectID: media?.objectID,
        objectType: media?.objectType,
        orientation: media?.orientation,
      }))
      const Media = this.form?.AddedMedia.concat(oldMedia)

      try {
        const input = {
          content: this.form?.content,
          CategoryIDs: this.form?.CategoryIDs,
          Media,
          productID: this.details?.Update?.productID,
        }

        await this.$apollo.mutate({
          variables: {
            id: this.details?.Update?.id,
            input,
            patch: true,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($id: String!, $input: InputUpdate!, $patch: Boolean) {
              editUpdate(id: $id, input: $input, patch: $patch) {
                success
              }
            }
          `,
        })

        if (this.$route.name === 'my-feed') {
          await this.$root.$emit('reload')
        }

        if (this.$route.name === 'u-slug') {
          await this.$root.$emit('post/update/refresh')
        }

        if (['p-slug', 'b-slug'].includes(this.$route.name)) {
          await this.$root.$emit('retrieve/user/updates')
        }
        this.closeModal()
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isSubmitting = false
      }
    },
    doShowAddPinModal() {
      this.$buefy.modal.open({
        component: require('~/components/organisms/AddPin').default,
        parent: this,
        width: '100%',
        props: {
          medias: this.form.Media.concat(this.form.AddedMedia),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-edit-update::v-deep {
  .box {
    max-width: 600px !important;
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .editor {
    padding: 8px 12px;
    font-size: 16px;
    font-weight: 300;
    border: 1px solid #efefef;
    min-height: 300px;
    border-radius: 6px;
    line-height: 20px;
  }

  .file-button {
    display: none;
  }

  .file-upload {
    cursor: pointer;
    position: relative;
    border: 1px solid $secondary;
    width: 125px;
    height: 35px;
    border-radius: 30px;

    img {
      width: 16px;
    }
  }

  .disabled {
    background: #e0dcdc !important;
    border: none !important;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .action {
      display: flex;
      flex-wrap: wrap;
      color: $secondary;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 20px;
      }

      ._icon {
        margin-right: 5px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .form-container {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
  }
}
</style>
