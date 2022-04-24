<template lang="pug">
.xo-add-pin-tag(
  :style="{ top: `calc(${tag.yCoordinate}% - 24px)`, left: `calc(${tag.xCoordinate}% - 11px)` }"
  @mouseover="isActive = true"
  @mouseout="isActive = false"
  @click.prevent="$emit('click', $event)")
  b-tooltip(
    type="is-light",
    :position="tooltipPosition",
    :auto-close="lt.tabletLG ? ['outside', 'escape'] : []",
    :active="isActive"
    multilined)
    img(src="~assets/icons/pin.svg" style="height: 20px; width: 20px; margin-bottom: -9px" @click="isActive = true")
    template(v-slot:content)
      .items.is-flex.is-align-items-center
        img(
          v-if="coverPhotoURL",
          :src="coverPhotoURL"
          @click="gotoPage(tag.Product.slug)"
          style="object-fit: cover; width: 32px; height: 32px")
        img(
          v-if="!coverPhotoURL",
          :src="categories.length ? categories[0].PhotoURL : '~assets/icons/activeplace-logo-grey.svg'"
          @click="gotoPage(slug)"
          style="object-fit: fit; width: 32px; height: 32px")
        .item-content.ml-2(@click="gotoPage(slug)")
          p.item-title(:style="edit ? 'max-width: 160px' : 'max-width: 190px'") {{ title }}
          .item-sub-content.is-flex
            p.mr-1 {{ type }}
            p(v-if="startDate") {{ '• ' + covertDate(startDate) || '' }}
        b-icon.ml-auto(
          icon="close"
          @click.native="doRemoveTag()"
          style="cursor: pointer"
          v-if="lte('tabletLG') || edit")
</template>

<script>
import moment from 'moment'

export default {
  name: 'XOAddPinTag',
  props: {
    tag: { type: Object, default: () => [] },
    edit: { type: Boolean, default: true },
  },
  data() {
    return {
      isActive: true,
    }
  },
  computed: {
    tooltipPosition() {
      if (this.tag.yCoordinate > 90 && this.tag.xCoordinate < 80 && this.tag.xCoordinate > 15) {
        return 'is-top'
      } else if (this.tag.xCoordinate > 80) {
        return 'is-left'
      } else if (this.tag.xCoordinate < 15) {
        return 'is-right'
      } else {
        return 'is-bottom'
      }
    },
    product() {
      return this.tag?.Product || null
    },
    coverPhotoURL() {
      return this.product?.coverPhotoURL || null
    },
    categories() {
      return this.product?.Categories || []
    },
    slug() {
      return this.product?.slug || null
    },
    title() {
      return this.product?.title || ''
    },
    type() {
      return this.product?.type || null
    },
    startDate() {
      return this.product?.startDate || new Date()
    },
  },
  methods: {
    covertDate(date) {
      if (!date) {
        return null
      }
      return moment(date).format('MMM DD, YYYY')
    },
    doRemoveTag() {
      this.isActive = false
      if (this.edit) {
        this.$emit('remove')
        this.$root.$emit('remove/tag', this.tag)
      }
    },
    gotoPage(slug) {
      if (!this.edit) {
        this.$router.push(`marketplace/p/${slug}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-add-pin-tag::v-deep {
  position: absolute;
  color: $white;
  z-index: 2;
  cursor: pointer;

  .tooltip-content {
    border-radius: 20px !important;
  }
  .items {
    position: relative;
    z-index: 3;
    color: black;
    img {
      border: 1px solid $white !important;
      filter: drop-shadow(0 4px 10px rgba(10, 39, 46, 0.15));
      border-radius: 3px;
    }
    .item-content {
      text-align: left;
      font-weight: 500;
      font-size: 14px;
      color: #050505;
      .item-title {
        overflow: hidden;
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
}
</style>
