<template lang="pug">
.xp-faq-category
  .banner: .container: h1 Frequently asked questions
  .contents-container
    .container: XMFAQBreadcumb
    .container
      .contents
        XMFAQCategories
        XMFAQCategoriesMobile
        .questions
          h2 {{ categoryTitle }}
          ul
            li(v-for="(item, index) in categoryItems", :key="index"): nuxt-link(
              :to="`/faq/${category.slug}/${item.slug}`") {{ item.question }}
</template>

<script>
import XMFAQBreadcumb from '~/components/molecules/FAQ/Breadcrumb'
import XMFAQCategories from '~/components/molecules/FAQ/Categories'
import XMFAQCategoriesMobile from '~/components/molecules/FAQ/CategoriesMobile'

export default {
  name: 'XPFAQCategory',
  components: { XMFAQBreadcumb, XMFAQCategories, XMFAQCategoriesMobile },
  computed: {
    categorySlug() {
      return this.$route?.params?.category
    },
    category() {
      return this.$store.getters['faq/getCategory'](this.categorySlug)
    },
    categoryTitle() {
      return this.category?.title
    },
    categoryItems() {
      return this.category?.items || []
    },
  },
  mounted() {
    this.$store.dispatch('faq/load')
  },
  head() {
    return {
      title: `${this.category?.title} | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.category?.title} | ActivePlace`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.activeplaceLogo,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.category?.title} | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.category?.title} | ActivePlace`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `The World's Active Community`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.activeplaceLogo,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.activeplaceLogo,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: `${this.category?.title} | ActivePlace`,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.xp-faq-category::v-deep {
  h1 {
    font-size: 5rem;
  }

  h2 {
    font-size: 2.8571rem;
  }

  .banner {
    padding: 100px 0;
  }

  .contents-container {
    background-color: $white;
    padding: 25px 0 60px;

    .contents {
      display: flex;
      flex-wrap: wrap;

      .questions {
        flex: 10000 1 0%;
        padding-left: 3rem;

        h2 {
          margin-bottom: 20px;
        }

        ul {
          li {
            margin-bottom: 20px;

            a {
              display: block;
              font-weight: 300;
              color: #848484;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 2.2857rem;
    }

    h2 {
      font-size: 1.7143rem;
    }

    .banner {
      padding: 50px 0;
    }

    .contents-container {
      .contents {
        .questions {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
