<template lang="pug">
.xm-feed-filter-item.flex.align-center.mb-2.is-cursor-pointer(
  @click.prevent="$emit('click')",
  :class="{ active: active }")
  template(v-if="loading")
    .flex-auto
      b-skeleton(width="32" height="32")
    .flex-grow.pl-5
      b-skeleton(width="90%")

  template(v-else)
    .flex-auto
      .flex-center
        ._icon(:class="value === null && 'all'")
          img(src="~assets/icons/categories/active/all.svg" v-if="value === null")
          img(:src="image" v-else)
          .active: b-icon(icon="check" size="is-small")
    .flex-grow.pl-4.pr-2.is-uppercase(style="font-weight: 300; font-size: 12px")
      | {{ label }}
</template>

<script>
// require(`~/assets/images/discover/${category.id}-category.webp`)
export default {
  name: 'XMFeedFilterItem',
  props: {
    value: String,
    active: Boolean,
    loading: Boolean,
    image: String,
    label: String,
  },
}
</script>

<style lang="scss" scoped>
.xm-feed-filter-item::v-deep {
  ._icon {
    width: 32px;
    height: 32px;
    position: relative;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

    &.all {
      background-color: #cff1f8;
      padding: 6px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 1;
    }

    .active {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($secondary, 0.5);
      z-index: 2;
      color: $white;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      opacity: 0;
    }
  }

  &.active {
    .active {
      opacity: 1;
    }
  }
}
</style>
