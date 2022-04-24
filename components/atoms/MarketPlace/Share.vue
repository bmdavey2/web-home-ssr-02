<template lang="pug">
.xa-marketplace-share(@click.prevent)
  b-dropdown(aria-role="list" position="is-bottom-left")
    template(#trigger="{ active }")
      img(src="~assets/images/MarketPlace/share-outline-light.png" alt="Share Product" width="16" height="16")
    template(v-for="(socialMedia, index) in socialMedias")
      b-dropdown-item(aria-role="listitem", :key="index")
        share-network.row.items-center(:network="socialMedia.value", :url="url", :title="title", :media="imageURL")
          ._icon.row.items-center.justify-center: img(
            :src="require(`assets/images/Medals/${socialMedia.value}.svg`)",
            :width="socialMedia.value === 'facebook' ? 7 : 14"
            height="14")
          ._label.col {{ socialMedia.label }}
    b-dropdown-item.row.items-center(aria-role="listitem" @click="doCopyLink()")
      ._icon.row.items-center.justify-center: b-icon(icon="link-variant" custom-size="mdi-18px")
      ._label.col Copy Link
      input(type="text", :value="url" ref="copyLink" style="width: 100%; opacity: 0; height: 0; padding: 0; border: 0")
</template>

<script>
export default {
  name: 'XAMarketPlaceShare',
  props: {
    details: Object,
  },
  data() {
    return {
      socialMedias: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
      ],
    }
  },
  computed: {
    title() {
      return this.details?.title || ''
    },
    slug() {
      return this.details?.slug || ''
    },
    imageURL() {
      return this.details?.coverPhotoURL || null
    },
    url() {
      return `${this.baseURL}/marketplace/p/${this.slug}`
    },
  },
  methods: {
    doCopyLink() {
      const clipBoardElem = document.createElement('input')
      document.body.appendChild(clipBoardElem)
      clipBoardElem.value = this.url
      clipBoardElem.select()
      document.execCommand('copy')
      this.$toast.success('Link copied to clipboard', { duration: 2000, position: 'bottom-right' })
      document.body.removeChild(clipBoardElem)
    },
  },
}
</script>

<style lang="scss" scoped>
.xa-marketplace-share::v-deep {
  margin-left: 15px;

  .dropdown {
    .dropdown-trigger {
      background-color: rgba(12, 53, 62, 0.3);
      width: 32px;
      height: 32px;
      border-radius: 100px;
      box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1;
      margin-bottom: 5px;
    }

    .dropdown-menu {
      .dropdown-content {
        padding: 10px 20px;

        .dropdown-item {
          background-color: transparent;
          padding: 10px 0;
          display: flex;

          ._icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
            color: #65676b;
          }

          ._label {
            font-size: 1.1429rem;
            color: $secondary;
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
