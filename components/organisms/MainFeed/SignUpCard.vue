<template lang="pug">
.box.is-user-select-none
  div(style="text-align: center; font-weight: bold; font-size: 22px") Join the world’s active community today
  .my-3(style="text-align: center; font-size: 14px") Discover and grow your active lifestyle
  b-button(
    type="is-primary"
    style="font-size: 14px; font-weight: bold; border-radius: 6px"
    expanded
    @click="clickSignUp") SIGN UP NOW
  .flex-center.mt-3
    span(style="font-size: 14px") Already registered?
    span.is-cursor-pointer.ml-1(style="font-size: 14px; font-weight: bold" @click="clickSignIn") Sign In
</template>

<script>
import XDLogIn from '~/components/pages/LogIn'
export default {
  name: 'XOMainFeedSignUpCard',
  methods: {
    clickSignUp() {
      this.$router.push('/signup')
    },
    clickSignIn() {
      this.$buefy.modal.open({
        parent: this,
        component: XDLogIn,
      })
    },
  },
}
</script>
