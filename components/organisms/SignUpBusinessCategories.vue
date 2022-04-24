<template lang="pug">
.xp-sign-up-business-categories
  XMSignUpHeader.flex-auto.mb-5 Get exactly what you came for.

  .content-body.px-2
    .my-2 Put your Business into the Community Interests that make sense to what you do.
    .my-2(style="font-weight: 200") * Note; select the Interests that strictly align to the nature of your business, you can add more later if needed.
    XOCategoryPillsSelector.my-4(v-model="value.CategoryIDs", :clickable="!submitting")

  .flex-auto.flex-center.mt-5
    b-button.mr-2(type="is-primary" @click="onClickBack" outlined, :disabled="submitting") BACK
    b-button(type="is-primary" @click="onClickNext", :loading="submitting", :disabled="isDisabled") FINISH
</template>

<script>
import XOCategoryPillsSelector from '~/components/organisms/CategoryPillsSelector'
import XMSignUpHeader from '~/components/molecules/SignUpHeader'

export default {
  name: 'XOSignUpBusinessCategories',
  components: { XOCategoryPillsSelector, XMSignUpHeader },
  props: {
    value: Object,
    submitting: Boolean,
  },
  computed: {
    isDisabled() {
      return this.value?.CategoryIDs < 1
    },
  },
  methods: {
    onClickBack() {
      this.$emit('back')
    },
    onClickNext() {
      this.$emit('next')
    },
  },
}
</script>

<style lang="sass" scoped>
.xp-sign-up-business-categories::v-deep
  display: flex
  flex-direction: column
  height: 100%

  .content-body
    flex: 1 0 0
    overflow-y: auto
</style>
