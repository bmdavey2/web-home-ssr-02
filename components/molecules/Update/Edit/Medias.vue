<template lang="pug">
.xm-update-edit-medias(:class="getGalleryClass")
  template(v-for="(media, index) in medias")
    .media-item(:key="index", :class="isMedal && 'is-medal'")
      ._delete(@click.prevent="doRemoveGalleryItem(index)" v-if="!isMedal"): img(
        src="~/assets/icons/close.svg"
        width="16"
        height="16")
      XMUpdateEditImage(:media="media" v-if="media.objectType === 'Photo'")
      XAVideo(
        :value="media.VideoURL",
        :is-medal="isMedal",
        :orientation="media.orientation",
        :medal-theme="medalTheme"
        v-else)
</template>

<script>
import XAVideo from '~/components/atoms/Video'
import XMUpdateEditImage from '~/components/molecules/Update/Edit/Image'

export default {
  name: 'XMUpdateEditMedias',
  components: { XAVideo, XMUpdateEditImage },
  props: {
    medias: Array,
    isMedal: Boolean,
    medalTheme: Object,
  },
  data() {
    return {
      tags: [],
    }
  },
  computed: {
    getGalleryClass() {
      const count = this.medias.slice(0, 4)
      return `gallery-${count.length}`
    },
  },
  methods: {
    doRemoveGalleryItem(index) {
      this.medias.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xm-update-edit-medias::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .media-item {
    width: 100%;
    height: 400px;
    position: relative;
    background-color: $black;

    &.is-medal {
      background-color: transparent;

      .xa-video {
        padding: 20px 0;

        &.portrait {
          .video-js {
            padding-top: 0;
            height: 350px;

            video {
              object-fit: cover;
            }
          }
        }

        .video-js {
          video {
            border-radius: 12px;
            max-width: 204px;
            margin: 0 auto;
            right: 0;
            box-shadow: 0 6px 20px 10px rgb(9 47 55 / 60%);
          }
        }
      }
    }

    .xa-video {
      width: 100%;
      height: 100%;
    }

    ._delete {
      width: 22px;
      height: 22px;
      background: #fff;
      box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
      border-radius: 50%;
      padding: 3px;
      cursor: pointer;
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.gallery-2 {
    .media-item {
      width: calc(50% - 5px);
      height: 250px;
    }
  }

  &.gallery-3 {
    .media-item {
      margin-bottom: 10px;

      &:not(:first-child) {
        width: calc(50% - 5px);
        height: 200px;
        margin-bottom: 0;
      }
    }
  }

  &.gallery-4 {
    .media-item {
      margin-bottom: 10px;

      &:not(:first-child) {
        width: calc(100% / 3 - 5px);
        height: 150px;
      }
    }
  }

  @media screen and (max-width: 427px) {
    &.gallery-2 {
      .media-item {
        height: 105px;
      }
    }
  }
}
</style>
