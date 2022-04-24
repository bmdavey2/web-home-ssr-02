<template lang="pug">
.search-profile-card
  .card
    .card-content
      .profile-header
        nuxt-link(:to="link")
          img.lozad.profile-cover(
            :src="coverPhotoURL"
            v-if="isImageLoaded"
            data-placeholder-background="lightgrey"
            @error="onImageError"
            width="380"
            height="144")
          img.lozad.profile-cover(
            v-else
            src="~assets/images/Profile/default-cover.jpg"
            data-placeholder-background="lightgrey"
            width="380"
            height="144")
          .profile-avatar.has-background-white
            XAProfileAvatar(:label="initials", :image="profilePhotoURL" size="100px")
            //img(v-if="profilePhotoURL", :src="profilePhotoURL" width="100" height="100")
            //span.profile-initials.has-text-centered.is-inline-block.has-background-white(v-else) {{ initials }}

      .profile-details.has-text-centered
        .profile-name.has-text-secondary.is-size-5
          nuxt-link.has-text-secondary.is-clickable(:to="link") {{ convertedName }}

        //- .profile-badge-container.is-flex.is-justify-content-center.is-align-items-center(v-if="badge")
          img.mt-1(:src="require(`~/assets/icons/mentor/${badge}.svg`)" width="30" height="30")
          span.mt-2.ml-2.has-text-secondary(v-if="item.objectType === 'Member'") Mentor
          //img(v-if="businessBadge" :src="require(`~/assets/icons/mentor/Black.svg`)" width="30" height="30").mt-2

        b-button.profile-follow.has-text-secondary(size="is-medium" @click.prevent="togleFollow") Follow
        //b-button.profile-follow.has-text-secondary(
        //  v-else
        //  type="is-light"
        //  size="is-medium"
        //  icon-left="check"
        //  @click.prevent="isFollowed = !isFollowed") Following
</template>

<script>
import lozad from 'lozad'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XMHomeSuggested',
  components: { XAProfileAvatar },
  props: {
    item: Object,
    itemType: String,
  },
  data() {
    return {
      isImageLoaded: true,
    }
  },
  computed: {
    profile() {
      return this.item
    },
    convertedName() {
      return this.name ? this.name.replace(/&amp;/g, '&') : ''
    },
    name() {
      if (this.itemType === 'Member') return this.profile?.firstName + ' ' + this.profile?.lastName || null
      else return this.profile?.name || null
    },
    profilePhotoURL() {
      return this.profile?.profilePhotoURL || null
    },
    coverPhotoURL() {
      return this.profile?.coverPhotoURL || null
    },
    slug() {
      return this.profile?.slug || null
    },
    id() {
      return this.profile?.id || null
    },
    isFollowed() {
      return this.profile?.isFollowed || null
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    link() {
      if (this.itemType === 'Member') return '/p/' + this.slug || '#'
      else if (this.itemType === 'Business') return '/b/' + this.slug || '#'
      else return '#'
    },
    // badge() {
    //   if (this.itemType === 'Member') return this.profile?.Mentor?.badge || null
    //   else if (this.itemType === 'Business') return this.profile?.badge || null
    //   else return false
    // },
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
    onImageError() {
      this.isImageLoaded = false
    },
    togleFollow() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.itemType === 'Member') this.$router.push('/p/' + this.slug)
      else if (this.itemType === 'Business') this.$router.push('/b/' + this.slug)
      else return false
    },
  },
}
</script>

<style lang="scss" scoped>
.search-profile-card {
  position: relative;

  .card {
    border: 1px solid #cfd4d577;
    width: 273px;
    height: 300px;
    border-radius: 10px;

    .card-content {
      height: 415px;
    }
  }

  .profile-header {
    position: relative;
    margin-bottom: 50px;
  }

  .profile-cover {
    width: 100%;
    height: 87px;
    border-radius: 5px 5px 0 0;
    object-fit: cover;
    object-position: top;
  }

  .profile-avatar {
    position: absolute;
    bottom: -40px;
    left: 50%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    overflow: hidden;

    img {
      width: 100%;
      height: 90px;
      object-fit: cover;
      object-position: top;
    }
  }

  .profile-initials {
    color: #000;
    position: absolute;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1.5px solid #000;
    font-size: 1.4286rem;
    padding: 26px 20px;
  }

  .profile-badge-container {
    img {
      height: 25px;
    }

    span {
      font-size: 12px;
      line-height: 14px;
    }
  }

  .profile-follow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    bottom: 20px;
    //margin-top: 20px;
    max-width: 272px;
    font-weight: 300;
    font-size: 14px;
  }
}
</style>
