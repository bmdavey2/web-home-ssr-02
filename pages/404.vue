<template lang="pug">
.xp-page-not-found
  .contents
    h1 We are sorry! This page is missing or you assembled the link incorrectly
    h3 We’re also sorry you didn’t own these shoes *
    .img-container: img(src="~assets/images/PageNotFound/shoe.png")
    p * They recently sold for $437,500 USD
    .actions: b-button(type="is-primary" tag="router-link" to="/") Back to Home
</template>

<script>
import meta from '~/mixins/meta'
export default {
  mixins: [meta],
  created() {
    this.metaTitle = 'Page Not Found'
  },
  mounted() {
    this.$appClient.segment.trackPageView({ page: 'Page Not Found' })
  },
}
</script>

<style lang="scss" scoped>
.xp-page-not-found::v-deep {
  min-height: calc(100vh - 417px);
  background-color: $white;
  padding: 50px 0;
  text-align: center;
  color: #65676b;

  .contents {
    width: 100%;
    max-width: 780px;
    margin: 0 auto;

    h1 {
      color: $secondary;
      font-size: 2.8571rem;
      line-height: 1.2;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 1.5714rem;
      line-height: 1.2;
      margin-bottom: 30px;
    }

    .img-container {
      width: 100%;
      max-width: 505px;
      margin: 0 auto 5px;
    }

    .actions {
      margin-top: 30px;

      a {
        width: 100%;
        max-width: 320px;
        text-transform: uppercase;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 50px 15px;

    .contents {
      h1 {
        font-size: 1.5714rem;
      }

      h3 {
        font-size: 1rem;
      }
    }
  }
}
</style>
