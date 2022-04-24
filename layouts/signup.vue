<template lang="pug">
.xl-signup
  nuxt
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.xl-signup::v-deep {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url('~assets/images/SignUp/background-inner.jpg');
  background-position: center bottom;
  background-size: cover;

  .control {
    textarea,
    input,
    select {
      background-color: rgba($white, 0.8);
    }
  }
}
</style>
