<template lang="pug">
.xo-profile-info-card-mobile
  .is-flex
    .profile-image-container.h-100
      XAProfileAvatar.mb-4(size="95px", :image="profileImage", :label="$app.getNameInitials(name)")

      .profile-image-change.is-clickable(@click="onClickShowUpload" v-if="isMe")
        img(src="~/assets/icons/change-image.svg" width="30" height="30")
    .profile-description
      h1.name.is-uppercase {{ name }}

      //- .mentor.is-flex.align-center(v-if="badge")
        img(:src="require(`~/assets/icons/mentor/${badge}.svg`)" height="30")
        p.ml-2.has-text-weight-medium(v-if="type != 'Business'") Mentor

  .profile-details-container.has-text-left.mt-2
    .is-flex.mb-4
      .is-flex.align-center(style="font-size: 14px")
        span.mr-1(style="color: #65676b; font-weight: 200") {{ type }}
        span(style="font-weight: bold") # {{ signUpNumber }}
      .country: XAFlag(:country="country")

    .website(v-if="plan !== null" v-html="website" v-linkified:options="{defaultProtocol: 'https'}") {{ website }}

    p.quotes.is-family-secondary.is-italic.has-text-left.mb-4(v-show="quotes") {{ quotes }}

    .is-flex.align-center.mb-3
      img(src="~/assets/images/Profile/checked-art.svg" width="40" height="40")
      .mr-2 {{ articlesPublished }}
      img(src="~/assets/images/Profile/checked-update.svg" width="40" height="40")
      .mr-2 {{ updates }}
      img(src="~/assets/images/Profile/checked-link.svg" width="40" height="40")
      div {{ highFivesReceived }}
    div(style="flex: 1 0 0")

  .partner-with-container(v-if="plan !== null")
    ._label We partner with:
    .partner-item(v-for="(partner, index) in includedPartners" :key="index")
      b-tooltip(:label="partner.name" type="is-white" position="is-bottom")
        XAProfileAvatar(:image="partner.profilePhotoURL" :label="$app.getNameInitials(partner.name)" size="32px")
    XAProfileAvatar(:label="`+${excludedPartners}`" size="32px" style="cursor: pointer;" @click="doShowPartnerWithList()" v-if="partners.length > 3")

  template(v-if="isMe")
    .profile-container-edit-left.is-flex.is-align-content-flex-end.is-justify-content-right.mr-0
      nuxt-link.has-text-right(:to="`/p/${slug}/edit`" v-if="type === 'Member'") Edit profile
        span: img(src="~/assets/icons/change-image.svg" width="30" height="30")
      nuxt-link.has-text-right(:to="`/b/${slug}/edit`" v-if="type === 'Business'") Edit profile
        span: img(src="~/assets/icons/change-image.svg" width="30" height="30")

  template(v-else)
    template(v-if="isFollowing")
      b-button.is-uppercase(
        type="is-secondary"
        icon-left="check",
        :loading="isLoading"
        outlined
        @click.prevent="toggleFollow") Following
    template(v-else)
      b-button.is-uppercase(type="is-secondary" outlined, :loading="isLoading" @click.prevent="toggleFollow") Follow
</template>

<script>
import gql from 'graphql-tag'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAFlag from '~/components/atoms/Flag'

export default {
  name: 'XOProfileInfoCard',
  components: { XAProfileAvatar, XAFlag },
  props: {
    type: String,
    profile: Object,
    isMe: { type: Boolean, default: false },
  },
  data() {
    return {
      isFollowing: this.profile?.isFollowed || false,
      isLoading: false,
    }
  },
  computed: {
    id() {
      return this.profile?.id
    },
    name() {
      return this.profile?.name ? this.profile?.name.replace(/&amp;/g, '&') : ''
    },
    slug() {
      return this.profile?.slug
    },
    signUpNumber() {
      return this.profile?.signUpNumber
    },
    profileImage() {
      return this.profile?.profilePhotoURL
    },
    quotes() {
      return this.profile?.quotes || this.profile?.statement
    },
    isFollowed() {
      return this.profile?.isFollowed
    },
    highFivesReceived() {
      return this.profile?.Aggregates?.likesReceived || 0
    },
    articlesPublished() {
      return this.profile?.Aggregates?.articlesPublished || 0
    },
    updates() {
      return this.profile?.Aggregates?.updates || 0
    },
    country() {
      return this.profile?.country || null
    },
    // badge() {
    //   if (this.type === 'Member') return this.profile?.Mentor?.badge || null
    //   else if (this.type === 'Business') return this.profile?.badge || null
    //   else return false
    // },
    website() {
      return this.profile?.website || null
    },
    plan() {
      return this.profile?.plan || null
    },
    partners() {
      const partners = this.profile?.Partners.map(({ objectType, Member, Business }) => {
        if (Member !== null) {
          Member.objectType = objectType
          return Member
        }
        if (Business !== null) {
          Business.objectType = objectType
          return Business
        }
      })

      return partners
    },
    includedPartners() {
      return this.partners.slice(0, 3)
    },
    excludedPartners() {
      const excludedPartners = this.partners.slice(3)
      return excludedPartners.length
    },
  },
  mounted() {
    this.getAllExternalLinks()
  },
  methods: {
    async toggleFollow() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.getFollowLimit(this.isFollowing)) return
      this.isLoading = true
      this.isFollowing = !this.isFollowing
      try {
        await this.$apollo.mutate({
          variables: {
            MemberID: this.type === 'Member' ? this.id : undefined,
            BusinessID: this.type === 'Business' ? this.id : undefined,
          },
          context: this.getGraphQLContext('profile'),
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
        this.isLoading = false
        this.doTrackSegmentError(error)
      } finally {
        this.isLoading = false
      }
    },
    onClickShowUpload() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Profile/Dialog/ProfileImageUpload').default,
        width: 342,
        props: {
          objectType: this.type === 'Member' ? 'MyProfile' : 'MyBusiness',
          businessID: this.profile?.id,
        },
        events: {
          loadProfile: () => {
            this.$emit('loadProfile')
          },
        },
      })
    },
    doShowPartnerWithList() {
      this.$buefy.modal.open({
        component: require('~/components/molecules/Profile/PartnerWith').default,
        parent: this,
        canCancel: false,
        width: 645,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-profile-info-card-mobile::v-deep {
  height: 100%;
  background: #fff;
  top: -36px !important;
  position: relative !important;
  margin: 0 auto;
  width: 100%;
  max-width: 708px !important;
  border-radius: 30px 30px 30px 30px;
  box-shadow: none !important;
  min-height: auto;
  padding: 30px;

  .profile-image-container {
    position: relative;
    .profile-image-change {
      position: absolute;
      right: -5px;
      top: 54px;
    }
  }

  .profile-description {
    width: 100%;
    .name {
      padding-left: 14px;
      font-size: 1.7rem;
      letter-spacing: -0.8px;
      color: #0c353e;
      margin-top: 4px;
      margin-bottom: 4px;
      text-align: left !important;
    }
    .mentor {
      padding-left: 14px;
    }
  }

  .website {
    a {
      color: #25a9e0 !important;
      font-weight: 300;
      margin: 10px 0 5px;
      display: block;
    }
  }

  .quotes {
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.18px;
    color: $secondary;
  }

  .partner-with-container {
    display: flex;
    flex-wrap: wrap;

    ._label {
      margin-right: 10px;
      font-weight: 300;
      color: #65676b;
      padding: 5px 0;
    }

    .partner-item {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  .profile-container-edit-left {
    position: absolute;
    top: 0;
    right: 8px;
    a {
      display: block;
      width: 100%;
      margin-left: 0;
      line-height: 24px;
      color: $secondary;
    }

    span {
      img {
        color: $secondary;
        position: relative;
        top: 8px;
        left: -2px;
      }
    }
  }
}
</style>
