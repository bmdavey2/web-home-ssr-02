<template lang="pug">
.xa-marketplace-added-file
  img(src="~assets/images/MarketPlace/download.webp")
  span.name
    | {{ file.fileName }}
    .delete-file(@click.prevent="$emit('delete', $event)"): b-icon(icon="close" size="is-small")
</template>

<script>
export default {
  name: 'XAMarketPlaceAddedFile',
  props: {
    file: Object,
  },
}
</script>

<style lang="scss" scoped>
.xa-marketplace-added-file::v-deep {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 10px;

  img {
    margin-right: 10px;
  }

  .name {
    position: relative;
    padding-right: 35px;
    max-width: calc(100% - 100px);

    .delete-file {
      box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
      width: 24px;
      height: 24px;
      background-color: $white;
      border-radius: 100px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      cursor: pointer;
      position: absolute;
      top: -5px;
      right: 0;
    }
  }
}
</style>
