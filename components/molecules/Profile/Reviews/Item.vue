<template lang="pug">
.item
  XAProfileAvatar.mr-2(size="35px", :image="profilePhotoURL", :label="initials")
  .content.is-flex-width-auto
    .name {{ name }}
    .rating: b-rate(v-model="rating" size="is-small" disabled)
    .text(v-html="content")
    //- .actions(:class="showCanComment && 'show-comment-input'")
    //-   .reply(@click.prevent="showCanComment = !showCanComment")
    //-     ._label Reply
    //-     ._count 0
    //-   .can-high-five(@click.prevent="isLiked = !isLiked")
    //-     ._icon.mr-1
    //-       img(src="~/assets/icons/secondary/high-five.svg" v-if="isLiked")
    //-       img(src="~/assets/icons/high-five-outline.svg" v-else)
    //-     ._count 0
    //transition(name="fade")
    //  PageBusinessReviewsCommentInput(v-if="showCanComment")
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
export default {
  name: 'XMProfileReviewItem',
  components: { XAProfileAvatar },
  props: {
    review: Object,
  },
  data() {
    return {
      isLiked: false,
      showCanComment: false,
    }
  },
  computed: {
    actorType() {
      return this.review?.actorType
    },
    initials() {
      return this.$app.getNameInitials(this.name)
    },
    name() {
      return this.review[this.actorType]?.name || 'ActivePlace Member'
    },
    profilePhotoURL() {
      return this.review[this.actorType]?.profilePhotoURL || null
    },
    rating() {
      return this.review?.rating || 0
    },
    content() {
      return this.review?.content || ''
    },
  },
}
</script>

<style lang="scss" scoped>
.item::v-deep {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .content {
    background-color: #f8f8f8;
    border-radius: 20px;
    padding: 10px 20px;

    .rating {
      margin-bottom: 10px;
    }

    .text {
      font-weight: 300;
    }
  }

  .actions {
    position: relative;
    padding: 10px 0 10px;

    &.show-comment-input {
      border-bottom: 1px solid #eee;
    }

    .reply {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 13px;
      user-select: none;

      ._label {
        border-right: 1px solid $secondary;
        padding-right: 5px;
        margin-right: 5px;
        cursor: pointer;
      }
    }

    .can-high-five {
      padding: 4px 5px;
      background-color: $white;
      box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
      position: absolute;
      bottom: -25%;
      right: 0;
      border-radius: 50%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      cursor: pointer;
      user-select: none;
      z-index: 1;

      ._icon {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        img {
          width: 12px;
        }
      }
    }
  }
}
</style>
