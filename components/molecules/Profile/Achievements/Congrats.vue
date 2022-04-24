<template lang="pug">
.article-dialog.card
  ._header.p-3
    .pt-2.close.is-flex.is-flex-wrap-wrap.is-align-items-center(@click.prevent="$parent.close()"): b-icon(icon="close")

  .card-content
    .is-flex.is-flex-wrap-wrap.is-align-items-center.mb-3
      ._title.is-size-2.has-text-centered.has-text-secondary.has-text-weight-medium Congratulations!

      img.mt-3.mb-3(src="~assets/images/Profile/achievement.svg" width="179" height="176")

      .note.is-size-4.has-text-secondary.has-text-centered.mb-5 You added a new achievement!
      .note.is-size-5.has-text-grey-dark.has-text-weight-light.has-text-centered.mb-5 This is worth talking about!

    ._actions.is-flex.is-justify-content-space-between
      b-button.close-button.is-uppercase(type="is-primary" outlined @click="$parent.close()") Close
</template>

<script>
export default {
  props: {
    heading: { type: String, default: '' },
    subHeading: { type: String, default: '' },
    actionButtonName: { type: String, default: 'Confirm' },
    event: String,
  },
  methods: {
    onclickActionEmit() {
      this.$emit('onclickActionEmit')
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.article-dialog::v-deep {
  ._title,
  .note {
    width: 100%;
  }

  ._header {
    position: relative;
    text-align: center;
    text-transform: uppercase;

    .close {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      z-index: 1;
      cursor: pointer;
    }
  }

  .card-content {
    padding: 35px 45px;
    img {
      margin: 0 auto;
    }
    ._actions {
      max-width: 160px;
      margin: 0 auto;
    }
  }

  .close-button {
    margin: 0 auto;
  }
}
</style>
