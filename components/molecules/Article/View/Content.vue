<template lang="pug">
.article-content.has-text-weight-light.pt-5.pb-5
  #editorContent(v-html="content")
</template>

<script>
export default {
  name: 'XMArticleViewContent',
  computed: {
    article() {
      return this.$parent.article
    },
    content() {
      return this.article?.content
    },
  },
  mounted() {
    this.doAddClickEventOnUserTagged()
  },
  methods: {
    doAddClickEventOnUserTagged() {
      const editor = document.getElementById('editorContent')
      const taggedUsers = editor.getElementsByTagName('a')

      const fileContent = editor.getElementsByClassName('fileDiv ')

      fileContent.forEach((element) => {
        const content = element.getElementsByClassName('img-caption')
        const link = content[0].getElementsByTagName('a')
        link.forEach((element) => {
          const content = element.textContent
          if (!content.includes('@')) {
            element.addEventListener('click', () => {
              const url = element.getAttribute('href')
              window.open(url, '_blank')
            })
          }
        })
      })

      taggedUsers.forEach((element) => {
        const content = element.textContent
        if (content.includes('@')) {
          element.addEventListener('click', (e) => {
            e.preventDefault()
            const url = element.getAttribute('href')
            const valid = this.validURL(url)
            if (valid) {
              window.open(url, '_blank')
            } else {
              this.$router.push({
                path: url,
              })
            }
          })
        }
      })
    },
    validURL(str) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ) // fragment locator
      return !!pattern.test(str)
    },
  },
}
</script>

<style lang="scss" scoped>
.article-content::v-deep {
  max-width: 900px;
  width: 100%;
  margin: auto;
  font-size: 16px;

  @media (max-width: $tabletLG) {
    padding: 0 1.5rem !important;
  }

  .removehr::before {
    background: none !important;
    content: '' !important;
  }

  div:empty::before {
    background: none !important;
    content: '' !important;
  }

  .scn-edit {
    display: none !important;
  }

  .et_pb_row,
  .et_pb_column {
    @media screen and (max-width: 767px) {
      width: 100% !important;
    }
  }
}
</style>
