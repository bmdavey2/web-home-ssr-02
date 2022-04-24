<template lang="pug">
.xp-add-update.flex-center
  XHMediaUploader(
    v-model="form.Media",
    :photoFiles.sync="photoFiles",
    :videoFile.sync="videoFile",
    :mediaStates.sync="mediaStates")

  .box.no-padding
    .text-center.my-2(style="color: #0c353e") POST AN UPDATE
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
          :placeholder="`Post an update to tell the world what's going on!`",
          :isPost="true"
          v-model="form.content")

      XOMediaUploads.mt-2(v-model="mediaStates", :media.sync="form.Media" @onClickRemove="removeFile")

      // warn: component for update medals only
      XMUpdateEditMedias(:medias="form.Media" v-if="isMedal", :is-medal="isMedal", :medal-theme="medalTheme")
      .actions(v-if="hasPhotos && plan !== null")
        .action.add-pin(@click.prevent="doShowAddPinModal()")
          ._icon: b-icon(icon="map-marker-outline")
          | Add Pin
        //- .action.order
        //-   ._icon: img(src="~assets/icons/reorder.svg")
        //-   | Change order
        //- .action.crop
        //-   ._icon: b-icon(icon="crop-free")
        //-   | Crop
      .flex.align-center.my-4
        b-upload.file-upload.ml-2.is-cursor-pointer.is-user-select-none.flex.align-center.has-text-secondary(
          v-model="photoFiles"
          v-if="!isMedal"
          accept="image/*"
          multiple)
          b-icon.ml-2(icon="image-outline")
          span.ml-1 ADD IMAGE

        b-upload.file-upload.ml-2.is-cursor-pointer.is-user-select-none.flex.align-center.has-text-secondary(
          v-model="videoFile",
          :disabled="hasVideo"
          v-if="!isMedal",
          :class="hasVideo ? 'disabled' : ''"
          accept="video/*")
          b-icon.ml-2(icon="play-outline")
          span.ml-1 ADD VIDEO

      div(style="font-size: 14px; color: #0c353e") ADD TO CATEGORIES
      div(style="font-weight: 300; font-size: 12px; color: #666") Select up to 5 interest categories

      XOCategoryPillsSelector.my-4(v-model="form.CategoryIDs", :max="5", :clickable="true")
      .flex(style="justify-content: flex-end")
        b-button(:disabled="isPostingDisabled", :loading="isSubmitting" type="is-primary" @click="clickPost") POST
  //- XOAddPin(v-if="showAddPin" @DoShowAddPin="showAddPin = $event", :medias="form.Media")
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
    XMUpdateEditMedias,
    FormMentionTextarea,
    XOMediaUploads,
    XHMediaUploader,
    XOCategoryPillsSelector,
    XOMyProfileName,
    XOMyProfileAvatar,
    XOAddPin,
  },
  props: {
    initialPhotoFiles: null,
    initialVideoFile: null,
    isFullscreen: { type: Boolean, default: false },
    isMedal: { type: Boolean, default: false },
    medalTheme: Object,
    productID: String,
  },
  data() {
    return {
      form: {
        content: '',
        Media: [],
        CategoryIDs: [],
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
      return !this.contentText?.trim() || this.form.CategoryIDs.length < 1 || this.isUploading
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
    initialMedalMessage() {
      return this.$parent?.$parent?.initialMedalMessage
      // return (
      //   'Hi there! Take a look at this awesome medals you can earn. Join me at ' +
      //   this.$parent?.$parent?.title +
      //   ' and earn an awesome digital medal. Find out more about medals and the event — ' +
      //   this.$parent?.$parent?.url
      // )
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
    this.ifMedal()
  },
  methods: {
    ifMedal() {
      if (this.isMedal) {
        this.form.content = this.initialMedalMessage
        this.contentText = this.initialMedalMessage
        this.form.Media = this.$parent?.$parent?.video || []
      }
    },
    onInput(e) {
      this.form.content = e.innerHTML
      this.contentText = e.textContent
    },
    closeModal() {
      if (this.$parent.close) {
        this.$parent.close()
      }
    },
    async clickPost() {
      try {
        this.isSubmitting = true

        if (this.isMedal) {
          // warn: this is for medal update only

          this.form.productID = this.productID

          if (this.form.Media.length) {
            this.form.Media = this.form.Media.map((media) => ({
              objectID: media?.objectID,
              objectType: media?.objectType,
              orientation: media?.orientation,
            }))
          }
          await this.$apollo.mutate({
            variables: {
              input: this.form,
              businessID: this.currentBusinessID,
            },
            context: this.getGraphQLContext(),
            mutation: gql`
              mutation ($input: InputUpdate!, $businessID: String) {
                createUpdateForNFTMedal(input: $input, BusinessID: $businessID) {
                  success
                  objectType
                  objectID
                }
              }
            `,
          })
        } else {
          await this.$apollo.mutate({
            variables: {
              input: this.form,
              businessID: this.currentBusinessID,
            },
            context: this.getGraphQLContext(),
            mutation: gql`
              mutation ($input: InputUpdate!, $businessID: String) {
                createUpdate(input: $input, BusinessID: $businessID) {
                  success
                  objectType
                  objectID
                }
              }
            `,
          })
        }
        if (this.$route.name === 'my-feed') {
          await this.$root.$emit('reload')
        }
        this.closeModal()
        this.$router.push('/my-feed')
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isSubmitting = false
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
    doShowAddPinModal() {
      this.$buefy.modal.open({
        component: require('~/components/organisms/AddPin').default,
        parent: this,
        width: '100%',
        props: {
          medias: this.form.Media,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-add-update::v-deep {
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
