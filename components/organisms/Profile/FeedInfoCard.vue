<template lang="pug">
.xo-profile-feed-info-card.box.card.is-user-select-none.no-padding
  .content
    img.cover(:src="coverImage")
    XAProfileAvatar.avatar(size="96px", :image="profileImage", :label="initials")
    .name.has-text-centered.has-text-weight-medium.mb-3 {{ name }}
    //- .mentor.is-flex.is-justify-content-center.align-center.mb-4(v-if="badge")
      img(:src="require(`~/assets/icons/mentor/${badge}.svg`)" height="16")
      p.ml-2(v-if="type != 'Business'") Mentor
    .number-country
      .is-flex
        span.mr-1(style="color: #65676b; font-weight: 200") {{ type }}
        span(style="font-weight: bold") # {{ signUpNumber }}
      .country: XAFlag(:country="country")
    .flex-center.py-2.mb-4
      img(src="~/assets/images/Profile/checked-art.svg" width="40" height="40")
      .mr-2 {{ articlesPublished }}
      img(src="~/assets/images/Profile/checked-update.svg" width="40" height="40")
      .mr-2 {{ updates }}
      img(src="~/assets/images/Profile/checked-link.svg" width="40" height="40")
      div {{ highFivesReceived }}
    .flex-center.pb-3
      nuxt-link.link-profile(:to="profileLink") View full profile
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAFlag from '~/components/atoms/Flag'

export default {
  name: 'XOProfileFeedInfoCard',
  components: { XAProfileAvatar, XAFlag },
  props: {
    profile: Object,
  },
  computed: {
    name() {
      return this.profile?.name || ''
    },
    signUpNumber() {
      return this.profile?.signUpNumber
    },
    type() {
      return this.profile?.__typename
    },
    styleCover() {
      return {}
    },
    // badge() {
    //   if (this.profile.__typename === 'Member') return this.profile?.Mentor?.badge || null
    //   else if (this.profile.__typename === 'Business') return this.profile?.badge || null
    //   else return false
    // },
    profileImage() {
      return this.profile?.profilePhotoURL
    },
    coverImage() {
      return this.profile?.coverPhotoURL || require('~/assets/images/cover-default.jpg')
    },
    profileLink() {
      if (this.profile.__typename === 'Member') return `/p/${this.profile.slug}`
      else return `/b/${this.profile.slug}`
    },
    initials() {
      return this.$app.getNameInitials(this.name)
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
    website() {
      return this.profile?.website || null
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-profile-feed-info-card::v-deep
  .cover
    object-fit: cover
    object-position: center
    width: 100%
    height: 120px

  .avatar
    position: relative
    top: -58px
    margin: 0 auto -46px auto

  .name
    font-size: 1.1429rem

  .number-country
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    line-height: 1
    margin-bottom: 30px
    margin-left: -13px
    height: 20px

  .link-profile
    text-align: center
    font-size: 0.8571rem
    font-weight: 300
    color: inherit
</style>
