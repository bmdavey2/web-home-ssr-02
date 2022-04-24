<template lang="pug">
.achievement-post-card.card
  XHMediaUploader(
    v-model="Media",
    :photoFiles.sync="photoFiles",
    :videoFile.sync="videoFile",
    :mediaStates.sync="mediaStates",
    :editableFiles="mediaStates")
  ._header.p-3
    ._title.has-text-weight-medium {{ this.isEdit ? 'EDIT' : 'ADD' }} ACHIEVEMENT
    .close.is-flex.is-flex-wrap-wrap.is-align-items-center.mt-3(@click.prevent="$parent.close()"): b-icon(icon="close")

  .card-content.p-0.py-3.px-5
    form(action="#" autocomplete="off")
      .columns.is-multiline.is-mobile
        .column.is-10-desktop.is-10-mobile: FormInput(v-model="title" placeholder="Event" label="Event" is-transparent)
        .column.is-2-desktop.is-2-mobile
          ._label.has-text-weight-bold Icon
          .icon-container
            img.mt-2(
              v-if="CategoryIDs"
              style="height: 32px",
              :src="require(`~/assets/icons/categories/default/${CategoryIDs}.svg`)"
              width="29"
              height="32")
            .edit-icon: a(@click="onClickOpenCategory"): img(src="~/assets/icons/circle-pen.svg" width="22" height="22")

      .columns
        .column.is-6
          client-only
            FormDatePicker(locale="en-CA" v-model="parseDate" label="Date" is-transparent)
      .columns.is-multiline
        .column.is-6: FormInput(
          v-model="completionTimeInSeconds"
          v-mask="'##:##:##'"
          placeholder="00h:00m:00s"
          label="Completion time"
          is-transparent)

        .column.is-6: FormInput(v-model="summary" placeholder="e.g. Finisher" label="Result" is-transparent)
        .column.is-12
          client-only
            FormMentionInput#collaboratedWith(
              :value="collaboratedWith"
              label="Collaborators"
              ref="taggedList"
              placeholder="@tag people or business that are a part of this achievement"
              is-transparent)
        .column.is-12: FormInput(
          v-model="content"
          maxlength="140"
          placeholder="Add Your Note"
          label="Note"
          is-transparent)
          // TODO: Add photo and video upload container
      XOMediaUploads(
        v-model="mediaStates",
        :media.sync="Media",
        :editableFiles="mediaStates"
        @onClickRemove="removeFile")
      .flex.is-align-content-center.my-4
        b-upload.file-upload.ml-2.is-cursor-pointer.is-user-select-none.flex.align-center.has-text-secondary(
          v-if="!hasVideo"
          v-model="photoFiles"
          accept="image/*"
          multiple)
          b-icon.ml-2(icon="image-outline")
          span.ml-1 ADD IMAGE

        b-upload.file-upload.ml-2.is-cursor-pointer.is-user-select-none.flex.align-center.has-text-secondary(
          v-if="!hasPhotos"
          v-model="videoFile",
          :disabled="hasVideo",
          :class="hasVideo ? 'disabled' : ''"
          accept="video/*")
          b-icon.ml-2(icon="play-outline")
          span.ml-1 ADD VIDEO

      .actions.is-flex.is-flex-wrap.is-justify-content-flex-end.mt-5
        b-button.is-uppercase.mr-3(type="is-primary" outlined @click="$parent.close()") Cancel
        b-button.is-uppercase(type="is-primary" @click="doSaveAchievement()") {{ isEdit ? 'Update' : 'Save' }}
      b-loading(v-model="isLoading")
</template>

<script>
import { mask } from 'vue-the-mask'
import gql from 'graphql-tag'
import compact from 'lodash/compact'
import some from 'lodash/some'
import remove from 'lodash/remove'
import FormInput from '~/components/atoms/Form/Input'
import FormDatePicker from '~/components/atoms/Form/DatePicker'
import FormMentionInput from '~/components/atoms/Form/MentionInput'
import XOMediaUploads from '~/components/organisms/MediaUploads'
import XHMediaUploader from '~/components/helpers/MediaUploader'

export default {
  components: { XHMediaUploader, XOMediaUploads, FormMentionInput, FormDatePicker, FormInput },
  directives: { mask },
  props: {
    initialData: Object,
    isEdit: { type: Boolean, default: false },
  },
  data() {
    return {
      //
      Media: [],
      photoFiles: null,
      videoFile: null,
      mediaStates: [],
      //
      isLoading: false,
      title: '',
      CategoryIDs: '',
      content: '',
      dateAccomplished: new Date(),
      summary: '',
      collaboratedWith: '',
      completionTimeInSeconds: '',
    }
  },
  computed: {
    parseDate: {
      get() {
        return new Date(this.dateAccomplished)
      },
      set(val) {
        this.dateAccomplished = val
      },
    },
    hasPhotos() {
      return some(this.Media, ({ objectType }) => objectType === 'Photo')
    },
    hasVideo() {
      return some(this.Media, ({ objectType }) => objectType === 'Video')
    },
    getfile() {
      return this.$store.getters['media/getAllFiles']
    },
  },
  created() {
    if (this.isEdit) {
      this.setinitialData()
    } else {
      setTimeout(() => {
        this.onClickOpenCategory()
      }, 500)
    }
  },
  methods: {
    removeFile(data) {
      this.Media = remove(this.Media, (e) => {
        return e.objectID !== data.id
      })

      this.mediaStates = remove(this.mediaStates, (e) => {
        return e.data?.objectID !== data.id
      })
    },
    setinitialData() {
      this.isLoading = true
      const media = this.initialData.Media
      for (const data of media) {
        this.Media.push({ objectID: data.objectID, objectType: data.objectType })
        const url = data.objectType === 'Photo' ? data.PhotoURL : data.VideoURL
        this.mediaStates.push({
          id: data.objectID,
          progress: 1,
          uploaded: true,
          processed: true,
          data: {
            objectID: data.objectID,
            objectType: data.objectType,
            url,
          },
        })

        this.$store.commit('media/addUpload', {
          id: data.objectID,
          progress: 1,
          uploaded: true,
          processed: true,
          data: {
            objectID: data.objectID,
            objectType: data.objectType,
            url,
          },
        })
      }

      this.title = this.initialData.title
      this.CategoryIDs = this.initialData.CategoryIDs
      this.content = this.initialData.description
      this.dateAccomplished = this.initialData.dateAccomplished
      this.summary = this.initialData.summary
      this.collaboratedWith = this.initialData.collaboratedWith
      this.completionTimeInSeconds = this.toTime(this.initialData.completionTimeInSeconds)

      this.isLoading = false
    },
    toTime(val) {
      const secNum = parseInt(val, 10) // don't forget the second param
      let hours = Math.floor(secNum / 3600)
      let minutes = Math.floor((secNum - hours * 3600) / 60)
      let seconds = secNum - hours * 3600 - minutes * 60

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return hours + ':' + minutes + ':' + seconds
    },
    async doSaveAchievement() {
      const taggedList = document.getElementById('collaboratedWith').getElementsByTagName('a')
      const tagggedListArray = Array.prototype.slice.call(taggedList)
      const taggedListCompact = compact(tagggedListArray.map((x) => x.textContent))
      const taggedListString = taggedListCompact.toString().replace(/@/g, '')

      let seconds
      if (this.completionTimeInSeconds) {
        const a = this.completionTimeInSeconds.split(':')
        seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
      } else {
        seconds = 0
      }

      if (isNaN(seconds)) {
        this.$toast?.error(`invalid Completion time`, { duration: 3 * 1000, position: 'bottom-right' })
      } else if (this.title === '' || this.CategoryIDs === '' || this.dateAccomplished === '' || this.summary === '') {
        this.$toast?.error(`Oh no! Some Fields are Missing`, { duration: 3 * 1000, position: 'bottom-right' })
      } else {
        const input = {
          title: this.title,
          CategoryIDs: this.CategoryIDs,
          description: this.content,
          dateAccomplished: this.dateAccomplished,
          completionTimeInSeconds: seconds,
          summary: this.summary,
          collaboratedWith: document.getElementById('collaboratedWith').innerHTML,
          Media: this.Media,
        }
        this.isLoading = true
        try {
          if (this.isEdit) {
            await this.$apollo.mutate({
              variables: { input, id: this.initialData.id },
              mutation: gql`
                mutation ($id: String!, $input: InputAchievement!) {
                  editAchievement(input: $input, id: $id) {
                    success
                  }
                }
              `,
            })
          } else {
            await this.$apollo.mutate({
              variables: { input },
              context: this.getGraphQLContext(),
              mutation: gql`
                mutation ($input: InputAchievement!) {
                  createAchievement(input: $input) {
                    success
                  }
                }
              `,
            })
          }
        } catch (error) {
          this.doTrackSegmentError(error)
        } finally {
          this.$emit('close')
          this.$emit('loadAchievement')
          this.isLoading = false
          if (this.isEdit) {
            this.$toast?.success(`Achievement is Updated Successfully`, {
              duration: 3 * 1000,
              position: 'bottom-right',
            })
          } else {
            this.$buefy.modal.open({
              parent: this,
              component: require('~/components/molecules/Profile/Achievements/Congrats').default,
              width: 600,
              canCancel: false,
              props: {
                event: taggedListString,
              },
            })
          }
        }
      }
    },
    onClickOpenCategory() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Profile/Achievements/Categories').default,
        width: 500,
        canCancel: false,
        events: {
          iconSelected: (value) => {
            this.CategoryIDs = value
          },
          closeParentModal: () => {
            const resData = this.CategoryIDs === '' ? this.$emit('close') : ''
            return resData
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.achievement-post-card::v-deep {
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

  .upload-preview {
    margin: 0 auto;
  }

  a {
    color: #25a9e0;
  }

  .add-disabled {
    background: #e0dcdc;
    border: none !important;
  }

  .icon-container {
    position: relative;
    border-radius: 50%;
    font-size: 16px;
    width: 45px;
    height: 45px;
    display: inline-block;
    padding: 0 7px;
    color: #65676b;
    border: 1px solid #fff;
    line-height: 45px;
    background: #cff1f8;
    box-sizing: border-box;
    box-shadow: 0 4px 10px rgb(10 39 46 / 15%);

    .edit-icon {
      position: absolute;
      right: -9px;
      top: 21px;

      img {
        height: 22px;
      }
    }
  }

  ._header {
    position: relative;
    text-align: center;
    text-transform: uppercase;
    border-bottom: 1px solid #e5e5e5;

    .close {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      z-index: 1;
      cursor: pointer;
      display: none !important;
    }
    @media (max-width: $tabletSM) {
      .close {
        display: unset !important;
      }
    }
  }
}
</style>
