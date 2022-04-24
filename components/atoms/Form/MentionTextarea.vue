<template lang="pug">
.form-textarea-emoji
  b-field(:label="label")
    vue-tribute(:options="tributeOptions" ref="commentTribute")
      p.text-area(
        :placeholder="placeholder"
        @tribute-active-true="isTribute = true"
        @tribute-active-false="isTribute = false"
        ref="commentField"
        @keydown="checkContent"
        @mouseup="saveSelection"
        @input="savecontent"
        @paste="pasteGuard"
        contenteditable="true")
  .footer-container.is-flex.is-flex-wrap-nowrap.is-justify-content-flex-end
    .counter-container.is-flex.is-flex-wrap-wrap(v-if="isPost")
      p.is-flex.has-text-weight-light.has-text-grey *max {{ maxLength }} characters
    .emoji-container.is-flex.is-flex-wrap-wrap.is-justify-content-flex-end(v-click-outside="() => { show = false }")
      .emoji.is-flex(@click.prevent="show = !show"): img(
        :src="show ? require('~/assets/icons/primary/emoji.svg') : require('~/assets/icons/secondary/emoji.svg')"
        width="24"
        height="24")
      transition(name="fade")
        //- picker(:data="emojiIndex" set="twitter" title v-if="show" @select="addEmoji")
        v-emoji-picker(@select="addEmoji" v-show="show", :emoji-size="24")
</template>

<script>
// import data from 'emoji-mart-vue-fast/data/twitter.json'
// import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
// import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { VEmojiPicker } from 'v-emoji-picker'
import tributeOptions from '~/mixins/tributeOptions'

// const emojiIndex = new EmojiIndex(data)

export default {
  name: 'FormMentionTextarea',
  // components: { Picker },
  components: { VEmojiPicker },
  mixins: [tributeOptions],
  props: {
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    isTransparent: { type: Boolean, default: false },
    maxLength: { type: String, default: '' },
    isPost: { type: Boolean, default: false },
  },
  data() {
    return {
      // emojiIndex,
      show: false,
      isTribute: false,
      selectedText: '',
      oldSelectedText: '',
      comment: '',
    }
  },
  mounted() {
    this.$refs.commentField.innerHTML = this.value
  },
  methods: {
    checkContent(e) {
      if (e.keyCode === 13) {
        if (e.shiftKey) {
          //  prevent submit on shift enter
        } else if (!this.isTribute) {
          // e.preventDefault()
        }
      }
    },
    savecontent() {
      const editor = this.$refs.commentField
      this.comment = editor.innerHTML

      if (this.isPost) {
        this.$emit('input', editor)
      } else {
        this.$emit('input', editor.innerHTML)
      }
    },
    saveSelection() {
      this.selectedText = window.getSelection().getRangeAt(0) || null
    },
    pasteGuard(e) {
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

      this.savecontent()
      // this.$emit('input', this.$refs.commentField.innerHTML)
    },
    addEmoji(emoji) {
      if (!emoji.data.length) return
      const range = this.selectedText

      const newElement = document.createElement('span')
      newElement.innerHTML = emoji.data

      if (range && range !== this.oldSelectedText) {
        if (range.startOffset === 0 && range.endOffset === 1) {
          this.$refs.commentField.append(newElement)
        } else {
          range.deleteContents()
          range.insertNode(newElement)
          this.show = false
        }
      } else this.$refs.commentField.append(newElement)
      this.oldSelectedText = range
      this.savecontent()
    },
  },
}
</script>

<style lang="scss" scoped>
.form-textarea-emoji::v-deep {
  .field {
    margin-bottom: 5px;

    .v-tribute {
      width: 100%;
    }

    [contenteditable='true']:empty::before {
      content: attr(placeholder) !important;
      pointer-events: none;
      color: grey;
      display: block; /* For Firefox */
    }

    .text-area {
      font-weight: 300;
      border: 0;
      min-height: 100px;
      border-bottom: 1px solid #cfd4d5;
      resize: none;
      border-radius: 0;
      box-shadow: none !important;

      &::placeholder {
        color: #9aa2ab;
      }

      &::-ms-input-placeholder {
        color: #9aa2ab;
      }

      p {
        word-wrap: break-word;
        width: 90%;
      }
    }
  }

  .footer-container {
    width: 100%;

    .counter-container {
      margin-right: auto;

      p {
        font-size: 12px;
      }
    }
  }

  .emoji-container {
    position: relative;

    .emoji {
      cursor: pointer;
      width: 100%;
      max-width: 24px;
    }

    .emoji-mart,
    .emoji-picker {
      position: absolute;
      top: 0;
      right: 30px;
      z-index: 7;
      background-color: $white;

      #Categories {
        background-color: $white;

        .category {
          &:last-child {
            display: none;
          }
        }
      }

      @media screen and (max-width: 427px) {
        width: 210px !important;

        .emoji-mart-bar {
          overflow-x: auto;
          white-space: nowrap;

          .emoji-mart-anchor {
            flex: 0 0 auto;
          }
        }
      }

      .emoji-mart-bar-preview {
        display: none;
      }
    }
  }
}
</style>
