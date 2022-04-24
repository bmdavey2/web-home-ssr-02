<template lang="pug">
.xo-business-customer
  .container.is-max-widescreen.slider-container
    .right-section
    .header.row.items-center.justify-between(style="padding-top: 50px")
      h3.col What customer are saying
      .actions.row.items-center
        .slider-nav-button.row.items-center(v-if="comments.length >= 2")
          .btn-nav.btn-prev.row.items-center.justify-center(@click.prevent="$refs.carousel.$swiper.slidePrev()"): b-icon(
            icon="chevron-left")
          .btn-nav.btn-next.row.items-center.justify-center(@click.prevent="$refs.carousel.$swiper.slideNext()"): b-icon(
            icon="chevron-right")
    swiper(ref="carousel", :options="swiperSettings")
      swiper-slide(v-for="(comment, index) in comments", :key="index")
        .content-section.explore-events
          .bg-slider
            img(src="~assets/images/v2/Business/bg-slider.svg")
          .columns
            .column.is-4
              .profile.flex.flex.align-center
                img.profile-avatar-testimony.mr-3(
                  :src="require(`assets/images/v2/Business/Users/${comment.image}.png`)"
                  v-if="comment.image")
                //XAProfileAvatar.mr-4(label="EP" size="50px")
                .profile-name.has-text-secondary.align-center
                  p {{ comment.name }}
                  .has-text-primary.text-weight-light {{ comment.title }}
                  .has-text-primary.text-weight-light(v-if="comment.subtitle") {{ comment.subtitle }}
            .column.is-8.has-text-secondary
              .container
                .justify-center.slider-message
                  p {{ comment.message }}
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XOBusinessCustomerSaying',
  components: { XAProfileAvatar, Swiper, SwiperSlide },
  data() {
    return {
      comments: [
        {
          image: 'michael',
          name: 'Michael Roeger',
          title: 'Paralympic Bronze Medalist',
          message: '“I would love to see these rolled at every running event”',
        },
        {
          image: 'rose',
          name: 'Rose Davies',
          title: 'Olympic Runner',
          // subtitle: 'Female 10km Winner',
          message: '“I’ll never sell mine, i’ll be collecting them” ',
        },
        {
          image: 'brett',
          name: 'Brett Robinson',
          title: 'Olympic Runner',
          // subtitle: '10km Winner',
          message: '“I literally pushed harder because I wanted my medal to have 1st Place on it forever”',
        },
        {
          image: 'epic',
          name: 'Eliza Hesketh',
          title: 'Epic Events',
          message:
            '"The team at ActivePlace have been incredible to work with. They went above and beyond to support us as event organisers, as well as supporting the event through marketing and promotional efforts"',
        },
        {
          image: 'epic',
          name: 'Richard Welsh',
          title: 'Epic Events',
          message: "“I'm blown away by the figures“",
        },
      ],
    }
  },
  computed: {
    swiperSettings() {
      const swiperSettings = {
        loop: true,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
      }

      return swiperSettings
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-business-customer::v-deep {
  background-color: #0a2a32;
  background-image: url('~assets/images/v2/Business/bg-customer.svg');
  background-repeat: no-repeat;
  background-position: right;
  overflow: hidden;

  @include max-width(767px) {
    background-size: 550px;
    background-position: left center;
  }

  .header {
    .actions {
      @include max-width(767px) {
        padding-left: 70px;
      }
    }
  }

  .profile-avatar-testimony {
    width: 60px;
    height: 60px;
    background: #c4c4c4;
    border-radius: 40px;
    border: 2px solid #fff;
    box-sizing: border-box;
    box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
  }

  .slider-container {
    min-height: 500px;

    .actions {
      a {
        color: $white;
        font-weight: 300;
        font-size: 1.1429rem;
      }

      .slider-nav-button {
        margin-right: 10px;

        .btn-nav {
          color: $white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-left: 10px;
          cursor: pointer;

          &.btn-next {
            background-color: #2a4e55;
          }
        }
      }
    }

    .slider-message {
      p {
        font-weight: 300;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: -0.66px;
        @include max-width(599px) {
          line-height: 30px !important;
        }
      }
    }

    .swiper-container {
      .swiper-wrapper {
        .swiper-slide {
          width: calc(100% - 100px);

          @include max-width(599px) {
            width: calc(100% - 50px);
          }
        }
      }
    }
  }

  .right-section {
    position: absolute;
    top: 0;
    right: -20%;
    width: 100%;
    z-index: -1;
    height: 100%;

    &.mobile {
      display: none;
      order: 1;
      margin: 0 -15px;
      width: calc(100% + 30px);
      padding: 50px 0;
      background-size: 750px;
      min-height: 500px;
      overflow: hidden;
      position: relative;
      right: 0;
      // min-height: calc(var(--vh, 1vh) * 100 - 63px); add this if Damien requested for full screen view

      @include max-width(767px) {
        display: flex;
      }

      &::after {
        content: '';
        background-image: linear-gradient(rgba(12, 53, 62, 0), $secondary);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 150px;
      }

      img {
        position: absolute;
        top: 70px;
        left: 12%;
        right: 0;
        margin: 0 auto;
        width: 500px;
        max-width: unset;
        height: auto;

        @include max-width(510px) {
          left: 9%;
        }

        @include max-width(475px) {
          left: 0;
        }

        @include max-width(375px) {
          left: -6%;
        }
      }
    }
  }

  //  2nd component
  .content-section {
    position: relative;
    padding: 30px 50px;
    border-radius: 10px;
    margin-top: 100px;
    min-height: 230px;

    @include max-width(767px) {
      padding: 30px 20px;
    }

    .bg-slider {
      position: absolute;
      bottom: -10px;
      left: 0;
    }

    &::before {
      content: '';
      border-bottom: 70px solid transparent;
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
  }

  .explore-events {
    background-color: white;

    &::before {
      border-bottom-color: white;
    }

    .left-content {
      width: calc(100% - 650px);

      @include max-width(1215px) {
        width: 50%;
      }

      @include max-width(767px) {
        width: 100%;
        position: relative;
        z-index: 1;
        padding-top: 350px;
      }

      .actions {
        margin-top: 80px;

        a {
          span {
            font-weight: bold;
          }
        }

        @include max-width(767px) {
          margin-top: 50px;
        }

        .button {
          width: 100%;
          max-width: 190px;

          @include max-width(767px) {
            max-width: 100%;
            height: 42px;
          }
        }
      }
    }
  }
}
</style>
