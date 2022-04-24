<template lang="pug">
.xp-sign-up-profile-categories
  XMSignUpHeader.flex-auto.mb-5 Get exactly what you came for.

  .content-body.px-2
    div Select your Community Interests to turn up the volume on the things that make you feel great.
    XOCategoryPillsSelector.my-4(v-model="value.CategoryIDs", :clickable="!submitting")
    .follow-mentors: b-checkbox(v-model="value.followMentors") Follow Mentors from my Community Interests to help me discover expert content.

  .flex-auto.flex-center.mt-5
    b-button.mr-2(type="is-primary" @click="onClickBack" outlined, :disabled="submitting") BACK
    b-button(type="is-primary" @click="onClickNext", :loading="submitting", :disabled="disabled") TAKE ME TO MY ACTIVEPLACE
</template>

<script>
import XOCategoryPillsSelector from '~/components/organisms/CategoryPillsSelector'
import XMSignUpHeader from '~/components/molecules/SignUpHeader'

export default {
  name: 'XOSignUpProfileCategories',
  components: { XOCategoryPillsSelector, XMSignUpHeader },
  props: {
    value: Object,
    submitting: Boolean,
  },
  computed: {
    disabled() {
      return this.value.CategoryIDs.length < 1
    },
  },
  methods: {
    onClickBack() {
      this.$emit('back')
    },
    onClickNext() {
      this.$emit('next')
      if (['signup-business', 'signup-mentor'].includes(this.$route.name)) {
        this.$router.push({
          query: { step: 4 },
        })
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.xp-sign-up-profile-categories::v-deep
  display: flex
  flex-direction: column
  height: 100%

  .content-body
    flex: 1 0 0
    overflow-y: auto

  .follow-mentors
    background-color: rgba(#fff, 0.8)
    font-weight: 300
</style>
