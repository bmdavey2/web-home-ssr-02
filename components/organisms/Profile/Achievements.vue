<template lang="pug">
.card.achievements-card.mt-2
  .card-content
    .is-flex.has-text-centered.p-0.pb-4.d-lg-center
      .is-flex.is-flex-wrap-wrap: img(src="~assets/icons/checked-cup.svg" width="44" height="44")
      ._label.is-size-6.is-uppercase.pt-3 My achievements
      a.achievement-add-new.is-flex.has-text-right.is-clickable(
        @click="onclickNewAchievements"
        v-if="isMe && this.$route.name === 'p-slug'")
        ._label.is-size-6.pt-3.has-text-weight-light Add new
        .is-flex.is-flex-wrap-wrap: img(src="~assets/icons/circle-plus.svg" width="44" height="44")

    client-only(v-if="achievements.length >= 3")
      agile(
        ref="achievements",
        :centerMode="true",
        :options="myOptions",
        :navButtons="false",
        :dots="false",
        :infinite="true")
        .slide(v-for="achievement in achievements")
          .card.has-background-white.has-text-left
            .header.is-flex.is-flex-wrap-nowrap.has-text-left
              ._icon: img(
                :src="require(`~/assets/icons/categories/default/${achievement.CategoryIDs[0]}.svg`)"
                style="height: 32px"
                width="32"
                height="32")

              ._view
                a.is-clickable(
                  @click="onclickShowAchievement({ achievements: achievement, time: toTime(achievement.completionTimeInSeconds), dateAccomplished: achievement.dateAccomplished.split('T')[0] })"
                  v-if="achievement.dateAccomplished !== null"): img(
                  src="~assets/icons/eye.svg"
                  v-if="!isMe"
                  width="16"
                  height="12")
                a.is-clickable(
                  @click="onclickShowAchievement({ achievements: achievement, time: toTime(achievement.completionTimeInSeconds), dateAccomplished: null })"
                  v-else): img(
                  src="~assets/icons/eye.svg"
                  v-if="!isMe"
                  width="16"
                  height="12")

              ._menu.is-flex.is-justify-content-right(v-if="isMe")
                b-dropdown(aria-role="list" position="is-bottom-left")
                  template(#trigger)
                    b-icon.has-text-grey.is-clickable(icon="dots-vertical")

                  b-dropdown-item.is-flex(aria-role="listitem" @click="onclickEditAchievements(achievement)")
                    ._dot
                    p.pl-3 Edit
                  b-dropdown-item.is-flex(aria-role="listitem" @click="onclickDeleteAchievements(achievement.id)")
                    ._dot
                    p.pl-3 Delete

            .card-body
              .achievement-title.has-text-weight-medium {{ achievement.title }}
              .achievement-date(v-if="achievement.dateAccomplished !== null") {{ achievement.dateAccomplished.split('T')[0] }}
              hr.segment
              .achievement-details.is-flex.is-flex-wrap-nowrap
                img.mt-1.mr-1(
                  src="~assets/icons/secondary/achievement.svg"
                  style="height: 12px"
                  width="12"
                  height="12")
                p {{ achievement.summary }}
              .achievement-clock.is-flex.is-flex-wrap-nowrap
                img.mt-1.mr-1(src="~assets/icons/clock.svg" style="height: 12px" width="12" height="12")
                p {{ toTime(achievement.completionTimeInSeconds) }}

      .achievements-agile-footer.is-flex.is-justify-content-center.pt-5
        a.achivements-btn-prev(@click="$refs.achievements.goToPrev()"): b-icon.pl-3.pt-3.mr-4(icon="chevron-left")
        a.achivements-btn-next.has-text-centered(@click="$refs.achievements.goToNext()"): b-icon.pt-3(
          icon="chevron-right")

      .diffuse

    .achievement-minimum(v-if="achievements.length <= 2", :class="achievements.length != 1 ? 'columns' : ''")
      .slide(v-for="achievement in achievements", :class="achievements.length != 1 ? 'column' : 'single-achievement'")
        .card.has-background-white.has-text-left
          .header.is-flex.is-flex-wrap-nowrap.has-text-left
            ._icon: img(
              :src="require(`~/assets/icons/categories/default/${achievement.CategoryIDs[0]}.svg`)"
              style="height: 32px"
              width="32"
              height="32")

            ._view
              a.is-clickable(
                @click="onclickShowAchievement({ achievements: achievement, time: toTime(achievement.completionTimeInSeconds), dateAccomplished: achievement.dateAccomplished.split('T')[0] })"
                v-if="achievement.dateAccomplished !== null"): img(
                src="~assets/icons/eye.svg"
                v-if="!isMe"
                width="16"
                height="12")
              a.is-clickable(
                @click="onclickShowAchievement({ achievements: achievement, time: toTime(achievement.completionTimeInSeconds), dateAccomplished: null })"
                v-else): img(
                src="~assets/icons/eye.svg"
                v-if="!isMe"
                width="16"
                height="12")

            ._menu.is-flex.is-justify-content-right(v-if="isMe")
              b-dropdown(aria-role="list" position="is-bottom-left")
                template(#trigger)
                  b-icon.has-text-grey.is-clickable(icon="dots-vertical")

                b-dropdown-item.is-flex(aria-role="listitem" @click="onclickEditAchievements(achievement)")
                  ._dot
                  p.pl-3 Edit
                b-dropdown-item.is-flex(aria-role="listitem" @click="onclickDeleteAchievements(achievement.id)")
                  ._dot
                  p.pl-3 Delete

          .card-body
            .achievement-title.has-text-weight-medium {{ achievement.title }}
            .achievement-date(v-if="achievement.dateAccomplished !== null") {{ achievement.dateAccomplished.split('T')[0] }}
            hr.segment
            .achievement-details.is-flex.is-flex-wrap-nowrap
              img.mt-1.mr-1(src="~assets/icons/secondary/achievement.svg" style="height: 12px" width="12" height="12")
              p {{ achievement.summary }}
            .achievement-clock.is-flex.is-flex-wrap-nowrap
              img.mt-1.mr-1(src="~assets/icons/clock.svg" style="height: 12px" width="12" height="12")
              p {{ toTime(achievement.completionTimeInSeconds) }}

    .achievement-not-found.has-text-centered(v-if="!achievements.length")
      p(v-if="isMe") Go on, add your first achievement
      p(v-else) No achievements added yet
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'XOProfileAchievements',
  props: {
    profile: Array,
    slug: String,
  },
  data() {
    return {
      achievementCount: 1,
      selectedIcon: '',
      myOptions: {
        navButtons: false,
        slidesToShow: 1,
        responsive: [
          {
            breakpoint: 468,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      },
    }
  },
  computed: {
    achievements() {
      return this.profile || []
    },
    dateAccomplished() {
      return this.achievements?.dateAccomplished
    },
    isMe() {
      return this.$route.params?.slug === this.slug
    },
  },
  methods: {
    toTime(val) {
      const secNum = val ? parseInt(val, 10) : 0 // don't forget the second param
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
    onclickNewAchievements() {
      const fullscreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Profile/Achievements/Add').default,
        width: 600,
        canCancel: false,
        fullScreen: fullscreen,
        events: {
          loadAchievement: () => {
            this.$emit('loadAchievement')
          },
        },
      })
    },
    onclickDeleteAchievements(id) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/atoms/Dialog').default,
        width: 320,
        props: {
          heading: 'Are you sure to delete this Achievement?',
        },
        events: {
          onclickActionEmit: () => {
            this.deleteAchievements(id)
          },
        },
        canCancel: false,
      })
    },
    async deleteAchievements(id) {
      try {
        await this.$apollo.mutate({
          variables: { id },
          mutation: gql`
            mutation ($id: String!) {
              deleteAchievement(id: $id) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.$toast?.success(`Achievement Deleted Successfully`, {
          duration: 3 * 1000,
          position: 'bottom-right',
        })
        this.$emit('loadAchievement')
      }
    },
    onclickEditAchievements(data) {
      const fullscreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Profile/Achievements/Add').default,
        width: 600,
        canCancel: false,
        fullScreen: fullscreen,
        props: {
          initialData: data,
          isEdit: true,
        },
        events: {
          loadAchievement: () => {
            this.$emit('loadAchievement')
          },
        },
      })
    },
    onclickShowAchievement(data) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/molecules/Profile/Achievements/Show').default,
        width: 600,
        props: {
          achievements: data.achievements,
          time: data.time,
          dateAccomplished: data.dateAccomplished,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.achievements-card {
  background-image: url('~assets/images/Profile/achievements-bg.png') !important;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 0;
}

@media (min-width: $tabletLG) {
  .d-lg-center {
    justify-content: center !important;
  }
}

.achievement-minimum {
  .slide {
    padding: 20px 5px !important;

    .card {
      width: 100% !important;
    }
  }

  .single-achievement {
    .card {
      max-width: 320px !important;
      margin: 0 auto !important;
    }
  }
}

.diffuse {
  position: absolute;
  right: 0;
  top: 0;
  background: linear-gradient(-90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.918), rgba(255, 255, 255, 0.212));
  width: 190px;
  height: 100%;
  @media (max-width: $mobileLG) {
    background: none !important;
  }
}

.achievement-add-new {
  z-index: 2;
  position: absolute;
  right: 20px;
  top: 20px;
}

._icon {
  margin-right: auto;
}

.achievement-title {
  color: $secondary;
}

.segment {
  border: 0.5px solid #0c353e;
  margin: 8px 0 16px 0;
  width: 33px;
  display: block;
}

._label {
  color: $secondary;
}

.slide {
  padding: 30px 5px;

  .card {
    border-radius: 20px;
    padding: 10px 7px !important;
    transition: all 200ms ease-in;
    position: relative;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1);
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1);
  }
}

.agile__slide--active {
  .card {
    z-index: 2;
    @media (min-width: $mobileLG) {
      transition: all 200ms ease-in;
      transform: scale(1.2);
      -webkit-transition: all 200ms ease-in;
      -webkit-transform: scale(1.2);
      -ms-transition: all 200ms ease-in;
      -ms-transform: scale(1.2);
      -moz-transition: all 200ms ease-in;
      -moz-transform: scale(1.2);
    }
  }
}

.agile__slide {
  display: hidden !important;
}

.achievements-agile-footer {
  a {
    color: $secondary;
  }

  .achivements-btn-prev:hover {
    height: 35px;
    width: 35px;
    background-color: $secondary;
    color: $white;
    border-radius: 50%;
    display: inline-block;
  }

  .achivements-btn-next {
    height: 35px;
    width: 35px;
    background-color: $secondary;
    color: $white;
    border-radius: 50%;
    display: inline-block;
  }
}

._dot {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  left: 12px;
  top: 45%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  border: 1px solid #0c353e;
  box-sizing: border-box;
  border-radius: 50%;
}

._view {
  img {
    width: 100%;
    height: auto;
  }
}
</style>
