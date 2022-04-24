<template lang="pug">
.comment
  nuxt-link(:to="link"): XAProfileAvatar.mr-3(:label="initials", :image="profilePhotoURL" size="45px")
  .content
    .is-flex.is-flex-wrap-wrap
      nuxt-link.name.has-text-info(:to="link") {{ name }}
      .date.ml-2: timeago(:datetime="time", :auto-update="60")
    .text(v-html="content" v-linkified)
    .high-five.is-user-select-none.flex-center.is-cursor-pointer.px-2.py-1(@click="doClickLike")
      img(v-if="highFived" src="~assets/icons/highfive.svg")
      img(v-else src="~assets/icons/highfive-outline.svg")
      span.ml-1(v-show="highFives > 0") {{ highFives }}
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XMArticleViewComment',
  components: { XAProfileAvatar },
  props: {
    comment: Object,
  },
  data() {
    return {
      highFived: this.comment?.isLiked || false,
      addHighFives: 0,
    }
  },
  computed: {
    actorType() {
      return this.comment?.actorType
    },
    name() {
      return this.comment[this.actorType]?.name
    },
    highFives() {
      return (this.comment?.Aggregates?.likes || 0) + this.addHighFives
    },
    profilePhotoURL() {
      return this.comment[this.actorType]?.profilePhotoURL
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    link() {
      const slug = this.comment[this.actorType]?.slug || null
      switch (this.actorType) {
        case 'Member':
          return `/p/${slug}`
        case 'Business':
          return `/b/${slug}`
      }
      return ''
    },
    time() {
      return this.comment?.timestamp
    },
    content() {
      return this.comment?.content
    },
  },
  mounted() {
    this.doAddClickEventOnUserTagged()
  },
  methods: {
    async doClickLike() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }

      this.highFived = !this.highFived

      if (this.highFived && !this.wasHighFived) {
        this.addHighFives = 1
      } else if (!this.highFived && this.wasHighFived) {
        this.addHighFives = -1
      } else {
        this.addHighFives = 0
      }
      try {
        const CommentID = this.comment?.id
        this.highFived ? await this.$api.like({ CommentID }) : await this.$api.unlike({ CommentID })
      } catch (error) {
        this.doTrackSegmentError(error, 'Article')
      }
    },
    doAddClickEventOnUserTagged() {
      const comment = document.getElementsByClassName('text')
      comment.forEach((element) => {
        const links = element.getElementsByTagName('a')
        links.forEach((link) => {
          const content = link.textContent
          if (content.includes('@')) {
            link.addEventListener('click', (e) => {
              e.preventDefault()
              const url = link.getAttribute('href')
              this.$router.push({
                path: url,
              })
            })
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.comment::v-deep {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;

  @media (max-width: $tabletLG) {
    padding: 0 1.5rem !important;
  }

  .content {
    background-color: #f8f8f8;
    padding: 10px 15px 20px;
    border-radius: 20px;
    position: relative;
    max-width: calc(100% - 91px);

    .date {
      color: #848484;
    }

    .text {
      color: #333;
      a,
      .mention {
        color: $info;
      }
    }

    .high-five {
      position: absolute;
      right: 0;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
      border-radius: 33%;
      z-index: 10;
      margin-right: 6px;
      margin-top: 2px;
      font-size: 11px;
    }
  }
}
</style>
