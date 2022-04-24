<template lang="pug">
.xo-add-pin
  .close(@click.prevent="$parent.close()"): b-icon(icon="close" custom-size="mdi-18px")
  .header
    h2 PIN a product from the MarketPlace
    p Click to mark a PIN
  .slider-container
    b-loading(v-model="isConverting", :is-full-page="false")
    vue-slick-carousel(v-bind="sliderSettings" ref="carousel" v-if="!isConverting")
      .slider-item(v-for="(image, index) in images", :key="index" ref="addPin")
        XOAddPinImage(:image="image" @setTag="setTag" @isEdit="isEdit = true" @remove="doRemoveTag")
  .navigation-actions
    .prev(@click.prevent="$refs.carousel.prev()"): b-icon(icon="chevron-left" size="is-large")
    .next(@click.prevent="$refs.carousel.next()"): b-icon(icon="chevron-right" size="is-large")
  .actions
    b-button(type="is-white" outlined @click.prevent="$parent.close()") Cancel
    b-button(type="is-primary" @click.prevent="doCompleteAddPin()", :disabled="isDisabled", :loading="isSubmitting") Complete
</template>

<script>
import gql from 'graphql-tag'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import groupBy from 'lodash/groupBy'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import each from 'lodash/each'
import XOAddPinImage from '~/components/organisms/AddPin/Image'

export default {
  name: 'XOAddPin',
  components: { VueSlickCarousel, XOAddPinImage },
  props: {
    medias: Array,
  },
  data() {
    return {
      images: [],
      isConverting: true,
      dataSet: [],
      isEdit: false,
      isLoading: false,
      isSubmitting: false,
    }
  },
  computed: {
    sliderSettings() {
      const sliderSettings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
      }

      return sliderSettings
    },
    isDisabled() {
      return this.dataSet.length < 1
    },
  },
  async mounted() {
    await this.doRetrieveImageURL()
    setTimeout(() => {
      this.isConverting = false
    }, 1000)
    this.$root.$on('remove/tag', (item) => {
      this.doRemoveTag(item)
    })
  },
  methods: {
    doShowAddPin() {
      this.$emit('DoShowAddPin', false)
    },
    setTag(item) {
      this.dataSet.push(item)
    },
    doRemoveTag(item) {
      this.dataSet = uniqWith(this.dataSet, isEqual)
      const dataSet = this.dataSet.findIndex((data) => data.xCoordinate === item?.xCoordinate.toString())
      this.dataSet.splice(dataSet, 1)
    },
    async doRetrieveImageURL() {
      this.isEdit = false
      this.isConverting = true
      try {
        await this.medias.forEach(async (media) => {
          if (media?.objectType === 'Photo') {
            const { data } = await this.$apollo.query({
              variables: {
                id: media?.objectID,
              },
              query: gql`
                query ($id: String!, $type: String) {
                  getPhotoURL(id: $id, type: $type)
                }
              `,
            })
            const image = data?.getPhotoURL
            this.images.push({ id: media?.objectID, url: image })
          }
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      }
    },
    doCompleteAddPin() {
      this.isSubmitting = true
      const data = uniqWith(this.dataSet, isEqual)
      const groupDataSet = groupBy(data, 'parentID')

      // const groupDataSet = groupBy(this.dataSet, 'parentID')

      each(groupDataSet, async (Tags, photoID) => {
        const mappedTags = Tags.map((tag) => {
          return {
            xCoordinate: tag?.xCoordinate,
            yCoordinate: tag?.yCoordinate,
            objectID: tag?.objectID,
            objectType: tag?.objectType,
          }
        })
        try {
          if (this.isEdit) {
            await this.$apollo.mutate({
              variables: {
                photoID,
                Tags: mappedTags,
              },
              mutation: gql`
                mutation editPin($photoID: String!, $Tags: [InputTag!]!) {
                  editPin(photoID: $photoID, Tags: $Tags) {
                    success
                    # timestamp
                  }
                }
              `,
            })
          } else {
            await this.$apollo.mutate({
              variables: {
                photoID,
                Tags: mappedTags,
              },
              mutation: gql`
                mutation ($photoID: String!, $Tags: [InputTag!]!) {
                  addPin(photoID: $photoID, Tags: $Tags) {
                    success
                  }
                }
              `,
            })
          }

          this.$root.$emit('retrieve/image/pins')
        } catch (error) {
          this.doTrackSegmentError(error)
        } finally {
          this.isSubmitting = false
          this.$parent.close()
          // this.doShowAddPin()
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-add-pin::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(#020f12, 0.95);
  padding: 50px 0;

  .close {
    position: absolute;
    top: 20px !important;
    right: 20px !important;
    background-color: $white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
  }

  .header {
    color: $white;
    text-align: center;
    margin-bottom: 30px;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.5rem;
      font-weight: 300;
    }
    @media (max-width: '533px') {
      h2 {
        font-size: 1.5rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }

  .slider-container {
    .slick-slider {
      .slick-list {
        .slick-slide {
          > div {
            text-align: center;

            .slider-item {
              width: auto !important;
              min-height: calc(100vh - 235px);
              display: flex !important;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }

  .navigation-actions {
    color: $white;

    .prev,
    .next {
      position: absolute;
      top: 0;
      bottom: 0;
      cursor: pointer;
      margin: auto 0;
      height: 50px;
    }

    .prev {
      left: 20px;
    }

    .next {
      right: 20px;
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding: 0 20px;

    button {
      text-transform: uppercase;

      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .navigation-actions {
      .prev {
        left: 0;
      }

      .next {
        right: 0;
      }
    }
  }
}
</style>
