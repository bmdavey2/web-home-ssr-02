<template lang="pug">
.xm-marketplace-single-description.content-section
  ._title Description
  .description(v-html="description" v-if="description")
  h3(v-else) No description added.
</template>

<script>
export default {
  name: 'XMMarketPlaceSingleDescription',
  props: {
    product: Object,
  },
  computed: {
    description() {
      return this.product?.description || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-description::v-deep {
  box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
  border-radius: 6px;
  padding: 30px 20px;
  background-color: $white;
  border-bottom: 0 !important;
  margin-bottom: 30px;

  .description,
  h3 {
    font-weight: 300;
  }

  .description {
    word-break: break-word;

    p,
    span {
      font-size: 14px !important;
      font-family: 'Rotunda', sans-serif !important;
    }

    ol,
    ul {
      margin-left: 15px;
    }

    ul {
      list-style: disc;
    }

    pre {
      white-space: pre-wrap;
      background-color: transparent;
      padding: 0;
    }
  }
}
</style>
