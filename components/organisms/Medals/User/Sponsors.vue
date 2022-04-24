<template lang="pug">
.xo-medals-user-sponsors(v-if="sponsors.length")
  .container
    h3.text-secondary Event sponsors
    h4.text-weight-light.text-secondary {{ title }} sponsored by:

    .sponsors.desktop.row.items-center(:class="sponsorsRow1Length")
      .sponsor.row.items-center.justify-center(v-for="(sponsor, index) in sponsorsRow1", :key="index"): img(
        :src="sponsor.PhotoURL")

    .sponsors.desktop.row.items-center(style="margin-top: 0" v-if="sponsorsRow2.length")
      .sponsor.row.items-center.justify-center(v-for="(sponsor, index) in sponsorsRow2", :key="index"): img(
        :src="sponsor.PhotoURL")

    .sponsors.desktop.row.items-center(style="margin-top: 0" v-if="sponsorsRow3.length")
      .sponsor.row.items-center.justify-center(v-for="(sponsor, index) in sponsorsRow3", :key="index"): img(
        :src="sponsor.PhotoURL")

    .sponsors.mobile.row.items-center(v-if="sponsors.length")
      .sponsor.row.items-center.justify-center(v-for="(sponsor, index) in sponsors", :key="index"): img(
        :src="sponsor.PhotoURL")
</template>

<script>
export default {
  name: 'XOMedalsUserSponsors',
  computed: {
    details() {
      return this.$parent?.$parent?.userMedalDetails || null
    },
    product() {
      return this.details?.Product || null
    },
    title() {
      return this.product?.title || ''
    },
    sponsors() {
      return this.product?.Sponsors || []
    },
    sponsorsRow1() {
      return this.sponsors.slice(0, 5) || []
    },
    sponsorsRow2() {
      return this.sponsors.slice(5, 10) || []
    },
    sponsorsRow3() {
      return this.sponsors.slice(10, 15) || []
    },
    sponsorsRow1Length() {
      const count = this.sponsorsRow1.length

      if (count > 3) {
        return 'justify-between'
      }

      return 'justify-evenly'
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-medals-user-sponsors::v-deep {
  background-color: $white;
  padding: 80px 0;
  position: relative;
  z-index: 2;

  @include max-width(767px) {
    padding: 50px 0;
  }

  h3 {
    font-size: 2.2857rem;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 1.5714rem;
  }

  .sponsors {
    margin-top: 40px;

    &.desktop {
      @include max-width(768px) {
        display: none;
      }
    }

    &.mobile {
      display: none;

      @include max-width(768px) {
        display: flex;
      }
    }

    @include max-width(427px) {
      margin-top: 20px;
    }

    .sponsor {
      width: 100%;
      max-width: 20%;
      height: 150px;
      margin-bottom: 50px;
      padding: 0 30px;

      @include max-width(768px) {
        max-width: 25%;
      }

      @include max-width(767px) {
        max-width: calc(100% / 3);
      }

      @include max-width(427px) {
        max-width: 50%;
        margin-bottom: 20px;
        height: auto;
        padding: 0 15px;
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
