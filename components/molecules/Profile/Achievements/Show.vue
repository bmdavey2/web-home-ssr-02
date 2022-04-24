<template lang="pug">
.achievements-card.card
  .card-content
    .is-flex.has-text-left.p-0.pb-4
      .is-flex.is-flex-wrap-wrap: img(src="~assets/icons/checked-cup.svg")
      ._label.is-size-6.is-uppercase.pt-3 achievements
      a.achievement-left.is-flex.has-text-right.is-clickable.pt-2
        XMFeedItemCategories(:item="achievements")
        //.is-flex.is-flex-wrap-wrap.has-text-secondary(@click="$parent.close()"): b-icon.pt-1(icon="close")

    .columns.is-multiline.achievements-card-header.m-0.is-mobile
      .column.is-5-desktop.is-12-mobile.achievements-picture-logo
        img(src="~assets/images/Profile/achievement.svg")
      .column.is-2-desktop.is-3-mobile.is-flex.is-align-items-center.p-0
        img(
          v-if="CategoryIDs",
          :src="require(`~/assets/icons/categories/default/${CategoryIDs}.svg`)"
          style="height: 80px; margin: 0 auto")
      .column.is-5-desktop.is-9-mobile.is-flex.is-align-items-center.p-0.pb-2
        .achievement-details
          .has-text-secondary.has-text-weight-medium {{ achievements.title }}
          .achievement-date.has-text-grey {{ dateAccomplished }}
          hr.segment
          .achievement-details.is-flex.is-flex-wrap-nowrap
            img.mt-1.mr-1(src="~assets/icons/secondary/achievement.svg" style="height: 12px")
            p {{ achievements.summary }}

          .achievement-clock.is-flex.is-flex-wrap-nowrap
            img.mt-1.mr-1(src="~assets/icons/clock.svg" style="height: 12px")
            p {{ time }}

    .achievements-note.pt-4
      div(v-html="achievements.description" v-linkified)

    .achievements-image.pt-5
      template(v-if="hasMedia")
        template(v-if="isVideo")
          XAVideo(:value="videoURL")
        template(v-else)
          XAFeedImages(:images="photoGallery")
</template>

<script>
import XAVideo from '~/components/atoms/Video'
import XAFeedImages from '~/components/atoms/Feed/Images'
import XMFeedItemCategories from '~/components/molecules/FeedItem/Categories'

export default {
  components: { XMFeedItemCategories, XAVideo, XAFeedImages },
  props: {
    achievements: Object,
    time: String,
    dateAccomplished: String,
  },
  computed: {
    CategoryIDs() {
      return this.achievements?.Categories[0].id || false
    },
    hasMedia() {
      return this.achievements?.Media?.length > 0
    },
    isVideo() {
      return (this.achievements?.Media || [])[0]?.objectType === 'Video'
    },
    videoURL() {
      return (this.achievements?.Media || [])[0]?.VideoURL
    },
    photoGallery() {
      return this.achievements?.Media || []
      // ?.map((x) => x.PhotoURL)
    },
  },
}
</script>

<style lang="scss" scoped>
.achievements-card-header {
  border-radius: 16px;
  background: #f8f8f8;
}
.achievements-picture-logo {
  img {
    background: #fff;
    box-shadow: 0 4px 30px rgba(18, 55, 63, 0.15);
    border-radius: 16px;
    width: 100%;
    height: 100%;
    max-height: 305px;
  }
}

.segment {
  border: 1px solid #0c353e;
  margin: 8px 0 10px 0;
  width: 33px;
  display: block;
}

.card-content {
  padding: 20px;
}

.achievements-image {
  img {
    width: 100%;
  }
}

.achievement-left {
  position: absolute;
  right: 20px;

  ._tag {
    background: #eef1f1;
    border-radius: 30px;
    color: $secondary;
    padding: 5px 12px;
    height: 25px;
  }
}

.user-lists {
  li {
    margin-left: -16px;
    background: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 8px;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #fff;
    }

    span {
      background: #fff;
      box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
      border-radius: 50%;
      font-size: 12px;
      width: 30px;
      height: 30px;
      display: inline-block;
      padding: 0 7px;
      color: #65676b;
      border: 1px solid #fff;
      line-height: 30px;
    }
  }
  li:first-child {
    margin-left: 0;
  }
}
</style>
