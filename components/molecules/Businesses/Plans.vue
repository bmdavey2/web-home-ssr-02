<template lang="pug">
.xm-businesses-plans
  .container
    h2 Pick a plan that suits your business
    .list
      .item-container.warm-up-plan
        .item
          ._header Warm-Up Plan
          .contents
            .price Free
            p._title Perfect for businesses that:
            p.description Want to increase their visibility and develop trust by publishing unlimited content and showcasing products to the right audience...
            p.excerpt ...easily and without needing a phd.
          .actions: b-button.is-uppercase(type="is-primary" outlined tag="router-link" to="/businesses/plans-pricing") Show More
      .item-container.starter-plan
        .item
          //.date-release Coming Oct
          ._header Starter Plan
          .contents
            .price $49 #[sup /month]
            p._title Perfect for businesses that:
            p.description Want to reach a larger audience, be more discoverable online, increase the visibility of their products and generate more sales leads...
            p.excerpt ...without having to find 40 hours a week to do it.
          .actions: b-button.is-uppercase(type="is-primary" outlined tag="router-link" to="/businesses/plans-pricing") Show More
        ._content-bottom Pre-register to get 20% off when paid annually
      .item-container.growth-plan
        .item
          .date-release Coming Nov
          ._header Growth Plan
          .contents
            .price Coming Soon
            p._title Perfect for businesses that:
            p.description Want everything in Warm-Up and Starter, plus a bunch of stuff we’re keeping quiet about for now...
          .actions
      .item-container.accelerate-plan
        .item
          .date-release Coming Dec
          ._header Accelerate Plan
          .contents
            .price Coming Soon
            p._title Perfect for businesses that:
            p.description Want everything in Warm-Up, Starter and Growth, plus a bunch of stuff we’re keeping hush hush about for now...
          .actions
</template>

<script>
export default {
  name: 'XMBusinessesPlans',
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-businesses-plans::v-deep {
  padding: 50px 0 120px;

  h2 {
    text-align: center;
    margin-bottom: 50px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item-container {
      width: calc(100% / 4 - 20px);
      position: relative;
      padding-bottom: 80px;

      &.warm-up-plan {
        .item {
          background-color: #25a9e0;

          .contents {
            .price {
              color: #25a9e0;
            }
          }

          .actions {
            border-bottom: 7px solid #25a9e0;
          }
        }
      }

      &.starter-plan {
        .item {
          background-color: #3dc68c;
          border: 7px solid #3dc68c;
          border-bottom: 0;

          ._header {
            background-color: #219653;
          }

          .contents {
            .price {
              color: #219653;
            }
          }

          .actions {
            border-bottom: 7px solid $white;
          }
        }

        ._content-bottom {
          background-color: #3dc68c;
        }
      }

      &.growth-plan {
        .item {
          background-color: #f2c94c;

          .contents {
            .price {
              color: #f2c94c;
            }
          }

          .actions {
            border-bottom: 7px solid #f2c94c;
          }
        }
      }

      &.accelerate-plan {
        .item {
          background-color: #f15a29;

          .contents {
            .price {
              color: #f15a29;
            }
          }

          .actions {
            border-bottom: 7px solid #f15a29;
          }
        }
      }

      .item {
        border-radius: 8px;
        filter: drop-shadow(0 2px 20px rgba(39, 85, 96, 0.1));
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        position: relative;
        height: 100%;
        overflow: hidden;
        z-index: 2;

        .date-release {
          background-color: #050505;
          color: #f2c94c;
          text-transform: uppercase;
          position: absolute;
          top: 23px;
          right: -29px;
          text-align: center;
          font-size: 0.8571rem;
          line-height: 0.8571rem;
          width: 130px;
          height: 25px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
        }

        ._header {
          color: $white;
          font-size: 1.5714rem;
          line-height: 2.2857rem;
          font-weight: 300;
          padding: 10px 20px;
          width: 100%;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .contents {
          background-color: $white;
          padding: 20px 20px 30px;
          color: #050505;
          width: 100%;
          flex: 10000 1 0%;

          .price {
            font-size: 2.2857rem;
            line-height: 2.8571rem;
            margin-bottom: 20px;

            sup {
              font-size: 1.1429rem;
              line-height: 1.4286rem;
            }
          }

          ._title {
            font-weight: 700;
            margin-bottom: 10px;
          }

          .description {
            font-weight: 300;
            margin-bottom: 10px;
          }

          .excerpt {
            font-family: 'Georgia', sans-serif;
            font-style: italic;
          }
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          background-color: $white;
          padding-bottom: 20px;
        }
      }

      ._content-bottom {
        text-align: center;
        color: $white;
        font-weight: 300;
        padding: 10px 20px;
        position: absolute;
        top: calc(100% - 86px);
        left: 0;
        width: 100%;
        border: 7px solid transparent;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        z-index: 1;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 50px 0 0;

    .list {
      .item-container {
        width: calc(100% / 2 - 20px);
        margin-bottom: 30px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .list {
      .item-container {
        width: 100%;
        padding-bottom: 0;

        &.starter-plan {
          padding-bottom: 80px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
