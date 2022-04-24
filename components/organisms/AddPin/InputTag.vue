<template lang="pug">
.xo-add-pin-input-tag
  b-taginput(
    v-model="product",
    :data="products"
    @typing="searchProducts"
    field="name"
    autocomplete
    ellipsis,
    :maxtags="1")
    template(v-slot="props")
      .item
        .title {{ props.option.name }}
</template>

<script>
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
export default {
  name: 'XOAddPinInputTag',
  data() {
    return {
      product: [],
      products: [],
    }
  },
  methods: {
    searchProducts: debounce(async function (text) {
      if (!text) {
        return
      }
      try {
        const { data } = await this.$apollo.query({
          variables: { text },
          query: gql`
            query ($text: String!) {
              SocialSearchSuggestions(text: $text) {
                objectID
                objectType
                Member {
                  name
                  slug
                  profilePhotoURL
                }
              }
            }
          `,
        })

        const filteredResult = data.SocialSearchSuggestions.map(({ objectType, Member }) => {
          const isMember = objectType === 'Member'
          if (isMember) {
            if (Member.slug) return Member
          }
        })
        this.products = filteredResult.filter(function (el) {
          return el != null
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Team')
      }
    }, 500),
  },
}
</script>
