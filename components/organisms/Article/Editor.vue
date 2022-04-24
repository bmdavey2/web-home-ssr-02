<template lang="pug">
.editor-container
  vue-tribute(:options="tributeOptions")
    #editorContent.editable-content.customcontenteditable.has-text-weight-light.tooltip-target.px-1(
      @paste="handlePaste"
      ref="editorContent"
      @input="savecontent"
      @mouseleave="saveText"
      @mouseup="saveSelection"
      placeholder="Start Typing ..."
      contentEditable="true"
      @keydown="checkContent")
      p(v-if="isEdit" v-html="content")

  input.file-browser(type="file" accept="image/*" ref="addImage" @change="doAddImage")
  input.file-browser(type="file" accept="video/*" ref="addVideo" @change="doAddVideo")
  #linktooltip.custom-tooltip(:style="tooltipCoordinates" v-if="showLinkTooltip")
    ul.is-flex.is-align-items-center
      li
        button(@click="createLink"): img(src="~assets/icons/toolbar/light/link-light.svg")
        p.selected-text.pl-2 {{ this.selectedText == '' ? 'No Selected Text Found' : this.selectedText }}
      li: ._pipe
      li: input.add-url(v-model="link" @keyup.enter="createLink")

  .editor-toolbar.pt-3
    .toolbar-content(:class="{ 'is-fixed': isFixed }")
      ul.toolbar-tools.is-flex.is-align-items-center
        li.is-flex
          button(@click="onClickHeading"): img(src="~assets/icons/toolbar/text.svg" width="16" height="16")
          button(@click="onClickTool('bold')"): img(src="~assets/icons/toolbar/bold.svg" width="16" height="16")
          button(@click="onClickTool('italic')"): img(src="~assets/icons/toolbar/italic.svg" width="16" height="16")
          button(@click="onClickTool('underline')"): img(
            src="~assets/icons/toolbar/underline.svg"
            width="16"
            height="16")

        li: ._pipe
        li.is-flex
          button(@click="onClickTool('insertOrderedList')"): img(
            src="~assets/icons/toolbar/oderlist.svg"
            width="16"
            height="16")
          button(@click="onClickTool('insertUnorderedList')"): img(
            src="~assets/icons/toolbar/unlist.svg"
            width="16"
            height="16")

        li: ._pipe
        li.is-flex
          button(@click="$refs.addImage.click()"): img(src="~assets/icons/toolbar/image.svg" width="16" height="16")
          button(@click="$refs.addVideo.click()"): img(src="~assets/icons/toolbar/video.svg" width="16" height="16")
          button(@click="addSegement"): img(src="~assets/icons/toolbar/segment.svg" width="21" height="14")

        li: ._pipe
        li.is-flex
          button(@click="showLinkTooltip = !showLinkTooltip" v-if="!linked"): img(
            src="~assets/icons/toolbar/link.svg"
            width="24"
            height="24")
          button(v-else): img(src="~assets/icons/toolbar/link-grey.svg" width="24" height="24")

        li: ._pipe
        li.is-flex
          b-dropdown.color-picker(aria-role="list", :mobile-modal="false" position="is-top-right")
            template(#trigger): button: img(src="~assets/icons/toolbar/colorpicker.png" width="44" height="44")
            b-dropdown-item(aria-role="listitem")
              button(@click="setColor('#0C353E')"): img(
                src="~assets/icons/toolbar/colorpicker/secondary.svg"
                width="40"
                height="40")
            b-dropdown-item(aria-role="listitem")
              button(@click="setColor('#848484')"): img(
                src="~assets/icons/toolbar/colorpicker/grey.svg"
                width="40"
                height="40")
            b-dropdown-item(aria-role="listitem")
              button(@click="setColor('#F85454')"): img(
                src="~assets/icons/toolbar/colorpicker/primary.svg"
                width="40"
                height="40")
            b-dropdown-item(aria-role="listitem")
              button(@click="setColor('#25A9E0')"): img(
                src="~assets/icons/toolbar/colorpicker/blue.svg"
                width="40"
                height="40")

  .mobile-editor
    ul.toolbar-mobile-tools.is-flex.is-align-items-center.dropdown
      li.is-flex.dropdown-trigger
        b-dropdown.toolbar-dropdown(aria-role="list", :mobile-modal="false" position="is-top-right")
          template(#trigger)
            button
              img(src="~assets/icons/toolbar/light/text-light.svg" width="16" height="16")
              img(src="~assets/icons/toolbar/light/arrow-down.svg" width="8" height="8")
          b-dropdown-item(aria-role="listitem"): button(@click="onClickHeading"): img(
            src="~assets/icons/toolbar/light/text-light.svg"
            width="16"
            height="16")
          b-dropdown-item(aria-role="listitem"): button(@click="onClickTool('bold')"): img(
            src="~assets/icons/toolbar/light/bold-light.svg"
            width="16"
            height="16")
          b-dropdown-item(aria-role="listitem"): button(@click="onClickTool('italic')"): img(
            src="~assets/icons/toolbar/light/italic-light.svg"
            width="16"
            height="16")
          b-dropdown-item(aria-role="listitem"): button(@click="onClickTool('underline')"): img(
            src="~assets/icons/toolbar/light/underline-light.svg"
            width="16"
            height="16")

      li: ._pipe
      li.is-flex
        b-dropdown.toolbar-dropdown(aria-role="list", :mobile-modal="false" position="is-top-right")
          template(#trigger)
            button
              img.mr-1(src="~assets/icons/toolbar/light/list-light.svg" width="16" height="16")
              img(src="~assets/icons/toolbar/light/arrow-down.svg" width="8" height="8")
          b-dropdown-item(aria-role="listitem"): button(@click="onClickTool('insertOrderedList')"): img(
            src="~assets/icons/toolbar/light/order-light.svg"
            width="16"
            height="16")
          b-dropdown-item(aria-role="listitem"): button(@click="onClickTool('insertUnorderedList')"): img(
            src="~assets/icons/toolbar/light/unorder-light.svg"
            width="16"
            height="16")

      li: ._pipe(v-if="!linked")
      li.is-flex(v-if="!linked")
        button(@click="showLinkTooltip = !showLinkTooltip"): img(
          src="~assets/icons/toolbar/light/link-light.svg"
          width="16"
          height="16")

      li: ._pipe
      li: button(@click="$refs.addImage.click()"): img(
        src="~assets/icons/toolbar/light/photo-light.svg"
        width="14"
        height="14")
      li: button(@click="$refs.addVideo.click()"): img(
        src="~assets/icons/toolbar/light/video-light.svg"
        width="14"
        height="14")
      li: button(@click="addSegement"): img(src="~assets/icons/toolbar/light/segment-light.svg" width="16" height="11")

      li: ._pipe
      li.is-flex
        b-dropdown.color-picker(aria-role="list", :mobile-modal="false" position="is-top-right")
          template(#trigger): button: img(src="~assets/icons/toolbar/colorpicker.png" width="32" height="32")
          b-dropdown-item(aria-role="listitem")
            button(@click="setColor('#0C353E')"): img(
              src="~assets/icons/toolbar/colorpicker/secondary.svg"
              width="32"
              height="32")
          b-dropdown-item(aria-role="listitem")
            button(@click="setColor('#848484')"): img(
              src="~assets/icons/toolbar/colorpicker/grey.svg"
              width="32"
              height="32")
          b-dropdown-item(aria-role="listitem")
            button(@click="setColor('#F85454')"): img(
              src="~assets/icons/toolbar/colorpicker/primary.svg"
              width="32"
              height="32")
          b-dropdown-item(aria-role="listitem")
            button(@click="setColor('#25A9E0')"): img(
              src="~assets/icons/toolbar/colorpicker/blue.svg"
              width="32"
              height="32")
</template>

<script>
import Hls from 'hls.js'
import gql from 'graphql-tag'
import tributeOptions from '~/mixins/tributeOptions'

export default {
  name: 'XOArticleEditor',
  mixins: [tributeOptions],
  props: {
    content: { type: String, default: '' },
    isFixed: { type: Boolean, default: true },
  },
  data() {
    return {
      headingTool: false,
      showLinkTooltip: false,
      photos: [],
      video: [],
      tooltipCoordinates: {
        top: '',
        left: '',
      },
      link: '',
      selectedText: '',
    }
  },
  computed: {
    isEdit() {
      return this.$parent.isEdit
    },
    publisher() {
      return this.$parent.selectedEditor
    },
    linked() {
      return this.publisher?.plan === null
    },
  },
  mounted() {
    window.deleteArticle = this.deleteArticle
    window.editArticle = this.editArticle
    window.removehr = this.removehr
    window.limitContent = this.limitContent
    window.editVideoArticle = this.editVideoArticle
    document.execCommand('defaultParagraphSeparator', false, 'p')
    this.loadContent()
  },
  methods: {
    async loadContent() {
      await setTimeout(() => {
        return this.isEdit ? this.savecontent() : ''
      }, 1 * 2000)
    },
    onClickTool(val) {
      document.execCommand(val, false, null)

      this.savecontent()
    },
    handlePaste(e) {
      e.preventDefault()
      // Get the copied text from the clipboard
      const text = e.clipboardData
        ? (e.originalEvent || e).clipboardData.getData('text/plain')
        : // For IE
        window.clipboardData
        ? window.clipboardData.getData('Text')
        : ''

      if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, text)
      } else {
        // Insert text at the current position of caret
        const range = document.getSelection().getRangeAt(0)
        range.deleteContents()

        const textNode = document.createTextNode(text)
        range.insertNode(textNode)
        range.selectNodeContents(textNode)
        range.collapse(false)

        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    onClickHeading() {
      if (this.headingTool) {
        document.execCommand('formatBlock', false, '<h2>')
      } else {
        document.execCommand('formatBlock', false, '<p>')
      }
      this.headingTool = !this.headingTool

      this.savecontent()
    },
    checkContent(e) {
      if (e.key === 'Backspace' || e.key === 8) {
      }
    },
    addSegement() {
      const parent = document.getElementById('editorContent')
      parent.innerHTML +=
        '<hr class="removehr"  contenteditable="false" onclick="removehr(this)" /><p placeholder="Start Typing ..."></p>'

      this.savecontent()
    },
    createLink() {
      if (this.link === '') {
        this.$buefy.snackbar.open(`Link is Required`)
      } else if (this.selectedText.length === 0 || this.selectedText === undefined) {
        this.$buefy.snackbar.open(`Please Select Text or location of the link`)
      } else {
        // Restore the selection
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(this.selectedText)

        let link = ''
        let linkText = ''
        if (this.selectedText.toString()) {
          linkText = this.selectedText
        } else {
          linkText = this.link
        }

        // document.execCommand('CreateLink', true, this.link)
        if (this.link.substring(0, 7) === 'http://') link = this.link
        else link = 'https://' + this.link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')

        // document.execCommand('insertHTML', false, '<a href="' + link + '">' + linkText + '</a>')
        document.execCommand('insertHTML', false, `<a href="${link}" target="_blank">${linkText}</a>`)

        this.link = ''
        this.selectedText = ''
        this.showLinkTooltip = false

        this.savecontent()
      }
    },
    saveSelection() {
      // Save the selection
      this.saveText()

      // Find out how much (if any) user has scrolled
      const scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (document.documentElement || document.body.parentNode || document.body).scrollTop

      // Get cursor position

      const posX = event.clientX - 110
      const posY = event.clientY + 20 + scrollTop

      // set tooltip coordinates
      this.tooltipCoordinates.top = posY + 'px'
      this.tooltipCoordinates.left = posX + 'px'
    },
    saveText() {
      const selection = window.getSelection()
      this.selectedText = selection.rangeCount === 0 ? null : selection.getRangeAt(0)
    },
    setColor(val) {
      document.execCommand('styleWithCSS', false, true)
      document.execCommand('foreColor', false, val)
    },
    async doAddImage() {
      await this.uploadPhotos(this.$refs.addImage.files, 'upload')
    },
    deleteArticle(elm) {
      const e = elm.parentElement

      const result = []
      for (let p = e && e.parentElement; p; p = p.parentElement) {
        result.push(p)
      }
      result[2].remove()

      this.savecontent()
      //  e.currentTarget.parentNode.remove('.fileDiv');
    },
    async editArticle(e, id) {
      const file = e.files
      await this.uploadPhotos(file, 'edit', id)
    },
    async editVideoArticle(e, id) {
      const file = e.files[0]
      await this.uploadVideo(file, 'edit', id)
    },
    async doAddVideo() {
      await this.uploadVideo(this.$refs.addVideo.files[0], 'upload')
    },
    async uploadPhotos(files, action, id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.editorContent.$el,
      })
      try {
        this.isLoading = true
        if (files instanceof FileList) {
          const newFiles = []
          for (let i = 0; i < files.length; i++) {
            newFiles.push(files[i])
          }
          files = newFiles
        }
        const uploads = files.map((file) => this.$store.dispatch('media/upload', { file }))
        const waitForCompletion = (await Promise.all(uploads)).map(({ waitForUpload, waitForProcess }) =>
          waitForUpload.then(() => waitForProcess)
        )
        const allCompleted = (await Promise.allSettled(waitForCompletion)).map(({ value }) => value).filter((x) => !!x)
        const photos = allCompleted.filter(({ objectType }) => objectType === 'Photo')
        if (photos.length > 0) {
          const { data } = await this.$apollo.query({
            query: gql`
              query ($id: String!) {
                PhotoURL(id: $id)
              }
            `,
            fetchPolicy: 'cache-first',
            variables: { id: photos[0].objectID },
          })

          if (action === 'upload') {
            const editor = document.querySelector('#editorContent')

            const html =
              `<div class='fileDiv ' contenteditable='false'><p>
                <img id='` +
              photos[0].objectID +
              `' src='` +
              data.PhotoURL +
              `' style='width:100%;height: auto;'>
                <span class='scn-edit'><label><input type='file'  onchange="editArticle(this, '` +
              photos[0].objectID +
              `'  )" accept='image/png, image/jpeg, image/jpg, image/heic' class='edit-file-article'>
                <img src='/image/edit.svg' class='is-clickable'></label>
                <label><img src='/image/delete.svg' onclick='deleteArticle(this)' class='is-clickable'></label></span></p>
                <p class='img-caption' contenteditable='true' onkeypress='limitContent(event)' placeholder='Add image caption (optional) ...' ></p></div>
                <p placeholder='Start Typing ...'></p>
                `
            const span = document.createElement('div')
            span.innerHTML = html
            editor.append(span)
          } else if (action === 'edit') {
            document.getElementById(id).src = data.PhotoURL
            this.$toast?.success(`File Changed Successfully`, { duration: 2000, position: 'bottom-right' })
          }
        } else {
          // TODO: no valid photos uploaded
          this.$toast?.error(`No Valid Photos Uploaded`, { duration: 3 * 1000, position: 'bottom-right' })
        }
      } catch (error) {
        this.doTrackSegmentError(error)
        loadingComponent.close()
        // TODO: show upload error
      } finally {
        this.isLoading = false
        setTimeout(() => loadingComponent.close(), 2 * 1000)
        this.savecontent()
      }
    },
    limitContent(e) {
      if (e.srcElement.textContent.length >= 190) e.preventDefault()
      return false
    },
    async uploadVideo(file, action, id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.editorContent.$el,
      })
      try {
        this.isLoading = true
        const upload = await this.$store.dispatch('media/upload', { file })
        const processed = await upload.waitForProcess

        const { data } = await this.$apollo.query({
          query: gql`
            query ($id: String!) {
              VideoURL(id: $id)
            }
          `,
          fetchPolicy: 'cache-first',
          variables: { id: processed.objectID },
        })
        if (action === 'upload') {
          if (processed.objectType === 'Video') {
            const editor = document.querySelector('#editorContent')

            const html =
              `<div class='fileDiv video-file' contenteditable='false'><p class='video-container'>
                <video id='` +
              processed.objectID +
              `'  controls><source src='` +
              data.VideoURL +
              `' ></video>
                <span class='scn-edit'><label><input type='file'  onchange="editVideoArticle(this, '` +
              processed.objectID +
              `'  )" accept='video/*' class='edit-file-article'>
                <img src='/image/edit.svg' class='is-clickable'></label>
                <label><img src='/image/delete.svg' onclick='deleteArticle(this)' class='is-clickable'></label></span></p>
                <p class='img-caption' contenteditable='true' onkeypress='limitContent(event)' placeholder='Add video caption (optional) ...' ></p></div>
                <p placeholder='Start Typing ...'></p>
                `
            const span = document.createElement('div')
            span.innerHTML = html
            editor.append(span)
          } else {
            // TODO: no valid photos uploaded
          }
        }

        const video = document.getElementById(id)

        if (action === 'edit') {
          const sources = video.getElementsByTagName('source')
          sources[0].src = data.VideoURL
          this.$toast?.success(`File Changed Successfully`, { duration: 2000, position: 'bottom-right' })
        }

        setTimeout(() => {
          if (Hls.isSupported() && data.url) {
            const hls = new Hls()
            hls.loadSource(data.url)
            hls.attachMedia(video)
            window.hls = hls
          }
        }, 2 * 1000)

        // TODO: for action
      } catch (error) {
        this.doTrackSegmentError(error)
        loadingComponent.close()
      } finally {
        this.isLoading = false
        setTimeout(() => {
          loadingComponent.close()
        }, 2 * 1000)
        this.savecontent()
      }
    },
    savecontent() {
      const editor = document.querySelector('#editorContent')
      this.$emit('input', editor.innerHTML)
    },
    removehr(e) {
      e.remove()
    },
  },
}
</script>

<style lang="scss" scoped>
.editable-content {
  font-size: 1.1429rem;
  max-width: 900px;
  width: 100%;
  margin: auto;
  padding: 40px 0;
}

[contenteditable='true']:empty::before {
  content: attr(placeholder);
  pointer-events: none;
  color: grey;
  display: block; /* For Firefox */
}

.is-fixed {
  position: fixed !important;
}

.editor-toolbar {
  box-sizing: border-box;

  .toolbar-content {
    //position: fixed;
    background: #fff;
    border: 1px solid #eef1f1;
    bottom: 0;
    left: 0;
    padding: 3px 0;
    width: 100%;
    z-index: 2;

    .toolbar-tools {
      max-width: 900px;
      width: 100%;
      margin: auto;

      ._pipe {
        content: '';
        width: 0;
        height: 30px;
        border: 0.1px solid #050505;
        margin: 7px 34px;
      }

      @media screen and (max-width: $BPdesktop) {
        max-width: max-content !important;

        ._pipe {
          margin: 7px 6px !important;
        }
      }

      button {
        border: none;
        background: transparent;
        padding: 0;
        width: 44px;
        height: 44px;
        margin-right: 13px;
      }

      button:hover {
        background-color: #f8f8f8;
        border-radius: 50%;
      }
    }
  }
}
/* stylelint-disable no-descending-specificity */

.mobile-editor {
  display: none !important;
  background: #0c353e;
  padding: 0 30px;
  color: #fff;

  .toolbar-mobile-tools {
    color: #fff;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    button {
      border: none;
      background: transparent;
      padding: 0;
      margin: 6px 0;
      width: 32px;
      height: 32px;
    }
    ._pipe {
      content: '';
      width: 0;
      height: 30px;
      border: 0.1px solid #fff;
      margin: 7px 0;
    }
  }
}

.custom-tooltip {
  top: 922px;
  left: 19px;
  position: absolute;
  z-index: 10;

  .selected-text {
    position: absolute;
    color: white;
    top: -25%;
    background: #0c353e;
    border-radius: 10px;
    padding: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100% !important;
  }

  ul {
    position: relative;
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
    background: #0c353e;
    max-width: 600px;
    border-radius: 5px;
    margin: 0;
    padding-right: 40px;
  }

  ._pipe {
    content: '';
    width: 0;
    height: 30px;
    border: 0.1px solid #fff;
    margin: 7px 0;
  }

  button {
    border: none;
    background: transparent;
    padding: 0;
    margin: 4px;
    width: 45px;
    height: 45px;
    float: left;

    img {
      height: 25px;
    }
  }

  button:hover {
    border: 1px solid $white;
  }

  .add-url {
    background: transparent;
    border: none;
    color: #cfd4d5;
    width: 100%;
    height: 50px;
    margin-left: 10px;
    @media screen and (min-width: $tabletLG) {
      width: 320px;
    }
  }
}

.file-browser {
  display: none !important;
}

.scn-edit {
  display: block !important;
}

@media screen and (max-width: $tabletLG) {
  .mobile-editor {
    display: block !important;
  }
  .editor-toolbar {
    display: none !important;
  }
}
</style>
