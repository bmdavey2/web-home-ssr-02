<template lang="pug">
.xp-register-interest
  .card
    .header
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
    .card-content
      form(action="#")
        p.has-text-centered.is-size-2.has-text-secondary.mb-5 Invite Team Members
        p.is-size-4.mb-2(style="font-color: #65676b") Assign admin access to people you trust your business with, and they'll be able to:
        ul.custom-list.has-text-weight-light.mb-5
          li.mb-3 Switch from their own profile to the business profile easily
          li.mb-3 Post content and comments as the business
          //- li.mb-3 Read and publish business inbox messages
          li.mb-3 Manage MarketPlace products on behalf of the business
        template.mt-5
          section.mb-3
            p.has-text-weight-light Invite by email here
            b-taginput.custom-taginput.mb-2(v-model="emails" @input="checkEmail" placeholder="Email here" ellipsis)
          section.mb-5
            p.has-text-weight-light Invite by @tagging here
            b-taginput.custom-taginput.mb-2(
              v-model="tags"
              autocomplete,
              :data="searchResults"
              field="name"
              placeholder="Tag your ActivePlace friends"
              ellipsis
              @typing="searchTag")
              template(v-slot="props")
                .is-flex.is-align-items-center.is-clickable
                  img.tribute-avatar.mr-3(
                    :src="props.option.profilePhotoURL || require('~/assets/images/default_user.jpg')")
                  p {{ props.option.name }}
              template#empty No User Found!

        .actions
          b-button.is-uppercase(
            type="is-primary",
            :loading="isSubmitting",
            :disabled="isDisabled"
            @click="submitInvite"
            style="width: 208px !important") Invite
</template>

<script>
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'

export default {
  name: 'XMTeamInvitationCard',
  props: {
    business: Object,
    members: Array,
  },
  data() {
    return {
      isSubmitting: false,
      emails: [],
      tags: [],
      searchResults: [],
      limit: 1,
    }
  },
  computed: {
    isDisabled() {
      return !this.tags.length && !this.emails.length
    },
  },
  watch: {
    $route() {
      this.$parent.close()
    },
  },
  methods: {
    searchTag: debounce(async function (text) {
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
                  id
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

        this.searchResults = filteredResult.filter((result) => {
          if (result !== undefined) {
            const tags = this.tags.map((tag) => {
              return tag?.id
            })

            const members = this.members.map((member) => {
              return member?.Member?.id
            })

            const mergeResults = tags.concat(members)

            return !mergeResults.includes(result?.id)
          }
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Team')
      }
    }, 500),
    async submitInvite() {
      if (this.doCheckTagUsersCount()) {
        const details = {
          type: 'invite',
          limit: this.limit,
        }

        this.$buefy.modal.open({
          component: require('~/components/organisms/PlanLimit').default,
          parent: this,
          width: 600,
          canCancel: false,
          props: { details },
        })
        return
      }

      this.isSubmitting = true
      const tags = this.tags.map((obj) => {
        return obj.slug
      })

      try {
        await this.$apollo.mutate({
          variables: {
            emails: this.emails,
            slugs: tags,
          },
          context: {
            headers: {
              'X-ActivePlace-Business-ID': this.business?.id || this.business?.Business?.id,
            },
          },
          mutation: gql`
            mutation inviteTeamMember($emails: [String!]!, $slugs: [String!]!) {
              inviteTeamMember(emails: $emails, slugs: $slugs) {
                objectID
                objectType
                success
                timestamp
              }
            }
          `,
        })
        this.$root.$emit('team/member/retrieve', this.business?.id || this.business?.Business?.id)
      } catch (error) {
        this.doTrackSegmentError(error, 'Team')
      }
      this.isSubmitting = false
      this.$toast.success('Email has been sent successfully', {
        duration: 2 * 1000,
        position: 'bottom-right',
      })
      this.$emit('close')
      //
      return await true
    },
    checkEmail(value) {
      const data = value[value.length - 1]
      if (data) {
        /* eslint-disable no-useless-escape */
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if (!filter.test(data)) {
          this.$toast.error('Please provide a valid email address', {
            duration: 2 * 1000,
            position: 'bottom-right',
          })
          value.pop()
        }
      }
    },
    doCheckTagUsersCount() {
      const users = this.tags.concat(this.emails)
      const plan = this.business?.plan || this.business?.Business?.plan || null

      switch (plan) {
        case 'starter':
          if (users.length >= 2) {
            this.limit = 1
            return true
          }
          return false

        default:
          return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-register-interest::v-deep {
  padding: 0 15px;

  .card {
    .header {
      position: relative;
      padding: 17px 20px;

      ._title {
        font-weight: 500;
        text-align: center;
        text-transform: uppercase;
        color: $secondary;
      }

      .close {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    .card-content {
      padding: 60px 80px;

      .custom-taginput {
        .is-focused {
          background-color: #fff !important;
          border-color: #dbdbdb !important;
          border-radius: 4px !important;
        }

        .taginput-container .autocomplete input {
          border: none !important;
        }
      }
      .custom-list {
        margin-left: 15px;
        list-style-type: circle !important;
        li {
          font-size: 14px !important;
        }
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .card {
      .card-content {
        padding: 20px 30px 30px;
      }
    }
  }
}
</style>
