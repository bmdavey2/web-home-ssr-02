<template lang="pug">
.xm-medals-past-results-tab(v-if="details")
  .details.row.justify-between
    ._content.column-details.flex-column.justify-between
      ._icon: img(src="~assets/images/Medals/distance.svg")
      div
        .value {{ distanceValue }}{{ distanceUnit }} #[span(v-if="distanceType") &mdash; {{ distanceType }}]
        ._title.text-weight-light Distance
    ._content.column-details.flex-column.justify-between
      ._icon: img(src="~assets/images/Medals/participated.svg")
      div
        .value {{ participated }}
        ._title.text-weight-light People participated
    ._content.column-details.flex-column.justify-between(v-if="averageFinishTime")
      ._icon: img(src="~assets/images/Medals/time.svg")
      div
        .value {{ averageFinishTime }}
        ._title.text-weight-light Average finish time

  XMMedalsPastMalePlacers(:placers="malePlacers" v-if="malePlacers.length")
  XMMedalsPastFemalePlacers(:placers="femalePlacers" v-if="femalePlacers.length")

  .download-results.column-details
    .row.items-center.justify-between
      ._label Download race results
      .actions: b-button.text-uppercase(
        type="is-primary"
        outlined,
        :loading="isDownloading"
        @click.prevent="doDownloadRaceResults()") Download
</template>

<script>
import XMMedalsPastMalePlacers from '~/components/molecules/Medals/Past/MalePlacers'
import XMMedalsPastFemalePlacers from '~/components/molecules/Medals/Past/FemalePlacers'

export default {
  name: 'XMMedalsPastResultsTab',
  components: { XMMedalsPastMalePlacers, XMMedalsPastFemalePlacers },
  props: {
    distance: null,
    isActive: Boolean,
  },
  data() {
    return {
      details: null,
      isDownloading: false,
    }
  },
  computed: {
    distanceValue() {
      return this.distance?.distance || null
    },
    distanceUnit() {
      return this.distance?.distanceUnit || null
    },
    distanceType() {
      return this.distance?.distanceType || null
    },
    participated() {
      return this.details?.peopleParticipated || 0
    },
    averageFinishTime() {
      return this.details?.averageFinishTime || null
    },
    malePlacers() {
      return this.details?.Top3Male || []
    },
    femalePlacers() {
      return this.details?.Top3Female || []
    },
  },
  watch: {
    isActive: {
      deep: true,
      handler(value) {
        if (value) {
          this.$root.$emit('set/active/raceDistance', this.details)
        }
      },
    },
  },
  mounted() {
    this.doRetrievePastEvent()
  },
  methods: {
    async doRetrievePastEvent() {
      const { distance, distanceUnit, distanceType } = this.distance

      const params = {
        slug: this.$route?.params?.slug,
        distance,
        distanceUnit,
        distanceType,
      }
      const { getNFTPostEventMedal } = await this.$api.getNFTPostEventMedal(params)
      this.details = getNFTPostEventMedal
      this.details.currentRaceDistance = this.distance

      if (this.isActive) {
        this.$root.$emit('set/active/raceDistance', this.details)
      }
    },
    doDownloadRaceResults() {
      this.isDownloading = true
      try {
        this.$toast?.success(`Downloading race result. Please Wait...`, {
          duration: 3000,
          position: 'bottom-right',
        })

        const { distance, distanceUnit, distanceType } = this.distance

        const url = `${this.getAPIURL()}/exportRaceResultByDistance?distance=${distance}&distanceUnit=${distanceUnit}&distanceType=${distanceType}&productID=${
          this.details?.Product?.id
        }`

        const link = document.createElement('a')
        link.href = url
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (error) {
        this.doTrackSegmentError(error, 'Download Race Result')
      } finally {
        this.isDownloading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-medals-past-results-tab::v-deep {
  .column-details {
    background-color: $white;
    border-radius: 10px;
    padding: 30px;
  }

  .details {
    margin-bottom: 20px;

    &::after {
      content: '';
      width: calc(100% / 3 - 15px);
    }

    @include max-width(767px) {
      margin-bottom: 0;
    }

    ._content {
      width: calc(100% / 3 - 15px);
      min-height: 240px;
      color: $secondary;

      @include max-width(767px) {
        width: 100%;
        flex-direction: row;
        min-height: auto;
        margin-bottom: 20px;
        justify-content: flex-start;

        ._icon {
          margin-right: 20px;
        }
      }

      .value {
        font-size: 1.5714rem;
        margin-bottom: 3px;
      }

      ._title {
        font-size: 1.1429rem;
      }
    }
  }

  .xm-medals-past-male-placers,
  .xm-medals-past-female-placers {
    background-color: $white;
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 20px;

    .recognition {
      color: $secondary;
      width: 100%;
      max-width: 400px;

      @include max-width(1215px) {
        max-width: 200px;
      }

      @include max-width(768px) {
        max-width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 20px;
      }

      ._icon {
        @include max-width(768px) {
          margin-right: 10px;
        }
      }

      .value {
        font-size: 1.5714rem;
      }

      ._title {
        font-size: 1.1429rem;
      }
    }

    .placers {
      @include max-width(768px) {
        flex: none;
        width: 100%;
      }

      .xa-medals-placer {
        width: calc(100% / 3 - 20px);

        @include max-width(767px) {
          width: 100%;
          margin-bottom: 20px;
          min-height: auto;

          .place {
            margin-bottom: 10px;
          }
        }
      }

      &::after {
        content: '';
        width: calc(100% / 3 - 20px);
      }
    }
  }

  .download-results {
    ._label {
      font-size: 1.5714rem;
      color: $secondary;

      @include max-width(767px) {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
