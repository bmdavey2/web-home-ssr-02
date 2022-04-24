import debounce from 'lodash/debounce'
import gql from 'graphql-tag'

export default {
  computed: {
    tributeOptions() {
      return {
        trigger: '@',
        values: debounce(async (text, cb) => {
          if (!text) {
            cb([])
            return
          }
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
                  Business {
                    name
                    slug
                    profilePhotoURL
                  }
                  Article {
                    title
                    slug
                    coverPhotoURL
                  }
                  Product {
                    title
                    slug
                    coverPhotoURL
                    Categories {
                      id
                      PhotoURL
                    }
                  }
                }
              }
            `,
          })
          const values = data.SocialSearchSuggestions.map(({ objectType, Article, Member, Business, Product }) => {
            const data =
              objectType === 'Article'
                ? Article
                : objectType === 'Business'
                ? Business
                : objectType === 'Member'
                ? Member
                : Product

            const name = objectType === 'Article' || objectType === 'Product' ? data?.title : data?.name
            return {
              key: name ? name.replace(/&amp;/g, '&') : '',
              value: name ? name.replace(/&amp;/g, '&') : '',
              link: `/${
                objectType === 'Article'
                  ? 'a'
                  : objectType === 'Business'
                  ? 'b'
                  : objectType === 'Member'
                  ? 'p'
                  : 'marketplace/p'
              }/${data?.slug}`,
              image:
                objectType === 'Article'
                  ? data?.coverPhotoURL
                  : objectType === 'Product'
                  ? data?.coverPhotoURL
                    ? data?.coverPhotoURL
                    : data?.Categories[0]?.PhotoURL || null
                  : data?.profilePhotoURL,
            }
          })
          cb(values)
        }, 500),
        menuItemTemplate(item) {
          return `<div class='is-flex is-align-items-center is-clickable'><img class='tribute-avatar mr-3' src='${
            item.original.image || require('~/assets/images/default_user.jpg')
          }'>${item.original.key}</div>`
        },
        noMatchTemplate() {
          return '<span style:"visibility: hidden;"></span>'
        },
        selectTemplate(item) {
          return `<span contenteditable='false'><a href='${item.original.link}'>@${item.original.value}</a></span>`
        },
        allowSpaces: true,
      }
    },
  },
}
