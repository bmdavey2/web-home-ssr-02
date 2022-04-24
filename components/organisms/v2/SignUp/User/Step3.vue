<template lang="pug">
.xo-signup-user-step-3.signup-process
  .container
    .contents.row.items-center
      .left-content: img(src="~assets/images/SignUp/step3.webp")
      .right-content
        .header.row.items-center
          .logo: img(src="~assets/icons/logo@3x.svg")
          ._label Add some details to make it yours.
        form(@submit.prevent autocomplete="off")
          .user-avatar.mb-6.row.items-center
            template(v-if="socialMediaAvatar"): b-upload.img(accept="image/*" v-model="avatar"): img(
              :src="socialMediaAvatar")
            template(v-else)
              b-upload.row.items-center.justify-center(accept="image/*" v-model="avatar"): b-icon(
                icon="camera"
                size="is-medium"
                type="is-primary")
            .name.col {{ name }}

          div(v-show="showDescribedAs")
            ._title.row.mb-5
              ._number.row.items-center.justify-center.mr-4 1
              ._label I'm best described as:

            .select-one.mb-5 Select One
            XMSignUpUserDescribedAs.mb-6(v-model="describedAs")

            .actions: b-button.btn-action(
              type="is-primary"
              @click.prevent="showDescribedAs = false",
              :disabled="isDisabledDescribeAs") NEXT
          div(v-show="!showDescribedAs")
            ._title.row.mb-5
              ._number.row.items-center.justify-center.mr-4 2
              ._label Which of the below are you most interested in?

            .select-one.mb-5 Select One or Multiple
            XOCategoryPillsSelector.mb-6(v-model="interested" clickable is-white is-signup)

            .actions: b-button.btn-action(
              type="is-primary",
              :disabled="isDisabledCategories",
              :loading="isSubmitting"
              @click.prevent="doCreateProfile()") FINISH
</template>

<script>
import gql from 'graphql-tag'
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import XMSignUpUserDescribedAs from '~/components/molecules/v2/SignUp/User/DescribedAs'
import XOCategoryPillsSelector from '~/components/organisms/CategoryPillsSelector'
import fragmentFeedItemContents from '~/assets/graphql/fragmentFeedItemContents.graphql'

export default {
  name: 'XOSignUpUserStep3',
  components: { XMSignUpUserDescribedAs, XOCategoryPillsSelector },
  data() {
    return {
      showDescribedAs: true,
      isSubmitting: false,
      feedItems: null,
    }
  },
  computed: {
    ...mapFields('v2/signup', [
      'form.firstName',
      'form.lastName',
      'form.describedAs',
      'form.interested',
      'form.socialMediaAvatar',
      'form.avatar',
      'form.location',
      'form.PhotoID',
    ]),
    ...mapGetters({
      getSignUpFormDetails: 'v2/signup/getSignUpFormDetails',
      getBusinessClaimIsClaiming: 'business-claim/getBusinessClaimIsClaiming',
      getTeamManagementInvite: 'team-management/getTeamManagementInvite',
      getMedalClaimDetails: 'medals/getMedalClaimDetails',
    }),
    name() {
      return `${this.getSignUpFormDetails?.firstName} ${this.getSignUpFormDetails?.lastName}`
    },
    isDisabledDescribeAs() {
      return !this.describedAs
    },
    isDisabledCategories() {
      return !this.interested.length
    },
  },
  watch: {
    feedItems: {
      deep: true,
      handler(value) {
        if (value.length) {
          window.location.href = '/my-feed'
        } else {
          this.doRetrieveMyFeed()
        }
      },
    },
  },
  methods: {
    async doCreateProfile() {
      this.isSubmitting = true
      try {
        const { firstName, lastName, describedAs, interested, PhotoID, location } = this

        const input = {
          firstName,
          lastName,
          personalStatus: describedAs,
          CategoryIDs: interested,
          profilePhotoID: PhotoID,
          country: location?.country,
          suburb: location?.sub,
          state: location?.state,
          postalCode: '',
        }

        await this.$api.createProfile({ input })

        const details = {
          userId: this.$store.state.auth.uid,
        }
        await this.$appClient.segment.identifyProfile()
        await this.$appClient.segment.trackUserSignUp(details)

        if (this.getBusinessClaimIsClaiming) {
          try {
            const claimResult = await this.$apollo.mutate({
              variables: {
                id: this.$store.getters['business-claim/getBusinessClaimId'],
              },
              mutation: gql`
                mutation ($id: String!) {
                  linkMemberToBusiness(challenge: $id) {
                    success
                    objectID
                    objectType
                  }
                }
              `,
            })
            if (claimResult?.data) {
              const business = await this.$apollo.query({
                fetchPolicy: 'no-cache',
                variables: {
                  id: claimResult?.data?.linkMemberToBusiness?.objectID,
                },
                query: gql`
                  query ($id: String) {
                    Business(id: $id) {
                      slug
                    }
                  }
                `,
              })
              location.href = `/b/${business?.data?.Business?.slug}`
            }
          } catch (error) {
            error.graphQLErrors.forEach((error) => {
              this.$toast.error(error.message, {
                duration: 3000,
                position: 'top-center',
                onComplete: () => {
                  location.href = '/my-feed'
                },
              })
            })
          }
          return
        }

        if (this.getTeamManagementInvite?.isInviting) {
          try {
            await this.$apollo.mutate({
              variables: {
                action: 'responseInvite',
                status: 'Active',
                inactiveReason: undefined,
                id: this.$store.getters['team-management/getTeamManagementInvite']?.id,
              },
              mutation: gql`
                mutation ($action: String!, $status: String, $inactiveReason: String, $id: String!) {
                  editBusinessTeamMember(action: $action, status: $status, inactiveReason: $inactiveReason, id: $id) {
                    success
                    objectID
                  }
                }
              `,
            })

            location.href = '/my-feed'
          } catch (error) {
            console.log(error)
            error.graphQLErrors.forEach((error) => {
              this.doShowAcceptInvitationModal('error', error.message)
            })
            this.doTrackSegmentError(error, 'Team Invitation')
            return
          }
        }

        this.doRetrieveMyFeed()
      } catch (error) {
        console.log(error)
        this.doTrackSegmentError(error, 'User Profile Signup')
        this.isSubmitting = false
      }
    },
    async doRetrieveMyFeed() {
      const {
        data: {
          Me: {
            Timeline: { items },
          },
        },
      } = await this.$apollo.query({
        fetchPolicy: 'no-cache',
        variables: {
          CategoryID: null,
        },
        context: this.getGraphQLContext(),
        query: gql`
          ${fragmentFeedItemContents}
          query ($CategoryID: String, $cursor: String) {
            Me {
              Timeline(CategoryID: $CategoryID, cursor: $cursor, count: 10) {
                ...FeedItemContents
                count
                next
              }
            }
          }
        `,
      })

      this.feedItems = items
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-signup-user-step-3::v-deep {
  .container {
    .contents {
      .right-content {
        form {
          width: 100%;

          @include max-width(1023px) {
            max-width: 400px;
          }

          .user-avatar {
            @include max-width(427px) {
              justify-content: center;
            }

            .upload,
            .img {
              width: 95px;
              height: 95px;
              border-radius: 50%;
              border: 2px solid #e5e9f0;
              cursor: pointer;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
              }
            }

            .name {
              font-size: 1.8571rem;
              margin-left: 20px;
              word-break: break-word;

              @include max-width(427px) {
                flex: none;
                width: 100%;
                text-align: center;
                margin: 15px 0 0;
                font-size: 1.4286rem;
              }
            }
          }

          ._title {
            ._number {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background-color: $black;
              color: $white;
              font-size: 1.4286rem;

              @include max-width(427px) {
                width: 24px;
                height: 24px;
                font-size: 1rem;
              }
            }

            ._label {
              font-size: 1.7143rem;
              flex: 10000 1 0%;

              @include max-width(427px) {
                font-size: 1.2857rem;
              }
            }
          }

          .select-one {
            font-size: 1.2857rem;
            color: #65676b;

            @include max-width(427px) {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
