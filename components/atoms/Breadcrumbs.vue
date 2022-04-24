<template lang="pug">
.breadcrumbs
  nuxt-link.breadcrumb-item(:to="link" exact) {{ title }}
  nuxt-link.breadcrumb-item(:to="$route.path" exact) {{ subtitle }} Articles
</template>

<script>
export default {
  name: 'XABreadcrumbs',
  props: {
    title: String,
    subtitle: String,
    link: String,
  },
}
</script>

<style lang="scss" scoped>
.breadcrumbs::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 30px;

  .breadcrumb-item {
    font-weight: 300;
    color: #65676b;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &::after {
      content: '';
      width: 5px;
      height: 5px;
      border: 1px solid #65676b;
      display: block;
      transform: rotate(45deg);
      border-bottom: 0;
      border-left: 0;
      margin: 0 8px;
    }

    &:last-child {
      &::after {
        content: none;
      }
    }

    &.active {
      color: $secondary;
    }
  }

  @media screen and (max-width: 427px) {
    display: none;
  }
}
</style>
