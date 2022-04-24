<template lang="pug">
.welcome-banner
  .container
    .call-to-action.has-text-centered
      .is-flex.is-justify-content-center
        img(src="~assets/icons/primary/welcomeLogo.svg")
      p.has-text-secondary.my-5 Welcome to the world’s healthiest social network
      b-button(type="is-primary" tag="router-link" to="/signup" v-if="!isLoggedIn")
        b JOIN NOW -
        i.is-family-secondary It's fast and free
</template>

<script>
export default {
  name: 'XMHomeActiveBanner',
}
</script>

<style lang="scss" scoped>
.welcome-banner {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 50px;
  background-image: url('~assets/images/HomePage/welcome-banner.jpg');
  width: 100%;
  height: 321px;
  position: relative;
  .call-to-action {
    position: absolute;
    width: 350px !important;
    height: 195px;
    right: 70px;
    top: 60px;
    p {
      font-size: 22px;
      line-height: 32px;
      font-weight: 500;
    }
  }
}

@media (max-width: '500px') {
  .welcome-banner {
    margin-top: 50px;
    .call-to-action {
      margin: 0 auto;
      position: absolute;
      top: 150px !important;
      left: 50%; /* Position X halfway in */
      transform: translate(-50%, -50%); /* Move it halfway back(x,y) */
    }
  }
}
</style>
