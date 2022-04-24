<template lang="pug">
.xm-home-celebrate-image
  .background
    .chat._box.row.items-center.justify-center: img(
      src="~assets/images/v2/Home/icon-chat-celebrate.svg"
      alt="Chat Celebrate"
      width="32"
      height="32")

    .like._box.row.items-center.justify-center: img(
      src="~assets/images/v2/Home/icon-like-celebrate.svg"
      alt="Like Celebrate"
      width="27"
      height="23")

    .medal._box.row.items-center.justify-center
      div
        .text-center.mb-2
          img(src="~assets/images/v2/Home/icon-medal-celebrate.svg" alt="Medal Celebrate" width="48" height="48")
        .text-center
          .place.mb-1 1st place
          .name Robert Fox

    .aggregates._box.row.items-center.justify-evenly
      .high-five.row.items-center
        .row.items-center.mr-2: img(
          src="~assets/images/v2/Home/icon-highFive-celebrate.svg"
          alt="High Five Celebrate"
          width="14"
          height="16")
        .value 120

      .comments.row.items-center
        .row.items-center.mr-2: img(
          src="~assets/images/v2/Home/icon-comments-celebrate.svg"
          alt="Comment Celebrate"
          width="17"
          height="16")
        .value 25

    .users._box
      .is-flex
        img(src="~assets/images/v2/Home/useravatar-1.png" alt="Annette Miles" width="50" height="50")
        .custom-comment
          p.header.text-weight-light Annette Miles · 6min
          p.comment Fantastic view! 😍
      .is-flex
        img(src="~assets/images/v2/Home/useravatar-2.png" alt="Anna Richards" width="50" height="50")
        .custom-comment
          p.header.text-weight-light Anna Richards · 1min
          p.comment Wow! 👍✨
      .is-flex
        img(src="~assets/images/v2/Home/useravatar-3.png" alt="Jacob Warren" width="50" height="50")
        .custom-comment
          p.header.text-weight-light Jacob Warren · 12min
          p.comment Great job 🏁
</template>

<script>
export default {
  name: 'XMHomeCelebrate',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-home-celebrate-image::v-deep {
  padding: 30px 0;

  @include max-width(767px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .background {
    background-image: url('assets/images/v2/Home/background-content-celebrate.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    max-width: 60%;
    min-height: 380px;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;

    @include max-width(1215px) {
      max-width: 80%;
    }

    @include max-width(768px) {
      max-width: 70%;
      min-height: 250px;
    }

    @include max-width(767px) {
      margin: 0 0 0 30px;
    }

    ._box {
      background-color: $white;
      border-radius: 5px;
      width: 60px;
      height: 60px;
      box-shadow: 0 4px 30px rgba(12, 53, 62, 0.15);
      position: absolute;
      color: $secondary;
      padding: 10px;

      @include max-width(768px) {
        width: 40px;
        height: 40px;
      }

      &.chat {
        top: -30px;
        right: -30px;

        @include max-width(768px) {
          top: -20px;
          right: -20px;
        }
      }

      &.like {
        top: 50px;
        right: -30px;

        @include max-width(768px) {
          top: 30px;
          right: -20px;
        }
      }

      &.medal {
        width: 200px;
        height: 195px;
        bottom: -40px;
        right: -60px;

        @include max-width(768px) {
          width: 140px;
          height: 140px;
          bottom: -20px;
          right: -50px;
        }

        @include max-width(767px) {
          width: 100px;
          height: auto;
          bottom: -15px;
          right: -30px;
        }

        img {
          @include max-width(767px) {
            width: 32px;
          }
        }

        .place {
          font-size: 1.1429rem;

          @include max-width(767px) {
            font-size: 1rem;
          }
        }

        .name {
          font-size: 0.8571rem;

          @include max-width(767px) {
            font-size: 0.7143rem;
          }
        }
      }

      &.aggregates {
        height: 65px;
        width: 200px;
        bottom: 10px;
        left: -100px;

        @include max-width(768px) {
          width: 170px;
          height: 45px;
          bottom: 15px;
          left: -50px;
        }

        @include max-width(767px) {
          font-size: 0.7143rem;
          width: 140px;
          height: 35px;
        }
      }

      &.users {
        width: 225px;
        height: auto;
        left: -130px;
        top: 30px;
        padding: 10px 10px 10px 10px;

        img {
          height: 50px;
        }

        .custom-comment {
          margin-bottom: 1rem !important;
          padding: 8px;
          width: 100%;
          background: #f8f8f8;
          border-radius: 10px;

          .header {
            font-weight: 300;
            font-size: 12px;
            line-height: 14px;
            color: #0c353e;
            letter-spacing: -0.1px;
          }

          .comment {
            padding-top: 3px;
            font-weight: 300;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.18px;
            color: #65676b;
          }
        }

        @include max-width(768px) {
          .custom-comment {
            margin-bottom: 3px !important;
          }
          .header {
            font-size: 10px !important;
          }
          .comment {
            padding-top: 0 !important;
            font-size: 11px !important;
          }
          img {
            height: 40px;
          }

          width: 170px;
          left: -80px;
        }

        @include max-width(767px) {
          width: 180px;
          left: -60px;
          top: 15px;
        }
      }
    }
  }
}
</style>
