<template lang="pug">
.xo-medals-order-medal-design.form-content(ref="medalDesign")
  h3 Medal design
  h4.text-weight-thin What type of Digital NFT Medal do you want?

  .form-error.row.items-center.justify-between(v-if="validation.firstError('medalDesign')")
    .value Please select a medal design.
    ._icon: b-icon(icon="message-alert")

  .design-list.row.justify-between
    .design.standard.flex-column(:class="medalDesign === 'standard' && 'active'")
      .header(@click.prevent="medalDesign = 'standard'")
        ._icon: img(src="~assets/images/Medals/select-checked.svg" alt="Medal Design Select" width="12" height="12")
        ._title
          .value Standard

      .medal-container: XAMedalsVideo(:video="standardMedal", :image="standardMedalThumbnail", :autoplay="false")

      .text-content.col
        .description A standard templated 3D animated medal with basic customized options, and your event information added
        .price Price: .25c to $2 per medal

    .design.premium-1.flex-column(:class="medalDesign === 'premium1' && 'active'")
      .header(@click.prevent="medalDesign = 'premium1'")
        ._icon: img(src="~assets/images/Medals/select-checked.svg" alt="Medal Design Select" width="12" height="12")
        ._title
          .value Premium
          .sub-value Option 1

      .medal-container
        img(src="~assets/images/v2/Businesses/physical-medal-order-form.png" v-show="isPhysicalMedal")
        XAMedalsVideo(
          :video="digitalMedal",
          :image="digitalMedalThumbnail",
          :autoplay="false"
          v-show="!isPhysicalMedal")

        .toggle.row.items-center.justify-center
          span.mr-3(:style="{ opacity: !isPhysicalMedal ? '1' : '0.6' }") Digital Medal
          XAFormToggle(v-model="isPhysicalMedal" inactive-color="#886bf2")
          span.ml-3(:style="{ opacity: isPhysicalMedal ? '1' : '0.6' }") Physical Medal

      .text-content.col
        .description A completed 3D animated medal with sound, that resembles your current physical event medal
        .price Price: .50c to $5 per medal

    .design.premium-2.flex-column(:class="medalDesign === 'premium2' && 'active'")
      .header(@click.prevent="medalDesign = 'premium2'")
        ._icon: img(src="~assets/images/Medals/select-checked.svg" alt="Medal Design Select" width="12" height="12")
        ._title
          .value Premium
          .sub-value Option 2

      .medal-container: XAMedalsVideo(
        :video="premiumDesign",
        :image="premiumDesignThumbnail",
        :autoplay="false"
        has-controls)

      .text-content
        .description A custom designed 3D animated medal with sound, to better resemble a unique race experience
        .price Price: .50c to $5 per medal

  .package-addons
    h2 Package add ons
    .activation.row
      .toggle: XAFormToggle(v-model="marketingActivation")
      .contents.col
        h4 ActivePlace Marketing Activation
        p ActivePlace has developed a unique formula helping events grow across the world. Maximize your Digital NFT Medal and partner ROI
        .disclaimer Price: Bundled into per medal price

    .actions
      b-button.btn-prev(type="is-white" @click.prevent="doPrevStep()"): b-icon(icon="chevron-left")
      b-button.btn-next(type="is-primary" @click.prevent="doNextStep()") To Event Information #[span.step 2/3]
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { Validator } from 'simple-vue-validator'
import XAMedalsVideo from '~/components/atoms/Medals/Video'
import XAFormToggle from '~/components/atoms/Form/Toggle'

export default {
  name: 'XOMedalsOrderMedalDesign',
  components: { XAMedalsVideo, XAFormToggle },
  validators: {
    medalDesign(value) {
      return Validator.value(value).required('Please select a medal design.')
    },
  },
  data() {
    return {
      standardMedal: 'https://api.activeplace.com/videos/standardnftmedal.m3u8/standardnftmedal.m3u8',
      standardMedalThumbnail: 'http://api.activeplace.com/videos/thumbnails/standardnftmedal.jpg',
      digitalMedal: 'https://api.activeplace.com/videos/nftmedal.m3u8/Final%20with%20BG.m3u8',
      digitalMedalThumbnail: 'http://api.activeplace.com/videos/thumbnails/nftmedal.jpg',
      premiumDesign: 'https://api.activeplace.com/videos/premium.m3u8/premium.m3u8',
      premiumDesignThumbnail: 'http://api.activeplace.com/videos/thumbnails/premium.jpg',
      isPhysicalMedal: false,
    }
  },
  computed: {
    ...mapFields('medals', ['order.medalDesign', 'order.marketingActivation']),
  },
  methods: {
    doPrevStep() {
      this.$root.$emit('set/active/form', 1)
    },
    doNextStep() {
      this.$validate().then((success) => {
        if (success) {
          this.$root.$emit('set/active/form', 3)
          window.scrollTo(0, 0)
        } else {
          const element = this.$refs.medalDesign
          const top = element.offsetTop + 100
          window.scrollTo(0, top)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-medals-order-medal-design::v-deep {
  h3 {
    margin-bottom: 15px;
  }

  h2 {
    color: $secondary;
    margin-bottom: 50px;
  }

  h4 {
    margin-bottom: 50px;

    @include max-width(767px) {
      margin-bottom: 30px;
    }
  }

  .design-list {
    padding-bottom: 80px;

    @include max-width(767px) {
      margin: 0 -30px;
      padding-bottom: 30px;
    }

    .design {
      width: calc(100% / 3 * 1 - 20px);
      background-color: #f8f8f8;
      padding: 30px 15px 15px;
      border-radius: 10px;
      border: 1px solid transparent;
      transition: 0.3s;

      @include max-width(1023px) {
        width: 100%;
        margin-bottom: 30px;
        padding: 30px;
      }

      &:hover {
        border-color: #886bf2;
      }

      &.active {
        background-color: #886bf2;

        .header {
          ._icon {
            background-color: $white;
            border-color: $white;

            img {
              display: block;
            }
          }

          ._title {
            .value {
              color: $white;
            }

            .sub-value {
              color: $white;
            }
          }
        }
      }

      .header {
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
        min-height: 80px;

        ._icon {
          width: 24px;
          height: 24px;
          border: 1px solid $secondary;
          border-radius: 50%;
          margin-right: 15px;
          margin-top: 3px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          img {
            display: none;
          }
        }

        ._title {
          .value {
            font-size: 1.5714rem;
            line-height: 2.4286rem;
            color: $secondary;
          }

          .sub-value {
            font-size: 1rem;
            line-height: 24px;
            font-weight: 100;
            color: #65676b;
            margin-top: 3px;
          }
        }
      }

      .medal-container {
        position: relative;
        min-height: 475px;

        @include max-width(1023px) {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }

        @include max-width(767px) {
          min-height: 450px;
        }

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .xa-medals-video {
          .video-js {
            width: 100%;
            height: 475px;

            @include max-width(767px) {
              height: 450px;
            }

            video {
              box-shadow: none;
              border-radius: 10px;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
        }

        .toggle {
          position: absolute;
          left: 0;
          right: 0;
          width: calc(100% - 20px);
          height: 44px;
          bottom: 10px;
          z-index: 5;
          background-color: #08252c;
          border-radius: 10px;
          color: $white;
          margin: 0 auto;
          font-weight: 100;
        }
      }

      .text-content {
        background-color: $white;
        padding: 15px 20px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        @include max-width(1023px) {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }

        .description {
          font-size: 1rem;
          line-height: 1.7143rem;
          font-weight: 100;
          color: #65676b;
          margin-bottom: 10px;
          letter-spacing: -0.28px;
        }

        .price {
          font-size: 1rem;
          line-height: 1.7143rem;
          color: $secondary;
          letter-spacing: -0.28px;
        }
      }
    }
  }

  .package-addons {
    background-color: #f8f8f8;
    padding: 50px;
    margin: 0 -50px -50px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    @include max-width(767px) {
      margin: 0 -30px -30px;
      padding: 30px;
    }

    .activation {
      background-color: $white;
      padding: 30px;
      width: 100%;
      max-width: 690px;
      border-radius: 10px;
      margin-bottom: 30px;

      .toggle {
        margin-top: 10px;

        @include max-width(767px) {
          margin: 0 0 20px;
          width: 100%;
        }
      }

      .contents {
        padding-left: 30px;

        @include max-width(767px) {
          padding: 0;
          width: 100%;
          flex: none;
        }

        h4 {
          color: $secondary;
          margin-bottom: 10px;
        }

        p {
          font-size: 1.1429rem;
          line-height: 24px;
          letter-spacing: -0.28px;
          font-weight: 100;
          margin-bottom: 20px;
        }

        .disclaimer {
          color: $secondary;
          font-weight: 500;
        }
      }
    }

    .actions {
      .btn-next {
        @include max-width(767px) {
          width: calc(100% - 70px) !important;
          white-space: unset;
        }
      }
    }
  }

  .form-error {
    background-color: #ffaf23;
    color: $white;
    font-weight: 100;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>
