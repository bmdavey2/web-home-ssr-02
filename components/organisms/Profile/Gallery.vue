<template lang="pug">
.xo-profile-gallery
  template(v-if="rows.length > 0")
    template(v-for="([img1, img2, img3], index) in rows")
      template(v-if="index % 4 === 0")
        .tile.is-ancestor.no-margin(style="display: flex")
          .tile.is-parent.is-8(style="display: flex")
            .tile.is-child
              nuxt-link(:to="getItemLink(img1)")
                img.lozad.large(
                  v-if="img1",
                  :src="img1.PhotoURL || img1.VideoURL"
                  data-placeholder-background="lightgrey")
          .tile.is-vertical.is-4.pl-3(style="display: flex")
            .tile(style="display: flex")
              .tile.is-parent(style="display: flex")
                .tile.is-child.pb-2
                  nuxt-link(:to="getItemLink(img2)")
                    img.lozad.small(
                      v-if="img2",
                      :src="img2.PhotoURL || img2.VideoURL"
                      data-placeholder-background="lightgrey")
            .tile
              .tile.is-parent
                .tile.is-child.pb-2
                  nuxt-link(:to="getItemLink(img3)")
                    img.lozad.small(
                      v-if="img3",
                      :src="img3.PhotoURL || img3.VideoURL"
                      data-placeholder-background="lightgrey")
      template(v-else-if="index % 4 === 2")
        .tile.is-ancestor.no-margin(style="display: flex")
          .tile.is-vertical.is-4.pr-3(style="display: flex")
            .tile(style="display: flex")
              .tile.is-parent(style="display: flex")
                .tile.is-child.pb-2
                  nuxt-link(:to="getItemLink(img1)")
                    img.lozad.small(
                      v-if="img1",
                      :src="img1.PhotoURL || img1.VideoURL"
                      data-placeholder-background="lightgrey")
            .tile(style="display: flex")
              .tile.is-parent(style="display: flex")
                .tile.is-child.pb-2
                  nuxt-link(:to="getItemLink(img2)")
                    img.lozad.small(
                      v-if="img2",
                      :src="img2.PhotoURL || img2.VideoURL"
                      data-placeholder-background="lightgrey")
          .tile.is-parent.is-8(style="display: flex")
            .tile.is-child
              nuxt-link(:to="getItemLink(img3)")
                img.lozad.large(
                  v-if="img3",
                  :src="img3.PhotoURL || img3.VideoURL"
                  data-placeholder-background="lightgrey")
      template(v-else)
        .tile.is-ancestor.no-margin.is-mobile(style="display: flex")
          .tile.is-parent.is-4(style="display: flex")
            .tile.is-child.pr-3
              nuxt-link(:to="getItemLink(img1)")
                img.lozad.normal(
                  v-if="img1",
                  :src="img1.PhotoURL || img1.VideoURL"
                  data-placeholder-background="lightgrey")
          .tile.is-parent.is-4(style="display: flex")
            .tile.is-child
              nuxt-link(:to="getItemLink(img2)")
                img.lozad.normal(
                  v-if="img2",
                  :src="img2.PhotoURL || img2.VideoURL"
                  data-placeholder-background="lightgrey")
          .tile.is-parent.is-4(style="display: flex")
            .tile.is-child.pl-3
              nuxt-link(:to="getItemLink(img3)")
                img.lozad.normal(
                  v-if="img3",
                  :src="img3.PhotoURL || img3.VideoURL"
                  data-placeholder-background="lightgrey")
        .mb-2
  template(v-else): .is-size-4.has-text-grey.has-text-centered There are no gallery images
</template>

<script>
import chunk from 'lodash/chunk'
import lozad from 'lozad'
import gql from 'graphql-tag'
import fragment from '~/assets/graphql/fragmentGalleryContent.graphql'

export default {
  name: 'XOProfileGallery',
  props: {
    type: String,
  },
  computed: {
    rows() {
      return chunk(this.items, 3)
    },
    slug() {
      return this.$route.params.slug
    },
  },
  mounted() {
    const observer = lozad('.lozad', {
      rootMargin: '10px 0px',
      threshold: 0.1,
      enableAutoReload: true,
    })
    observer.observe()
  },
  methods: {
    getItemLink(item) {
      switch (item?.FeedItem?.objectType) {
        case 'Update':
          return `/u/${item?.FeedItem?.Update?.slug}`
        case 'Article':
          return `/a/${item?.FeedItem?.Article?.slug}`
        case 'Achievement':
          return `/achievement/${item?.FeedItem?.Achievement?.id}`
      }
      return '#'
    },
  },
  apollo: {
    items: {
      variables() {
        return {
          slug: this.slug,
        }
      },
      update(data) {
        return data[this.type].Gallery.items
      },
      query() {
        return this.type === 'Business'
          ? gql`
              ${fragment}
              query ($slug: String!) {
                Business(slug: $slug) {
                  Gallery {
                    ...GalleryContent
                  }
                }
              }
            `
          : gql`
              ${fragment}
              query ($slug: String!) {
                Member(slug: $slug) {
                  Gallery {
                    ...GalleryContent
                  }
                }
              }
            `
      },
    },
  },
}
</script>

<style lang="sass" scoped>
.xo-profile-gallery::v-deep
  img
    object-fit: cover
    width: 100%

    &.small
      height: 143px
    &.normal
      height: 143px
    &.large
      height: 300px

  .is-parent
    padding: 0
</style>
