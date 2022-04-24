<template lang="pug">
.xd-share
  .card
    .header
      ._title.text-center.text-capitalize.text-weight-light Share {{ type }}
      .close.row.items-center(@click.prevent="$parent.close()"): b-icon(icon="close")
    .card-content
</template>

<script>
export default {
  name: 'XDShare',
  props: {
    details: Object,
  },
  computed: {
    type() {
      return this.details?.type
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-share::v-deep {
  .card {
    .header {
      position: relative;
      padding: 15px 20px;
      border-bottom: 1px solid #e5e5e5;

      ._title {
        font-size: 1.2857rem;
      }

      .close {
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 0;
        bottom: 0;
      }
    }
  }
}
</style>
