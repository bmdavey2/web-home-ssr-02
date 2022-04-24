<template lang="pug">
XPBusinessProfileEdit
</template>

<script>
import gql from 'graphql-tag'
import meta from '~/mixins/meta'
import XPBusinessProfileEdit from '~/components/pages/BusinessProfileEdit'
export default {
  middleware: ['registeredOnly'],
  components: { XPBusinessProfileEdit },
  mixins: [meta],
  created() {
    this.metaTitle = 'Edit Business'
  },
  async mounted() {
    if (!(await this.doRetrieveBusinesses())) {
      this.$router.push({
        path: '/',
      })
    }
    this.$appClient.segment.trackPageView({ page: 'Edit Business' })
  },
  methods: {
    async doRetrieveBusinesses() {
      const { data } = await this.$apollo.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            Me {
              BusinessRoles {
                Business {
                  slug
                }
              }
            }
          }
        `,
      })

      const businesses = data?.Me?.BusinessRoles.map((business) => {
        return business?.Business?.slug
      })
      const business = this.$route.params?.profile

      if (businesses.includes(business)) {
        return true
      }
      return false
    },
  },
}
</script>
