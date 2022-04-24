<template lang="pug">
.xo-profile
  XOProfileBackgroundPicker(
    v-if="showPicker && isMe"
    @closeSidebar="showPicker = !showPicker"
    @setBackground="setBackground",
    :background="background")

  .container.profile-container
    .cover(:style="styleCover")
      h2.status.px-4.py-2.mt-5(v-if="heading") {{ heading }}
      .guest-button-upload-container(v-if="isMe")
        b-button.upload-button.has-text-centered(@click="onClickShowCoverUpload") Edit Cover
          span.ml-2.icon-container: img(src="~/assets/icons/edit.svg" width="12" height="12")

  div(:class="background ? background : 'has-background-color-white'")
    .container.profile-container
      .columns.mt-2.pb-5
        .column.is-3
          XOProfileInfoCard.profile-desktop(
            :type="type",
            :profile="profile",
            :isMe="isMe"
            @showBackground="showBackground"
            @loadProfile="$emit('loadProfile')")
          XOProfileInfoCardMobile.profile-mobile(
            :type="type",
            :profile="profile",
            :isMe="isMe"
            @loadProfile="$emit('loadProfile')")
        .column.is-6
          b-tabs.block.no-margin.profile-tabs(
            v-model="tab"
            position="is-centered"
            style="min-height: 800px",
            :class="type === 'Business' ? 'business-tabs' : ''"
            @input="setMedalActiveTab(tab)")
            b-tab-item(label="ABOUT" value="about")
              XOProfileAboutMember(
                v-if="type === 'Member'",
                :isMe="isMe",
                :profile="profile",
                :medals-count="medalsCount")
              XOProfileAboutBusiness(v-else-if="type === 'Business'", :isMe="isMe", :profile="profile", :event="event")

            b-tab-item(label="POSTS" value="posts")
              b-tabs.block.no-margin.sub-tabs(v-model="postsTab")
                b-tab-item(:label="`Updates ${count.updates}`" value="updates")
                  XOProfilePostsUpdates(:type="type", :count.sync="count.updates", :posts-tab="postsTab")
                b-tab-item(:label="`Articles ${count.articles}`" value="articles")
                  XOProfilePostsArticles(:type="type", :count.sync="count.articles", :posts-tab="postsTab")
                b-tab-item(:label="`Saved ${count.saved}`" value="saved")
                  XOProfilePostsSaved(:type="type", :count.sync="count.saved", :posts-tab="postsTab")
            b-tab-item(label="COMMUNITY" value="community")
              div(style="position: relative")
                div(style="position: absolute; right: 0px")
                  b-dropdown.is-clickable(aria-role="menu" position="is-bottom-left" trap-focus)
                    template(#trigger): img.p-0(src="~assets/icons/filter.svg" width="38" height="38")
                    b-dropdown-item
                      .community-dropdown-content
                        .is-size-6.has-text-secondary.has-text-weight-medium Show in the list
                        b-field.pt-4: b-radio(v-model="communityFilter" name="communityFilter" native-value="null"): .is-size-6.has-text-weight-light Show all
                        b-field: b-radio(v-model="communityFilter" name="communityFilter" native-value="Business"): .is-size-6.has-text-weight-light Business only
                        b-field: b-radio(v-model="communityFilter" name="communityFilter" native-value="Member"): .is-size-6.has-text-weight-light People only
                b-tabs.block.no-margin.sub-tabs
                  b-tab-item(:label="`Following ${count.following}`")
                    XOProfileCommunityFollowing(:type="type", :count.sync="count.following", :filter="communityFilter")
                  b-tab-item(:label="`Followers ${count.followers}`")
                    XOProfileCommunityFollowers(:type="type", :count.sync="count.followers", :filter="communityFilter")

            b-tab-item(
              label="PRODUCTS",
              :visible="type === 'Member'"
              v-if="productAggregates.saved > 0"
              value="productsMember")
              b-tabs.block.no-margin.sub-tabs(v-model="ProductTab")
                b-tab-item(:label="`Saved  ${count.savedProducts}`")
                  XOProfileSavedProducts(
                    :type="type"
                    productType="Saved",
                    :count.sync="count.savedProducts",
                    :profile="profile")

            b-tab-item(label="GALLERY" value="gallery")
              XOProfileGallery(:type="type")

            // TODO activate this when subscription is ready
            // TODO add plan !== null in v-if
            b-tab-item(
              label="PRODUCTS",
              :visible="type === 'Business'"
              v-if="productAggregates.publishedExpired > 0"
              value="productsBusiness")
              b-tabs.block.no-margin.sub-tabs(v-model="ProductTab")
                b-tab-item(:label="`All Products  ${productAggregates.publishedExpired}`")
                  XOProfileProducts(
                    :type="type"
                    productType="All",
                    :count.sync="count.allProducts",
                    :profile="profile")
                b-tab-item(:label="`Events ${productAggregates.event}`")
                  XOProfileProducts(:type="type" productType="Event", :count.sync="count.Event", :profile="profile")
                b-tab-item(:label="`Active Programs  ${productAggregates.activeProgram}`")
                  XOProfileProducts(
                    :type="type"
                    productType="Active Program",
                    :count.sync="count.Active",
                    :profile="profile")
                b-tab-item(:label="`Experience  ${productAggregates.experience}`")
                  XOProfileProducts(
                    :type="type"
                    productType="Experience",
                    :count.sync="count.Experience",
                    :profile="profile")
            b-tab-item(:visible="type === 'Business'" label="REVIEWS" value="reviews")
              XOProfileReviews(:profile="profile")
            b-tab-item(:visible="medalsCount > 0" value="medals")
              template(#header)
                .medals.row.items-center
                  ._icon
                    img.active(src="~assets/images/Profile/active-medals.svg")
                    img.inactive(src="~assets/images/Profile/inactive-medals.svg")
                  span.mx-2 MEDALS
                  span.count {{ medalsCount }}
              XOProfileMedals(:type="type", :active-tab="tab")
        .column.is-3
          XOProfileUpcomingEvents(v-show="type === 'Business' && tab === 'about' && event", :event="event")
          XOProfileCategoriesCard(:profile="profile")
          XOMainFeedRecommendedProfiles(v-if="isLoggedIn")
</template>

<script>
import sample from 'lodash/sample'
import { mapGetters, mapActions } from 'vuex'
import XOFeed from '~/components/organisms/Feed'
import XOProfileInfoCard from '~/components/organisms/Profile/InfoCard'
import XOProfileCategoriesCard from '~/components/organisms/Profile/CategoriesCard'
import XOProfileAboutMember from '~/components/organisms/Profile/AboutMember'
import XOProfileAboutBusiness from '~/components/organisms/Profile/AboutBusiness'
import XOMainFeedRecommendedProfiles from '~/components/organisms/MainFeed/RecommendedProfiles'
import XOProfilePostsUpdates from '~/components/organisms/Profile/PostsUpdates'
import XOProfilePostsArticles from '~/components/organisms/Profile/PostsArticles'
import XOProfilePostsSaved from '~/components/organisms/Profile/PostsSaved'
import XOProfileGallery from '~/components/organisms/Profile/Gallery'
import XOProfileCommunityFollowing from '~/components/organisms/Profile/CommunityFollowing'
import XOProfileCommunityFollowers from '~/components/organisms/Profile/CommunityFollowers'
import XOProfileReviews from '~/components/organisms/Profile/Reviews'
import XOProfileInfoCardMobile from '~/components/organisms/Profile/InfoCardMobile'
import XOProfileBackgroundPicker from '~/components/organisms/Profile/BackgroundPicker'
import XOProfileProducts from '~/components/organisms/Profile/Product'
import XOProfileSavedProducts from '~/components/organisms/Profile/SavedProducts'
import XOProfileMedals from '~/components/organisms/Profile/Medals'
import XOProfileUpcomingEvents from '~/components/organisms/Profile/UpcomingEvents'

export default {
  name: 'XOProfile',
  components: {
    XOProfileSavedProducts,
    XOProfileProducts,
    XOProfileBackgroundPicker,
    XOProfileInfoCardMobile,
    XOFeed,
    XOProfileInfoCard,
    XOProfileCategoriesCard,
    XOMainFeedRecommendedProfiles,
    XOProfileAboutMember,
    XOProfileAboutBusiness,
    XOProfilePostsUpdates,
    XOProfilePostsArticles,
    XOProfilePostsSaved,
    XOProfileCommunityFollowing,
    XOProfileCommunityFollowers,
    XOProfileGallery,
    XOProfileReviews,
    XOProfileMedals,
    XOProfileUpcomingEvents,
  },
  props: {
    type: String,
    profile: Object,
    productAggregates: null,
  },
  data() {
    return {
      count: {
        updates: 0,
        articles: 0,
        saved: 0,
        following: 0,
        followers: 0,
        allProducts: 0,
        Event: 0,
        Active: 0,
        Experience: 0,
        savedProducts: 0,
        medals: 0,
      },
      tab: 'about',
      postsTab: 'updates',
      ProductTab: 0,
      currentProfile: '',
      communityFilter: null,
      showPicker: false,
      selectedBackground: null,
      event: null,
    }
  },
  computed: {
    ...mapGetters({
      getMedalActiveTab: 'medals/getMedalActiveTab',
    }),
    heading() {
      return this.type === 'Member' ? this.profile?.personalStatus : this.profile?.profileType
    },
    categories() {
      return this.profile?.Categories
    },
    coverImage() {
      return this.profile?.coverPhotoURL
    },
    background() {
      return this.selectedBackground === 'white'
        ? null
        : !this.selectedBackground
        ? this.profile?.backgroundColor || null
        : this.selectedBackground
    },
    styleCover() {
      return {
        backgroundImage: this.coverImage
          ? `url(${this.coverImage})`
          : `url(${require('~/assets/images/Profile/default-cover.jpg')})`,
      }
    },
    isMe() {
      return this.$route.params?.slug === this.currentProfile?.slug
    },
    plan() {
      return this.profile?.plan || null
    },
    medals() {
      return this.profile?.Medals || null
    },
    medalsCount() {
      return this.medals?.total || 0
    },
  },
  watch: {
    getMedalActiveTab(value) {
      this.tab = value
    },
  },
  mounted() {
    this.getCurrentProfile()
    this.$root.$on('DoCountArticle', () => {
      this.count.articles--
    })
    this.$root.$on('DoCountUpdate', () => {
      this.count.updates--
    })
    this.$root.$on('DoCountSavedArticle', () => {
      this.count.saved--
    })
    this.tab = this.getMedalActiveTab
    this.doRetrieveUpcomingEvents()
  },
  methods: {
    ...mapActions({
      setMedalActiveTab: 'medals/setMedalActiveTab',
    }),
    showBackground(value) {
      this.showPicker = value
    },
    setBackground(value) {
      this.selectedBackground = value
    },
    async getCurrentProfile() {
      this.currentProfile = await this.getMyDisplayProfile()
    },
    onClickShowCoverUpload() {
      this.$buefy.modal.open({
        component: require('~/components/molecules/Profile/Dialog/ProfileCoverUpload').default,
        parent: this,
        width: 550,
        scroll: 'clip',
        props: {
          objectType: this.type === 'Member' ? 'MyProfile' : 'MyBusiness',
          businessID: this.profile?.id,
        },
        events: {
          loadProfile: () => {
            this.$emit('loadProfile')
          },
        },
      })
    },
    async doRetrieveUpcomingEvents() {
      const businessSlug = this.$route.params?.slug
      const {
        getAllUpcomingMedals: { items },
      } = await this.$api.getAllUpcomingMedals({ businessSlug })

      this.event = sample(items)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xo-profile::v-deep {
  .cover {
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 664px;
    margin-bottom: 50px;

    .status {
      display: inline-block;
      font-weight: 300;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background-color: white;
    }
  }

  .page-profile-container {
    margin-right: auto;
    margin-left: auto;
    padding-bottom: 50px;
    max-width: 1344px;
    width: 100%;

    .columns {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  .c1 {
    background: #fbf9f4;
  }

  .c2 {
    background: #fbd0cc;
  }

  .c3 {
    background: #f1fafc;
  }

  .c4 {
    background: #afc5c9;
  }

  section.tab-content {
    padding-left: 0;
    padding-right: 0;
  }

  .guest-button-upload-container {
    position: absolute;
    bottom: 16px;
    right: 20px;
    max-width: 114px;
    height: 32px;
    width: 100%;
    border-radius: 5px;

    .upload-button {
      background-color: rgba($white, 0.6);
    }
  }

  .icon-container {
    background-color: rgba($white, 0.5);
    border: 1px solid $white;
    box-sizing: border-box;
    border-radius: 50%;
    width: 24px;
    display: inline-block;
    height: 24px;
    position: relative;

    img {
      padding-top: 2px;
      max-height: 12px;
      min-height: 12px;
    }
  }

  .profile-tabs {
    margin-top: -50px !important;
    > .tabs {
      ul {
        border: 0;
        margin-bottom: 15px;

        li {
          margin: 0 !important;

          a {
            border-bottom: 2px solid transparent;
            color: inherit;
            padding: 5px 15px;

            .medals {
              color: $primary;

              ._icon {
                position: relative;
                width: 16px;
                height: 16px;

                img {
                  position: absolute;
                  top: 0;
                  left: 0;
                }

                .active {
                  display: none;
                }
              }

              .count {
                color: #65676b;
              }
            }
          }

          &.is-active {
            a {
              color: $secondary;
              border-color: $secondary;

              .medals {
                color: $secondary;

                ._icon {
                  .active {
                    display: block;
                  }

                  .inactive {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .business-tabs {
    margin-top: -50px !important;
    > .tabs {
      ul {
        border: 0;
        margin-bottom: 15px;

        li {
          margin: 0 !important;

          a {
            border-bottom: 2px solid transparent;
            color: inherit;
            padding: 5px 12px;
          }

          &.is-active {
            a {
              color: $secondary;
              border-color: $secondary;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 894px) {
    .profile-tabs {
      > .tabs {
        ul {
          li {
            a {
              padding: 5px 6px;
            }
          }
        }
      }
    }
  }

  .sub-tabs {
    > .tabs {
      ul {
        border: 0;
        padding-bottom: 5px;

        li {
          a {
            background-color: #eef1f1;
            padding: 9px 7px;
            border-radius: 30px;
            font-size: 0.8571rem;
            line-height: 1;
            color: $secondary;
            border: 0;
            min-width: 100px;
            display: block;
            text-align: center;
          }

          &:not(:last-child) {
            margin-right: 10px;
          }

          &.is-active {
            a {
              background-color: $secondary;
              color: $white;
            }
          }
        }
      }
    }
  }

  @media screen and(min-width: '767px') {
    .profile-mobile {
      display: none !important;
    }
  }
  @media screen and(max-width: '630px') {
    padding: 0;
    .cover {
      max-height: 200px !important;
      margin-bottom: 0 !important;
    }
  }

  @media screen and(max-width: $tabletLG) {
    .profile-desktop {
      display: none !important;
    }
    .cover {
      max-height: 400px;
    }
    .profile-mobile {
      display: block !important;
    }
    .profile-tabs {
      min-height: unset !important;
    }
    .guest-button-upload-container {
      bottom: 25px;
    }
  }

  @media screen and (max-width: 767px) {
    .xo-main-feed-recommended-profiles {
      .title {
        padding: 0 15px;
      }

      .separator {
        margin-left: 15px;
      }
    }

    .profile-tabs {
      > .tabs {
        ul {
          li {
            margin: 0;

            a {
              padding: 5px;
            }
          }
        }
      }
    }

    .sub-tabs {
      > .tabs {
        padding: 0 15px;
      }
    }
  }
}
</style>
