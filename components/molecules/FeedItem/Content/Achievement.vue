<template lang="pug">
.xm-feed-item-content-achievement.py-5(@click="onclickShowAchievement")
  .columns.is-multiline.is-mobile(style="background: #f8f8f8; border-radius: 10px; margin: 0 !important")
    .column.is-5-desktop.is-12-mobile.achievements-picture-logo
      img.achievement-logo(src="~assets/images/achievement-badge.svg" width="235" height="192")
    .column.is-2-desktop.is-3-mobile.is-flex.is-align-items-center.p-0
      img(
        :src="require(`~/assets/icons/categories/default/${value.Categories[0].id}.svg`)"
        style="height: 80px; padding: 0 10px; margin: 0 auto"
        width="100"
        height="80")
    .column.is-5-desktop.is-9-mobile.is-flex.is-align-items-center.p-0
      .flex.align-center.achievement-details-container(style="height: 100%")
        div
          div(style="font-size: 14px; font-weight: 500") {{ value.title }}
          div(style="font-weight: 300") {{ dateAccomplished }}
          .my-3(style="height: 2px; width: 30%; background: #333")
          .flex.align-center
            img.mr-2(src="~assets/icons/achievements.svg" style="width: 12px; height: 12px")
            div(style="font-weight: 300") {{ value.summary }}
          .flex.align-center
            img.mr-2(src="~assets/icons/clock.svg" style="width: 12px; height: 12px")
            div {{ time }}
  .flex
    .flex-grow
    .flex-auto
      .content-tag.flex-center.px-2.py-1(style="box-shadow: 0 0 8px rgba(0, 0, 0, 0.15); border-radius: 0 0 6px 6px")
        img.mr-1(src="~assets/icons/achievements.svg" style="width: 12px; height: 12px")
        span.has-text-secondary(style="font-size: 12px") Achievement
</template>

<script>
export default {
  name: 'XMFeedItemContentAchievement',
  props: {
    value: Object,
  },
  computed: {
    time() {
      const secNum = this.value?.completionTimeInSeconds ? parseInt(this.value?.completionTimeInSeconds, 10) : 0
      let hours = Math.floor(secNum / 3600)
      let minutes = Math.floor((secNum - hours * 3600) / 60)
      let seconds = secNum - hours * 3600 - minutes * 60

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return hours + ':' + minutes + ':' + seconds
    },
    dateAccomplished() {
      return this.value?.dateAccomplished.split('T')[0]
    },
  },
  methods: {
    onclickShowAchievement() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Profile/Achievements/Show').default,
        width: 600,
        props: {
          achievements: this.value,
          time: this.time,
          dateAccomplished: this.dateAccomplished,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-feed-item-content-achievement {
  max-width: 580px;
  margin: auto;
  .achievements-picture-logo {
    padding: 5px 10px 0 5px;
  }
  .achievement-logo {
    width: 100%;
    height: 192px;
    background-color: white !important;
    border-radius: 10px;
  }

  @media (max-width: $tabletLG) {
    .achievements-picture-logo {
      text-align: center;
      .achievement-logo {
        border-radius: 0 0 10px 10px !important;
        width: 95%;
        margin: -5px auto !important;
      }
    }
    .achievement-details-container {
      padding: 10px 0;
    }
  }
}
</style>
