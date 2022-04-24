<template lang="pug">
.xo-profile-info-card.pb-4
  .profile-image-container
    .avatar.flex-center
      XAProfileAvatar.mb-2(size="146px", :image="profileImage", :label="$app.getNameInitials(name)")

    .profile-image-change.is-clickable(@click="onClickShowUpload" v-if="isMe")
      img(src="~/assets/icons/change-image.svg" width="30" height="30")

  h1.name.is-uppercase.has-text-centered.px-4.py-4 {{ name }}

  //- .mentor.is-flex.is-justify-content-center.align-center.mb-2(v-if="badge")
    img(:src="require(`~/assets/icons/mentor/${badge}.svg`)" height="30")
    p.ml-2.has-text-weight-medium(v-if="type != 'Business'") Mentor

  .flex-center(style="margin-left: -19px")
    .is-flex(style="font-size: 16px")
      span.mr-1(style="color: #65676b; font-weight: 200") {{ type }}
      span(style="font-weight: bold") # {{ signUpNumber }}
    .country: XAFlag(:country="country")

  .website(v-if="plan !== null" v-html="website" v-linkified:options="{defaultProtocol: 'https'}") {{ website }}

  .quotes.px-4.py-2(v-show="quotes") {{ quotes }}

  .flex-center.py-2
    img(src="~/assets/images/Profile/checked-art.svg" width="40" height="40")
    .mr-2 {{ articlesPublished }}
    img(src="~/assets/images/Profile/checked-update.svg" width="40" height="40")
    .mr-2 {{ updates }}
    img(src="~/assets/images/Profile/checked-link.svg" width="40" height="40")
    div {{ highFivesReceived }}
  div(style="flex: 1 0 0")
  template(v-if="plan !== null && $route.name === 'b-slug'")
    .partner-with-container(v-if="includedPartners.length")
      ._label We partner with:
      .partner-item(v-for="(partner, index) in includedPartners" :key="index")
        b-tooltip(:label="partner.name" type="is-white" position="is-bottom")
          XAProfileAvatar(:image="partner.profilePhotoURL" :label="$app.getNameInitials(partner.name)" size="32px")
      XAProfileAvatar(:label="`+${excludedPartners}`" size="32px" style="cursor: pointer;" @click="doShowPartnerWithList()" v-if="partners.length > 3")
  template(v-if="$route.name === 'p-slug'")
    .partner-with-container(v-if="includedPartners.length")
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
        type="is-secondary",
        :loading="isloading"
        icon-left="check"
        outlined
        @click.prevent="toggleFollow") Following
    template(v-else)
      b-button.is-uppercase(type="is-secondary", :loading="isloading" outlined @click.prevent="toggleFollow") Follow

  .profile-change-background(v-if="isMe && type === 'Member'")
    a.has-text-secondary.has-text-weight-light(@click="showSidebar") Change background
    span: img.pt-1(src="~/assets/icons/image.svg" width="12" height="12")
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
      isloading: false,
      showBackground: false,
      isFollowing: this.profile?.isFollowed || false,
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
    showSidebar() {
      this.showBackground = !this.showBackground
      this.$emit('showBackground', this.showBackground)
    },
    async toggleFollow() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.getFollowLimit(this.isFollowing)) return
      this.isloading = true
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
        this.isloading = false
        this.doTrackSegmentError(error)
      } finally {
        this.isloading = false
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

<style lang="sass" scoped>
.xo-profile-info-card::v-deep
  position: sticky
  top: 232px
  color: #0c353e
  display: flex
  flex-direction: column
  background-color: rgba(255,255,255,.9)
  margin-top: -480px
  min-height: 420px
  border-top-right-radius: 30px
  border-bottom-right-radius: 30px
  align-items: center
  justify-content: center

  .profile-change-background
    position: absolute
    bottom: -32px
    left: 0
    max-width: 178px
    width: 100%
    height: 32px
    background: #EEF1F1
    text-align: left
    padding: 3px 8px
    border-radius: 5px
    white-space: nowrap
    span
      max-width: 24px
      max-height: 24px
      display: inline-block
      background-color: #fff
      border-radius: 50%
      margin-left: 5px
      padding: 1.5px 6px

  .profile-image-container
    position: relative
    // display: flex
    // flex-direction: column
    // flex: 1
    // align-items: center
    // justify-content: center

  .avatar
    position: relative
    top: -78px
    margin-bottom: -74px

  .profile-image-change
    position: absolute
    right: 13px
    top: 40px

    img
      width: max-content

  .name
    font-size: 32px
    line-height: 32px

  .website
    a
      color: #25A9E0 !important
      font-weight: 300
      margin: 10px 0 5px
      display: block

  .quotes
    font-family: 'Georgia', serif
    font-style: italic
    font-size: 14px

  .partner-with-container
    display: flex
    flex-wrap: wrap
    padding-top: 20px
    padding-bottom: 50px

    ._label
      margin-right: 10px
      font-weight: 300
      color: #65676B
      padding: 5px 0

    .partner-item
      &:not(:last-child)
        margin-right: 10px

  .profile-container-edit-left
    position: absolute
    width: max-content
    bottom: 0
    right: 0
    flex-wrap: wrap
    padding: 0 15px

    a
      display: block
      width: 100%
      margin-left: 0
      line-height: 24px
      color: $secondary

      span

        img
          color: $secondary
          position: relative
          top: 8px
          left: -2px

  @include until-widescreen
    .quotes
      padding-bottom: 0 !important

    .profile-container-edit-left
      bottom: -24px
</style>
