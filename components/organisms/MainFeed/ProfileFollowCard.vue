<template lang="pug">
.xo-main-feed-profile-follow-card.box.p-4.mb-2
  nuxt-link.flex.align-center(:to="profileLink")
    .flex-auto
      XAProfileAvatar(size="34px", :image="image", :label="initials")
    .flex-grow.pl-2
      div(style="font-size: 11px") {{ name }}

  .flex(style="font-size: 11px; align-items: flex-end")
    .flex-auto
      .flex-center.pr-2
        img(src="~/assets/icons/articles.svg" style="width: 12px; height: 12px")
        span.ml-1.mr-2 {{ articles }}
    .flex-auto
      .flex-center.pr-2
        img(src="~/assets/icons/updates.svg" style="width: 12px; height: 12px")
        span.ml-1.mr-2 {{ updates }}
    .flex-auto
      .flex-center.pr-2
        img(src="~/assets/icons/highfive.svg" style="width: 12px; height: 12px")
        span.ml-1.mr-2 {{ highFives }}
    .flex-grow
    .flex-auto.pl-2
      XOProfileFollowButton(:value="value", :loading="loading" size="is-small")
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XOProfileFollowButton from '~/components/organisms/Profile/FollowButton'
export default {
  name: 'XOMainFeedProfileFollowCard',
  components: { XAProfileAvatar, XOProfileFollowButton },
  props: {
    value: Object,
    loading: Boolean,
  },
  computed: {
    profile() {
      return this.value[this.value.objectType]
    },
    name() {
      return this.profile?.name ? this.profile?.name.replace(/&amp;/g, '&') : '' || this.value?.name
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    image() {
      return this.profile?.profilePhotoURL || this.value?.profilePhotoURL
    },
    aggregates() {
      return this.profile?.Aggregates || this.value?.Aggregates
    },
    articles() {
      return this.aggregates?.articlesPublished || 0
    },
    highFives() {
      return this.aggregates?.likesReceived || 0
    },
    updates() {
      return this.aggregates?.updates || 0
    },
    profileLink() {
      const slug = this.profile?.slug || this.value?.slug

      switch (this.value?.objectType) {
        case 'Member':
          return `/p/${slug}`
        case 'Business':
          return `/b/${slug}`
        default:
          return '/'
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-main-feed-profile-follow-card::v-deep
  a
    color: inherit
</style>
