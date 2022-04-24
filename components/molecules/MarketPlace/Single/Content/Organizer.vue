<template lang="pug">
.xm-marketplace-single-content-organizer.content-section
  ._title Organizer
  .details
    .left-details
      XAProfileAvatar.is-desktop(:label="initials", :image="profilePhotoURL" size="150px")
      XAProfileAvatar.is-mobile(:label="initials", :image="profilePhotoURL" size="100px")
      .company
        h3: nuxt-link(:to="`/b/${link}`") {{ name }}
        .number-country.mb-1
          ._number Member # {{ signUpNumber }}
          .country: XAFlag(:country="country")
        .website(v-html="website" v-linkified:options="{defaultProtocol: 'https'}" @click="doTrackSegmentClickedExternalLink($event)")
        .follow
          b-button.is-active(v-if="isFollowing" @click.prevent="doToggleFollow()")
            b-icon(icon="check" custom-size="is-small")
            span Following
          b-button(outlined v-else @click.prevent="doToggleFollow()") Follow
    .right-details(v-if="statement")
      .mission-title Mission
      .statement {{ statement }}
  .separator
</template>

<script>
import gql from 'graphql-tag'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAFlag from '~/components/atoms/Flag'

export default {
  name: 'XMMarketPlaceSingleContentOrganizer',
  components: { XAProfileAvatar, XAFlag },
  props: {
    product: Object,
  },
  data() {
    return {
      isFollowing: this.product?.Business?.isFollowed || false,
    }
  },
  computed: {
    profile() {
      return this.product?.Business || null
    },
    profilePhotoURL() {
      return this.profile?.profilePhotoURL || null
    },
    name() {
      return this.profile?.name ? this.profile?.name.replace(/&amp;/g, '&') : null
    },
    link() {
      return this.profile?.slug || ''
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    signUpNumber() {
      return this.profile?.signUpNumber || null
    },
    country() {
      return this.profile?.country || null
    },
    website() {
      return this.profile?.website || null
    },
    statement() {
      return this.profile?.statement || null
    },
  },
  methods: {
    async doToggleFollow() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.getFollowLimit(this.isFollowing)) return
      this.isFollowing = !this.isFollowing
      try {
        await this.$apollo.mutate({
          variables: {
            MemberID: undefined,
            BusinessID: this.profile?.id,
          },
          context: this.getGraphQLContext('product_page'),
          mutation: this.isFollowing
            ? gql`
                mutation ($MemberID: String, $BusinessID: String) {
                  follow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
                    success
                  }
                }
              `
            : gql`
                mutation ($MemberID: String, $BusinessID: String) {
                  unfollow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
                    success
                  }
                }
              `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'MarketPlace Product')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-marketplace-single-content-organizer::v-deep {
  box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
  border-radius: 0;
  padding: 30px 20px 0;
  background-color: $white;
  border-bottom: 0;

  .details {
    display: flex;
    flex-wrap: wrap;

    .left-details {
      display: flex;
      flex-wrap: wrap;
      flex: 10000 1 0;
      padding-right: 50px;

      .xa-profile-avatar {
        margin-bottom: 10px;

        &.is-mobile {
          display: none;
        }
      }

      .company {
        margin-left: 20px;
        flex: 10000 1 0;

        h3 {
          font-size: 1.7143rem;
          line-height: 1.2;
          margin-bottom: 10px;

          a {
            color: inherit;
          }
        }

        .number-country {
          font-size: 0.8571rem;
          font-weight: 300;
          color: $secondary;
        }

        .website {
          margin-bottom: 10px;

          a {
            display: block;
            font-size: 0.8571rem;
            color: #25a9e0;
          }
        }

        .follow {
          button {
            border: 1px solid #ddd;
            outline: none;
            box-shadow: none;
            font-size: 0.8571rem;

            &.is-active {
              background-color: #eef1f1;
              color: $secondary;
            }
          }
        }
      }

      .number-country {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    .right-details {
      flex: 10000 1 0;

      .mission-title {
        font-size: 0.8571rem;
        margin-bottom: 5px;
      }

      .statement {
        font-family: 'Georgia', sans-serif;
        font-style: italic;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .details {
      .left-details {
        padding-right: 0;
        margin-bottom: 20px;
        flex: none;
        width: 100%;

        .xa-profile-avatar {
          &.is-desktop {
            display: none;
          }

          &.is-mobile {
            display: flex;
          }
        }
      }

      .right-details {
        max-width: 100%;
        flex: none;
      }
    }
  }
}
</style>
