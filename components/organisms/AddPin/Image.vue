<template lang="pug">
.xo-add-pin-image
  .current-pin(
    v-click-outside="closePin",
    :style="{ top: `calc(${newYPercentage}% - 21px)`, left: `calc(${newXPercentage}% - 11px)` }"
    v-if="addPin")
    img(src="~assets/icons/pin.svg" style="height: 20px; width: 20px")
    //b-icon(icon="map-marker-outline")
    ._tags(:class="searchPosition")
      b-input.mb-3(placeholder="Enter product name" v-model="searchInput" @input="searchDataAsync" icon="magnify")
      .loading.is-flex.is-justify-content-center(v-if="isLoading")
        img(src="~assets/icons/primary/Ring.svg" style="height: 39px; width: 39px")
      .is-flex.is-justify-content-center.has-text-secondary(v-if="!searchResults.length && !isLoading") No Product Found!!
      .items.is-flex.is-align-items-center(
        v-if="!isLoading"
        v-for="(item, index) in searchResults",
        :key="index"
        @click="setTag(item)")
        img(
          v-if="item.Product.coverPhotoURL",
          :src="item.Product.coverPhotoURL"
          style="object-fit: cover; width: 32px; height: 32px; background-color: white")
        img(
          v-if="!item.Product.coverPhotoURL",
          :src="item.Product.Categories[0].PhotoURL"
          style="object-fit: cover; width: 32px; height: 32px; background-color: white")
        .item-content.ml-2
          //- .item-title(v-html="getHighlights(item.Product.title)")
          .item-title {{ item.Product.title }}
          .item-sub-content.is-flex
            p.mr-1 {{ item.Product.type }}
            p(v-if="item.Product.startDate") {{ '• ' + covertDate(item.Product.startDate) || '' }}
  XOAddPinTag(v-for="(tag, index) in tags", :key="index", :tag="tag" @remove="doRemoveTag(index)")
  img.item-image(:src="image.url" ref="image" @click.prevent="doSetCoordinates($event); addPin = true")
</template>

<script>
import debounce from 'lodash/debounce'
import gql from 'graphql-tag'
import moment from 'moment'
import XOAddPinInputTag from '~/components/organisms/AddPin/InputTag'
import XOAddPinTag from '~/components/organisms/AddPin/Tag'

export default {
  name: 'XOAddPinImage',
  components: { XOAddPinTag, XOAddPinInputTag },
  props: {
    image: { type: Object, default: () => [] },
  },
  data() {
    return {
      newXPercentage: '',
      newYPercentage: '',
      product: null,
      addPin: false,
      dataSet: [],
      searchResults: [],
      tags: [],
      isLoading: false,
      searchInput: '',
    }
  },
  computed: {
    searchPosition() {
      let searchPosition
      if (this.newXPercentage > 70) {
        searchPosition = 'is-right'
      }

      if (this.newYPercentage > 65) {
        searchPosition = 'is-bottom'
      }

      if (this.newXPercentage > 30 && this.newXPercentage < 70) {
        searchPosition = 'is-center'
      }

      if (this.newXPercentage > 70 && this.newYPercentage > 65) {
        searchPosition = 'is-bottom-right'
      }

      if (this.newXPercentage > 30 && this.newXPercentage < 70 && this.newYPercentage > 65) {
        searchPosition = 'is-bottom-center'
      }

      return searchPosition
    },
  },
  mounted() {
    this.searchProduct()
    this.getInitialTags()
  },
  methods: {
    getHighlights(text) {
      const regex = new RegExp(this.searchInput, 'ig')
      return text.replace(regex, (match) => '<b class="has-text-secondary">' + match + '</b>')
    },
    async getInitialTags() {
      try {
        // this.isLoading = true
        const { data } = await this.$apollo.query({
          variables: { photoID: this.image.id },
          fetchPolicy: 'no-cache',
          query: gql`
            query ($photoID: String!) {
              getPin(photoID: $photoID) {
                createdAt
                photoID
                Tags {
                  xCoordinate
                  yCoordinate
                  createdAt
                  objectID
                  objectType
                  Product {
                    title
                    slug
                    coverPhotoURL
                    type
                    startDate
                    Categories {
                      PhotoURL
                    }
                  }
                }
              }
            }
          `,
        })
        // test code for edit product
        const initialTags = data?.getPin.Tags
        if (initialTags.length) {
          this.$emit('isEdit', true)
          for (const tag of initialTags) {
            const data = {}
            data.objectID = tag?.objectID
            data.objectType = tag?.objectType
            data.Product = tag?.Product

            this.tags.push(
              Object.assign(
                { xCoordinate: tag.xCoordinate, yCoordinate: tag.yCoordinate, parentID: this.image?.id },
                data
              )
            )

            this.$nextTick(() => {
              this.addPin = false
              this.$emit(
                'setTag',
                Object.assign(
                  {
                    xCoordinate: tag.xCoordinate,
                    yCoordinate: tag.yCoordinate,
                    parentID: this.image?.id,
                  },
                  data
                )
              )
            })
          }
        }
      } catch (e) {
      } finally {
        // this.isLoading = false
      }
    },
    closePin() {
      return (this.addPin = !this.addPin)
      // return this.addPin ? (this.addPin = false) : ''
    },
    searchDataAsync: debounce(function (text) {
      if (text) {
        this.searchProduct(text)
      }
    }, 500),
    doSetCoordinates(e) {
      this.newXPercentage = (e.offsetX / this.$refs.image.clientWidth) * 100
      this.newYPercentage = (e.offsetY / this.$refs.image.clientHeight) * 100
    },
    setTag(item) {
      const data = {}
      data.objectID = item?.objectID
      data.objectType = item?.objectType
      data.Product = item?.Product

      this.tags.push(
        Object.assign(
          { xCoordinate: this.newXPercentage, yCoordinate: this.newYPercentage, parentID: this.image?.id },
          data
        )
      )
      this.$nextTick(() => {
        this.addPin = false
        this.$emit(
          'setTag',
          Object.assign(
            {
              xCoordinate: this.newXPercentage.toString(),
              yCoordinate: this.newYPercentage.toString(),
              parentID: this.image?.id,
            },
            data
          )
        )
      })
    },
    doRemoveTag(index) {
      this.tags.splice(index, 1)
    },
    async searchProduct(item) {
      const count = this.lt('tabletLG') ? 2 : 4
      try {
        this.isLoading = true
        const { data } = await this.$apollo.query({
          variables: { text: item, count },
          fetchPolicy: 'no-cache',
          query: gql`
            query ProductSuggestions($count: Int, $text: String) {
              ProductSuggestions(count: $count, text: $text) {
                objectID
                objectType
                Product {
                  title
                  slug
                  coverPhotoURL
                  type
                  startDate
                  Categories {
                    PhotoURL
                  }
                }
              }
            }
          `,
        })

        this.searchResults = data?.ProductSuggestions
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
    covertDate(date) {
      if (!date) {
        return null
      }
      return moment(date).format('MMM DD, YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-add-pin-image::v-deep {
  position: relative;

  .current-pin {
    position: absolute;
    color: $white;
    text-align: left;
    z-index: 3;

    ._tags {
      padding: 15px 15px 0 15px;
      border-radius: 5px;
      width: 315px;
      background-color: rgba($white, 0.85);
      position: absolute;

      input {
        height: 37px !important;
      }

      .items {
        cursor: pointer !important;
        margin-bottom: 15px;
        position: relative;
        color: black;

        img {
          border: 1px solid $white !important;
          filter: drop-shadow(0 4px 10px rgba(10, 39, 46, 0.15));
          border-radius: 3px;
        }

        .item-content {
          font-weight: 400;
          font-size: 14px;
          color: #050505;

          .item-title {
            overflow: hidden;
            max-width: 250px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .item-sub-content {
            font-weight: 300 !important;
            font-size: 12px !important;
            line-height: 14px !important;
            color: #65676b !important;
          }
        }
      }

      &.is-right {
        right: 0;
      }

      &.is-center {
        left: -150px;
      }

      &.is-bottom {
        bottom: 30px;
      }

      &.is-bottom-right {
        right: 0;
        bottom: 30px;
      }

      &.is-bottom-center {
        left: -150px;
        bottom: 30px;
      }
    }
  }

  .item-image {
    max-height: 500px;
  }

  @media screen and (max-width: 767px) {
    .current-pin {
      ._tags {
        width: 250px;

        .items {
          .item-content {
            .item-title {
              max-width: 190px;
            }
          }
        }

        &.is-center {
          left: -115px;
        }

        &.is-bottom-center {
          left: -115px;
        }
      }
    }

    .item-image {
      max-height: 450px;
    }
  }
}
</style>
