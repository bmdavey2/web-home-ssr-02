<template lang="pug">
.xa-profile-avatar-group(:style="avatarStyle")
  .avatar(v-for="(detail, index) in details.slice(0, 3)")
    .photo(v-if="detail.photoURL !== null"): img(:src="detail.photoURL")
    .name(v-else) {{ $app.getNameInitials(detail.name) }}
</template>

<script>
export default {
  name: 'XAProfileAvatarGroup',
  props: {
    profiles: Array,
    size: { type: Number, default: 35 },
  },
  computed: {
    details() {
      const details = this.profiles.map((profile) => {
        const { Member, Business } = profile
        const name = Member?.name || Business?.name || null
        const photoURL = Member?.profilePhotoURL || Business?.profilePhotoURL || null
        return { name, photoURL }
      })
      return details
    },
    avatarStyle() {
      const avatarStyle = {}

      avatarStyle.width = `${this.size}px`
      avatarStyle.height = `${this.size}px`
      avatarStyle.fontSize = `${this.size * 0.2}px`

      return avatarStyle
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-profile-avatar-group::v-deep {
  background-color: $white;
  box-shadow: 0 0 5px rgb(0 0 0 / 15%);
  border-radius: 100px;
  position: relative;
  overflow: hidden;

  .avatar {
    width: 50%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: absolute;
    overflow: hidden;

    &:not(:first-child) {
      height: 50%;
      right: 0;
    }

    .photo {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &:first-child {
      top: 0;
      left: 0;
      border-right: 1px solid rgba(#4a4a4a, 0.7);
    }

    &:nth-child(2) {
      top: 0;
      border-bottom: 1px solid rgba(#4a4a4a, 0.7);
      align-items: flex-end;
    }

    &:last-child {
      bottom: 0;
    }
  }
}
</style>
