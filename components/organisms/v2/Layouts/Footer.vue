<template lang="pug">
.xo-layouts-footer
  .container.is-max-widescreen
    XMLayoutsFooterSocialMedia
    XMLayoutsFooterNavigation
  .copyright
    .container.is-max-widescreen
      .logo: img(src="~assets/images/v2/Layouts/activeplace-min.svg")
      .text-content &copy; ActivePlace {{ new Date().getFullYear() }}
</template>

<script>
import XMLayoutsFooterSocialMedia from '~/components/molecules/v2/Layouts/Footer/SocialMedia'
import XMLayoutsFooterNavigation from '~/components/molecules/v2/Layouts/Footer/Navigation'

export default {
  name: 'XOLayoutsFooter',
  components: { XMLayoutsFooterSocialMedia, XMLayoutsFooterNavigation },
}
</script>

<style lang="scss" scoped>
.xo-layouts-footer::v-deep {
  background-color: #08252c;

  .copyright {
    border-top: 1px solid #2a4e55;
    padding: 20px 0;
    text-align: center;
    color: #839295;
    font-size: 0.8571rem;
    font-weight: 100;

    .logo {
      margin-bottom: 10px;
      display: none;

      @include max-width(767px) {
        display: block;
      }
    }
  }

  img {
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
