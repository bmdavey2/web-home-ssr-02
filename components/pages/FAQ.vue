<template lang="pug">
.xp-faq
  .banner: .container: h1 Frequently asked questions
  .questions
    .container
      .summaries
        .summary(v-for="(category, index) in $store.state.faq.content", :key="`${index}-c`")
          h3.mb-4 {{ category.title }}
          ul.mb-5
            li(v-for="(item, index) in category.items", :key="`${index}-i`"): nuxt-link(
              :to="`/faq/${category.slug}/${item.slug}`") {{ item.question }}
          .see-all.mb-6: nuxt-link(:to="`/faq/${category.slug}`") See all {{ category.items.length }} articles
</template>

<script>
export default {
  name: 'XPFAQ',
  mounted() {
    this.$store.dispatch('faq/load')
  },
}
</script>

<style lang="scss" scoped>
.xp-faq::v-deep {
  h1 {
    font-size: 5rem;
  }

  .banner {
    padding: 100px 0;
  }

  .questions {
    padding: 60px 0;
    background-color: $white;

    .summaries {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      h3 {
        font-weight: 500;
        text-transform: uppercase;
      }

      .summary {
        width: calc(100% / 3 - 50px);

        ul {
          li {
            list-style: circle;
            margin-bottom: 0.7143rem;
            margin-left: 0.7143rem;

            a {
              color: #848484;
              display: block;
              font-weight: 300;
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

    .banner {
      padding: 50px 0;
    }

    .questions {
      .summaries {
        .summary {
          width: 100%;
        }
      }
    }
  }
}
</style>
