<template lang="pug">
.xp-share-to.card
  .header
    ._title Share {{ type }}
    .close(@click.prevent="$parent.close()"): b-icon(icon="close")
  .card-content
    ._title Share to
    .social-medias
      .social-media(v-for="(social_media, index) in social_medias", :class="social_media.value")
        share-network(
          :network="social_media.value",
          :title="title",
          :description="description",
          :media="media",
          :url="url")
          ._icon: img(:src="require(`~/assets/icons/social/${social_media.value}-circle.svg`)" width="32" height="33")
          ._label {{ social_media.label }}
      .social-media.copylink
        div(@click.prevent="doCopyLink()")
          ._icon: img(src="~assets/icons/social/copylink-circle.svg" width="32" height="33")
          ._label Copy Link
          input(type="type", :value="url" ref="copyLink" style="opacity: 0; width: 100%")
</template>

<script>
export default {
  name: 'XPShareTo',
  props: {
    details: Object,
    type: String,
  },
  data() {
    return {
      social_medias: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Pinterest', value: 'pinterest' },
      ],
    }
  },
  computed: {
    title() {
      return this.details?.title || ''
    },
    description() {
      return this.details?.content || this.details?.description || null
    },
    media() {
      return this.details?.coverPhotoURL || this.details?.Categories[0]?.PhotoURL || null
    },
    url() {
      switch (this.type) {
        case 'Article':
          return `${this.baseURL}/a/${this.details?.slug}`

        case 'Product':
          return `${this.baseURL}/marketplace/p/${this.details.slug}`

        default:
          return '/'
      }
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
.xp-share-to::v-deep {
  .header {
    position: relative;
    padding: 15px 20px;
    border-bottom: 1px solid #e5e5e5;

    ._title {
      text-align: center;
    }

    .close {
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

  .card-content {
    padding-bottom: 0;

    ._title {
      margin-bottom: 30px;
      text-transform: uppercase;
      font-weight: 500;
    }

    .social-medias {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .social-media {
        width: calc(100% / 4 - 20px);
        position: relative;
        cursor: pointer;
        user-select: none;

        a {
          display: block;
        }

        ._icon {
          position: absolute;
          top: -16px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 32px;
          height: 32px;
          z-index: 2;
        }

        ._label {
          color: $secondary;
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 30px 0 5px;
          font-size: 0.8571rem;
        }

        &.facebook {
          ._label {
            background-color: #ecf7fe;
          }
        }

        &.twitter {
          ._label {
            background-color: #edf7fe;
          }
        }

        &.pinterest {
          ._label {
            background-color: #fbedee;
          }
        }

        &.copylink {
          ._label {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }
}
</style>
