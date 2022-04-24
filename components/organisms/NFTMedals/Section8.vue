<template lang="pug">
.xo-nft-medals-section-last.row.items-center
  .container
    .row
      .left-content
        h1 Claim your personalised medal now

        .actions
          b-button.mr-4.mb-4(
            type="is-white",
            :disabled="showFeedback"
            @click.prevent="showFeedback = true; vote = 'up'; doUpvote()")
            .row.btn-vote.items-center.justify-center
              .row.items-center.justify-center._icon.mr-3: img(src="~assets/images/NFTMedals/thumbs-up.png")
              ._label I'M INTERESTED!
          b-button(
            type="is-white",
            :disabled="showFeedback"
            @click.prevent="showFeedback = true; vote = 'down'; doDownVote()")
            .row.btn-vote.items-center.justify-center
              .row.items-center.justify-center._icon.mr-3: img(src="~assets/images/NFTMedals/thumbs-down.png")
              ._label NO THANKS

          XONFTMedalsFeedback(v-if="showFeedback", :class="vote", :vote="vote" @DoShowFeedback="showFeedback = $event")

      //.right-content: img(src="~assets/images/NFTMedals/img-right-content.webp")
      .right-content
        .video-wrapper.row.items-center.justify-center
          .click-event(@click.prevent="doShowModalMedal()")
          video#video3.video-js.vjs-default-skin(
            ref="video2"
            autoplay
            muted
            loop
            playsinline
            type="application/x-mpegURL")
            source(:src="value")

  .right-content
    .wrapper
      .outer
        .click-event(@click.prevent="doShowModalMedal()")
        video.video-js.vjs-default-skin(ref="video" autoplay muted playsinline loop type="application/x-mpegURL")
          source(:src="value")
</template>

<script>
import videojs from 'video.js'
import XONFTMedalsFeedback from '~/components/organisms/NFTMedals/Feedback'

export default {
  name: 'XONFTMedalsSection8',
  components: { XONFTMedalsFeedback },
  props: {
    voteStatus: String,
  },
  data() {
    return {
      vote: '',
      showFeedback: false,
      isSubmitting: false,
      feedback: '',
      value: 'https://api.activeplace.com/videos/nftmedal.m3u8/Final%20with%20BG.m3u8',
      player: '',
      player1: '',
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
  beforeMount() {
    document.addEventListener('visibilitychange', () => {
      this.doPlayVideo()
    })
  },
  mounted() {
    this.player = videojs(this.$refs.video, {
      html5: {
        vhs: {
          overrideNative: false,
        },
        nativeVideoTracks: true,
        nativeAudioTracks: true,
        nativeTextTracks: true,
      },
    })

    this.player1 = videojs(this.$refs?.video2, {
      html5: {
        vhs: {
          overrideNative: false,
        },
        nativeVideoTracks: true,
        nativeAudioTracks: true,
        nativeTextTracks: true,
      },
    })
  },
  methods: {
    doUpvote() {
      this.$root.$emit('vote/up', this.feedback)
    },
    doDownVote() {
      this.$root.$emit('vote/down', this.feedback)
    },
    doPlayVideo() {
      const video = document.getElementById('video3_html5_api')
      if (document.visibilityState === 'visible') {
        video.currentTime = this.videoElementCurrentTime
        video.play()
      } else {
        video.pause()
        this.videoElementCurrentTime = video.currentTime
      }
    },
    doShowModalMedal() {
      this.$root.$emit('show/modal/medal', true)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-nft-medals-section-last::v-deep {
  background-color: #0c353e;
  color: $white;
  padding: 80px 0;
  position: relative;
  min-height: 600px;
  background-image: url('~/assets/images/NFTMedals/bg-introduction-2.webp');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;

  @include max-width(1024px) {
    min-height: 500px;
    background-size: cover;
  }

  @include max-width(767px) {
    min-height: auto;
    background-image: none;
    padding-top: 0;
    padding-bottom: 50px;
  }

  .container {
    .row {
      .left-content {
        width: 100%;
        max-width: 760px;
        position: relative;
        z-index: 3;

        @include max-width(1352px) {
          max-width: 700px;
        }

        @include max-width(1216px) {
          max-width: 600px !important;
        }

        @include max-width(936px) {
          max-width: 500px !important;
          order: 2;
          padding-top: 15px;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
        }

        @include max-width(767px) {
          max-width: 100% !important;
        }

        h1 {
          letter-spacing: -2.1px;
          line-height: 5.7143rem;
          margin-bottom: 50px;

          @include max-width(1216px) {
            margin-bottom: 30px;
            letter-spacing: -0.8px;
            line-height: 1.2;
            width: 450px;
          }

          @include max-width(767px) {
            width: 100%;
          }

          @include max-width(842px) {
            width: 80%;
          }

          @include max-width(527px) {
            width: 100%;
          }
        }

        p {
          font-size: 1.5714rem;
          font-weight: 300;

          @include max-width(1024px) {
            font-size: 1.1429rem;
          }

          @include max-width(767px) {
            order: 3;
            margin-bottom: 0;
          }
        }

        .actions {
          position: relative;

          @include max-width(767px) {
            margin-bottom: 30px;
          }

          > .button {
            height: 115px;
            border-radius: 12px;
            padding: 0 70px;

            &.faded {
              opacity: 0.5;
            }

            @include max-width(1024px) {
              height: 82px;
              padding: 0 50px;
            }

            @include max-width(842px) {
              padding: 0 10px !important;
            }

            @include max-width(527px) {
              width: 100%;
            }

            .btn-vote {
              ._label {
                font-size: 1.1429rem;
              }
            }
          }

          .xo-nft-medals-feedback {
            top: 125px;

            @include max-width(1024px) {
              top: 90px;
            }

            &.up {
              left: 0;
            }

            &.down {
              left: 310px;

              @include max-width(1200px) {
                left: 0;
              }
            }
          }
        }
      }

      .right-content {
        display: none;
        order: 1;
        width: calc(100% + 30px);
        background-image: url('~/assets/images/NFTMedals/bg-right-content.webp');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 -15px;
        position: relative;

        @include max-width(767px) {
          display: block;
        }

        // &::after {
        //   content: '';
        //   background-image: linear-gradient(transparent, #0c353e);
        //   width: 100%;
        //   height: 50px;
        //   position: absolute;
        //   bottom: 0;
        //   left: 0;
        //   z-index: 2;
        // }

        .video-wrapper {
          background-image: url('~/assets/images/NFTMedals/medals.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          height: 550px;
          position: relative;

          .click-event {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            z-index: 2;
          }

          .video-js {
            background-color: unset !important;
            width: 230px;
            height: auto;
            z-index: 1;
            position: absolute;
            top: 70px;
            margin-left: 10px;

            video {
              width: unset;
              height: 400px !important;
              border-radius: 12px !important;
              position: relative;
              //transform: rotate(8.49deg);
            }
          }
        }
      }
    }
  }

  > .right-content {
    position: absolute;
    width: 45%;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 2;

    @include max-width(1023px) {
      background-size: cover;
    }

    @include max-width(767px) {
      display: none;
    }

    .wrapper {
      z-index: 1;
      width: 100%;
      min-height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      position: relative;
      overflow: hidden;

      .video-js {
        position: absolute;
        z-index: 2;
        height: 390px;
        width: 240px;
        background-color: unset !important;
        margin: auto;
        right: 140px;
        top: -20px;
        bottom: 0;
        //transform: rotate(8.49deg);

        @include max-width(1024px) {
          height: 350px;
          right: 105px !important;
        }

        @include max-width(1023px) {
          height: 330px;
          width: 215px;
          right: 110px !important;
        }

        @include max-width(811px) {
          right: 95px !important;
        }

        @include max-width(768px) {
          right: 145px;
          height: 330px;
          width: 205px;
        }

        video {
          width: unset !important;
          border-radius: 12px !important;
        }
      }

      .outer {
        display: block;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .click-event {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 3;
          cursor: pointer;
        }

        .ripple {
          position: absolute;
          border: 2px solid #fff;
          opacity: 1;
          border-radius: 100%;
          animation: ripple 4s cubic-bezier(0, 0.4, 1, 0.7) infinite;

          @include max-width(1024px) {
            animation: ripple1024 4s cubic-bezier(0, 0.4, 1, 0.7) infinite;
          }

          &.six {
            animation-delay: -5s;
          }

          &.five {
            animation-delay: -4s;
          }

          &.four {
            animation-delay: -3s;
          }

          &.three {
            animation-delay: -2s;
          }

          &.two {
            animation-delay: -1s;
          }
        }
      }
    }
  }
}
</style>
