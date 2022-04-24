<template lang="pug">
.form-textarea(:class="isAutoGrow && 'is-auto-grow'")
  .label(v-if="label && isAutoGrow") {{ label }}
  client-only(v-if="isAutoGrow"): textarea-autosize(
    ref="textareaAutoSize",
    :value="value",
    :placeholder="placeholder",
    :min-height="minHeight",
    :disabled="disabled"
    @input="$emit('input', $event)"
    @keyup.enter.native="$emit('enter', $event)"
    v-if="isAutoGrow")
  b-field(:label="label" v-else)
    b-input(
      type="textarea"
      expanded,
      :value="value",
      :placeholder="placeholder",
      :disabled="disabled",
      :maxlength="maxlength"
      @input="$emit('input', $event)"
      @keyup.enter="$emit('enter', $event)",
      :custom-class="isTransparent ? 'is-transparent' : ''")
  .input-error(:class="errorClass" v-if="error") {{ error }}
</template>

<script>
export default {
  name: 'FormTextarea',
  props: {
    label: String,
    placeholder: String,
    maxlength: String,
    isAutoGrow: Boolean,
    isTransparent: Boolean,
    value: String,
    disabled: Boolean,
    error: String,
    minHeight: { type: Number, default: 80 },
    errorClass: { type: String, default: 'has-text-danger' },
  },
}
</script>

<style lang="scss" scoped>
.form-textarea::v-deep {
  .label {
    font-weight: 400;
    color: #65676b;
    margin-bottom: 3px;
  }

  .control {
    .textarea {
      min-height: 80px;
    }
  }
}
</style>
