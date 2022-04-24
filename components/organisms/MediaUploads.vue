<template lang="pug">
.xo-media-uploads(:class="getImageClass")
  .item(v-for="{ url, type, fileID, id } in items", :class="type")
    XAMediaUploadsItem(
      :value="url",
      :id="id",
      :fileID="fileID",
      :type="type"
      @onClickRemove="removeFile",
      :has-mark-cover-photo="hasMarkCoverPhoto")
</template>

<script>
import gql from 'graphql-tag'
import remove from 'lodash/remove'
import draggable from 'vuedraggable'
import XAMediaUploadsItem from '~/components/atoms/MediaUploadsItem'

export default {
  name: 'XOMediaUploads',
  components: { XAMediaUploadsItem, draggable },
  props: {
    value: Array,
    editableFiles: Array,
    hasMarkCoverPhoto: Boolean,
  },
  data() {
    return {
      items: [],
    }
  },
  computed: {
    getImageClass() {
      const count = this.items.slice(0, 4)
      return `gallery-${count.length}`
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.refreshItems()
      },
    },
  },
  mounted() {
    this.loadInitialData()
  },
  methods: {
    loadInitialData() {
      if (this.editableFiles) {
        const files = this.editableFiles
        for (const file of files) {
          this.items.push({ type: file.data?.objectType, fileID: file?.id, id: file?.id, url: file.data?.url })
        }
      }
    },
    async refreshItems() {
      this.items = await Promise.all(
        this.value.map(async ({ id: fileID, data, processed }) => {
          const type = data?.objectType
          const id = data?.objectID
          return {
            fileID,
            id,
            type,
            url: data && processed ? await this.getMediaURL(type, id) : null,
          }
        })
      )
    },
    async getMediaURL(type, id) {
      try {
        const { data } = await this.$apollo.query({
          query:
            type === 'Video'
              ? gql`
                  query ($id: String!) {
                    VideoURL(id: $id)
                  }
                `
              : gql`
                  query ($id: String!) {
                    PhotoURL(id: $id)
                  }
                `,
          fetchPolicy: 'cache-first',
          variables: { id },
        })
        return type === 'Video' ? data.VideoURL : data.PhotoURL
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    removeFile(data) {
      this.items = remove(this.items, (e) => {
        return e.id !== data.id
      })
      this.$store.commit('media/removeFile', data.fileID)
      this.$emit('onClickRemove', data)
    },
    onDragEnd() {
      // this.$emit('DoArrangeMedia', this.items)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-media-uploads::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100% !important;

  .item {
    margin-bottom: 7px;
    max-height: 150px;
    min-height: 150px;
    width: calc(100% / 3 - 5px);
    display: block;

    &.Video {
      .xa-media-uploads-item {
        background-color: $black;

        .xa-video {
          width: 100%;
          height: 100%;
        }
      }
    }

    @media screen and (max-width: 427px) {
      max-height: 100px;
      min-height: 100px;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 1;
    }

    &:first-child {
      width: 100%;
      max-height: 400px;
      min-height: 400px;
      margin-bottom: 7px;
      display: block;
      @media screen and (max-width: 427px) {
        max-height: unset;
        min-height: 300px;
      }
    }
  }
  &.gallery-2 {
    .item {
      width: calc(50% - 5px) !important;
      max-height: 250px !important;
      min-height: 250px !important;
      display: block;
    }

    @media screen and (max-width: 427px) {
      .item {
        max-height: 105px !important;
        min-height: 105px !important;
      }
    }
  }
  &.gallery-3 {
    .item {
      &:first-child {
        width: 100%;
        max-height: 500px;
        margin-bottom: 10px;
        display: block;
      }

      &:nth-child(2),
      &:nth-child(3) {
        width: calc(50% - 5px);
        max-height: 200px;
        display: block;
      }
    }
  }
}
</style>
