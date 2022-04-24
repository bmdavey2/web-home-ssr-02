<template lang="pug">
.xm-signup-header
  .logo: img(src="~/assets/images/logo-primary.svg")
  h1: slot
</template>

<script>
export default {
  name: 'XMSignUpHeader',
  props: {
    value: String,
  },
}
</script>

<style lang="scss" scoped>
.xm-signup-header::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  h1 {
    font-size: 2.2857rem;
    line-height: 1.2;
    color: $primary;
    flex: 10000 1 0;
    border-left: 2px solid $primary;
    margin-left: 20px;
    padding-left: 20px;
  }

  @media screen and (max-width: 767px) {
    .logo {
      max-width: 50px;
    }

    h1 {
      font-size: 1.4286rem;
    }
  }
}
</style>
