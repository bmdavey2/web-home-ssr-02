<template lang="pug">
.xm-search-article.card
  .card-content
    nuxt-link.profile(:to="profileLink")
      XAProfileAvatar(:label="initials", :image="profilePhotoURL" size="45px")
      .name {{ name }}
      //- img.ml-1(:src="require(`~/assets/icons/mentor/${badge}.svg`)" width="20" height="20" v-if="badge")
    nuxt-link.cover-photo(:to="`/a/${slug}`")
      template(v-if="coverPhotoURL")
        img.lozad(
          :src="coverPhotoURL"
          data-placeholder-background="lightgrey"
          @error="doCheckIfImageIsLoaded"
          v-if="imageLoaded")
        img.lozad(src="~assets/images/Profile/default-cover.webp" data-placeholder-background="lightgrey" v-else)
      template(v-else): img(src="~assets/images/Profile/default-cover.webp")
    .categories
      .category(v-for="(category, index) in categories") {{ category.name }}
    h3: nuxt-link(:to="`/a/${slug}`") {{ title }}
</template>

<script>
import lozad from 'lozad'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMSearchArticle',
  components: { XAProfileAvatar, XAImageNotLoaded },
  props: {
    details: Object,
  },
  data() {
    return {
      imageLoaded: true,
    }
  },
  computed: {
    user() {
      return this.details?.Member || this.details?.Business || null
    },
    name() {
      return this.user?.name ? this.user?.name.replace(/&amp;/g, '&') : 'ActivePlace Member'
    },
    type() {
      return this.user?.__typename
    },
    // badge() {
    //   if (this.type === 'Member') return this.user?.Mentor?.badge || null
    //   else if (this.type === 'Business') return this.user?.badge || null
    //   else return false
    // },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    profilePhotoURL() {
      return this.user?.profilePhotoURL || null
    },
    profileLink() {
      if (this.details?.Member) {
        return `/p/${this.user?.slug}`
      }
      return `/b/${this.user?.slug}`
    },
    categories() {
      return this.details?.Categories || null
    },
    coverPhotoURL() {
      return this.details?.coverPhotoURL || null
    },
    title() {
      return this.details?.title || null
    },
    slug() {
      return this.details?.slug || '/'
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
    doCheckIfImageIsLoaded() {
      this.imageLoaded = false
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-search-article::v-deep {
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
