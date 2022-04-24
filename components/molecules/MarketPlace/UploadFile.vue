<template lang="pug">
.xm-marketplace-upload-file
  .card
    .card-content
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      h3 Upload File
      p Recommended file type
      p.extension png, jpeg, pdf, csv, Microsoft Word
      .has-file(v-if="file")
        .content
          span(v-if="isUploaded") Uploaded
          span(v-else) Uploading {{ progress }}%
          img(src="~assets/images/MarketPlace/logo-loader.png")
      template(v-else)
        b-upload(
          v-model="file"
          drag-drop
          expanded
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.csv,.excel"
          @input="doUploadAdditionalFile()")
          .content.has-text-centered
            div: img(src="~assets/images/MarketPlace/upload.svg")
            p Drag & drop your file or choose file
      .upload-actions
        b-button(type="is-primary" outlined @click.prevent="file = null") Cancel
        b-button(type="is-primary" @click.prevent="doCheckFile()") Apply
</template>

<script>
export default {
  name: 'XMMarketPlaceUploadFile',
  data() {
    return {
      file: null,
      fileID: null,
      progress: 0,
      isUploaded: false,
    }
  },
  watch: {
    '$store.state.media.currentFile': {
      deep: true,
      handler() {
        const progress = this.$store.getters['media/getFile'](this.fileID)?.progress || 0
        this.progress = Math.round(progress * 100) || 0
      },
    },
    progress(value) {
      if (value === 100) {
        this.isUploaded = true
      }
    },
  },
  methods: {
    async doUploadAdditionalFile() {
      // const size = parseFloat(this.file.size / (1024 * 1024)).toFixed(2)

      // if (size > 5) {
      //   this.file = null
      //   this.$toast.error('File too large. Please upload a file less than 5mb', {
      //     duration: 3000,
      //     position: 'top-center',
      //   })
      //   return
      // }

      this.isUploaded = false
      this.progress = 0
      const progress = await this.$store.dispatch('media/uploadAdditionalFile', { file: this.file })
      this.fileID = progress?.id
    },
    async doCheckFile() {
      await this.$store.dispatch('media/setAdditionalFiles', {
        objectID: this.fileID,
        objectType: 'File',
        fileName: this.file?.name,
        fileType: this.file?.type,
        fileSize: this.file?.size,
      })
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-upload-file::v-deep {
  .card {
    .card-content {
      padding: 50px 30px 30px 30px;

      .close {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
      }

      h3,
      p {
        text-align: center;
      }

      h3 {
        font-size: 1.5714rem;
        color: $secondary;
        margin-bottom: 10px;
      }

      p {
        font-weight: 300;
        color: #65676b;
      }

      .extension {
        font-size: 0.8571rem;
        margin-bottom: 20px;
      }

      .has-file {
        width: 100%;
        height: 290px;
        background-color: #eef1f1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 20px;

        .content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 300;

          img {
            margin-left: 10px;
          }
        }
      }

      .upload-draggable {
        padding: 0;
        border: 0;
        background-color: #eef1f1;
        height: 290px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
      }

      .upload-actions {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;

        button {
          text-transform: uppercase;

          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;

    .card {
      .card-content {
        .upload-draggable,
        .has-file {
          height: 100px;
        }
      }
    }
  }
}
</style>
