<template lang="pug">
XPMyFeed(:categories="categories")
</template>

<script>
import gql from 'graphql-tag'
import meta from '~/mixins/meta'
import XPMyFeed from '~/components/pages/MyFeed'
export default {
  components: { XPMyFeed },
  middleware: ['registeredOnly'],
  mixins: [meta],
  data() {
    return {
      categories: null,
    }
  },
  watch: {
    currentBusinessID() {
      this.doRetrieveCategories()
    },
  },
  mounted() {
    this.doRetrieveCategories()
    this.getAllExternalLinks()
    const fullScreen = this.lt('tabletLG')
    if (this.$store.getters['signup/getSignupAsMentor']) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/MentorSetupSuccess').default,
        parent: this,
        width: 635,
        canCancel: false,
        customClass: 'bg-white',
        fullScreen,
        props: {
          fullScreen,
        },
      })
    }
    this.$appClient.segment.trackPageView({ page: 'My Feed' })
  },
  created() {
    this.metaTitle = 'My Feed'
  },
  methods: {
    async doRetrieveCategories() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          context: this.getGraphQLContext(),
          query: gql`
            query {
              Me {
                Profile {
                  Member {
                    Categories {
                      id
                      name
                      PhotoURL
                    }
                  }
                  Business {
                    Categories {
                      id
                      name
                      PhotoURL
                    }
                  }
                }
              }
            }
          `,
        })

        this.categories = data?.Me?.Profile?.Member?.Categories || data?.Me?.Profile?.Business?.Categories
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
  },
}
</script>
