<template lang="pug">
.xd-medals-claim.card
  .card-content
    .close(@click.prevent="doClosePopup()"): b-icon(icon="close")
    ._content
      h2 Congratulations!
      h3 Login or sign up to download your race medal and secure it in your ActivePlace profile

      .actions
        b-button(
          type="is-primary"
          tag="router-link"
          to="/signup/user?step=1",
          :loading="isSubmitting"
          @click.native="doPassDataOnSignup()") Sign Up Now
        p Already registered? #[span(@click.prevent="doSetIsClaiming()") Login]
</template>

<script>
import { mapActions } from 'vuex'
import dialogs from '~/mixins/dialogs'

export default {
  name: 'XDMedalsClaim',
  mixins: [dialogs],
  data() {
    return {
      isSubmitting: false,
    }
  },
  computed: {
    medal() {
      return this.$parent?.$parent?.userMedalDetails || this.$parent?.$parent?.details || null
    },
    id() {
      return this.medal?.id || null
    },
    firstName() {
      return this.medal?.firstName || ''
    },
    lastName() {
      return this.medal?.lastName || ''
    },
  },
  methods: {
    ...mapActions({
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
      setMedalIsClaiming: 'medals/setMedalIsClaiming',
    }),
    doClosePopup() {
      this.$parent.close()
    },
    async doPassDataOnSignup() {
      this.$root.$emit('set/click/popup', true)
      this.isSubmitting = true
      const { id, firstName, lastName } = this
      const details = { id, firstName, lastName }
      await this.setMedalClaimDetails(details)
      this.$parent.close()
    },
    async doSetIsClaiming() {
      await this.setMedalIsClaiming(true)
      await this.doPassDataOnSignup()
      await this.doClosePopup()
      this.doShowLoginPopup()
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-medals-claim::v-deep {
  .card-content {
    padding: 100px 50px;
    color: $secondary;
    text-align: center;

    .close {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
    }

    h2 {
      font-size: 2.2857rem;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 1.5714rem;
      font-weight: 300;
    }

    .actions {
      margin-top: 50px;

      .button {
        width: 240px;
        height: 42px;
        text-transform: uppercase;
        margin-bottom: 15px;
      }

      p {
        font-weight: 300;

        span {
          font-weight: 400;
          color: $secondary;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
