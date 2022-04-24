<template lang="pug">
.xm-register-interest-success
  .card
    .header
      h2 Thanks, your inquiry has been received
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
    .card-content
      p ActivePlace has sent your inquiry to {{ businessName }}. Please expect to hear from them.
      p If you do not get a response from the business within a reasonable timeframe please let us know, we're extremely passionate about customer service and want to ensure you’re looked after.
</template>

<script>
export default {
  name: 'XMRegisterInterestSuccess',
  props: {
    product: Object,
  },
  computed: {
    businessName() {
      return this.product?.Business.name || 'Business'
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-register-interest-success::v-deep {
  .card {
    .header {
      width: 100%;
      height: 230px;
      background-image: url('~assets/images/SignUp/business-header-badges.png');
      background-size: cover;
      background-position: bottom -40px center;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      padding: 20px 50px;

      h2 {
        font-size: 2.8571rem;
        color: $secondary;
      }

      .close {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
      }
    }

    .card-content {
      padding: 50px 50px 30px;
      color: #050505;

      p {
        font-size: 1.1429rem;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
