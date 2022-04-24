import Vue from 'vue'
import SimpleValidator from 'simple-vue-validator'
import moment from 'moment'
import gql from 'graphql-tag'

Vue.use(SimpleValidator)

Vue.mixin({
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
    currentBusinessID: {
      get() {
        return this.$store.state.app.currentBusiness
      },
      set(value) {
        this.$store.commit('app/setCurrentBusiness', value)
      },
    },
    selectedCategoryID: {
      get() {
        return this.$store.state.app.selectedCategory
      },
      set(value) {
        this.$store.commit('app/setSelectedCategory', value)
      },
    },
    baseURL() {
      return process.env.baseURL
    },
    activeplaceLogo() {
      return 'https://firebasestorage.googleapis.com/v0/b/activeplace-production-assets/o/categories%2Flogo-primary.webp?alt=media'
    },
  },
  methods: {
    getMyProfileType() {
      if (this.currentBusinessID) {
        return 'Business'
      }
      return 'Member'
    },
    async getMyMemberID() {
      const { data } = await this.$apollo.query({
        query: gql`
          query {
            Me {
              Profile {
                Member {
                  id
                }
              }
            }
          }
        `,
      })
      return data.Me?.Profile?.Member?.id
    },
    getGraphQLContext(placement) {
      if (this.currentBusinessID) {
        return {
          headers: {
            'X-ActivePlace-Business-ID': this.currentBusinessID,
            // 'X-ActivePlace-Device-Name': this.$appClient.getDeviceName(),
            'X-ActivePlace-Device-Platform': 'website',
            'X-ActivePlace-Client-Type': 'browser',
            'X-ActivePlace-Placement': placement,
          },
        }
      } else {
        return {
          headers: {
            // 'X-ActivePlace-Device-Name': this.$appClient.getDeviceName(),
            'X-ActivePlace-Device-Platform': 'website',
            'X-ActivePlace-Client-Type': 'browser',
            'X-ActivePlace-Placement': placement,
          },
        }
      }
    },
    async getMyDisplayProfile() {
      if (this.currentBusinessID) {
        const { data } = await this.$apollo.query({
          variables: {
            id: this.currentBusinessID,
          },
          fetchPolicy: 'no-cache',
          query: gql`
            query ($id: String!) {
              Business(id: $id) {
                id
                slug
                name
                profilePhotoURL
                plan
              }
            }
          `,
        })
        return data.Business
      }
      const { data } = await this.$apollo.query({
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
      return data.Me.Profile.Member
    },
    showSignUpNagDialog() {
      this.$buefy.modal.open({
        parent: this,
        component: () => import('~/components/pages/SignUpNag'),
        width: 700,
        canCancel: false,
      })
    },
    showLogInDialog() {
      this.$buefy.modal.open({
        parent: this,
        component: () => import('~/components/pages/LogIn'),
        width: 600,
      })
    },
    showCreateProfileDialog({ redirectOnCompletion }) {
      this.$buefy.modal.open({
        parent: this,
        component: () => import('~/components/pages/SignUpProfile'),
        fullScreen: true,
        width: '100%',
        animation: null,
        props: {
          redirectOnCompletion,
        },
      })
    },
    convertStringToSlug(value) {
      value = value.toLowerCase()
      value = value.replace(/[á|ã|â|à]/gi, 'a')
      value = value.replace(/[é|ê|è]/gi, 'e')
      value = value.replace(/[í|ì|î]/gi, 'i')
      value = value.replace(/[õ|ò|ó|ô]/gi, 'o')
      value = value.replace(/[ú|ù|û]/gi, 'u')
      value = value.replace(/[ç]/gi, 'c')
      value = value.replace(/[ñ]/gi, 'n')
      value = value.replace(/[á|ã|â]/gi, 'a')
      value = value.replace(/\W/gi, '-')
      value = value.replace(/(-)\1+/gi, '-')

      return value
    },
    getAllExternalLinks() {
      const links = document.getElementsByTagName('a')
      links.forEach((link) => {
        if (link.hasAttribute('target')) {
          link.addEventListener('click', () => {
            const linkURL = link.getAttribute('href')
            const domain = new URL(linkURL)
            let linkText, userId, groupId
            if (link.textContent === '') {
              const img = link.getElementsByTagName('img')
              linkText = img[0].getAttribute('alt')
            } else {
              linkText = link.textContent
            }
            if (this.isLoggedIn) {
              if (this.currentBusinessID) {
                groupId = this.currentBusinessID
              } else {
                userId = this.$store.state.auth?.uid
              }
            }
            const details = {
              domain: domain.hostname,
              linkURL,
              linkText,
              groupId,
              userId,
            }
            this.$appClient.segment.trackClickedExternalLink(details)
          })
        }
      })
    },
    getFullPhotoURL(url) {
      if (!url) {
        return
      }
      const data = url.split('/')
      const objectID = data[4].split('-')
      if (objectID.length === 6) {
        objectID.pop()
        const imageLength = data[4].length
        return url.slice(0, -imageLength) + objectID.join('-') + '.jpg'
      } else {
        return url
      }
    },
    async getActiveBusinessDetails() {
      if (!this.currentBusinessID) {
        this.$store.dispatch('business/setBusinessSubscription', {
          plan: null,
          follows: 0,
          cancelled: false,
          endTime: null,
        })
        return
      }

      try {
        const { data } = await this.$apollo.query({
          variables: {
            id: this.currentBusinessID,
          },
          context: this.getGraphQLContext(),
          query: gql`
            query ($id: String) {
              Business(id: $id) {
                id
                name
                plan
                Aggregates {
                  follows
                }
              }
            }
          `,
        })

        const businessPlan = await this.$apollo.query({
          fetchPolicy: 'no-cache',
          variables: {
            actorID: this.profile?.id,
            actorType: 'Member',
          },
          context: this.getGraphQLContext(),
          query: gql`
            query {
              getMyBusinessSubscription {
                periodStartTime
                periodEndTime
                canceled
              }
            }
          `,
        })

        const { Business } = data

        this.$store.dispatch('business/setBusinessSubscription', {
          plan: Business?.plan,
          follows: Business?.Aggregates?.follows,
          cancelled: businessPlan?.data?.getMyBusinessSubscription?.canceled,
          endTime: businessPlan?.data?.getMyBusinessSubscription?.periodEndTime,
        })
      } catch (error) {}
    },
    trackNonLoggedUser({ page }) {
      setTimeout(() => {
        if (page === 'CloseDialog') {
          localStorage.setItem('lastDialogDate', moment())
          localStorage.setItem('dialogShowed', 'true')
          localStorage.setItem('viewedPage', JSON.stringify([]))
        } else {
          const pageItem = JSON.parse(localStorage.getItem('viewedPage')) || []
          if (!pageItem.includes(page)) {
            pageItem.push(page)
          }
          if (pageItem.length >= 2) {
            const start = moment()
            const end = localStorage.getItem('lastDialogDate')
              ? moment(localStorage.getItem('lastDialogDate'))
              : moment()
            const days = moment(start).diff(end, 'days')
            const showed = JSON.parse(localStorage.getItem('dialogShowed'))
            if (showed === true && days >= 1) {
              this.showSignUpNagDialog()
            } else if (!showed) {
              this.showSignUpNagDialog()
            }
          } else {
            localStorage.setItem('viewedPage', JSON.stringify(pageItem))
          }
        }
      }, 1000)
    },
    clearSignUpStorage() {
      localStorage.setItem('lastDialogDate', moment())
      localStorage.setItem('dialogShowed', 'false')
      localStorage.setItem('viewedPage', JSON.stringify([]))
    },
    getFollowLimit(isFollowing) {
      // TODO activate this function once there's business subscription
      // TODO add isFollowing params once there's business subscription
      if (this.currentBusinessID === null) return
      const plan = this.$store.getters['business/getBusinessSubscription']?.plan
      const follows = this.$store.getters['business/getBusinessSubscription']?.follows

      if (!isFollowing) {
        this.$store.dispatch('business/setBusinessSubscription', {
          follows: follows + 1,
        })
        if (plan === null && follows >= 100) {
          const details = {
            type: 'follow',
            limit: 100,
          }

          this.$buefy.modal.open({
            component: require('~/components/organisms/PlanLimit').default,
            parent: this,
            width: 600,
            canCancel: false,
            props: { details },
          })
          return true
        }

        if (plan.toLowerCase() === 'starter' && follows >= 1000) {
          const details = {
            type: 'follow',
            limit: 1000,
          }
          this.$buefy.modal.open({
            component: require('~/components/organisms/PlanLimit').default,
            parent: this,
            width: 600,
            canCancel: false,
            props: { details },
          })
          return true
        }
      } else {
        this.getActiveBusinessDetails()
      }

      return false
    },
    doTrackSegmentError(error, page) {
      const currentRoute = this.$route?.name
      const url = window.location.href

      switch (currentRoute) {
        case 'trending':
          page = 'Trending'
          break
        case 'my-feed':
          page = 'My Feed'
          break

        case 'p-slug':
          page = 'User Profile'
          break

        case 'b-slug':
          page = 'Business Profile'
          break

        case 'u-slug':
          page = 'Update'
          break

        case 'marketplace':
          page = 'MarketPlace'
          break

        case 'marketplace-category':
          page = 'MarketPlace Category'
          break

        case 'marketplace-category-sub':
          page = 'MarketPlace Category'
          break

        case 'me-articles-drafts-id':
          page = 'Create Article'
          break

        case 'me-articles-published-id':
          page = 'Edit Article'
          break

        default:
          break
      }

      this.$appClient.segment.trackError({ error, page, url })
    },
    getAPIURL() {
      if (process.env.baseAPIURL) {
        return process.env.baseAPIURL.replace('/graphql', '')
      }
    },
    doTrackSegmentClickedExternalLink(event) {
      const element = event?.target

      let groupId, userId
      if (this.isLoggedIn) {
        if (this.currentBusinessID) {
          groupId = this.currentBusinessID
        } else {
          userId = this.$store.state.auth?.uid
        }
      }
      const details = {
        domain: element.hostname,
        linkURL: element.attributes.href.value,
        linkText: element.textContent,
        groupId,
        userId,
      }
      this.$appClient.segment.trackClickedExternalLink(details)
    },
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ store, app }, inject) => {
  inject('app', {
    getNameInitials: (name) => {
      if (!name) return ''
      return name
        .split(' ')
        .map((x) => x.substring(0, 1))
        .slice(0, 2)
        .join('')
    },
    setPageLoader(value = true) {
      store.commit('control/setLoading', {
        name: `app/loading`,
        value,
      })
    },
  })
}

Vue.filter('truncate', (value, charLimit = 10) => {
  if (value.length > charLimit) {
    return `${value.substring(0, charLimit)}...`
  }
  return value
})

Vue.filter('removeHTMLTags', (value) => {
  return value.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ')
})

Vue.filter('dateFormat', (value, format = 'MMM DD, YYYY') => {
  return moment(value).format(format)
})
