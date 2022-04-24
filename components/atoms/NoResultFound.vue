<template lang="pug">
.no-results-found
  h3 No results found
  p We couldn't find what you are looking for. Please try other data.
  ._icon: img(src="~assets/icons/no-results-found.webp")
</template>

<script>
export default {
  name: 'XANoResultFound',
}
</script>
<style lang="scss" scoped>
.no-results-found::v-deep {
  text-align: center;
  font-size: 1.1429rem;
  line-height: 1.4286rem;

  h3 {
    font-size: 1.5714rem !important;
    line-height: 2.2857rem !important;
    color: $secondary;
    margin-bottom: 1.4286rem !important;
  }

  ._icon {
    margin-top: 2.1429rem;
  }
}
</style>
