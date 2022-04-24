<template lang="pug">
.xm-feed-item-image-lightbox
  .close(@click.prevent="$parent.close()")

  agile(:options="sliderOptions")
    .slide-item-container(v-for="(item, index) in gallery")
      .slide-item
        img(:src="item.url")
        template(v-if="showPins && item.pins !== null")
          XOAddPinTag(v-for="(tag, index) in item.pins.Tags", :key="index", :tag="tag", :edit="false")
        b-button.pin-toggle(
          type="is-light"
          size="is-small"
          @click.prevent="showPins = !showPins"
          v-if="item.pins !== null")
          img(
            src="~assets/icons/secondary-pin.svg"
            style="height: 16px; width: 16px; margin-left: -4px; margin-bottom: -4px")
          span {{ showPins ? 'Hide' : 'Show' }} Pins
    template(slot="prevButton"): b-icon(icon="chevron-left" type="is-white" custom-size="mdi-48px")
    template(slot="nextButton"): b-icon(icon="chevron-right" type="is-white" custom-size="mdi-48px")
</template>

<script>
import { VueAgile } from 'vue-agile'
import XOAddPinTag from '~/components/organisms/AddPin/Tag'

export default {
  components: { agile: VueAgile, XOAddPinTag },
  props: {
    gallery: Array,
    slide: Number,
  },
  data() {
    return {
      showPins: true,
    }
  },
  computed: {
    sliderOptions() {
      const sliderOptions = {
        dots: false,
        initialSlide: this.slide,
        infinite: this.gallery.length > 1,
      }

      return sliderOptions
    },
  },
  watch: {
    $route() {
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-feed-item-image-lightbox::v-deep {
  padding: 0 10px;

  .agile {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    position: unset;

    .agile__list {
      .slide-item-container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .slide-item {
          position: relative;

          img {
            max-height: calc(100vh - 50px);
          }

          .pin-toggle {
            position: absolute;
            bottom: 20px;
            left: 10px;
            z-index: 1;
            background-color: rgba($white, 0.6);
          }
        }
      }
    }

    .agile__actions {
      .agile__nav-button {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100px;
        margin: auto 0;
        appearance: none;
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        z-index: 1;

        &.agile__nav-button--prev {
          left: 20px;
        }

        &.agile__nav-button--next {
          right: 20px;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 0;
    height: 100%;

    .agile {
      height: 100%;

      .agile__list {
        height: 100%;
      }

      .agile__actions {
        .agile__nav-button {
          &.agile__nav-button--prev {
            left: 10px;
          }

          &.agile__nav-button--next {
            right: 10px;
          }
        }
      }
    }
  }
}
</style>
