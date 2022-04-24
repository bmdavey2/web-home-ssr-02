<template lang="pug">
.xm-businesses-landing-running-festival.row.justify-center.items-center
  .medal-container
    ._box.chat.row.items-center.justify-center: img(src="~assets/images/v2/Businesses/chat.svg")
    ._box.like.row.items-center.justify-center: img(src="~assets/images/v2/Businesses/like.svg")
    .medal: img(src="~assets/images/v2/Businesses/red-medal.png")
    .text-content.row.justify-between
      ._title Running Festival
      .place.row.items-center
        ._icon.row.mr-2: img(src="~assets/images/v2/Businesses/place.svg")
        .value 15th
  .comments
    .comment-item.row
      .avatar: img(src="~assets/images/v2/Businesses/annette-miles.svg")
      .text-content
        .user Annette Miles • 8min
        .value What a great event! #[span(style="color: #886bf3") #BrisbaneMarathon]

    .comment-item.row
      .avatar: img(src="~assets/images/v2/Businesses/annette-miles.svg")
      .text-content
        .user Annette Miles • 7min
        .value Take a look at the medal I earned:

    .comment-item.row
      .avatar: img(src="~assets/images/v2/Businesses/anna-richards.svg")
      .text-content.latest
        .user Anna Richards • 5min
        .value Wow! 😍 ✨

    .comment-item.row
      .avatar: img(src="~assets/images/v2/Businesses/jacob-warren.svg")
      .text-content.latest
        .user Jacob Warren • 2min
        .value Great job! 🏁

    .comment-item.row
      .avatar: img(src="~assets/images/v2/Businesses/robert-fox.svg")
      .text-content.latest
        .user Robert Fox • 1min
        .value 👍 When will be the next event?
</template>

<script>
export default {
  name: 'XMBusinessesLandingRunningFestival',
}
</script>

<style lang="scss" scoped>
.xm-businesses-landing-running-festival::v-deep {
  color: $secondary;
  position: relative;

  @include max-width(1215px) {
    padding-bottom: 50px;
  }

  &::after {
    content: '';
    background-image: linear-gradient(360deg, #886bf2 -2.75%, rgba(136, 107, 242, 0) 46.65%);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .medal-container {
    background-color: $white;
    border-radius: 10px;
    width: 235px;
    position: relative;

    @include max-width(680px) {
      width: 45%;
    }

    ._box {
      width: 64px;
      height: 64px;
      border-radius: 5px;
      background-color: $white;
      position: absolute;
      z-index: 1;

      @include max-width(680px) {
        width: 42px;
        height: 42px;
        padding: 12px;
      }

      &.chat {
        top: 25px;
        left: -30px;

        @include max-width(680px) {
          top: 15px;
          left: -20px;
        }
      }

      &.like {
        top: 105px;
        left: -30px;

        @include max-width(680px) {
          top: 70px;
          left: -20px;
        }
      }
    }

    .medal {
      width: 100%;
      position: relative;
      top: -10px;
      text-align: center;
      padding: 0 15px;

      @include max-width(680px) {
        padding: 0 8px;
      }
    }

    .text-content {
      padding: 0 17px 15px;
      margin-top: -5px;

      ._title {
        font-size: 1.0714rem;
        line-height: 1.34;
        font-weight: 500;

        @include max-width(680px) {
          font-size: 0.8571rem;
          width: 100%;
          margin-bottom: 5px;
        }
      }

      .place {
        @include max-width(680px) {
          font-size: 0.8571rem;
        }
      }
    }
  }

  .comments {
    padding-left: 10px;

    @include max-width(680px) {
      width: 55%;
    }

    .comment-item {
      margin-bottom: 15px;

      .avatar {
        img {
          width: 42px;
        }
      }

      .text-content {
        background-color: $white;
        border: 1px solid $white;
        border-radius: 10px;
        padding: 8px 15px;

        @include max-width(680px) {
          padding: 5px 7px;
          width: calc(100% - 42px);
        }

        .user {
          font-size: 0.8571rem;
          font-weight: 100;

          @include max-width(680px) {
            font-size: 0.5rem;
          }
        }

        .value {
          font-weight: 100;
          color: #65676b;

          @include max-width(680px) {
            font-size: 0.5714rem;
          }
        }

        &.latest {
          background-color: transparent;
          color: $white;

          .value {
            color: $white;
          }
        }
      }
    }
  }
}
</style>
