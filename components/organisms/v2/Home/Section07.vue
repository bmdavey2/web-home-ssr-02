<template lang="pug">
.xo-home-section-07
  .container.is-max-widescreen
    h3 Who is ActivePlace?

    .row
      .left-content.text-content.col.pr-3: h4.text-weight-thin ActivePlace is the official creator of Digital Medals via Non-Fungible-Tokens (NFTs) on the #[a(href="https://www.avax.network/" target="_blank") Avalanche] Blockchain.

      .right-content.text-content.col.pl-3: h4.text-weight-thin We create them this way for one simple reason: It allows people to have a permanent and decentralized digital memory of their achievement, while making it extremely easy to celebrate and share anywhere, anytime...

    .separator

    .content-section.row.items-center
      .left-content
        h3 ActivePlace for businesses
        h4.text-weight-thin Beat your competition and be the first to offer Digital NFT Medals at your next event

        .actions.row
          b-button.text-uppercase(type="is-primary" @click="redirectTo()") Let's Talk
          b-button.text-uppercase.has-text-secondary(type="is-white" tag="router-link" to="/businesses") Read More

      .right-content.col.row.items-center.justify-center: XAMedalsVideo(:video="videoURL" title="ActivePlace")
</template>

<script>
import XAMedalsVideo from '~/components/atoms/Medals/Video'

export default {
  name: 'XOHomeSection07',
  components: { XAMedalsVideo },
  data() {
    return {
      videoURL: 'https://api.activeplace.com/videos/nftmedal.m3u8/Final%20with%20BG.m3u8',
    }
  },
  methods: {
    redirectTo() {
      window.open('https://calendly.com/damien-56/30min', '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-home-section-07::v-deep {
  background-color: #0a2a32;
  padding: 100px 0;

  @include max-width(767px) {
    padding: 50px 0;
  }

  a {
    color: $white;
  }

  h3 {
    margin-bottom: 20px;
  }

  h4 {
    @include max-width(767px) {
      font-size: 1.1429rem !important;
    }
  }

  .right-content {
    color: #849498;
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: #1d4047;
    margin: 80px 0;

    @include max-width(767px) {
      margin: 50px 0;
    }
  }

  .text-content {
    @include max-width(767px) {
      flex: none;
      width: 100%;
      padding: 0 !important;
    }

    &.left-content {
      @include max-width(767px) {
        margin-bottom: 20px;
      }
    }
  }

  .content-section {
    position: relative;
    padding: 30px 50px;
    border-radius: 10px;
    margin-top: 150px;
    min-height: 450px;
    background-color: #886bf2;

    @include max-width(768px) {
      margin-top: 120px;
      padding: 30px 20px;
    }

    &::before {
      content: '';
      border-bottom: 70px solid #886bf2;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      width: calc(100% - 10px);
      position: absolute;
      top: -69px;
      left: 5px;

      @include max-width(767px) {
        border-bottom-width: 50px;
        border-left-width: 70px;
        border-right-width: 70px;
        top: -49px;
      }
    }

    &::after {
      content: '';
      background-image: linear-gradient(#0a2a32, rgba(10, 42, 50, 0));
      position: absolute;
      top: -70px;
      left: 0;
      width: 100%;
      height: 70px;

      @include max-width(767px) {
        height: 50px;
        top: -50px;
      }
    }

    .left-content {
      width: calc(100% - 580px);

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(789px) {
        width: 52%;
      }

      @include max-width(767px) {
        width: 100%;
        padding-top: 400px;
      }

      .actions {
        margin-top: 80px;

        @include max-width(767px) {
          margin-top: 30px;
        }

        .button {
          width: 100%;
          max-width: 155px;

          &:first-child {
            margin-right: 20px;

            @include max-width(767px) {
              margin-bottom: 10px;
              margin-right: 0;
            }
          }

          @include max-width(767px) {
            max-width: 100%;
            height: 42px;
          }
        }
      }
    }

    .right-content {
      background-image: url('~assets/images/Medals/bg-circles.png');
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 650px;
      overflow: hidden;
      background-size: 950px;

      @include max-width(1215px) {
        width: 100%;
        max-width: 50%;
      }

      @include max-width(789px) {
        width: 48%;
        background-size: 735px;
      }

      @include max-width(767px) {
        width: 100%;
        height: 420px;
        max-width: 100%;
      }

      .xa-medals-video {
        .video-js {
          width: 205px;
          height: 350px;
        }
      }
    }
  }
}
</style>
