<template lang="pug">
.xm-medals-past-female-placers.row.justify-between
  .recognition.flex-column.justify-between
    ._icon: img(src="~assets/images/Medals/place.svg")
    div
      .value Top 3
      ._title.text-weight-light Female
  .placers.col.row.justify-between
    XAMedalsPlacer(v-for="(placer, index) in placers", :key="index", :placer="placer")
</template>

<script>
import XAMedalsPlacer from '~/components/atoms/Medals/Placer'

export default {
  name: 'XMMedalsPastFemalePlacers',
  components: { XAMedalsPlacer },
  props: {
    placers: Array,
  },
}
</script>
