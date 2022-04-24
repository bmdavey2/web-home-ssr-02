<template lang="pug">
transition(name="fade")
  .search.p-5
    form(action="#" v-on:submit.prevent autocomplete="off")
      .mb-5
        b-field
          XMHeaderSearchBar(v-model="text" @closeSearch="close")
      .actions.is-flex.is-flex-wrap-wrap.is-justify-content-center
        .btn-search.mr-3
          b-button(type="is-primary" @click.prevent="doShowSearch()") Search
        .btn-cancel.ml-3
          b-button(type="is-primary" outlined @click.prevent="close") Cancel
</template>

<script>
import XMHeaderSearchBar from '~/components/molecules/Header/SearchBar'
export default {
  name: 'XMHeaderMobileSearch',
  components: { XMHeaderSearchBar },
  data() {
    return {
      data: [],
      searchData: '',
      selected: null,
      isFetching: false,
      text: null,
    }
  },
  methods: {
    doShowSearch() {
      if (!this.text) {
        this.$toast?.error(`Please fill up the field`, {
          duration: 2 * 1000,
          position: 'bottom-right',
        })
      } else if (this.text) {
        this.close()
        this.$router.push({ path: '/search', query: { q: encodeURIComponent(this.text) } })
      }
    },
    close() {
      this.$emit('DoShowSearchMobile', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.search::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  z-index: 1;

  .xm-header-search-bar {
    width: 100% !important;
    max-width: unset !important;
  }

  .media-content {
    overflow-x: hidden !important;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
