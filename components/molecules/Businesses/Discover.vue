<template lang="pug">
.xm-businesses-discover
  .contents-top
    .container
      h2.is-uppercase.has-text-primary Thousands of people
      h2.has-text-secondary are discovering businesses like yours on ActivePlace
  .contents-bottom
    .container
      .left-content
        h3.has-text-secondary Get results with your own ActivePlace business profile page
        h4 Publish your business information, content, products and more on a profile page that is built to elevate your Google ranking.
      .right-content: img(src="~assets/images/Businesses/guest-view.webp" width="549" height="401")
</template>

<script>
export default {
  name: 'XMBusinessesDiscover',
}
</script>

<style lang="scss" scoped>
.xm-businesses-discover::v-deep {
  position: relative;
  padding-top: 50px;
  overflow: hidden;

  .contents-top {
    padding-bottom: 50px;

    h2 {
      width: 100%;
      max-width: 470px;
    }
  }

  .contents-bottom {
    background-color: #fffbee;

    .container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .left-content,
      .right-content {
        width: 49%;
      }

      .left-content {
        h3 {
          text-transform: uppercase;
          margin-bottom: 30px;
        }

        h4 {
          font-size: 1.1429rem;
          line-height: 1.7143rem;
          width: 100%;
          max-width: 500px;
        }
      }

      .right-content {
        margin-top: -100px;

        img {
          display: flex;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    padding-top: 0;

    .contents-bottom {
      .container {
        .left-content {
          padding: 50px 0;
        }

        .right-content {
          margin-bottom: -50px;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .contents-bottom {
      .container {
        align-items: flex-end;

        .right-content {
          margin: 0;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .contents-bottom {
      .container {
        .left-content,
        .right-content {
          width: 100%;
        }

        .left-content {
          padding-bottom: 0;
        }
      }
    }
  }
}
</style>
