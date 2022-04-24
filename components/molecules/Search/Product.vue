<template lang="pug">
.xm-search-product.card
  .card-content
    nuxt-link.profile(:to="`/b/${profileLink}`")
      XAProfileAvatar(:label="initials", :image="profilePhotoURL" size="45px")
      .name {{ name }}
      //- img.ml-1(:src="require(`~/assets/icons/mentor/${badge}.svg`)" width="20" height="20" v-if="badge")
    .cover-photo
      img.lozad(:src="coverPhotoURL" data-placeholder-background="lightgrey")
    .categories
      .category(v-for="(category, index) in categories") {{ category.name }}
    h3: nuxt-link(:to="`/marketplace/p/${productLink}`") {{ title }}
</template>

<script>
import lozad from 'lozad'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XMSearchProduct',
  components: { XAProfileAvatar },
  props: {
    details: Object,
  },
  computed: {
    profile() {
      return this.details?.Business || null
    },
    profileLink() {
      return this.profile?.slug || ''
    },
    name() {
      return this.profile?.name ? this.profile?.name.replace(/&amp;/g, '&') : 'ActivePlace Member'
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    profilePhotoURL() {
      return this.profile?.profilePhotoURL || null
    },
    // badge() {
    //   return this.profile?.badge || null
    // },
    coverPhotoURL() {
      return this.details?.coverPhotoURL || this.details?.Categories[0]?.PhotoURL || null
    },
    categories() {
      return this.details?.Categories || null
    },
    productLink() {
      return this.details?.slug || ''
    },
    title() {
      return this.details?.title || null
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
}
</script>

<style lang="scss" scoped>
.xm-search-product::v-deep {
  height: 100%;

  .card-content {
    .profile {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;
      color: inherit;

      .name {
        margin-left: 15px;
      }
    }

    .cover-photo {
      width: 100%;
      height: 175px;
      margin-bottom: 10px;
      display: block;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;

      .category {
        background-color: #eef1f1;
        color: $secondary;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 1.2;
        margin: 0 6px 6px 0;
        border-radius: 50px;
      }
    }

    h3 {
      font-size: 1.2857rem;
      line-height: 1.2;
      color: $secondary;

      a {
        color: inherit;
      }
    }
  }
}
</style>
