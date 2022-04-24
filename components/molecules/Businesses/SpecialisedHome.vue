<template lang="pug">
.xm-businesses-specialised-home
  .blue-background
  .container
    ._contents
      ._text.is-flex-width-auto
        h3 Health and fitness is one of the biggest categories of all. It's time to give it a specialised home.
        p Why? Because your business is integral to your customer's lifestyle, and they are struggling to find you.
      ._images
        .img-column.column-1: img.img-1(src="~assets/images/Businesses/specialised-1.webp" width="223" height="245")
        .img-column.column-2
          img.img-2(src="~assets/images/Businesses/specialised-2.webp" width="223" height="300")
          img.img-3(src="~assets/images/Businesses/specialised-3.webp" width="223" height="244")
        .img-column.column-3
          img.img-4(src="~assets/images/Businesses/specialised-4.webp" width="223" height="168")
          img.img-5(src="~assets/images/Businesses/specialised-5.webp" width="223" height="272")
</template>

<script>
export default {
  name: 'XMBusinessesSpecialisedHome',
}
</script>

<style lang="scss" scoped>
.xm-businesses-specialised-home::v-deep {
  position: relative;

  .blue-background {
    background-color: #cff1f8;
    width: 100%;
    height: 335px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto 0;
    z-index: 1;
    opacity: 0.4;
  }

  ._contents {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    ._text {
      padding-right: 20px;

      h3 {
        color: $secondary;
        margin-bottom: 20px;
      }
    }

    ._images {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      max-width: 700px;

      .img-column {
        width: calc(100% / 3 - 10px);
        margin: 0 -10px;

        .img-2,
        .img-3,
        .img-4,
        .img-5 {
          margin: -20px 0;
        }
      }

      img {
        display: block;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    ._contents {
      ._images {
        max-width: 50%;

        .img-column {
          width: 50%;

          &.column-1 {
            display: none;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding-top: 50px;

    .blue-background {
      margin: 0;
      height: calc(100% - 100px);
    }

    ._contents {
      ._text {
        padding-right: 0;
        margin-bottom: 10px;
      }

      ._images {
        max-width: 100%;

        .img-column {
          margin: 0;

          &.column-2 {
            margin-right: -15px;
          }

          .img-2,
          .img-3,
          .img-4,
          .img-5 {
            margin: 0;
          }

          .img-3,
          .img-5 {
            margin-top: -15px;
          }
        }
      }
    }
  }
}
</style>
