<template lang="pug">
.xm-update-edit-image
  XOAddPinTag(v-for="(tag, index) in tags", :key="index", :tag="tag", :edit="false")
  img(:src="media.PhotoURL" v-if="media.objectType === 'Photo'")
</template>

<script>
import gql from 'graphql-tag'
import XOAddPinTag from '~/components/organisms/AddPin/Tag'

export default {
  name: 'XMUpdateEditImage',
  components: { XOAddPinTag },
  props: {
    media: Object,
  },
  data() {
    return {
      tags: [],
    }
  },
  mounted() {
    this.$root.$on('retrieve/image/pins', () => {
      this.doRetrievePins()
    })
    this.doRetrievePins()
  },
  methods: {
    async doRetrievePins() {
      const { data } = await this.$apollo.query({
        variables: { photoID: this.media?.objectID },
        fetchPolicy: 'no-cache',
        query: gql`
          query ($photoID: String!) {
            getPin(photoID: $photoID) {
              createdAt
              photoID
              Tags {
                xCoordinate
                yCoordinate
                createdAt
                objectID
                objectType
                Product {
                  title
                  slug
                  coverPhotoURL
                  type
                  startDate
                  Categories {
                    PhotoURL
                  }
                }
              }
            }
          }
        `,
      })

      this.tags = data?.getPin?.Tags
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-update-edit-image::v-deep {
  width: 100%;
  height: 100%;
}
</style>
