<template lang="pug">
.xm-businesses-supercharge
  .contents
    .container
      .left-content
        .supercharge-1: img(src="~assets/images/Businesses/supercharge-1.webp" width="385" height="365")
        .supercharge-2: img(src="~assets/images/Businesses/supercharge-2.webp" width="550" height="369")
        .supercharge-3: img(src="~assets/images/Businesses/supercharge-3.webp" width="375" height="511")
      .right-content
        h3.is-uppercase Supercharge YOUR ability to be found
        p Easily publish unlimited updates and articles that make your business more discoverable.
        p Supercharge your presence across Google, the ActivePlace website, and of course, the ActivePlace app.
</template>

<script>
export default {
  name: 'XMBusinessesSupercharge',
}
</script>

<style lang="scss" scoped>
.xm-businesses-supercharge::v-deep {
  background-color: rgba(#cff1f8, 0.3);
  position: relative;
  overflow: hidden;

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
      position: relative;

      img {
        display: flex;
      }

      .supercharge-1 {
        position: absolute;
        bottom: 0;
        left: -25%;
        z-index: 1;
        width: 70%;
      }

      .supercharge-3 {
        display: none;
        position: relative;
        width: calc(100% + 30px);
        left: -15px;

        img {
          width: 100%;
        }
      }
    }

    .right-content {
      padding: 50px 0;

      h3 {
        margin-bottom: 20px;
      }

      p {
        font-size: 1.1429rem;
        line-height: 1.7143rem;
        margin-bottom: 15px;
        font-weight: 300;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .container {
      align-items: stretch;

      .left-content {
        position: unset;

        .supercharge-1 {
          display: none;
        }

        .supercharge-2 {
          position: absolute;
          top: 0;
          left: -20%;
          width: 70%;
          height: 100%;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .container {
      .left-content,
      .right-content {
        width: 100%;
      }

      .left-content {
        order: 2;

        .supercharge-2 {
          display: none;
        }

        .supercharge-3 {
          display: block;
        }
      }

      .right-content {
        order: 1;
        padding-bottom: 0;
      }
    }
  }
}
</style>
