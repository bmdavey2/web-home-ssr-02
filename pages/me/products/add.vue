<template lang="pug">
XPMarketPlaceProductAdd(v-if="!isRetrieving", :profile="profile.Member || profile.Business")
</template>

<script>
import gql from 'graphql-tag'
import XPMarketPlaceProductAdd from '~/components/pages/MarketPlace/Product/Add'
export default {
  middleware: ['businessOnly'],
  components: { XPMarketPlaceProductAdd },
  data() {
    return {
      profile: null,
      isRetrieving: true,
    }
  },
  beforeCreate() {
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: true,
    })
  },
  async mounted() {
    await this.doRetrieveProfile()
    this.$store.commit('control/setLoading', {
      name: `app/loading`,
      value: false,
    })
  },
  methods: {
    async doRetrieveProfile() {
      this.isRetrieving = true
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          context: this.getGraphQLContext(),
          query: gql`
            query {
              Me {
                Profile {
                  Member {
                    id
                  }
                  Business {
                    id
                    plan
                  }
                }
              }
            }
          `,
        })
        this.profile = data?.Me?.Profile
      } catch (error) {
        this.doTrackSegmentError(error, 'Add Product')
      } finally {
        this.isRetrieving = false
      }
    },
  },
  head() {
    return {
      title: 'MarketPlace Add Product | ActivePlace',
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'MarketPlace Add Product | ActivePlace',
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
          content: 'MarketPlace Add Product | ActivePlace',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'MarketPlace Add Product | ActivePlace',
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
          content: 'MarketPlace Add Product | ActivePlace',
        },
      ],
    }
  },
}
</script>
