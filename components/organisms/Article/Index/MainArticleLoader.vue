<template lang="pug">
.main-article-loader
  .left-content
    b-skeleton(v-for="n in 7", :key="n")
    b-skeleton(width="50%")
  .right-content
    b-skeleton(width="100%" height="300px")
</template>

<script>
export default {
  name: 'XOArticleIndexMainLoader',
}
</script>

<style lang="scss" scoped>
.main-article-loader::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  .left-content,
  .right-content {
    width: calc(100% / 2 - 20px);
  }

  @media screen and (max-width: 767px) {
    .left-content,
    .right-content {
      width: 100%;
    }

    .left-content {
      order: 2;
    }

    .right-content {
      order: 1;
      margin-bottom: 10px;
    }
  }
}
</style>
