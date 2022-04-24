<template lang="pug">
.nft-section-6
  .container
    h3 More than just a digital medal
    p.has-text-secondary.has-text-weight-light.mt-2(style="font-size: 22px !important") What we’re offering is just so much more..
    .columns.is-multiline.is-mobile.mt-5
      .column.is-4-desktop.is-12-tablet.is-12-mobile(v-for="item in dataCards")
        .card
          .card-content
            img._icon(src="~assets/images/NFTMedals/heart-primary.png" v-if="item.icon === 'heart-primary'")
            img._icon(src="~assets/images/NFTMedals/shield-primary.png" v-if="item.icon === 'shield-primary'")
            img._icon(src="~assets/images/NFTMedals/trophy-primary.png" v-if="item.icon === 'trophy-primary'")
            p._title.has-text-weight-medium.has-text-secondary.mb-3 {{ item.title }}
            ._data(v-for="text in item.texts")
              p.has-text-weight-light.mb-3 {{ text }}

    ._vote-container.is-flex.is-align-items-center.container(v-if="isVote")
      .vote-title.has-text-secondary.has-text-weight-medium Interested to find out more & how you can claim your medal?
      .actions.ml-auto.is-flex.is-flex-wrap-nowrap
        b-button.btn-interested.mr-4(
          type="is-primary",
          :disabled="showFeedback"
          @click.prevent="showFeedback = true; vote = 'up'; doUpvote()")
          .row.items-center.justify-center
            .row.items-center.justify-center.mr-2: img(src="~assets/images/NFTMedals/thumbs-up.png")
            ._label YES!
        b-button.btn-not-interested(
          type="is-primary",
          :disabled="showFeedback"
          @click.prevent="showFeedback = true; vote = 'down'; doDownVote()")
          .row.items-center.justify-center
            .row.items-center.justify-center.mr-2: img(src="~assets/images/NFTMedals/thumbs-down.png")
            ._label NO

        XONFTMedalsFeedback(v-if="showFeedback", :class="vote", :vote="vote" @DoShowFeedback="showFeedback = $event")
</template>

<script>
import XONFTMedalsFeedback from '~/components/organisms/NFTMedals/Feedback'

export default {
  name: 'XONFTMedalsSection6',
  components: { XONFTMedalsFeedback },
  props: { voteStatus: String, isVote: { type: Boolean, default: true } },
  data() {
    return {
      dataCards: [
        {
          icon: 'trophy-primary',
          title: 'Access everywhere and forever',
          texts: [
            'Traditional medals are dead. They take up space, they can be lost, they can be damaged.',
            'Take your medals everywhere you go, having them instantly available via your smartphone.',
          ],
        },
        {
          icon: 'shield-primary',
          title: 'Official, trusted & certified',
          texts: [
            'Once you earn your medal, it’s permanently stored online for anyone and everyone to see, forever.',
            'It can never be overwritten, changed or modified and if you choose to, everyone will know it’s yours.',
          ],
        },
        {
          icon: 'heart-primary',
          title: 'Simply better for the environment',
          texts: [
            'Physical medals are made out of silver, bronze, and sometimes even gold.',
            'Obtaining those resources from our planet comes with a cost to the environment; help us save the planet one medal at a time.',
          ],
        },
      ],
      vote: '',
      showFeedback: false,
      feedback: '',
    }
  },
  watch: {
    vote(value) {
      if (value === 'up') {
        this.$emit('DoUpdateVoteStatus', 'upvoted')
        return
      }
      this.$emit('DoUpdateVoteStatus', 'downvoted')
    },
  },
  methods: {
    doUpvote() {
      this.$root.$emit('vote/up', this.feedback)
    },
    doDownVote() {
      this.$root.$emit('vote/down', this.feedback)
    },
  },
}
</script>

<style lang="scss" scoped>
.nft-section-6::v-deep {
  padding: 80px 0;

  @include max-width(767px) {
    padding: 50px 0;
  }

  h1 {
    font-size: 32px !important;
  }
  p {
    font-size: 16px !important;
    color: #0c353e !important;
  }
  .card {
    border-radius: 13px;
    height: 380px;

    @include max-width(1023px) {
      height: auto !important;
    }
    .card-content {
      ._title {
        font-size: 22px !important;
      }
    }
  }

  ._icon {
    margin-bottom: 20px;
  }

  ._vote-container {
    height: 132px;
    border-radius: 13px;
    border: #e5e5e5 1px solid;
    position: relative;

    .vote-title {
      font-size: 22px;

      @include max-width(926px) {
        width: 450px;
      }
      @include max-width(692px) {
        width: 350px;
      }
    }

    .actions {
      @include max-width(767px) {
        margin-bottom: 30px;
      }

      .button {
        &.faded {
          opacity: 0.5;
        }
      }

      .btn-not-interested {
        min-width: 80px;
      }
    }

    @include max-width(589px) {
      height: auto !important;
      display: flex !important;
      flex-direction: column !important;
      justify-items: center;
      .vote-title {
        padding: 20px 0 !important;
        width: 100% !important;
      }
      .actions {
        padding-bottom: 20px;
        margin: unset !important;
      }
    }
  }

  .xo-nft-medals-feedback {
    top: 90px;

    &.up {
      right: 100px;

      @include max-width(767px) {
        right: 0;
      }
    }

    &.down {
      right: 0;
    }
  }
}
</style>
