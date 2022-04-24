<template lang="pug">
.xo-medals-sponsors(v-if="sponsorsChunked.length")
  .container
    h3.text-secondary Event sponsors
    h4.text-weight-light.text-secondary {{ title }} sponsored by:

    .sponsors.desktop.row.items-center(
      v-for="(sponsors, index) in sponsorsChunked",
      :class="sponsorsChunkedClass(index, sponsors.length)")
      a.sponsor.row.items-center.justify-center(
        :href="sponsor.externalURL"
        target="_blank"
        v-for="(sponsor, index) in sponsors",
        :key="index"): img(
        :src="sponsor.PhotoURL")

    .sponsors.mobile.row.items-center
      a.sponsor.row.items-center.justify-center(
        :href="sponsor.externalURL"
        target="_blank"
        v-for="(sponsor, index) in sponsorsRaw",
        :key="index"): img(
        :src="sponsor.PhotoURL")
</template>

<script>
import chunk from 'lodash/chunk'

export default {
  name: 'XOMedalsSponsors',
  computed: {
    details() {
      return this.$parent?.$parent?.userMedalDetails || this.$parent?.$parent?.MedalDetails || null
    },
    product() {
      return this.details?.Product || null
    },
    title() {
      return this.product?.title || ''
    },
    sponsorsRaw() {
      return this.product?.Sponsors || []
    },
    sponsorsChunked() {
      return chunk(this.sponsorsRaw, 5) || []
    },
  },
  mounted() {
    this.getAllExternalLinks()
  },
  methods: {
    sponsorsChunkedClass(row, count) {
      if (row === 0) {
        if (count > 3) {
          return 'justify-between'
        }

        return 'justify-evenly'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-medals-sponsors::v-deep {
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

      @include max-width(600px) {
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
