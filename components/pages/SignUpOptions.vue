<template lang="pug">
.xp-sign-up-options.fill.flex-center
  .contents
    XMSignUpHeader Let's get this show on the road.
    h4 I'd like to set up a:
    .actions.px-5
      b-button.mb-5(type="is-primary" expanded @click="clickUserProfile") User Profile
      b-button.button-inverted.mb-5(type="is-primary" inverted expanded @click="clickBusinessProfile") Business Profile
      b-button.button-inverted.mb-5(type="is-primary" inverted expanded @click="clickMentorProfile") Mentor Profile
</template>

<script>
import XMSignUpHeader from '~/components/molecules/SignUpHeader'
export default {
  name: 'XPSignUpOptions',
  components: { XMSignUpHeader },
  mounted() {
    this.$store.dispatch('signup/setSignupAsBusiness', false)
    this.$store.dispatch('signup/setSignupAsMentor', false)
  },
  methods: {
    clickUserProfile() {
      this.$router.push({
        path: '/signup/user',
        query: { step: 1 },
      })
    },
    clickBusinessProfile() {
      this.$store.dispatch('signup/setSignupAsBusiness', true)
      this.$router.push({
        path: '/signup/business',
        query: { step: 1 },
      })
    },
    clickMentorProfile() {
      this.$store.dispatch('signup/setSignupAsMentor', true)
      this.$router.push({
        path: '/signup/mentor',
        query: { step: 1 },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-sign-up-options::v-deep {
  background-image: url('~/assets/images/bg-signup-landing.png');
  background-position: bottom center;
  background-size: cover;

  .contents {
    width: 100%;
    max-width: 385px;
    margin: 0 auto;

    h4 {
      font-size: 1.2857rem;
      margin: 42px 0;
      text-align: center;
    }

    button {
      text-transform: uppercase;

      &.button-inverted {
        border: 1px solid $primary;
        background-color: transparent;

        &:hover {
          background-color: $primary;
          color: $white;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    background-image: url('~assets/images/SignUp/background-inner.jpg');

    .contents {
      padding: 0 15px;
    }
  }
}
</style>
