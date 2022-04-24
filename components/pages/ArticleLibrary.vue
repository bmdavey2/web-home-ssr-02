<template lang="pug">
.container
  XMArticleTabs(@selectedTab="setTab")
  template(v-if="tab === 'Published'")
    XMArticleTotals(:aggregates="Aggregates")
    XMArticleCounter(title="Published articles", :count="publishedCount")
    XOArticleLibraryPublished(:published="published" @onEmit="onEmit")
  template(v-if="tab === 'Draft'")
    XMArticleCounter(title="Drafts", :count="draftsCount")
    XOArticleLibraryDraft(:drafts="drafts" @onEmit="onEmit")
  b-loading(v-model="isLoading")
</template>

<script>
import gql from 'graphql-tag'
import XMArticleTabs from '~/components/molecules/Article/Tabs'
import XMArticleTotals from '~/components/molecules/Article/Totals'
import XMArticleCounter from '~/components/molecules/Article/Counter'
import XOArticleLibraryPublished from '~/components/organisms/Article/Library/Published'
import XOArticleLibraryDraft from '~/components/organisms/Article/Library/Draft'

export default {
  name: 'XPArticleLibrary',
  components: { XOArticleLibraryDraft, XOArticleLibraryPublished, XMArticleCounter, XMArticleTotals, XMArticleTabs },
  data() {
    return {
      tab: 'Published',
      published: [],
      drafts: [],
      isLoading: false,
      Aggregates: {},
      removePublished: 0,
      removeDrafts: 0,
    }
  },
  computed: {
    publishedCount() {
      return parseFloat(this.Aggregates?.published || 0) - parseFloat(this.removePublished)
    },
    draftsCount() {
      return parseFloat(this.Aggregates?.drafts || 0) - parseFloat(this.removeDrafts)
    },
  },
  created() {
    this.loadAggregates()
  },
  methods: {
    setTab(tab) {
      this.tab = tab
    },
    async loadAggregates() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Me {
                Articles {
                  Aggregates {
                    drafts
                    published
                    views
                    likes
                    comments
                  }
                }
              }
            }
          `,
        })
        this.Aggregates = data.Me?.Articles?.Aggregates
      } catch (error) {
        this.doTrackSegmentError(error, 'My Articles')
      } finally {
        this.loadDraftsArticles()
        this.loadPublishedArticles()
        this.$store.commit('control/setLoading', { name: `app/loading`, value: false })
      }
    },
    async loadDraftsArticles() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Me {
                Articles {
                  Drafts {
                    id
                    slug
                    title
                    subtitle
                    CategoryIDs
                    content
                    coverPhotoURL
                    Member {
                      slug
                      name
                      profilePhotoURL
                    }
                    Business {
                      slug
                      name
                      profilePhotoURL
                    }
                  }
                }
              }
            }
          `,
        })

        this.drafts = data.Me?.Articles?.Drafts
      } catch (error) {
        this.doTrackSegmentError(error, 'My Articles')
      }
    },
    async loadPublishedArticles() {
      try {
        const { data } = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          query: gql`
            query {
              Me {
                Articles {
                  Published {
                    id
                    publishedAt
                    slug
                    title
                    subtitle
                    CategoryIDs
                    Categories {
                      id
                      name
                    }
                    content
                    coverPhotoURL
                    Member {
                      slug
                      name
                      profilePhotoURL
                    }
                    Business {
                      slug
                      name
                      profilePhotoURL
                    }
                    FeedItem {
                      Aggregates {
                        comments
                        likes
                      }
                    }
                  }
                }
              }
            }
          `,
        })

        this.published = data.Me?.Articles?.Published
      } catch (error) {
        this.doTrackSegmentError(error, 'My Articles')
      }
    },
    onEmit(data) {
      switch (data.name) {
        case 'Edit':
          if (data.type === 'Published') {
            location.href = 'articles/published/' + data.id
          } else {
            location.href = 'articles/drafts/' + data.id
          }
          break
        case 'Delete':
          this.$buefy.modal.open({
            parent: this,
            component: require('~/components/molecules/Article/Library/ArticleDialog').default,
            width: 320,
            props: {
              heading: 'Are you sure to delete an article?',
            },
            events: {
              onclickActionEmit: () => {
                this.deleteArticle(data.id, data.type)
                this.isLoading = true
              },
            },
            canCancel: false,
          })
          break
        case 'Publish':
          if (data.coverPhotoUrl == null) {
            this.$buefy.modal.open({
              parent: this,
              component: require('~/components/molecules/Article/Library/ArticleDialog').default,
              width: 320,
              props: {
                heading: 'You can not publish without cover',
                subHeading: 'Would you like to edit article?',
              },
              events: {
                onclickActionEmit: () => {
                  location.href = '/article/edit/?id=' + data.id + '&status=' + data.type
                },
              },
              canCancel: false,
            })
          } else {
            this.publishArticle(data.id)
            this.isLoading = true
          }
          break
        case 'Unpublish':
          this.$buefy.modal.open({
            parent: this,
            component: require('~/components/molecules/Article/Library/ArticleDialog').default,
            width: 320,
            props: {
              heading: 'Are you sure to Unpublish this article?',
            },
            events: {
              onclickActionEmit: () => {
                this.unpublishArticle(data.id)
                this.isLoading = true
              },
            },
            canCancel: false,
          })
          break
        default:
          break
      }
    },
    async deleteArticle(id, type) {
      try {
        await this.$apollo.mutate({
          variables: { id },
          mutation: gql`
            mutation ($id: String!) {
              deleteArticle(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'My Articles')
      } finally {
        this.$toast?.success(`Article Id:` + id + ` has been deleted`, { duration: 2000, position: 'bottom-right' })
        if (type === 'Drafts') {
          await this.loadDraftsArticles()
          this.removeDrafts++
        } else {
          await this.loadPublishedArticles()
          this.removePublished++
        }
        this.isLoading = false
      }
    },
    async unpublishArticle(id) {
      try {
        await this.$apollo.mutate({
          variables: { id },
          mutation: gql`
            mutation ($id: String!) {
              unpublishArticle(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'My Articles')
      } finally {
        this.loadPublishedArticles()
        this.loadDraftsArticles()
        this.removePublished++
        this.isLoading = false
        this.$toast?.success(`Article has been Unpublished`, { duration: 2000, position: 'bottom-right' })
      }
    },
    async publishArticle(id) {
      let result
      try {
        result = await this.$apollo.mutate({
          context: this.getGraphQLContext(),
          variables: { id },
          mutation: gql`
            mutation ($BusinessID: String, $id: String!) {
              publishArticle(id: $id, BusinessID: $BusinessID) {
                objectID
                success
              }
            }
          `,
        })
        this.$buefy.modal.open({
          parent: this,
          component: require('~/components/molecules/Article/Library/ArticlePublishedDialog').default,
          width: 700,
          props: {
            articleId: result.data?.objectID,
          },
          canCancel: false,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'My Articles')
      } finally {
        this.loadDraftsArticles()
        this.loadPublishedArticles()
        this.removeDrafts++
        this.isLoading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.articles-card {
  margin: 20px auto;
  max-width: 575px !important;

  &:last-child {
    padding-bottom: 10px;
  }
}
</style>
