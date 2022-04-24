<template lang="pug">
.comment-input
  form(@submit.prevent autocomplete="off")
    vue-tribute(:options="tributeOptions" ref="commentTribute")
      p.comment-area(
        placeholder="Write a comment"
        @tribute-active-true="isTribute = true"
        @tribute-active-false="isTribute = false"
        ref="commentField"
        @keydown="checkContent"
        @mouseup="saveSelection"
        @input="saveContent"
        @paste="pasteGuard"
        contenteditable="true")
    .emoji-container.is-flex.is-align-items-center(v-click-outside="()=>{show = false}")
      .emoji.is-flex.is-clickable(@click.prevent="show = !show")
        img(
          :src="show ? require('~/assets/icons/primary/emoji.svg') : require('~/assets/icons/secondary/emoji.svg')"
          width="20"
          height="20")

      transition(name="fade")
        //- picker(:data="emojiIndex" set="twitter" title v-show="show" @select="onEmojiSelect")
        v-emoji-picker(@select="onEmojiSelect" v-show="show", :emoji-size="24")
</template>

<script>
// import data from 'emoji-mart-vue-fast/data/twitter.json'
// import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
// import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { VEmojiPicker } from 'v-emoji-picker'
import tributeOptions from '~/mixins/tributeOptions'

// const emojiIndex = new EmojiIndex(data)

export default {
  name: 'XMFeedItemCommentInput',
  // components: { Picker, VEmojiPicker },
  components: { VEmojiPicker },
  mixins: [tributeOptions],
  props: {
    submitting: Boolean,
  },
  data() {
    return {
      loadingComponent: null,
      isTribute: false,
      comment: '',
      show: false,
      selectedText: '',
      oldSelectedText: '',
      // emojiIndex,
    }
  },
  watch: {
    submitting(value) {
      if (value && !this.loadingComponent) {
        this.loadingComponent = this.$buefy.loading.open({
          container: this.$refs.commentField,
        })
      } else if (!value) {
        this.loadingComponent?.close()
        this.loadingComponent = null
      }
    },
  },
  methods: {
    checkContent(e) {
      if (e.keyCode === 13) {
        if (e.shiftKey) {
          //  prevent submit on shift enter
        } else if (!this.isTribute) {
          const editor = this.$refs.commentField
          this.comment = editor.innerHTML
          if (this.comment) {
            e.target.blur()
            this.onSubmit()
          }
          e.preventDefault()
        }
      }
    },
    saveSelection() {
      this.selectedText = window.getSelection().getRangeAt(0) || null
    },
    saveContent() {
      const editor = this.$refs.commentField
      this.comment = editor.innerHTML
    },
    pasteGuard(e) {
      // Stop data actually being pasted into div
      e.stopPropagation()
      e.preventDefault()

      const clipboardData = e.clipboardData || window.clipboardData
      e.target.append(clipboardData.getData('Text'))
    },
    onEmojiSelect(emoji) {
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
    },
    onSubmit() {
      if (!this.comment) return
      this.$emit('submit', this.comment)
      this.comment = ''
      this.$refs.commentField.innerHTML = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-input::v-deep {
  form {
    position: relative;

    [contenteditable='true']:empty::before {
      content: attr(placeholder);
      pointer-events: none;
      color: grey;
      display: block; /* For Firefox */
    }

    .comment-area {
      width: 100%;
      min-height: 40px;
      background-color: #f8f8f8;
      border-radius: 20px;
      border: 0;
      padding: 10px 15px;
      color: #848484;
      font-weight: 300;

      a {
        color: #25a9e0;
      }

      p {
        word-wrap: break-word;
        width: 90%;
      }

      &::placeholder {
        color: #9aa2ab;
      }

      &:-ms-input-placeholder {
        color: #9aa2ab;
      }
    }

    .emoji-container {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 15px;
      height: 36px;

      .emoji {
        width: 20px;
      }

      .emoji-mart,
      .emoji-picker {
        position: absolute;
        bottom: 10px;
        right: 30px;
        z-index: 1;
        background-color: $white;

        #Categories {
          background-color: $white;

          .category {
            &:last-child {
              display: none;
            }
          }
        }

        .emoji-mart-bar-preview {
          display: none;
        }
      }
    }
  }
}
</style>
