<template lang="pug">
.xa-marketplace-added-image
  .image-actions
    b-tooltip(label="Mark main image" position="is-bottom" type="is-white"): .main-image(
      :class="isCoverPhoto && 'active'"
      @click.prevent="doMarkAsCoverPhoto()"): b-icon(
      icon="check"
      size="is-small")
    .delete-image(@click.prevent="$emit('delete', $event)"): b-icon(icon="close" size="is-small")
  img(:src="url")
</template>

<script>
export default {
  name: 'XAMarketPlaceAddedImage',
  props: {
    url: String,
    coverPhotoID: String,
    id: String,
  },
  computed: {
    isCoverPhoto() {
      return (this.$store.getters['media/getCoverPhotoID'] || this.coverPhotoID) === this.id
    },
  },
  methods: {
    doMarkAsCoverPhoto() {
      this.$store.dispatch('media/setCoverPhotoID', this.id)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-marketplace-added-image::v-deep {
  width: calc(100% / 3 - 10px);
  height: 145px;
  margin-bottom: 10px;
  position: relative;

  .image-actions {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .main-image,
    .delete-image {
      cursor: pointer;
      background-color: $white;
      color: $secondary;
      box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
      width: 24px;
      height: 24px;
      border-radius: 100px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .main-image {
      margin-right: 5px;
      background-color: rgba($white, 0.8);
      border: 1px solid $secondary;

      &.active {
        background-color: $white;
        border: 0;

        .icon {
          opacity: 1;
        }
      }

      .icon {
        opacity: 0;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 427px) {
    width: calc(50% - 10px);
  }
}
</style>
