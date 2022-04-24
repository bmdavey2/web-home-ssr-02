<template lang="pug">
.xo-simply-no-comparison
  .container.is-max-widescreen(style="padding-top: 100px; padding-bottom: 70px")
    .header.mb-6
      h3.mb-6 Simply no comparison
      h4.text-weight-thin Physical and digital medals are different. We work alongside events who can choose to either remove, or provide both a physical and digital medal for their event. Below is our comparison to help you see the differences:
    ._content
      .row.justify-between
        .digital-race-medal
          .content-section.colored-card
            .column-header(style="margin-top: 40px")
              h3.has-text-white Digital NFT Medal
              p.text-weight-thin(style="opacity: 0.6") Advantages
              .separator
              .card.mb-4(v-for="item in cardMessage")
                .card-content(style="padding: 0")
                  .flex.align-center.p-2.no-wrap
                    img(src="~/assets/icons/primary/circle-checked.svg" style="padding: 3px 3px 0 0")
                    p.has-text-secondary {{ item }}
              .card.mb-4(v-for="item in cardMessage2" style="background-color: #7d62de; border-radius: 12px")
                .card-content(style="padding: 10px 0 0 0")
                  .flex.align-center.p-2.no-wrap
                    img(src="~/assets/icons/light/white-cricle-checked.svg" style="padding: 3px 3px 0 0")
                    p.has-text-white {{ item }}
        .physical-race-medal
          .content-section.transparent-card
            .column-header(style="margin-top: 40px")
              h3.has-text-white Physical Medal
              p.text-weight-thin(style="opacity: 0.6") Advantages
              .separator
              .card.mb-4(style="background-color: #0c353e; border-radius: 12px")
                .card-content(style="padding: 0 0 0 10px")
                  .flex.align-center.p-2.no-wrap
                    img(src="~/assets/icons/light/white-cricle-checked.svg" style="padding: 3px 3px 0 0")
                    p.has-text-white Received at the event

      .get-started-action.row.items-center.justify-between
        ._content.col
          h4.text-weight-thin Don't be left behind. Elevate your next event experience.
          h4.text-weight-thin Enquire about our customized Digital NFT Medal packages today
        .actions
          b-button.text-uppercase(type="is-primary" tag="router-link" to="/medals/order") GET STARTED
</template>

<script>
export default {
  name: 'XOBusinessSimplyComparison',
  data() {
    return {
      cardMessage: [
        'Received at the event',
        'Unique medals for each participant',
        'Reduces event environmental impact',
        'Easy to celebrate and share anywhere & anytime',
        'Results permanently secured online for everyone to see',
        'Removes burden & cost of ordering and storing physical medals',
      ],
      cardMessage2: [
        'Ability to promote event partners driving increased partner ROI',
        'Participants to create an online home for all their achievements',
        'Access to new revenue lines such as event bookings and past event participants',
        'Improved overall event experience for participant',
        'Elevated event reputation and value positioning',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-simply-no-comparison::v-deep {
  background-color: #08252c;

  .header {
    @include max-width(1023px) {
      margin-bottom: 20px !important;
    }

    h4 {
      color: $white;
      opacity: 0.8;
    }
  }

  ._content {
    .digital-race-medal,
    .physical-race-medal {
      width: calc(50% - 15px);

      @include max-width(1023px) {
        width: 100%;
      }

      h3 {
        margin-bottom: 10px;
      }

      .separator {
        background-color: $white;
        opacity: 0.2;
        width: 100%;
        height: 1px;
        margin: 50px 0 30px;
      }
    }

    .digital-race-medal {
      @include max-width(1023px) {
        order: 2;
      }
    }

    .physical-race-medal {
      @include max-width(1023px) {
        order: 1;
        margin-bottom: 100px;
      }

      @include max-width(767px) {
        margin-bottom: 10px;
      }
    }

    .card {
      border-radius: 12px;

      .card-content {
        p {
          font-weight: 300;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }

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
        background-image: linear-gradient(#08252c, rgba(8, 37, 44, 0));
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

    .colored-card {
      background-color: #886bf2;

      &::before {
        border-bottom-color: #886bf2;
      }
    }

    .transparent-card {
      background-color: #08252c;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-sizing: border-box;
      border-radius: 10px;

      @media screen and (min-width: 767px) {
        height: 92%;
      }

      &::before {
        border-bottom-color: #092b33;
      }
    }

    .bottom-card-button {
      @include min-width(767px) {
        margin-left: auto;
      }
    }
  }

  .get-started-action {
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    min-height: 135px;
    padding: 10px 20px;
    margin-top: 50px;
    color: $white;

    @include max-width(767px) {
      padding: 30px 20px;
    }

    ._content {
      @include max-width(767px) {
        flex: none;
        width: 100%;
        margin-bottom: 20px;
      }
    }

    .actions {
      .button {
        width: 165px;
        height: 42px;
      }
    }
  }
}
</style>
