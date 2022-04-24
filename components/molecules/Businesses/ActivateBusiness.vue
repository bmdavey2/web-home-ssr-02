<template lang="pug">
.xm-businesses-activate-business
  .container
    .contents
      h3 #[sup: img(src="~assets/images/Businesses/list-icon.webp")] WE TRULY BELIEVE THAT ACTIVEPLACE IS BETTER FOR YOU
      p People are more passionate about health and fitness than ever before, having your business on ActivePlace means being right in the middle of it all.
      .actions: b-button.is-uppercase(
        type="is-primary"
        size="is-medium"
        tag="router-link"
        to="/businesses/plans-pricing") Activate your Business
</template>

<script>
export default {
  name: 'XMBusinessesActivateBusiness',
}
</script>

<style lang="scss" scoped>
.xm-businesses-activate-business::v-deep {
  background-color: rgba(#fff1c4, 0.3);
  min-height: 425px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;

  .contents {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;

    h3 {
      text-transform: uppercase;
      color: $secondary;
      margin-bottom: 20px;

      sup {
        padding-right: 15px;
        position: relative;

        img {
          opacity: 0.3;
          position: absolute;
          top: 5px;
          left: 0;
        }
      }
    }

    p {
      font-size: 1.1429rem;
      line-height: 1.7143rem;
    }

    .actions {
      margin-top: 40px;
    }
  }
}
</style>
