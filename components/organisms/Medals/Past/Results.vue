<template lang="pug">
.xo-medals-past-results
  .container
    .navigation.row.items-center.justify-between
      ._label Race result for distance
      .distances.row.col
        .distance.col.row.items-center.justify-center(
          v-for="(distance, index) in sortedDistance",
          :class="activeResult === distance && 'active'"
          @click.prevent="doSetActiveResult(distance)") {{ distance.distance }}{{ distance.distanceUnit }} #[span.ml-1(v-if="distance.distanceType") - {{ distance.distanceType }}]

    .details
      XMMedalsPastResultsTab(
        v-for="(distance, index) in distances",
        :key="index",
        :distance="distance"
        v-show="activeResult === distance",
        :is-active="activeResult === distance")
</template>

<script>
import XMMedalsPastResultsTab from '~/components/molecules/Medals/Past/ResultsTab'

export default {
  name: 'XOMedalsPastResults',
  components: { XMMedalsPastResultsTab },
  props: {
    distances: Array,
  },
  data() {
    return {
      activeResult: this.distances[0],
    }
  },
  computed: {
    sortedDistance() {
      const distances = this.distances
      const sortedDistance = distances.sort((a, b) => {
        return b.distance - a.distance
      })

      return sortedDistance
    },
  },
  mounted() {
    this.activeResult = this.distances[0]
  },
  methods: {
    doSetActiveResult(result) {
      this.activeResult = result
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-medals-past-results::v-deep {
  .navigation {
    background-color: $white;
    border-radius: 10px;
    padding: 0 10px 0 30px;
    margin-bottom: 20px;

    @include max-width(767px) {
      padding: 30px 30px 0;
      display: block;
      overflow: auto;
    }

    ._label {
      font-size: 1.5714rem;
      color: $secondary;
      width: 100%;
      max-width: 300px;

      @include max-width(767px) {
        max-width: 100%;
        position: sticky;
        left: 0;
      }
    }

    .distances {
      @include max-width(767px) {
        width: 1000px;
        max-width: unset;
      }

      .distance {
        padding: 30px 0;
        font-size: 1.5714rem;
        border-bottom: 2px solid transparent;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        user-select: none;
        height: auto;

        &.active {
          color: $primary;
          border-color: $primary;
        }
      }
    }
  }
}
</style>
