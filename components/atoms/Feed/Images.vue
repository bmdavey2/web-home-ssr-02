<template lang="pug">
.xa-feed-images(:class="imageGalleryClass")
  .image-item(v-for="(img, index) in images", :key="index")
    XOAddPinTag(v-for="(tag, index) in getTags(img)", :key="index", :tag="tag", :edit="false" v-if="showPins")
    b-button.pin-toggle(type="is-light" v-if="index === 0 && getTags(img)" size="is-small" @click="setPins")
      img(
        src="~assets/icons/secondary-pin.svg"
        style="height: 16px; width: 16px; margin-left: -4px; margin-bottom: -4px")
      span {{ showPins ? 'Hide' : 'Show' }} Pins
    img.lozad(
      :src="img.PhotoURL"
      width="509"
      data-placeholder-background="lightgrey"
      @click.prevent="doShowImageLightbox(index)"
      height="394")
    .count(v-if="index === 3 && countExcludedImage > 0" @click.prevent="doShowImageLightbox(3)") +{{ countExcludedImage }}
</template>

<script>
import lozad from 'lozad'
import XOAddPinTag from '~/components/organisms/AddPin/Tag'

export default {
  components: { XOAddPinTag },
  props: {
    images: Array,
    tags: Object,
  },
  data() {
    return {
      slide: 0,
      showLightbox: false,
    }
  },
  computed: {
    showPins() {
      return this.$store.state.media.showPins
    },
    fullImages() {
      const data = []
      for (const image of this.images) data.push(this.getFullPhotoURL(image.PhotoURL))
      return data
    },
    gallery() {
      const gallery = this.images.map((image) => {
        return { url: this.getFullPhotoURL(image?.PhotoURL), pins: image?.Pin }
      })
      return gallery
    },
    imageGalleryClass() {
      const sliceImages = this.images.slice(0, 4)
      const count = sliceImages.length
      return `gallery-${count}`
    },
    countExcludedImage() {
      const excludedImages = this.images.slice(4)
      const countExcludedImage = excludedImages.length

      return countExcludedImage
    },
  },
  mounted() {
    const observer = lozad('.lozad', {
      rootMargin: '10px 0px',
      threshold: 0.1,
      enableAutoReload: true,
    })
    observer.observe()
  },
  methods: {
    setPins() {
      this.$store.commit('media/setPinStatus', !this.$store.state.media.showPins)
    },
    getTags(img) {
      return img.Pin?.Tags ? img.Pin.Tags : null
    },
    doShowImageLightbox(slide) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/FeedItem/ImageLightbox').default,
        parent: this,
        props: {
          gallery: this.gallery,
          slide,
        },
        width: '100%',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-feed-images {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;

  .pin-toggle {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 2;
    background-color: rgba($white, 0.6);
  }
}

.xa-feed-images .image-item {
  display: none;
  position: relative;
  cursor: pointer;
}

.xa-feed-images .image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

.xa-feed-images .image-item .count {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.8);
  color: $white;
  font-size: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media screen and (max-width: 427px) {
    font-size: 2rem;
  }
}

.xa-feed-images.gallery-1 .image-item {
  max-height: 500px;
  display: block;
  width: 100%;

  @media screen and (max-width: 427px) {
    max-height: 360px;
  }
}

.xa-feed-images.gallery-2 .image-item {
  width: calc(50% - 5px);
  max-height: 250px;
  display: block;

  @media screen and (max-width: 427px) {
    max-height: 105px;
  }
}

.xa-feed-images.gallery-3 .image-item:first-child {
  width: 100%;
  max-height: 500px;
  margin-bottom: 10px;
  display: block;

  @media screen and (max-width: 427px) {
    max-height: 300px;
  }
}

.xa-feed-images.gallery-3 .image-item:nth-child(2),
.xa-feed-images.gallery-3 .image-item:nth-child(3) {
  width: calc(50% - 5px);
  max-height: 200px;
  display: block;

  @media screen and (max-width: 427px) {
    max-height: 105px;
  }
}

.xa-feed-images.gallery-4 .image-item:first-child {
  width: 100%;
  max-height: 500px;
  margin-bottom: 7px;
  display: block;

  @media screen and (max-width: 427px) {
    max-height: 300px;
  }
}

.xa-feed-images.gallery-4 .image-item:nth-child(2),
.xa-feed-images.gallery-4 .image-item:nth-child(3),
.xa-feed-images.gallery-4 .image-item:nth-child(4) {
  width: calc(100% / 3 - 5px);
  max-height: 200px;
  display: block;

  @media screen and (max-width: 427px) {
    max-height: 105px;
  }
}
</style>
