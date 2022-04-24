<template lang="pug">
.xm-team-businesses
  b-dropdown.business-dropdown(aria-role="list" max-height="500px", :mobile-modal="false" scrollable)
    template(#trigger="{ active }")
      .selected-business
        XATeamBusiness(:business="selectedBusiness")
        b-icon(:icon="active ? 'chevron-up' : 'chevron-down'")
    b-dropdown-item.business-item(
      aria-role="listitem"
      v-for="(business, index) in businesses",
      :key="index"
      @click="doSelectBusiness(business)")
      XATeamBusiness(:business="business")
</template>

<script>
import gql from 'graphql-tag'
import XATeamBusiness from '~/components/atoms/Team/Business'

export default {
  name: 'XMTeamBusinesses',
  components: { XATeamBusiness },
  props: {
    businesses: Array,
  },
  data() {
    return {
      selectedBusiness: null,
    }
  },
  mounted() {
    if (!this.currentBusinessID) {
      this.selectedBusiness = this.businesses[0]
      this.$emit('selected', this.selectedBusiness)
      return
    }
    this.doRetrieveBusiness()
    this.$root.$on('team/change/business', (business) => {
      this.selectedBusiness = business
    })
  },
  methods: {
    async doRetrieveBusiness() {
      try {
        const { data } = await this.$apollo.query({
          variables: {
            id: this.currentBusinessID,
          },
          query: gql`
            query ($id: String) {
              Business(id: $id) {
                id
                name
                profilePhotoURL
                plan
              }
            }
          `,
        })
        this.selectedBusiness = data?.Business
      } catch (error) {
        this.doTrackSegmentError(error, 'Team')
      }
      this.$emit('selected', this.selectedBusiness)
    },
    doSelectBusiness(business) {
      this.selectedBusiness = business
      this.$store.commit('app/setCurrentBusiness', business?.Business?.id)
      this.$emit('selected', this.selectedBusiness)
      this.$root.$emit('team/member/retrieve', business?.Business?.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-team-businesses::v-deep {
  .selected-business {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .xa-team-business {
      flex: 10000 1 0;
    }
  }

  .business-item {
    padding: 10px 15px;
    white-space: unset;
    min-width: 220px;
  }
}
</style>
