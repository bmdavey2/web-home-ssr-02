<template lang="pug">
.article-publish.card
  .card-content
    h1.has-text-weight-medium.has-text-secondary.has-text-centered Published!
    h2.has-text-weight-normal.has-text-secondary.has-text-centered Your article could literally change someone’s life. On behalf of your readers, thank you!
    p.has-text-centered.has-text-weight-light Inspire people outside of ActivePlace to discover and grow by sharing your article now.
    .is-flex.is-flex-wrap-wrap.is-justify-content-center
      ul.social-container.is-flex.is-align-items-center.has-text-grey.mt-3
        li.mr-3: a._circle: b-icon(icon="linkedin")
        li.mr-3: a._circle: b-icon(icon="twitter")
        li: a._circle: b-icon(icon="facebook")

    .is-flex.is-flex-wrap-wrap.is-justify-content-center
      b-button.btn-fixed-width.is-uppercase(type="is-primary" @click="onclickLink") View My Article
</template>

<script>
export default {
  props: {
    articleId: String,
    articleTitle: String,
    articleCategories: String,
  },
  modal: {
    width: 700,
    canCancel: false,
  },
  methods: {
    onclickLink() {
      this.$emit('close')
      location.href = '/a/' + this.articleId
    },
  },
}
</script>

<style lang="scss" scoped>
.article-publish::v-deep {
  .card-content {
    padding: 90px 60px;
    position: relative;
    color: #848484;
    font-size: 1.1429rem;

    ._circle {
      font-size: 1rem;
      color: #9e9090;
      border-radius: 50%;
      border: 1px solid #848484;
      padding: 8px 7px;
      width: 42px;
      height: 42px;
      display: inline-block;
      text-align: center;
    }

    .close {
      position: absolute;
      top: 15px;
      right: 15px;
    }

    h1 {
      font-size: 40px;
      letter-spacing: -0.8px;
      line-height: 1.2;
      margin-bottom: 2.1429rem;
    }

    h2 {
      font-size: 22px !important;
      margin-bottom: 0.625rem;
    }

    .btn-fixed-width {
      width: 100%;
      max-width: 240px;
      margin: 20px 0 20px;
    }
  }

  @media sreen and (max-width: $mobileLG) {
    .card-content {
      padding: 60px 30px;

      h1 {
        font-size: 22px !important;
        margin-bottom: 0.625rem;
      }

      h2 {
        font-size: 16px !important;
        margin-bottom: 0.625rem;
      }

      p {
        font-size: 12px !important;
        margin-bottom: 0.625rem;
      }
    }
  }
}
</style>
