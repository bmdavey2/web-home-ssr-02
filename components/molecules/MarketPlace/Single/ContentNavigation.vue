<template lang="pug">
ul.xm-marketplace-single-content-navigation(v-scroll-spy-active v-scroll-spy-link)
  li.navigation-item: a Description
  li.navigation-item: a Additional Information
  li.navigation-item: a Organizer
  li.navigation-item: a Community Categories
</template>

<script>
export default {
  name: 'XMMarketPlaceSingleContentNavigation',
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-content-navigation::v-deep {
  background-color: $white;
  box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: calc(100% - 295px);
  margin-bottom: 30px;
  padding: 0 30px;
  position: sticky;
  top: 90px;
  z-index: 3;

  .navigation-item {
    a {
      text-transform: uppercase;
      color: $secondary;
      font-weight: 500;
      line-height: 1;
      padding: 18px 0;
      cursor: pointer;
      display: block;
      border-bottom: 1px solid transparent;
    }

    &.active {
      a {
        border-color: $secondary;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    max-width: 100%;
    top: 68px;
  }

  @media screen and (max-width: 767px) {
    box-shadow: none;
    width: calc(100% + 30px);
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow-x: auto;
    padding: 0 15px;
    border-radius: 0;
    margin: 0 -15px 30px;
    max-width: none;
    top: 63px;

    .navigation-item {
      margin-right: 20px;
    }
  }
}
</style>
