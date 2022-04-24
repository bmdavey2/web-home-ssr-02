<template lang="pug">
span {{ name }}
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'XOMyProfileName',
  computed: {
    name() {
      return this.currentBusinessID ? this.businessName : this.$store.state.auth.displayName
    },
  },
  apollo: {
    businessName: {
      variables() {
        return {
          id: this.currentBusinessID,
        }
      },
      skip() {
        return !this.isLoggedIn || !this.currentBusinessID
      },
      query: gql`
        query ($id: String!) {
          Business(id: $id) {
            name
          }
        }
      `,
      update: (data) => (data.Business?.name ? data.Business?.name.replace(/&amp;/g, '&') : ''),
    },
  },
}
</script>
