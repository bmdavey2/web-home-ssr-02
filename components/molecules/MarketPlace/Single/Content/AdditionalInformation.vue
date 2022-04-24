<template lang="pug">
.xm-marketplace-single-content-additional-information.content-section
  ._title Additional Information
  template(v-if="files.length > 0")
    XAMarketPlaceAdditionalInformationFile(v-for="(file, index) in files", :file="file", :key="index")
  template(v-else): h3 No additional information added.
  .separator
</template>

<script>
import XAMarketPlaceAdditionalInformationFile from '~/components/atoms/MarketPlace/AdditionalInformationFile'
export default {
  name: 'XMMarketPlaceSingleContentAdditionalInformation',
  components: { XAMarketPlaceAdditionalInformationFile },
  props: {
    product: Object,
  },
  computed: {
    files() {
      return this.product?.AdditionalInformation || []
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-content-additional-information::v-deep {
  box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 30px 20px 0;
  background-color: $white;

  h3 {
    font-weight: 300;
  }
}
</style>
