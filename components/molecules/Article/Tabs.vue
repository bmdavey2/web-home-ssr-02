<template lang="pug">
.tabs-container
  h1.is-size-1.has-text-secondary.pt-5 My Articles

  .tabs
    ul.is-flex.is-justify-content-left.has-text-weight-regular.is-uppercase
      li(v-for="(tab, index) in tabs" @click="selectTab(tab)", :class="currentTab === tab ? 'is-active' : null"): a {{ tab }}
</template>

<script>
export default {
  name: 'XMArticleTabs',
  data() {
    return {
      currentTab: 'Published',
    }
  },
  computed: {
    tabs() {
      return ['Published', 'Draft']
    },
  },
  methods: {
    selectTab(tab) {
      this.currentTab = tab
      this.$emit('selectedTab', this.currentTab)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  margin: 15px auto 0 !important;
  ul {
    border: none !important;
    display: flex !important;
  }
  a {
    border-bottom-width: 0;
    color: #848484;
  }
  li {
    margin: 0 12px;
    padding: 10px 1px;
  }
  li.is-active a {
    border-bottom-color: $secondary !important;
    border-bottom-width: medium !important;
    color: $secondary;
  }
  li.is-active {
    background: none !important;
  }
  @media screen and (max-width: $mobileLG) {
    li {
      margin: 0 30px !important;
      padding: 10px 0;
      a {
        padding: 5px;
      }
    }
  }
}
</style>
