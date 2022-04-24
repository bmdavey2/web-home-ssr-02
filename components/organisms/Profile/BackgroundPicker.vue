<template lang="pug">
.sidebar-background-container
  .sidebar-button.has-text-right: a(@click="closeSidebar"): img(src="~/assets/icons/close.svg" width="16" height="16")

  .sidebar-content.pt-3
    .is-size-4.has-text-centered.has-text-secondary Change Background

    .background-checkbox.is-flex.is-align-items-center.pt-3
      a.no-background-button(@click="selectedBackground = null")
        img.p-3(
          src="~/assets/icons/circle-untik.svg"
          @click="changeBG(null)"
          v-if="selectedBackground"
          width="44"
          height="44")
        img.pt-1(src="~/assets/icons/circle-tik.svg" v-if="!selectedBackground" width="44" height="44")
      .has-text-grey.pb-2 No Background
    p {{ slug }}
    .background-colors
      .background-header.has-text-grey.is-size-5.has-text-weight-light.pt-4 Colors

      .background-content.pt-4
        ul.is-flex.is-flex-wrap-wrap.is-justify-content-space-evenly
          li(v-for="(background, index) in backgrounds"): a(@click="changeBG(background.value)"): img(
            :class="selectedBackground === background.value ? 'is-selected' : null",
            :src="require(`~/assets/images/Profile/backgrounds/${background.value}.png`)"
            width="158"
            height="102")

  b-loading(v-model="isLoading")
</template>

<script>
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'

export default {
  name: 'XOProfileBackgroundPicker',
  props: {
    background: null,
  },
  data() {
    return {
      selectedBackground: null,
      slug: this.$route.params.profile || null,
      isLoading: false,
      backgrounds: [{ value: 'c1' }, { value: 'c2' }, { value: 'c3' }, { value: 'c4' }],
    }
  },
  mounted() {
    this.selectedBackground = this.background
  },
  methods: {
    closeSidebar() {
      this.$emit('closeSidebar')
    },
    changeBG: debounce(async function (BG) {
      try {
        this.isLoading = true
        await this.$apollo.mutate({
          variables: {
            input: {
              backgroundColor: BG,
            },
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($input: InputProfile!) {
              editProfile(input: $input) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.selectedBackground = BG
        BG ? this.$emit('setBackground', BG) : this.$emit('setBackground', 'white')
        this.isLoading = false
        this.closeSidebar()
      }
    }, 500),
  },
}
</script>

<style lang="scss" scoped>
.sidebar-background-container {
  max-width: 394px;
  top: 130px;
  right: 0;
  padding: 30px;
  height: auto;
  padding-bottom: 20px;
  position: fixed;
  display: block;
  z-index: 2;
  width: 100%;
  background: $white;
  box-shadow: 0 2px 20px rgb(39 85 96 / 10%);
  transition: all 0.5s ease-in;
}

.background-content {
  .is-selected {
    box-shadow: -1px 1px 7px 3px #f854547a !important;
    border-radius: 5px !important;
    padding: 0 !important;
  }

  a:hover {
    img {
      box-shadow: -1px 1px 7px 3px #f854547a !important;
      border-radius: 5px !important;
      padding: 0 !important;
    }
  }
}
</style>
