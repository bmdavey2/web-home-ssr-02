<template lang="pug">
.xo-main-feed-my-profile-menu-business-item.flex-center(@click="$emit('click')")
  .flex-auto
    XAProfileAvatar.mr-4(:image="value.profilePhotoURL", :label="initials" size="40px")
  .flex-grow
    .is-flex
      div(style="font-size: 14px") {{ name }}
      //- .ml-1(v-if="badge"): img(:src="require(`~/assets/icons/mentor/${badge}.svg`)" width="20" height="20")
    div(style="font-size: 12px; font-weight: 300" v-if="showEmail") {{ value.email }}

  .flex-auto.role
    div(style="font-size: 11px; color: #999") {{ role }}
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
export default {
  name: 'XOMainFeedMyProfileMenuBusinessItem',
  components: { XAProfileAvatar },
  props: {
    value: Object,
    role: String,
    showEmail: Boolean,
  },
  computed: {
    // badge() {
    //   return this.value?.badge || null
    // },
    name() {
      return this.value?.name ? this.value?.name.replace(/&amp;/g, '&') : ''
    },
    initials() {
      return (
        this.value?.name
          ?.split(' ')
          ?.map((x) => x.substring(0, 1))
          ?.slice(0, 2)
          ?.join('') || 'AP'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-main-feed-my-profile-menu-business-item::v-deep {
  width: 100%;

  @media screen and (max-width: 1023px) {
    width: auto;

    .role {
      display: none;
    }
  }
}
</style>
