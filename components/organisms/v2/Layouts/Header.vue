<template lang="pug">
.xo-layouts-header.row.items-center(:class="$route.name")
  .container
    .row.justify-between.items-center
      XMLayoutsHeaderLeft
      XMLayoutsHeaderCenter
      .right-header: client-only: XMLayoutsHeaderRight(:medal-details="medalDetails")
</template>

<script>
import XMLayoutsHeaderLeft from '~/components/molecules/v2/Layouts/Header/LeftHeader'
import XMLayoutsHeaderCenter from '~/components/molecules/v2/Layouts/Header/CenterHeader'
import XMLayoutsHeaderRight from '~/components/molecules/v2/Layouts/Header/RightHeader'

export default {
  name: 'XOLayoutsHeader',
  components: { XMLayoutsHeaderLeft, XMLayoutsHeaderCenter, XMLayoutsHeaderRight },
  data() {
    return {
      medalDetails: null,
    }
  },
  mounted() {
    if (this.$route.name === 'medals-event-user') {
      this.$root.$on('set/medalClaim/details', (value) => {
        this.doRetrieveMedalClaimDetails(value)
      })
    }
  },
  methods: {
    doRetrieveMedalClaimDetails(value) {
      this.medalDetails = value
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-layouts-header::v-deep {
  background-color: #2a4e55;
  box-shadow: 0 2px 20px rgba(39, 85, 96, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 90px;
  color: $white;
  z-index: 99;

  &.businesses {
    position: relative;
  }

  @include max-width(767px) {
    min-height: 70px;
  }

  > .container {
    @include max-width(1407px) {
      max-width: 100%;
    }
  }

  .right-header {
    width: 100%;
    max-width: 365px;

    @include max-width(1280px) {
      max-width: 335px;
    }

    @include max-width(1215px) {
      max-width: unset;
      width: auto;
    }
  }
}
</style>
