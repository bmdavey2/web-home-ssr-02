<template lang="pug">
.article-publish-container.pt-5
  h3.is-size-4.has-text-secondary.pt-5 Totals

  ul.total-container.is-flex.is-align-items-center.is-justify-content-space-between.pt-5
    li: a.is-flex.is-align-items-center.has-text-secondary
      span: img(src="~assets/icons/primary/circle-highfive.svg" width="60" height="70")
      p.has-text-grey High Fives
      ._count.is-size-1 {{ likes }}
    li: a.is-flex.is-align-items-center.has-text-secondary
      span: img(src="~assets/icons/primary/circle-comments.svg" width="60" height="70")
      p.has-text-grey Comments
      ._count.is-size-1 {{ comments }}
    li: a.is-flex.is-align-items-center.has-text-secondary
      span: img(src="~assets/icons/primary/circle-eye.svg" width="60" height="70")
      p.has-text-grey Views
      ._count.is-size-1 {{ views }}
    li: a.is-flex.is-align-items-center.has-text-secondary
      span: img(src="~assets/icons/primary/circle-share.svg" width="60" height="70")
      p.has-text-grey Share
      ._count.is-size-1 0
</template>

<script>
export default {
  name: 'XMArticleTotals',
  props: {
    aggregates: Object,
  },
  computed: {
    likes() {
      return this.aggregates?.likes || 0
    },
    comments() {
      return this.aggregates?.comments || 0
    },
    views() {
      return this.aggregates?.views || 0
    },
  },
}
</script>

<style lang="scss" scoped>
.article-publish-container {
  .total-container {
    @media screen and (max-width: $BPdesktop) {
      display: none !important;
    }
    li {
      max-width: 253px;
      margin-right: 20px;
      max-height: 98px;
      width: 100%;

      a {
        padding: 14px 30px;
        background: #f8f8f8 !important;
        border-radius: 5px;
        width: 100%;

        p {
          font-size: 16px;
        }

        ._count {
          margin-left: auto;
        }

        span {
          margin-left: -60px;
          margin-right: 20px;

          img {
            padding-top: 10px;
          }
        }
      }
    }
  }
}
</style>
