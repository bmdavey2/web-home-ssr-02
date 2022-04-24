<template lang="pug">
.page-add-article
  XOArticlePublish(@onClickPublished="saveEditData" @setPublisher="setPublisher")
  XOArticleHeader.extra-content(@setData="setData", :initialcoverURL="this.initialCoverURL", :categories="categories")
  XOArticleEditor(:content="initialContent" v-model="article.content", :isFixed="isFixed")
  b-loading(v-model="isLoading")
</template>

<script>
import debounce from 'lodash/debounce'
import compact from 'lodash/compact'
import Hls from 'hls.js'
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import XOArticleHeader from '~/components/organisms/Article/Header'
import XOArticlePublish from '~/components/organisms/Article/Publish'
import XOArticleEditor from '~/components/organisms/Article/Editor'
/* eslint-disable unicorn/prefer-text-content */
export default {
  name: 'XPArticleCreate',
  components: { XOArticleHeader, XOArticleEditor, XOArticlePublish },
  props: {
    categories: Array,
    status: String,
  },
  data() {
    return {
      isFixed: true,
      article: {
        selectedCategory: [],
        coverId: null,
        coverCaption: '',
        title: '',
        subtitle: '',
        content: '',
        articleId: '',
      },
      timeout: true,
      value: '',
      isLoading: false,
      isEdit: true,
      accounts: [],
      business: [],
      initialContent: '',
      initialCoverURL: null,
      selectedEditor: null,
    }
  },
  computed: {
    ...mapGetters({
      getUserProfileMember: 'user/getUserProfileMember',
      getMainUser: 'user/getMainUser',
    }),
    selectedCategories() {
      return this.categories?.filter((x) => this.article?.selectedCategory?.includes(x.id))
    },
  },
  watch: {
    article: {
      deep: true,
      handler(value) {
        if (this.status === 'Drafts' && this.timeout === 'saved') {
          this.updateArticle(value)
        }
      },
    },
  },
  created() {
    this.loadArticle()
    setTimeout(() => {
      this.loadAccounts()
    }, 2000)
    this.$store.commit('control/setLoading', { name: `app/loading`, value: true })
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    setPublisher(data) {
      this.selectedEditor = data
    },
    saveEditData(data) {
      if (this.isEdit) {
        if (this.status === 'Published') {
          this.updateArticle(this.article)
        } else if (this.status === 'Drafts') {
          this.onClickPublished(data)
        }
      }
    },
    setData(data) {
      const name = data.name
      switch (name) {
        case 'selectedCategory':
          this.article.selectedCategory = data.value
          break
        case 'subtitle':
          this.article.subtitle = data.value
          break
        case 'title':
          this.article.title = data.value
          break
        case 'coverId':
          this.article.coverId = data.value
          break
        case 'coverCaption':
          this.article.coverCaption = data.value
          break

        default:
          break
      }
    },
    updateArticle: debounce(async function (value) {
      this.timeout = false
      try {
        if (this.status === 'Published') this.isLoading = true

        const content = document.createElement('p')
        content.innerHTML = value.content
        const plainContent = content.textContent.slice(0, 400) || content.textContent.slice(0, 400)

        const article = {
          title: value.title,
          subtitle: value.subtitle,
          CategoryIDs: value.selectedCategory,
          coverPhotoID: value.coverId,
          coverCaption: value.coverCaption,
          content: value.content,
          excerpt: plainContent,
        }

        const { data } = await this.$apollo.mutate({
          variables: { input: article, id: value.articleId },
          mutation: gql`
            mutation ($id: String!, $input: InputArticle!, $patch: Boolean) {
              editArticle(id: $id, input: $input, patch: $patch) {
                success
              }
            }
          `,
        })

        if (data) this.timeout = 'saved'
        else this.$toast?.error(`Something went Wrong`, { duration: 3 * 1000, position: 'bottom-right' })
      } catch (error) {
        this.$sentry.captureException(error)
        this.doTrackSegmentError(error)
      } finally {
        if (this.status === 'Published') {
          this.$toast?.success(`Article has been updated`, { duration: 3 * 1000, position: 'bottom-right' })
          this.isLoading = false
          setTimeout(() => {
            location.href = '/me/articles'
          }, 2000)
        }
      }
      return true
    }, 500),
    async onClickPublished(publisher) {
      const articleCategories = compact(this.selectedCategories.map((x) => x.name))
      if (!publisher) {
        this.$toast?.error(`Please Select A Publisher`, {
          duration: 3 * 1000,
          position: 'bottom-right',
        })
      } else if (this.article.subtitle === '' || !this.article.subtitle || this.article.title === '') {
        this.$toast?.error(`Oh No! Make sure you have a Title and Sub-title `, {
          duration: 3 * 1000,
          position: 'bottom-right',
        })
      } else if (this.article.articleId === '') {
        this.$toast?.error(`Invalid Article ID Please Try Again`, { duration: 3 * 1000, position: 'bottom-right' })
      } else if (this.article.selectedCategory.length === 0) {
        this.$toast?.error(`Please select one or more categories for your article`, {
          duration: 5 * 1000,
          position: 'bottom-right',
        })
        this.onClickCategories()
      } else if (!this.article.coverId && !this.initialCoverURL) {
        this.$toast?.error(`Oh No! Make sure you have  a Cover Photo`, {
          duration: 3 * 1000,
          position: 'bottom-right',
        })
      } else {
        try {
          this.isLoading = true
          const value = this.article
          const content = document.createElement('p')
          content.innerHTML = value.content
          const plainContent = content.textContent.slice(0, 400) || content.textContent.slice(0, 400)

          const article = {
            title: value.title,
            subtitle: value.subtitle,
            CategoryIDs: value.selectedCategory,
            coverPhotoID: value.coverId,
            coverCaption: value.coverCaption,
            content: value.content,
            excerpt: plainContent,
          }

          await this.$apollo.mutate({
            variables: { input: article, id: value.articleId },
            mutation: gql`
              mutation ($id: String!, $input: InputArticle!, $patch: Boolean) {
                editArticle(id: $id, input: $input, patch: $patch) {
                  success
                }
              }
            `,
          })
        } catch (error) {
          this.$sentry.captureException(error)
          this.doTrackSegmentError(error)
        } finally {
          try {
            let result
            if (!publisher.id) {
              result = await this.$apollo.mutate({
                variables: { id: this.article?.articleId },
                context: this.getGraphQLContext(),
                mutation: gql`
                  mutation ($BusinessID: String, $id: String!) {
                    publishArticle(id: $id, BusinessID: $BusinessID) {
                      objectID
                      objectType
                      success
                      timestamp
                    }
                  }
                `,
              })
            } else {
              result = await this.$apollo.mutate({
                variables: { id: this.article?.articleId, BusinessID: publisher?.id },
                context: this.getGraphQLContext(),
                mutation: gql`
                  mutation ($BusinessID: String, $id: String!) {
                    publishArticle(id: $id, BusinessID: $BusinessID) {
                      objectID
                      objectType
                      success
                      timestamp
                    }
                  }
                `,
              })
            }

            const content = document.createElement('p')
            content.innerHTML = this.article.content
            const plainContent = content.textContent.slice(0, 400) || content.textContent.slice(0, 400)

            let CoverURL
            if (!this.initialCoverURL) {
              const { data } = await this.$apollo.query({
                query: gql`
                  query ($id: String!) {
                    PhotoURL(id: $id)
                  }
                `,
                fetchPolicy: 'cache-first',
                variables: { id: this.article.coverId },
              })
              CoverURL = data?.PhotoURL
            } else {
              CoverURL = this.initialCoverURL
            }

            this.$buefy.modal.open({
              parent: this,
              component: require('~/components/molecules/Article/Library/ArticlePublishedDialog').default,
              width: 700,
              props: {
                articleId: result.data?.publishArticle?.objectID,
                articleTitle: this.article.title,
                articleCategories: articleCategories.toString(),
                articlecoverPhotoURL: CoverURL,
                articleContent: plainContent,
              },
              canCancel: false,
            })
            this.isLoading = false
          } catch (error) {
            this.$sentry.captureException(error)
            this.doTrackSegmentError(error)
          }
        }
      }
    },
    async loadArticle() {
      const id = this.$route.params?.id

      try {
        const { data } = await this.$apollo.query({
          variables: { id },
          query: gql`
            query ($id: String) {
              Article(id: $id) {
                createdAt
                publishedAt
                BusinessID
                MemberID
                UserID
                slug
                title
                subtitle
                coverCaption
                coverPhotoURL
                content(raw: true)
                CategoryIDs
                Member {
                  id
                  slug
                  name
                  profilePhotoURL
                  isFollowed
                }
                Business {
                  id
                  slug
                  name
                  profilePhotoURL
                  isFollowed
                }
              }
            }
          `,
        })

        const result = data?.Article

        this.article.selectedCategory = result.CategoryIDs || []
        this.article.coverId = result.coverPhotoID
        this.article.coverCaption = result.coverCaption
        this.article.title = result.title
        this.article.subtitle = result.subtitle
        this.initialContent = result.content
        this.initialCoverURL = result.coverPhotoURL
        this.article.articleId = this.$route.params?.id

        const isPublished = result.publishedAt || false
        isPublished ? (this.status = 'Published') : (this.status = 'Drafts')
      } catch (error) {
        this.$sentry.captureException(error)
        this.doTrackSegmentError(error)
      } finally {
        setTimeout(() => {
          this.timeout = 'saved'
          this.$store.commit('control/setLoading', { name: `app/loading`, value: false })

          const vids = document.getElementsByTagName('video')
          for (let i = 0; i < vids.length; i++) {
            const source = vids[i].getElementsByTagName('source')[0]
            if (Hls.isSupported() && source.src) {
              const hls = new Hls()
              hls.loadSource(source.src)
              hls.attachMedia(vids[i])
              window.hls = hls
            }
          }
        }, 3 * 1000)
      }
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) return

      const body = document.body
      const html = document.documentElement

      const computedHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
      const computedProfileHeight = currentScrollPosition + 1200

      this.isFixed = computedProfileHeight <= computedHeight
    },
    async loadAccounts() {
      const result = await this.$apollo.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            Me {
              Profile {
                Member {
                  id
                  slug
                  name
                  profilePhotoURL
                }
              }
            }
          }
        `,
      })
      const Mainprofile = {
        id: null,
        name: result.data?.Me?.Profile?.Member?.name,
        profilePhotoURL: result.data?.Me?.Profile?.Member?.profilePhotoURL,
      }
      this.accounts = [{ ...Mainprofile }]
      const { data } = await this.$apollo.query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            Me {
              BusinessRoles {
                role
                BusinessID
                Business {
                  name
                  slug
                  profilePhotoURL
                  email
                  CategoryIDs
                  Aggregates {
                    articles
                    updates
                    likesReceived
                  }
                  plan
                  website
                }
              }
            }
          }
        `,
      })
      data.Me?.BusinessRoles.forEach((data) => {
        this.accounts.push({
          id: data.BusinessID,
          name: data.Business.name,
          profilePhotoURL: data.Business.profilePhotoURL,
          plan: data.Business.plan,
        })
      })
    },
    onClickCategories() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/organisms/Article/Categories').default,
        width: 700,
        props: {
          initialCategories: this.article.selectedCategory,
          noCategoriesFound: true,
        },
        events: {
          doAddCategories: (value) => {
            this.article.selectedCategory = value
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page-add-article {
  background-color: white !important;
  padding-top: 100px;

  @media (max-width: 1023px) {
    padding-top: 0 !important;
  }
}
</style>
