<template lang="pug">
.comment-input
  .has-text-secondary.mb-5 Write a comment
  .is-flex.is-flex-wrap-wrap
    XOMyProfileAvatar.mr-5(size="48px")
    .input-container.is-align-self-center
      form(action="#" autocomplete="off")
        vue-tribute(:options="tributeOptions" ref="commentTribute")
          p.comment-area(
            placeholder="Write a comment"
            ref="commentField"
            @tribute-active-true="isTribute = true"
            @tribute-active-false="isTribute = false"
            @keydown="checkContent"
            @mouseup="saveSelection"
            @input="savecontent"
            @paste="handlePaste"
            contenteditable="true")
          .emoji-container.is-flex.is-align-items-center(v-click-outside="()=>{show = false}")
            .emoji.is-flex.is-clickable(@click.prevent="show = !show")
              img(
                :src="show ? require('~/assets/icons/primary/emoji.svg') : require('~/assets/icons/secondary/emoji.svg')"
                width="24"
                height="24")

            transition(name="fade")
              //- picker(:data="index" set="twitter" title v-show="show" @select="onSelect")
              v-emoji-picker(@select="onSelect" v-show="show", :emoji-size="24")
</template>

<script>
import { mapGetters } from 'vuex'
// import data from 'emoji-mart-vue-fast/data/twitter.json'
// import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
// import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { VEmojiPicker } from 'v-emoji-picker'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import tributeOptions from '~/mixins/tributeOptions'

// const emojiIndex = new EmojiIndex(data)

export default {
  name: 'XMArticleViewCommentInput',
  // components: { XOMyProfileAvatar, Picker },
  components: { XOMyProfileAvatar, VEmojiPicker },
  mixins: [tributeOptions],
  props: {
    submitting: Boolean,
  },
  data() {
    return {
      comment: '',
      isTribute: false,
      selectedText: '',
      oldselectedText: '',
      // index: emojiIndex,
      show: false,
      isAddingComment: false,
      loadingComponent: null,
    }
  },
  computed: {
    ...mapGetters({
      getActiveBusiness: 'user/getActiveBusiness',
    }),
    article() {
      return this.$parent.article
    },
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
        } else {
        }
      }
    },
    savecontent() {
      const editor = this.$refs.commentField
      this.comment = editor.innerHTML
    },
    saveSelection() {
      this.selectedText = window.getSelection().getRangeAt(0) || null
    },
    handlePaste(e) {
      // Stop data actually being pasted into div
      e.stopPropagation()
      e.preventDefault()
      const clipboardData = e.clipboardData || window.clipboardData
      const pastedData = clipboardData.getData('Text')
      e.target.append(pastedData)
    },
    onSelect(emoji) {
      if (!emoji.data.length) return
      const range = this.selectedText

      const newElement = document.createElement('span')
      newElement.innerHTML = emoji.data

      if (range && range !== this.oldselectedText) {
        if (range.startOffset === 0 && range.endOffset === 1) {
          this.$refs.commentField.append(newElement)
        } else {
          range.deleteContents()
          range.insertNode(newElement)
          this.show = false
        }
      } else this.$refs.commentField.append(newElement)
      this.oldselectedText = range
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
  margin-top: 50px;
  margin-bottom: 20px;

  @media (max-width: $tabletLG) {
    padding: 0 1.5rem !important;
  }

  .input-container {
    width: calc(100% - 70px);
  }

  form {
    position: relative;

    [contenteditable='true']:empty::before {
      content: attr(placeholder) !important;
      pointer-events: none;
      color: grey;
      display: block; /* For Firefox */
    }

    .comment-area {
      min-height: 40px;
      background-color: #f8f8f8;
      border-radius: 20px;
      border: 0;
      width: 100%;
      padding: 10px 50px 10px 15px;
      color: #848484;
      font-weight: 300;

      a {
        color: #25a9e0;
      }

      p {
        word-wrap: break-word;
        width: 90%;
      }

      &::-ms-input-placeholder {
        color: #9aa2ab;
      }

      &::placeholder {
        color: #9aa2ab;
      }
    }

    .emoji-container {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 15px;
      height: 40px;

      .emoji {
        cursor: pointer;
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

  @media screen and (max-width: 1023px) {
    padding: 0 15px !important;
  }
}
</style>
