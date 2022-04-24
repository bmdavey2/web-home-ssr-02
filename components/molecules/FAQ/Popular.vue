<template lang="pug">
.xm-faq-popular(v-if="category")
  h3 Popular
  .list
    template(v-for="(item, index) in category.items")
      .item(v-if="item.slug !== $route.params.sub", :key="index"): nuxt-link(:to="`/faq/${categorySlug}/${item.slug}`") {{ item.question }}
</template>

<script>
export default {
  computed: {
    categorySlug() {
      return this.$route.params?.category
    },
    category() {
      return this.$store.getters['faq/getCategory'](this.categorySlug)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-faq-popular::v-deep {
  margin-top: 50px;
  width: 100%;
  max-width: 600px;

  h3 {
    font-size: 1.5714rem;
    margin-bottom: 1.4286rem;
    color: $secondary;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: calc(100% / 2 - 50px);
      margin-bottom: 15px;

      a {
        color: #848484;
        font-weight: 300;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .list {
      .item {
        width: 100%;
      }
    }
  }
}
</style>
