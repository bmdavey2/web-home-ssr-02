<template lang="pug">
.section
  .first-content(style="max-width: 248px")
    nuxt-link(to="/"): figure.image.is-4by1: img(
      src="~/assets/images/Welcome/index-logo.svg"
      alt="Welcome to the world's healthiest social network"
      width="250"
      height="27"
      loading="lazy")
    h1.is-size-5.middle-text.is-family-secondary.py-5
      | Welcome to
      | the world’s healthiest social
      | network.
    .buttons: b-button.py-5(tag="a" href="/trending" type="is-primary" expanded) CLICK HERE.<i>Go to the feed.</i>
</template>

<script>
export default {
  name: 'XMWelcomeFirstSection',
}
</script>
<style lang="scss" scoped>
.first-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  text-align: center;

  .middle-text {
    white-space: pre;
  }
}
</style>
