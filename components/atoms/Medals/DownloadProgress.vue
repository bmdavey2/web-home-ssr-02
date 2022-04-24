<template lang="pug">
transition(name="fade")
  .xa-medals-download-progress
    template(v-if="downloadProgress === 0") Downloading medal...
    template(v-else) Downloading medal {{ downloadProgress }}%
</template>

<script>
export default {
  name: 'XAMedalsDownloadProgress',
  props: {
    downloadProgress: Number,
  },
}
</script>

<style lang="scss" scoped>
.xa-medals-download-progress::v-deep {
  position: fixed;
  right: 20px;
  bottom: 20px;
  border-radius: 5px;
  padding: 10px;
  background-color: $success;
  color: $white;
  z-index: 100;
  font-weight: 300;
}
</style>
