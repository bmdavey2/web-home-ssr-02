<template lang="pug">
.article-loader(:class="isMobileColumn && 'is-mobile-column'")
  .desktop-loader
    .image-container.mb-4: b-skeleton(width="100%" height="250px")
    .content-container
      b-skeleton(width="100%" v-for="n in 4", :key="n")
      b-skeleton(width="50%")
  .mobile-loader
    .image-container.mb-4: b-skeleton(width="100%" height="100px")
    .content-container
      b-skeleton(width="100%" v-for="n in 4", :key="n")
      b-skeleton(width="50%")
</template>

<script>
export default {
  name: 'XOArticleIndexLoader',
  props: {
    isMobileColumn: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.article-loader::v-deep {
  .mobile-loader {
    display: none;
  }

  @media screen and (max-width: 427px) {
    .desktop-loader {
      display: none;
    }
    .mobile-loader {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &.is-mobile-column {
      .mobile-loader {
        .image-container {
          width: calc(40% - 10px);
        }

        .content-container {
          width: calc(60% - 10px);
        }
      }
    }
  }
}
</style>
