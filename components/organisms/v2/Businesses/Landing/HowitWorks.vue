<template lang="pug">
.xo-business-howit-works
  .container.is-max-widescreen
    h3 How it works

    .stepper
      .contents.row.justify-between
        .column-content
          ._number.active 1
          .text-content
            h4 Complete a form
            p.text-weight-thin Tell us what you’re after and what type of digital medal you would like
            b-button(type="is-primary" tag="router-link" to="/medals/order" inverted outlined) GET STARTED

        .column-content
          ._number.active 2
          .text-content
            h4 Agree on pricing & options
            p.text-weight-thin Choose what type of medal you would like, the services, and marketing support you need.

        .column-content
          ._number 3
          .text-content
            h4 Commence onboarding
            p.text-weight-thin Our expert team will work with you every step of the way

        .column-content
          ._number 4
          .text-content
            h4 Launch Digital NFT Medal
            p.text-weight-thin We’ll make sure your digital medal is ready to promote and advertise pre-event, with all successful participants receiving their medal automatically on completion
</template>

<script>
export default {
  name: 'XOBusinessHowitWorks',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-business-howit-works::v-deep {
  background-color: $secondary;
  padding: 100px 0;

  @include max-width(1023px) {
    padding: 100px 0 30px;
  }

  h3 {
    margin-bottom: 70px;
  }

  .stepper {
    .contents {
      position: relative;

      &::before {
        content: '';
        width: calc(100% / 4 * 3);
        height: 2px;
        background-color: #8a9ea2;
        position: absolute;
        top: 30px;
        left: 60px;
        z-index: 0;

        @include max-width(1023px) {
          content: none;
        }
      }

      &::after {
        content: '';
        width: calc(100% / 4 * 2 - 12.5%);
        height: 2px;
        background-color: $primary;
        position: absolute;
        top: 30px;
        left: 60px;
        z-index: 1;

        @include max-width(1023px) {
          content: none;
        }
      }

      .column-content {
        width: calc(100% / 4 - 30px);
        position: relative;

        @include max-width(1023px) {
          width: 100%;
          margin-bottom: 70px;
          display: flex;
          flex-wrap: wrap;

          &:not(:last-child) {
            &::before {
              content: '';
              background-color: #8a9ea2;
              width: 2px;
              height: calc(100% + 70px);
              position: absolute;
              top: 0;
              left: 24px;
              z-index: 0;
            }

            &::after {
              content: '';
              background-color: $primary;
              width: 2px;
              height: calc(100% + 70px);
              position: absolute;
              top: 0;
              left: 24px;
              z-index: 1;
            }
          }

          &:nth-child(2) {
            &::after {
              height: 100%;
            }
          }

          &:nth-child(3) {
            &::after {
              content: none;
            }
          }
        }

        ._number {
          width: 64px;
          height: 64px;
          background-color: $secondary;
          border: 1px solid #2a4e55;
          font-size: 22px;
          font-weight: 100;
          line-height: 1.5;
          border-radius: 50%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          position: relative;
          z-index: 2;

          @include max-width(767px) {
            width: 48px;
            height: 48px;
          }

          &.active {
            background-color: $primary;
            border-color: $primary;
          }
        }

        .text-content {
          @include max-width(1023px) {
            flex: 10000 1 0%;
            padding-left: 30px;
          }

          @include max-width(767px) {
            padding-left: 20px;
          }

          h4 {
            margin-bottom: 15px;
            line-height: 1.54;

            @include max-width(1023px) {
              font-size: 1.5714rem;
            }
          }

          p {
            font-size: 1.1429rem;
            line-height: 1.75;
            letter-spacing: -0.28px;
            color: #bfcacc;
          }

          .button {
            width: 165px;
            height: 42px;
            margin-top: 50px;

            @include max-width(1023px) {
              margin-top: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
