<template lang="pug">
.xa-medals-placer.flex-column.justify-between
  .place {{ place }}
  .row.items-center
    .avatar
      XAProfileAvatar(:label="$app.getNameInitials(name)", :image="profilePhotoURL" size="40px")
      ._icon.row.items-center.justify-center: img(:src="require(`~/assets/images/Medals/${place}-place.svg`)")
    .ml-3.col
      .name {{ name }}
      .time.text-weight-light {{ time }}
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XAMedalsPlacer',
  components: { XAProfileAvatar },
  props: {
    placer: Object,
  },
  computed: {
    place() {
      return this.placer?.place || null
    },
    name() {
      return this.placer?.name || ''
    },
    profilePhotoURL() {
      return this.placer?.profilePhotoURL || null
    },
    time() {
      return this.placer?.time || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-medals-placer::v-deep {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  min-height: 180px;
  color: #050505;

  .place {
    font-size: 1.1429rem;
  }

  .avatar {
    position: relative;

    ._icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
      background-color: $white;
      position: absolute;
      z-index: 1;
      bottom: -3px;
      right: -3px;
    }
  }

  .time {
    font-size: 0.8571rem;
    color: #65676b;
  }
}
</style>
