<template lang="pug">
.xm-businesses-benefits
  .container
    .contents
      .left-content
        .list
          .item
            ._icon: img(src="~assets/images/Businesses/list-icon.webp" width="10" height="16")
            ._content
              h3 DO BETTER MARKETING
              .description Take control of your business on ActivePlace.
          .item
            ._icon: img(src="~assets/images/Businesses/list-icon.webp" width="10" height="16")
            ._content
              h3 BUILD TRUST
              .description Tell your business story to the right people, as often as you like.
          .item
            ._icon: img(src="~assets/images/Businesses/list-icon.webp" width="10" height="16")
            ._content
              h3 GROW YOUR SALES
              .description Shine a bright light on your products and your expertise.
          .item
            ._icon: img(src="~assets/images/Businesses/list-icon.webp" width="10" height="16")
            ._content
              h3 RETAIN YOUR CUSTOMER
              .description Produce amazing content & remain a critical part of your customers lifestyle.
          .item
            ._icon: img(src="~assets/images/Businesses/list-icon.webp" width="10" height="16")
            ._content
              h3 FIND NEW CUSTOMERS
              .description We've built ActivePlace in a way that makes you more discoverable across the web than ever before.
      .right-content: img(src="~assets/images/Businesses/benefits-google-pixel-4.webp" width="335" height="564")
</template>

<script>
export default {
  name: 'XMBusinessesBenefits',
}
</script>

<style lang="scss" scoped>
.xm-businesses-benefits::v-deep {
  background-color: rgba(#cff1f8, 0.3);

  .contents {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .left-content,
    .right-content {
      width: 49%;
    }

    .left-content {
      padding-right: 30px;

      .list {
        .item {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          margin-bottom: 30px;

          &:last-child {
            margin-bottom: 0;
          }

          ._icon {
            opacity: 0.3;
            margin-right: 10px;
            padding-top: 3px;
          }

          ._content {
            flex: 10000 1 0%;

            h3 {
              margin-bottom: 10px;
              text-transform: uppercase;
              color: $secondary;
            }

            .description {
              font-size: 1.1429rem;
              line-height: 1.7143rem;
              font-weight: 300;
            }
          }
        }
      }
    }

    .right-content {
      background-image: url('~assets/images/Businesses/benefits-background.webp');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      padding: 100px 0 0 30px;
    }
  }

  @media screen and (max-width: 1023px) {
    padding: 50px 0;
  }

  @media screen and (max-width: 767px) {
    padding: 50px 0 0;

    .contents {
      .left-content,
      .right-content {
        width: 100%;
      }

      .right-content {
        padding: 0;
        margin-top: 50px;
      }
    }
  }
}
</style>
