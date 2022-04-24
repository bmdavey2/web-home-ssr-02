<template lang="pug">
.xm-businesses-business-grow
  .container
    .contents
      .left-content: img(src="~assets/images/Businesses/business-grow-google-pixel-4.webp" width="335" height="564")
      .right-content
        ._icon: img(src="~assets/images/Businesses/list-icon.webp" width="10" height="16")
        ._content.is-flex-width-auto
          h3 WE'VE GOT ONE JOB TO DO
          .description
            p Help your business grow! ActivePlace is built on 500+ years of combined experience across Marketing, Sales, Event Management, Media Management, Digital Marketing, Content Marketing, Athlete Management and so much more.
            p We live and breath health & fitness, and we're passionate about growth!
</template>

<script>
export default {
  name: 'XMBusinessesBusinessGrow',
}
</script>

<style lang="scss" scoped>
.xm-businesses-business-grow::v-deep {
  background-color: rgba(#fedddd, 0.4);

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
      background-image: url('~assets/images/Businesses/business-grow-background.webp');
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      min-height: 375px;

      img {
        position: absolute;
        top: -13%;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }

    .right-content {
      display: flex;
      flex-wrap: wrap;

      ._icon {
        opacity: 0.3;
        margin-right: 10px;
        padding-top: 3px;
      }

      ._content {
        h3 {
          margin-bottom: 10px;
          color: $secondary;
          text-transform: uppercase;
        }

        .description {
          p {
            margin-bottom: 10px;
            font-size: 1.1429rem;
            font-weight: 300;
            line-height: 1.7143rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    background-image: url('~assets/images/Businesses/business-grow-background.webp');
    background-position: left center;
    background-repeat: no-repeat;
    background-size: contain;

    .contents {
      .left-content {
        background-image: none;
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 50px 0 0;
    background-size: cover;
    background-position: bottom -200px center;

    .contents {
      .left-content,
      .right-content {
        width: 100%;
      }

      .left-content {
        order: 2;
        text-align: center;
        margin-top: 20px;

        img {
          position: unset;
          top: unset;
          left: unset;
          right: unset;
          margin: 0;
        }
      }

      .right-content {
        order: 1;
      }
    }
  }
}
</style>
