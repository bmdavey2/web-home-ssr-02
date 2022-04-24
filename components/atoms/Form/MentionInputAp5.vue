<template lang="pug">
.form-input
  p.label(v-if="label") {{ label }}
  vue-tribute(:options="tributeOptions")
    .input-editor.content-editable.has-text-black(
      @paste="handlePaste"
      contenteditable="true"
      @input="edit",
      :placeholder="placeholder"
      contentEditable="true")
      div(:id="inputID", :placeholder="placeholder" v-html="value")
</template>
<script>
import XOMentionTributeHandler from '~/components/organisms/MentionTributeHandler'
import tributeOptions from '~/mixins/tributeOptions'
export default {
  name: 'FormMentionInputAp5',
  components: { XOMentionTributeHandler },
  mixins: [tributeOptions],
  props: {
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    maxlength: { type: String, default: '' },
    inputID: { type: String, default: '' },
  },
  data() {
    return {
      Content: '',
      items: [],
    }
  },
  methods: {
    edit(e) {
      // TODO: AUTO LINK
      const html = document.getElementById(this.inputID.toString())?.innerHTML || false
      if (html) {
        this.Content = html
        this.$emit('input', html)
      } else {
        this.Content = e.target.innerHTML
        this.$emit('input', e.target.innerHTML)
      }
    },
    handlePaste(e) {
      // Stop data actually being pasted into div
      e.stopPropagation()
      e.preventDefault()

      // const clipboardData = e.clipboardData || window.clipboardData
      // const pastedData = clipboardData.getData('Text')
      //
      // e.target.append(pastedData)
    },
  },
}
</script>
<style lang="scss" scoped>
.form-input::v-deep {
  margin-bottom: 3px;
  .label {
    font-weight: 400;
    color: #65676b;
  }

  .input-editor {
    min-height: 40px;
    width: 100%;
    background: #fff;
    mix-blend-mode: normal;
    opacity: 0.8;
    border: 1px solid #c2c8c9;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 10px;
    color: #65676b;
  }
  .control {
    .input {
      font-weight: 300;

      &.is-transparent {
        background-color: rgba($white, 0.8);
      }
    }
  }
}

.input-editor div:empty::before {
  content: attr(placeholder);
  pointer-events: none;
  color: #333;
  font-weight: lighter;
  display: block; /* For Firefox */
}

.no-results {
  padding: 4px 10px;
  border-radius: 4px;
  background: white;
}
</style>
