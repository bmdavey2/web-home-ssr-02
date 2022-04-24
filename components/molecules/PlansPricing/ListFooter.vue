<template lang="pug">
.xm-plans-pricing-list-footer
  .no-price
    .plan-item-container.pick-a-plan
      ._content Perfect for businesses that...
    .plan-item-container.warm-up-plan
      ._content
        .description Want to increase their visibility and develop trust by publishing unlimited content and showcasing products to the right audience...
        .bottom-text ...easily and without needing a phd.
  .has-price
    ._title All prices are plus GST
    .contents
      .plan-item-container.starter-plan
        ._content
          .description Want to reach a larger audience, be more discoverable online, increase the visibility of their products and generate more sales leads...
          .bottom-text ...without having to find 40 hours a week to do it.
        ._content-bottom Pre-register to get 20% off when paid annually
      .plan-item-container.growth-plan(style="background-color: #eaeff3 !important")
        //._content
        //  .description Everything in Warm-Up and Starter, plus a bunch of stuff we’re keeping quiet about for now...
        //  .bottom-text ...don't worry, you'll be the first to know when the Growth Plan is ready.
      .plan-item-container.accelerate-plan(style="background-color: #eaeff3 !important")
        //._content
        //  .description Everything in Warm-Up, Starter and Growth, plus a bunch of stuff we’re keeping hush hush about for now...
        //  .bottom-text ...don't worry, you'll be the first to know when the Accelerate Plan is ready.
</template>

<script>
export default {
  name: 'XMPlansPricingListFooter',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-plans-pricing-list-footer::v-deep {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 80px;

  .no-price {
    width: 40%;
    display: flex;
    flex-wrap: wrap;

    ._title {
      min-height: 34px;
      width: 100%;
    }

    .plan-item-container {
      width: 50%;
      padding: 0 0 7px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;

      &.pick-a-plan {
        font-size: 16px;
        line-height: 20px;
        color: $black;

        ._content {
          border-bottom-left-radius: 8px;
        }
      }

      &.warm-up-plan {
        background-color: #25a9e0;
      }

      ._content {
        padding: 20px;
        height: 100%;
        background-color: $white;
        border: 1px solid #e5eaf4;

        .description {
          font-weight: 300;
          margin-bottom: 10px;
        }

        .bottom-text {
          font-family: 'Georgia', sans-serif;
          font-style: italic;
        }
      }
    }
  }

  .has-price {
    width: 60%;

    ._title {
      background-color: #eef1f1;
      color: #65676b;
      text-align: center;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 5px 10px;
      font-weight: 300;
    }

    .contents {
      display: flex;
      flex-wrap: wrap;

      .plan-item-container {
        width: calc(100% / 3);
        padding: 0 0 7px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        position: relative;

        &.starter-plan {
          background-color: #3dc68c;
          padding: 0 3px 7px;
          border-radius: 0;

          ._content {
            border: 0;

            &::after {
              content: '';
              position: absolute;
              bottom: -7px;
              left: 0;
              background-color: #219653;
              width: 100%;
              height: 7px;
              border-bottom-right-radius: 8px;
              border-bottom-left-radius: 8px;
            }
          }

          ._content-bottom {
            background-color: #3dc68c;
          }
        }

        &.growth-plan {
          background-color: #f2c94c;
        }

        &.accelerate-plan {
          background-color: #f15a29;
        }

        ._content {
          padding: 20px;
          height: 100%;
          background-color: $white;
          border: 1px solid #e5eaf4;
          position: relative;

          .description {
            font-weight: 300;
            margin-bottom: 10px;
          }

          .bottom-text {
            font-family: 'Georgia', sans-serif;
            font-style: italic;
          }
        }

        ._content-bottom {
          color: $white;
          font-weight: 300;
          text-align: center;
          padding: 10px;
          position: absolute;
          top: 100%;
          left: 0;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          z-index: 1;
        }
      }
    }
  }
}
</style>
