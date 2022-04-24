<template lang="pug">
.xo-profile-about-business.row.justify-between
  .box.col
    .flex.align-center
      img(src="~/assets/images/Profile/bio.svg" width="44" height="44")
      .header Overview
    .content-text.px-2.py-2(v-if="plan === null" style="white-space: pre-line") {{ description }}
    .content-text.px-2.py-2(style="white-space: pre-line" v-linkified v-else) {{ description }}
    template(v-if="isComplete ? true : isPartialComplete && !isMe")
      .flex.align-center(v-if="isPartialComplete")
        img(src="~/assets/images/Profile/heart.svg" width="44" height="44")
        .header MY ACTIVEPLACE 5:
      div(v-if="ap5BestKnownFor")
        .content-header.px-2 We are best known for
        .content-text.px-4.py-2(v-html="ap5BestKnownFor" v-if="plan === null")
        .content-text.px-4.py-2(v-html="ap5BestKnownFor" v-linkified v-else)
      div(v-if="ap5BestKnownFor")
        .content-header.px-2 We are inspired by
        .content-text.px-4.py-2(v-html="ap5InspiredBy" v-if="plan === null")
        .content-text.px-4.py-2(v-html="ap5InspiredBy" v-linkified v-else)
      div(v-if="ap5PassionateAbout")
        .content-header.px-2 We are passionate about
        .content-text.px-4.py-2(v-html="ap5PassionateAbout" v-if="plan === null")
        .content-text.px-4.py-2(v-html="ap5PassionateAbout" v-linkified v-else)
      div(v-if="ap5FavoriteEvents")
        .content-header.px-2 Our favourite events and active things:
        .content-text.px-4.py-2(v-html="ap5FavoriteEvents" v-if="plan === null")
        .content-text.px-4.py-2(v-html="ap5FavoriteEvents" v-linkified v-else)
      div(v-if="ap5ProudestThing")
        .content-header.px-2 Our proudest achievement is
        .content-text.px-4.py-2(v-if="plan === null") {{ ap5ProudestThing }}
        .content-text.px-4.py-2(v-linkified v-else) {{ ap5ProudestThing }}
    template(v-if="!isComplete && isMe")
      .flex.align-center
        img(src="~/assets/images/Profile/heart.svg" width="44" height="44")
        .header MY ACTIVEPLACE 5:
      .flex.align-center.is-justify-content-center.is-flex-direction-column
        p.mt-3.complete-header.has-text-centered Don't stop now! Completing your profile is a great way to own your active lifestyle, show the community who you are and what you're about.
        img.py-5(src="~assets/images/Profile/CompleteBusiness.svg")
        b-button.mb-5.has-text-centered(
          type="is-primary"
          tag="router-link",
          :to="`/b/${slug}/edit?tab=about`"
          outlined) COMPLETE MY PROFILE

  XOProfileUpcomingEvents(:event="event")
</template>

<script>
import XOProfileUpcomingEvents from '~/components/organisms/Profile/UpcomingEvents'

export default {
  name: 'XOProfileAboutBusiness',
  components: { XOProfileUpcomingEvents },
  props: {
    profile: Object,
    event: Object,
    isMe: { type: Boolean, default: false },
  },
  computed: {
    description() {
      const element = document.createElement('div')
      element.innerHTML = this.profile?.description
      return element.textContent
    },
    ap5InspiredBy() {
      return this.profile?.ap5InspiredBy
    },
    ap5PassionateAbout() {
      return this.profile?.ap5PassionateAbout
    },
    ap5FavoriteEvents() {
      return this.profile?.ap5FavoriteEvents
    },
    ap5BestKnownFor() {
      return this.profile?.ap5BestKnownFor
    },
    plan() {
      return this.profile?.plan || null
    },
    ap5ProudestThing() {
      const element = document.createElement('div')
      element.innerHTML = this.profile?.ap5ProudestThing
      return element.textContent
    },
    slug() {
      return this.profile?.slug
    },
    isComplete() {
      return (
        this.ap5InspiredBy &&
        this.ap5PassionateAbout &&
        this.ap5FavoriteEvents &&
        this.ap5BestKnownFor &&
        this.ap5ProudestThing
      )
    },
    isPartialComplete() {
      return (
        this.ap5InspiredBy ||
        this.ap5PassionateAbout ||
        this.ap5FavoriteEvents ||
        this.ap5BestKnownFor ||
        this.ap5ProudestThing
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-profile-about-business::v-deep {
  .box {
    margin-bottom: 0;

    .header {
      text-transform: uppercase;
      color: #0c353e;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0.8px;
    }

    .content-header {
      color: #0c353e;
      font-size: 18px;
    }

    .content-text {
      font-size: 14px;
      font-weight: 100;
      color: #65676b;
    }

    .complete-header {
      max-width: 450px;
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;

      @media (max-width: 488px) {
        font-size: 13px !important;
      }
    }
  }

  .xo-profile-upcoming-events {
    display: none;
    width: calc(100% / 3);
    margin-left: 20px;

    @include max-width(768px) {
      display: block;
    }

    @include max-width(599px) {
      display: none;
    }
  }
}
</style>
