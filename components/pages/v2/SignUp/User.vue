<template lang="pug">
.xp-signup-user
  template(v-if="activeRoute === 1")
    .member-login.row.items-center.justify-end Already a Member? #[b-button(type="is-primary" @click.prevent="doShowLoginPopup") Login]
    XOSignUpUserStep1
  XOSignUpUserStep2(v-if="activeRoute === 2")
  XOSignUpUserStep3(v-if="activeRoute === 3")
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import dialogs from '~/mixins/dialogs'
import XOSignUpUserStep1 from '~/components/organisms/v2/SignUp/User/Step1'
import XOSignUpUserStep2 from '~/components/organisms/v2/SignUp/User/Step2'
import XOSignUpUserStep3 from '~/components/organisms/v2/SignUp/User/Step3'

export default {
  name: 'XPSignupUser',
  components: { XOSignUpUserStep1, XOSignUpUserStep2, XOSignUpUserStep3 },
  mixins: [dialogs],
  computed: {
    ...mapFields('v2/signup', ['form.email', 'form.password']),
    ...mapGetters({
      getSignUpFormDetails: 'v2/signup/getSignUpFormDetails',
    }),
    activeRoute() {
      return parseInt(this.$route.query?.step) || 0
    },
  },
  mounted() {
    const activeRoute = parseInt(this.$route.query?.step)

    if (!this.getSignUpFormDetails?.email || (!this.email && !this.password)) {
      this.$router.push({
        query: { step: 1 },
      })
      return
    }

    if (activeRoute === undefined || activeRoute === 0 || isNaN(activeRoute)) {
      this.$router.push({
        query: { step: 1 },
      })
    }

    if (activeRoute >= 3) {
      this.$router.push({
        query: { step: 3 },
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.xp-signup-user::v-deep {
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 1;

    @include max-width(1023px) {
      width: 100%;
    }
  }

  &::before {
    left: 0;
    background-color: $white;
  }

  &::after {
    right: 0;
    background-color: #fafbff;

    @include max-width(767px) {
      content: none;
    }
  }

  .member-login {
    position: relative;
    z-index: 2;
    font-size: 1.2857rem;
    padding: 15px 20px;

    @include max-width(767px) {
      display: none;
    }

    button {
      margin-left: 10px;
      border-radius: 50px;
    }
  }

  .signup-process {
    position: relative;
    z-index: 2;

    .contents {
      min-height: 100vh;

      @include max-width(767px) {
        padding: 20px 0;
      }

      .left-content,
      .right-content {
        width: 50%;

        @include max-width(1023px) {
          width: 100%;
        }
      }

      .left-content {
        padding-right: 10%;

        @include max-width(1023px) {
          padding: 0;
          display: none;
        }
      }

      .right-content {
        padding-left: 10%;

        @include max-width(1023px) {
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
        }

        .header {
          width: 100%;
          max-width: 400px;
          margin-bottom: 50px;

          @include max-width(427px) {
            max-width: 250px;
          }

          .logo {
            border-right: 2px solid $secondary;
            padding-right: 20px;
            margin-right: 20px;

            @include max-width(767px) {
              width: 80px;
            }
          }

          ._label {
            font-size: 2.2857rem;
            line-height: 1.2;
            color: $secondary;
            flex: 10000 1 0%;

            @include max-width(767px) {
              font-size: 1.4286rem;
            }
          }
        }
      }

      .btn-action {
        color: $white;
        height: 72px;
        width: 100%;
        border-radius: 10px;
        font-size: 1.4286rem;
        font-weight: 300;
        margin-bottom: 15px;
        cursor: pointer;
        outline: none;
        box-shadow: none;
        user-select: none;

        @include max-width(767px) {
          height: 48px;
          font-size: 1.0714rem;
        }

        ._icon {
          margin-right: 25px;
        }
      }
    }
  }
}
</style>
