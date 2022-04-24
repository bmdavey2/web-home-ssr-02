<template lang="pug">
.xm-marketplace-single-content-closed-registration(v-if="!isHidden")
  .close(@click.prevent="isHidden = true"): b-icon(icon="close")
  XAProfileAvatar(:label="initials", :image="profilePhotoURL" size="70px")
  p Follow #[span.name {{ name }}] to stay updated on future events & experiences.
  .follow
    b-button.is-active(v-if="isFollowing" @click.prevent="doToggleFollow()")
      b-icon(icon="check" custom-size="is-small")
      span Following
    b-button(outlined v-else @click.prevent="doToggleFollow()") Follow
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XMMarketPlaceSingleContentClosedRegistration',
  components: { XAProfileAvatar },
  props: {
    product: Object,
  },
  data() {
    return {
      isFollowing: this.product?.Business?.isFollowed || false,
      isHidden: false,
    }
  },
  computed: {
    inquiryType() {
      return this.product?.inquiryType || null
    },
    endDate() {
      return moment(this.product?.endDate).format('MMM DD, YYYY') || null
    },
    isClosed() {
      return new Date(this.endDate) < new Date()
    },
    profile() {
      return this.product?.Business || null
    },
    profilePhotoURL() {
      return this.profile?.profilePhotoURL || null
    },
    name() {
      return this.profile?.name || null
    },
    initials() {
      return this.$app.getNameInitials(this.name)
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
.xm-marketplace-single-content-closed-registration::v-deep {
  background-color: $white;
  border-radius: 6px;
  border: 1px solid #c2c8c9;
  padding: 20px;
  text-align: center;
  color: #050505;
  font-weight: 300;
  position: relative;

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .xa-profile-avatar {
    margin: 0 auto;
  }

  p {
    margin: 20px 0;
  }

  .name {
    font-weight: 500;
  }

  .follow {
    button {
      border: 1px solid #ddd;
      box-shadow: none;
      outline: none;

      &.is-active {
        background-color: #eef1f1;
        color: $secondary;
      }
    }
  }
}
</style>
