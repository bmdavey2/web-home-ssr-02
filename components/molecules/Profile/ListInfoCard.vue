<template lang="pug">
.xm-profile-list-info-card.box
  .flex
    .flex-grow.flex.align-center
      nuxt-link(:to="profileLink" v-if="item")
        XAProfileAvatar.mr-2.is-cursor-pointer(size="36px", :image="profilePhoto", :label="initials")
      .avatar-loader(v-else)
        b-skeleton.mr-2(width="36" height="36" circle)
      .content(v-if="item")
        .is-flex.align-center
          div
            nuxt-link.is-cursor-pointer(:to="profileLink" style="font-size: 13px; font-weight: 500; color: inherit") {{ name }}
            .flex.align-center(style="font-size: smaller")
              img.mr-1(src="~/assets/icons/articles.svg" width="12" height="12")
              .mr-4 {{ articlesPublished }}
              img.mr-1(src="~/assets/icons/updates.svg" width="12" height="12")
              .mr-4 {{ updates }}
              img.mr-1(src="~/assets/icons/highfive.svg" width="12" height="12")
              .mr-4 {{ highFivesReceived }}
          //- img.ml-1(v-if="badge", :src="require(`~/assets/icons/mentor/${badge}.svg`)" width="19" height="19")
    .flex-auto
      XOProfileFollowButton(:value="item")
  XOCategoryPills.mt-4(:categories="categories", :max="3")
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XOCategoryPills from '~/components/organisms/CategoryPills'
import XOProfileFollowButton from '~/components/organisms/Profile/FollowButton'
export default {
  name: 'XMProfileListInfoCard',
  components: { XAProfileAvatar, XOCategoryPills, XOProfileFollowButton },
  props: {
    item: Object,
  },
  computed: {
    actor() {
      if (!this.item?.objectType) return null
      return this.item[this.item.objectType]
    },
    name() {
      return this.actor?.name
    },
    profilePhoto() {
      return this.actor?.profilePhotoURL
    },
    profileLink() {
      switch (this.item?.objectType) {
        case 'Member':
          return `/p/${this.actor?.slug}`
        case 'Business':
          return `/b/${this.actor?.slug}`
        default:
          return '/'
      }
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    categories() {
      return this.actor?.Categories
    },
    badge() {
      return null
    },
    articlesPublished() {
      return this.actor?.Aggregates?.articlesPublished
    },
    updates() {
      return this.actor?.Aggregates?.updates
    },
    highFivesReceived() {
      return this.actor?.Aggregates?.likesReceived
    },
  },
}
</script>
