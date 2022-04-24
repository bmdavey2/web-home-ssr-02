<template lang="pug">
div
  div Loading...
</template>

<script>
import gql from 'graphql-tag'
export default {
  watch: {
    member(value) {
      if (value) {
        this.$router.replace(`/p/${value.slug}`)
      }
    },
    business(value) {
      if (value) {
        this.$router.replace(`/b/${value.slug}`)
      }
    },
  },
  apollo: {
    member: {
      skip() {
        return !this.isLoggedIn || this.currentBusinessID
      },
      query: gql`
        query {
          Me {
            Profile {
              Member {
                slug
              }
            }
          }
        }
      `,
      update: (data) => data.Me.Profile.Member,
    },
    business: {
      skip() {
        return !this.isLoggedIn || !this.currentBusinessID
      },
      variables() {
        return {
          id: this.currentBusinessID,
        }
      },
      query: gql`
        query ($id: String!) {
          Business(id: $id) {
            slug
          }
        }
      `,
      update: (data) => data.Business,
    },
  },
}
</script>
