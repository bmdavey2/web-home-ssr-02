<script>
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'
export default {
  name: 'XOMentionTributeHandler',
  props: {
    debounce: { type: Number, default: () => 500 },
  },
  computed: {
    options() {
      return {
        trigger: '@',
        values: debounce(async (text, cb) => {
          if (!text) {
            cb([])
            return
          }
          const { data } = await this.$apollo.query({
            variables: {
              search: this.search,
            },
            query: gql`
              query ($search: String!) {
                SocialMentionSuggestions(text: $search, count: 10) {
                  objectType
                  Member {
                    id
                    slug
                    name
                    profilePhotoURL
                  }
                  Business {
                    id
                    slug
                    name
                    profilePhotoURL
                  }
                  Article {
                    id
                    slug
                    title
                    coverPhotoURL
                  }
                }
              }
            `,
          })

          const values = data.SocialMentionSuggestions.map(({ objectType, Article, Member, Business }) => {
            const { id, name, title, slug, profilePhotoURL, coverPhotoURL } =
              objectType === 'Article' ? Article : objectType === 'Business' ? Business : Member
            return {
              key: `${objectType}:${id}`,
              value: objectType === 'Article' ? title : name,
              link: `${objectType === 'Article' ? 'a' : objectType === 'Business' ? 'b' : 'p'}/${slug}`,
              photoURL: objectType === 'Article' ? coverPhotoURL : profilePhotoURL,
            }
          })

          cb(values)
        }, this.debounce),
        menuItemTemplate(item) {
          if (item.original.photoURL == null) {
            return (
              '<div class="is-flex is-align-items-center is-clickable"><img class="tribute-avatar mr-3" src="/image/default_user.jpg">' +
              item.original.key +
              '</div>'
            )
          } else {
            return (
              '<div class="is-flex is-align-items-center is-clickable"><img class="tribute-avatar mr-3" src="' +
              item.original.photoURL +
              '">' +
              item.original.key +
              '</div>'
            )
          }
        },
        noMatchTemplate() {
          return '<span style:"visibility: hidden;"></span>'
        },
        selectTemplate(item) {
          return (
            '<span contenteditable="false"><a href="/' +
            item.original.link +
            '/' +
            item.original.value +
            '" >' +
            '@' +
            item.original.key +
            '</a></span>'
          )
        },
        allowSpaces: true,
      }
    },
  },
  watch: {
    options: {
      initial: true,
      handler(value) {
        this.$emit('options', value)
      },
    },
  },
  render(h) {
    return h()
  },
}
</script>
