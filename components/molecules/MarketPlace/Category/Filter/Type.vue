<template lang="pug">
.xm-marketplace-category-filter-type.action
  .value(:class="disableButton && 'disabled'" @click.prevent="doUpdateActiveFilter()") {{ typeTextLabel }}
  transition(name="fade")
    .dropdown-filter(v-if="activeFilter === 'type'")
      .filter-item(v-for="(t, index) in types", :key="index")
        b-radio(v-model="type", :native-value="t.key") {{ t.value }}
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'XMMarketPlaceCategoryFilterType',
  props: {
    activeFilter: String,
    clearFilter: Boolean,
  },
  data() {
    return {
      types: [
        { key: null, value: 'All Types' },
        { key: 'Event', value: 'Active Events' },
        { key: 'Experience', value: 'Active Experiences' },
        // { key: 'Active Program', value: 'Active Programs' },
      ],
      typeTextLabel: null,
      activePages: ['active-events', 'active-experiences', 'active-programs'],
      disableButton: false,
    }
  },
  computed: {
    ...mapFields('marketplace', ['filters.type']),
  },
  watch: {
    type() {
      this.doCheckType()
    },
  },
  mounted() {
    const page = this.$route.params?.category
    if (this.activePages.includes(page)) {
      this.disableButton = true

      switch (page) {
        case 'active-events':
          this.typeTextLabel = 'Active Events'
          return
        case 'active-experiences':
          this.typeTextLabel = 'Active Experiences'
          return
        case 'active-programs':
          this.typeTextLabel = 'Active Programs'
      }
    }
    this.doCheckType()
  },
  methods: {
    doUpdateActiveFilter() {
      if (this.disableButton) return
      if (this.activeFilter === 'type') {
        this.$emit('DoUpdateActiveFilter', '')
        return
      }
      this.$emit('DoUpdateActiveFilter', 'type')
    },
    doUpdateProductType() {
      this.$store.dispatch('marketplace/setProductFilters', { type: this.type })
    },
    doCheckType() {
      if (this.activePages.includes(this.$route.params?.category)) return
      switch (this.type) {
        case 'Event':
          this.typeTextLabel = 'Active Events'
          break
        case 'Experience':
          this.typeTextLabel = 'Active Experiences'
          break
        case 'Active Program':
          this.typeTextLabel = 'Active Programs'
          break
        default:
          this.typeTextLabel = 'All'
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-category-filter-type::v-deep {
  .dropdown-filter {
    width: 210px;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
