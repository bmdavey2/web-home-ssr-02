<template lang="pug">
.xa-media-uploads-item
  template(v-if="!value")
    .initial-image
      b-skeleton(active width="100%" height="100%")
      .loading-content
        .value.has-text-right.has-text-white.pt-1 {{ progressValue }}
        b-progress.small-progress(type="is-primary" size="is-small", :value="progress")

  template(v-else)
    ._action
      b-tooltip(label="Mark main image" position="is-bottom" type="is-white"): .mark-as-cover-photo(
        :class="isCoverPhoto && 'active'"
        @click.prevent="doMarkAsCoverPhoto()"
        v-if="hasMarkCoverPhoto && type === 'Photo'"): b-icon(
        icon="check"
        size="is-small")
      ._delete(@click="removeFile(id, type, fileID)"): img(src="~/assets/icons/close.svg" width="16" height="16")
    XOAddPinTag(v-for="(tag, index) in tags", :key="index", :tag="tag", :edit="false")
    img(:src="value" v-if="type === 'Photo'" @error="onImageError")
    XAVideo(v-else, :value="value")
</template>

<script>
import XAVideo from '~/components/atoms/Video'
import XOAddPinTag from '~/components/organisms/AddPin/Tag'

export default {
  name: 'XAMediaUploadsItem',
  components: { XAVideo, XOAddPinTag },
  props: {
    value: String,
    type: String,
    fileID: String,
    id: String,
    hasMarkCoverPhoto: Boolean,
  },
  data() {
    return {
      error: false,
      tags: [],
    }
  },
  computed: {
    file() {
      return this.$store.getters['media/getFile'](this.fileID)
    },
    progress() {
      const value = this.$store.getters['media/getFile'](this.fileID)?.progress || 0
      return Math.round(value * 100) || 0
    },
    progressValue() {
      const progress = this.progress
      if (progress === 100) {
        return this.type === 'Video' ? 'Converting..' : progress + '%'
      } else {
        return progress + '%'
      }
    },
    isCoverPhoto() {
      return this.$store.getters['media/getCoverPhotoID'] === this.id
    },
  },
  mounted() {
    this.$root.$on('retrieve/image/pins', () => {
      this.doRetrievePins()
    })
  },
  methods: {
    onImageError() {
      this.error = true
    },
    removeFile(id, type, fileID) {
      this.$emit('onClickRemove', { id, type, fileID })
    },
    doMarkAsCoverPhoto() {
      this.$store.dispatch('media/setCoverPhotoID', this.id)
    },
    async doRetrievePins() {
      const {
        getPin: { Tags },
      } = await this.$api.getPin({ photoID: this.id })

      this.tags = Tags
    },
  },
}
</script>

<style lang="sass" scoped>
.xa-media-uploads-item
  position: relative
  width: 100%
  height: 100%


  ._action
    position: absolute
    right: 5px
    top: 5px
    display: flex
    flex-wrap: wrap
    justify-content: flex-end
    z-index: 10

    ._delete
      width: 22px
      height: 22px
      background: #FFF
      box-shadow: 0 4px 10px rgb(10 39 46 / 15%)
      border-radius: 50%
      padding: 3px
      cursor: pointer

    .mark-as-cover-photo
      background-color: rgba(#fff, 0.8)
      box-shadow: 0 4px 10px rgb(10 39 46 / 15%)
      border-radius: 50%
      display: flex
      flex-wrap: wrap
      align-items: center
      justify-content: center
      width: 23px
      height: 23px
      margin-right: 5px
      cursor: pointer
      border-width: 1px
      border-style: solid
      border-color: #0c353e

      .icon
        opacity: 0

    .mark-as-cover-photo.active
      background-color: #fff
      border: 0

      .icon
        opacity: 1

.initial-image
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  position: relative
  width: 100%
  height: 100%

.loading-content
  z-index: 20
  position: absolute
  bottom: 0
  width: 100%
  background-color: rgba(12, 53, 62, 0.4) !important

  .small-progress
    max-height: 8px !important
</style>
