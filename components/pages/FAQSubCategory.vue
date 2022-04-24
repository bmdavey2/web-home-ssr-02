<template lang="pug">
.xp-faq-sub-category(v-if="category && item")
  .container: XMFAQBreadcumb
  .container
    .contents
      XMFAQCategories
      XMFAQCategoriesMobile
      .question
        h1 {{ item.question }}
        p {{ item.answer }}
        XMPopular
</template>

<script>
import XMFAQBreadcumb from '~/components/molecules/FAQ/Breadcrumb'
import XMFAQCategories from '~/components/molecules/FAQ/Categories'
import XMFAQCategoriesMobile from '~/components/molecules/FAQ/CategoriesMobile'
import XMPopular from '~/components/molecules/FAQ/Popular'

export default {
  name: 'XPFAQSubCategory',
  components: { XMFAQBreadcumb, XMFAQCategories, XMFAQCategoriesMobile, XMPopular },
  computed: {
    categorySlug() {
      return this.$route.params?.category
    },
    category() {
      return this.$store.getters['faq/getCategory'](this.categorySlug)
    },
    itemSlug() {
      return this.$route.params?.sub
    },
    item() {
      return this.$store.getters['faq/getCategoryQuestion'](this.categorySlug, this.itemSlug)
    },
  },
  mounted() {
    this.$store.dispatch('faq/load')
  },
}
</script>

<style lang="scss" scoped>
.xp-faq-sub-category::v-deep {
  padding: 25px 0 60px;
  background-color: $white;

  h1 {
    font-size: 2.8571rem;
  }

  .contents {
    display: flex;
    flex-wrap: wrap;

    .question {
      flex: 10000 1 0%;
      padding-left: 3rem;

      h1 {
        color: $secondary;
        margin-bottom: 20px;
      }

      p {
        font-size: 1.1429rem;
        margin-bottom: 10px;
        font-weight: 300;
      }
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 1.7143rem;
    }

    .contents {
      .question {
        padding-left: 0;
      }
    }
  }
}
</style>
