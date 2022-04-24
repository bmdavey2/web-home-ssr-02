<template lang="pug">
.xo-nft-medals-feedback
  .card
    .card-content
      .close(@click.prevent="doCloseFeedback()"): b-icon(icon="close")
      h4 Thanks for voting!
      p {{ vote === 'up' ? 'What next event would you like your first digital medal for?' : 'Mind sharing with us what you don’t like about the idea?' }}

      form(@submit.prevent autocomplete="off")
        .row
          .col: FormInput(
            v-model="feedback",
            :placeholder="vote === 'up' ? 'IRONMAN, London Marathon, Cycling event' : 'Your thoughts'")
          .feedback-actions: b-button(type="is-primary", :loading="isSubmitting" @click.prevent="doSendFeedback()") SEND
</template>

<script>
import FormInput from '~/components/atoms/Form/Input'

export default {
  name: 'XONFTMedalsFeedback',
  components: { FormInput },
  props: { vote: String },
  data() {
    return {
      feedback: '',
      isSubmitting: false,
    }
  },
  methods: {
    doSendFeedback() {
      this.isSubmitting = true

      if (this.vote === 'up') {
        this.$root.$emit('vote/up', this.feedback)
      } else {
        this.$root.$emit('vote/down', this.feedback)
      }

      this.isSubmitting = false
      this.doCloseFeedback()
    },
    doCloseFeedback() {
      this.$emit('DoShowFeedback', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-nft-medals-feedback::v-deep {
  width: 100%;
  max-width: 510px;
  position: absolute;
  z-index: 1;

  .card {
    height: auto !important;

    .card-content {
      padding: 30px;

      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }

      h4 {
        color: $secondary;
        font-size: 1.5714rem;
        margin-bottom: 10px;
      }

      p {
        font-size: 1.1429rem !important;
      }

      form {
        margin-top: 30px;

        .form-input {
          .field {
            margin-bottom: 0;
          }
        }

        .feedback-actions {
          margin-left: 10px;

          button {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
