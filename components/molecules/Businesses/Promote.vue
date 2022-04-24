<template lang="pug">
.xm-businesses-promote
  .container
    .contents
      .text.is-flex-width-auto
        h3.is-uppercase Promote your products to exactly the right people
        p Display as many of your products as you like in a health & fitness Marketplace built specifically for your category. Every product page is optimised to attract high-intent traffic.
        p We've made it easier to bring what you sell to the forefront, and grow your business by doing it.
      .img-content.is-flex-width-auto: img(src="~assets/images/Businesses/promote.webp" width="506" height="371")
</template>

<script>
export default {
  name: 'XMBusinessesPromote',
}
</script>

<style lang="scss" scoped>
.xm-businesses-promote::v-deep {
  background-color: rgba(#fedddd, 0.3);
  overflow: hidden;

  .contents {
    display: flex;
    flex-wrap: wrap;

    .text {
      align-self: center;
      padding-right: 110px;

      h3 {
        margin-bottom: 20px;
      }

      p {
        margin-bottom: 10px;
        font-weight: 300;
      }
    }

    .img-content {
      margin-bottom: -20px;
    }
  }

  @media screen and (max-width: 1024px) {
    .contents {
      .img-content {
        padding-top: 80px;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .contents {
      .text {
        padding: 50px 0;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .contents {
      .text,
      .img-content {
        flex: unset;
      }

      .img-content {
        padding: 0;
      }

      .text {
        padding: 50px 0 10px;
      }
    }
  }
}
</style>
