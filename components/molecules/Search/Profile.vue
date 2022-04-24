<template lang="pug">
.xm-search-profile.card(:class="plan !== null && objectType === 'Business' && 'not-warmup-plan'")
  .card-content
    .header
      nuxt-link(:to="profileLink")
        .cover-photo
          template(v-if="coverPhotoURL")
            img.lozad(
              :src="coverPhotoURL"
              data-placeholder-background="lightgrey"
              @error="doCheckIfImageIsLoaded"
              v-if="imageLoaded")
            img.lozad(src="~assets/images/Profile/default-cover.webp" data-placeholder-background="lightgrey" v-else)
          template(v-else): img(src="~assets/images/Profile/default-cover.webp")
        XAProfileAvatar(:label="initials", :image="profilePhotoURL" size="90px")
    .contents
      h3: nuxt-link(:to="profileLink") {{ name }}
      .status {{ personalStatus }}
      //- XAMentorBadge(:badge="badge")
      .statement(v-if="plan !== null && objectType === 'Business'") {{ statement }}
      .btn-follow: b-button(@click.prevent="toggleFollow()") {{ isFollowed ? 'Following' : 'Follow' }}
</template>

<script>
import gql from 'graphql-tag'
import lozad from 'lozad'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAMentorBadge from '~/components/atoms/MentorBadge'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XMSearchProfile',
  components: { XAProfileAvatar, XAMentorBadge, XAImageNotLoaded },
  props: {
    details: Object,
    objectType: String,
  },
  data() {
    return {
      imageLoaded: true,
      isFollowed: this.details?.isFollowed,
    }
  },
  computed: {
    profileLink() {
      switch (this.objectType) {
        case 'Member':
          return `/p/${this.details?.slug}`
        case 'Business':
          return `/b/${this.details?.slug}`

        default:
          return '/'
      }
    },
    name() {
      return this.details?.name ? this.details?.name.replace(/&amp;/g, '&') : 'ActivePlace Member'
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    coverPhotoURL() {
      return this.details?.coverPhotoURL || null
    },
    profilePhotoURL() {
      return this.details?.profilePhotoURL || null
    },
    personalStatus() {
      return this.details?.personalStatus || null
    },
    // badge() {
    //   return this.details?.Mentor?.badge || this.details?.badge
    // },
    statement() {
      return this.details?.statement || null
    },
    plan() {
      return this.details?.plan || null
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
    async toggleFollow() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      if (this.getFollowLimit(this.isFollowed)) return
      this.isFollowed = !this.isFollowed
      try {
        await this.$apollo.mutate({
          variables: {
            MemberID: this.objectType === 'Member' ? this.details?.id : undefined,
            BusinessID: this.objectType === 'Business' ? this.details?.id : undefined,
          },
          context: this.getGraphQLContext('search_result'),
          mutation: this.isFollowed
            ? gql`
                mutation ($MemberID: String, $BusinessID: String) {
                  follow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
                    success
                  }
                }
              `
            : gql`
                mutation ($MemberID: String, $BusinessID: String) {
                  unfollow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
                    success
                  }
                }
              `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Search')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-search-profile::v-deep {
  height: 100%;
  border: 2px solid transparent;

  &.not-warmup-plan {
    border-color: #fff1c4;
  }

  .card-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    min-height: 380px;

    .header {
      a {
        display: block;
        color: inherit;

        .cover-photo {
          width: 100%;
          height: 145px;
          position: relative;
          z-index: 1;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .xa-profile-avatar {
          margin: -45px auto 10px;
          position: relative;
          z-index: 2;
        }
      }
    }

    .contents {
      text-align: center;
      flex: 10000 1 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      position: relative;

      h3 {
        font-size: 1.2857rem;
        color: $secondary;

        a {
          color: inherit;
        }
      }

      .status {
        color: #7a7a7a;
        text-transform: uppercase;
        font-weight: 300;
      }

      .xa-mentor-badge {
        margin: 5px auto 0;
      }

      .statement {
        margin: 10px 0 20px;
        font-weight: 300;
      }

      .btn-follow {
        flex: 10000 1 0;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: center;

        button {
          text-transform: uppercase;
          max-width: 275px;
          font-weight: 500;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .card-content {
      flex-direction: row;
      min-height: auto;

      .header {
        a {
          .cover-photo {
            display: none;
          }

          .xa-profile-avatar {
            margin: 0;
          }
        }
      }

      .contents {
        display: block;
        text-align: left;
        padding-left: 30px;

        h3 {
          font-size: 1rem;
          padding-right: 25px;
        }

        .status {
          font-size: 0.8571rem;
          margin-bottom: 10px;
        }

        .xa-mentor-badge {
          margin: 0;
          position: absolute;
          top: -5px;
          right: 0;
        }

        .btn-follow {
          justify-content: flex-start;

          button {
            max-width: 92px;
            font-size: 0.7143rem;
          }
        }
      }
    }
  }
}
</style>
