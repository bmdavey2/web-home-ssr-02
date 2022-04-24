<template lang="pug">
.box(v-once)
  .close(@click.prevent="closeDialog()"): b-icon(icon="close")
  h1 Get the most out of ActivePlace by setting up a profile. It's fast and free
  div Discover and grow your active lifestyle.
  b-button(type="is-primary" tag="router-link" to="/signup/user?step=1" @click.native="$parent.close()") Sign Up Now
  div Already registered? #[span.action-signin(@click.prevent="showLogInDialog(); $parent.close()") Sign In]
</template>

<script>
export default {
  name: 'XPSignUpNag',
  methods: {
    closeDialog() {
      if (!this.isLoggedIn) {
        this.trackNonLoggedUser({ page: 'CloseDialog' })
      }
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.box::v-deep {
  padding: 90px 60px;
  font-size: 1.1429rem;
  font-weight: 300;
  text-align: center;
  color: #848484;

  .close {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
  }

  h1 {
    font-size: 2.8571rem;
    line-height: 1.2;
    letter-spacing: -0.8px;
    color: $secondary;
    font-weight: 500;
    margin-bottom: 30px;
  }

  a {
    width: 100%;
    max-width: 240px;
    margin: 30px 0 20px;
    text-transform: uppercase;
    font-weight: 500;
  }

  .action-signin {
    font-weight: 500;
    color: $secondary;
  }

  @media screen and (max-width: 767px) {
    padding: 60px 30px;

    h1 {
      font-size: 1.5714rem;
      margin-bottom: 10px;
    }
  }
}
</style>
