<template lang="pug">
.xa-marketplace-additional-information-file(:class="isDownloading && 'disabled'" @click.prevent="doDownloadFile()")
  ._icon
    img(src="~assets/images/MarketPlace/csv.svg" v-if="fileExtension === 'csv'")
    img(src="~assets/images/MarketPlace/pdf.svg" v-if="fileExtension === 'pdf'")
    img(src="~assets/images/MarketPlace/jpg.svg" v-if="fileExtension === 'jpg' || fileExtension === 'jpeg'")
    img(src="~assets/images/MarketPlace/png.svg" v-if="fileExtension === 'png'")
    img(src="~assets/images/MarketPlace/doc.svg" v-if="fileExtension === 'doc' || fileExtension === 'docx'")
  .name {{ file.fileName }}
  .loader(v-if="isDownloading")
</template>

<script>
export default {
  name: 'XAMarketPlaceAdditionalInformationFile',
  props: {
    file: Object,
  },
  data() {
    return {
      isDownloading: false,
    }
  },
  computed: {
    fileExtension() {
      const file = this.file?.fileName
      return file.substring(file.lastIndexOf('.') + 1)
    },
  },
  methods: {
    async doDownloadFile() {
      this.isDownloading = true
      try {
        const objectID = this.file?.objectID
        const objectType = this.file?.objectType

        const { downloadFile } = await this.$api.downloadFile({ objectID, objectType })

        window.location = downloadFile?.objectID
      } catch (error) {
        this.doTrackSegmentError(error, 'MarketPlace Product')
      } finally {
        this.isDownloading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-marketplace-additional-information-file::v-deep {
  font-size: 1.1429rem;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  user-select: none;
  margin-bottom: 3px;

  ._icon {
    margin-right: 10px;

    img {
      width: 32px;
    }
  }

  .loader {
    margin-left: 10px;
  }

  &.disabled {
    pointer-events: none;
  }
}
</style>
