<template lang="pug">
.xa-profile-avatar(:style="componentStyle" @click.prevent="$emit('click', $event)")
  img.lozad.image-checker(
    ref="imageChecker"
    data-placeholder-background="lightgrey",
    :src="image"
    @error="onImageInvalid")
  .label(v-if="!image || isImageInvalid", :style="labelStyle") {{ label }}
</template>

<script>
import lozad from 'lozad'

export default {
  name: 'XAProfileAvatar',
  props: {
    label: String,
    image: String,
    size: { type: String, default: () => '64px' },
    bgColor: { type: String, default: () => '#FFFFFF' },
  },
  data() {
    return {
      isImageInvalid: false,
    }
  },
  computed: {
    componentStyle() {
      return {
        backgroundImage: this.image ? `url('${this.image}')` : undefined,
        backgroundSize: 'cover',
        width: this.size,
        height: this.size,
        borderRadius: this.size,
        backgroundColor: this.bgColor,
      }
    },
    labelStyle() {
      return {
        fontSize: `calc(${this.size} * 0.35)`,
      }
    },
  },
  mounted() {
    const observer = lozad('.lozad', {
      rootMargin: '10px 0px',
      threshold: 0.1,
      enableAutoReload: true,
    })
    observer.observe()
  },
  methods: {
    onImageInvalid() {
      this.isImageInvalid = true
    },
  },
}
</script>

<style lang="sass" scoped>
.xa-profile-avatar::v-deep
  display: flex
  align-items: center
  justify-content: center
  text-align: center
  vertical-align: center
  background-color: white
  box-shadow: 0 0 5px rgba(0,0,0,.15)
  text-transform: uppercase
  background-position: center

  > .label
    margin-top: 7%
    font-weight: 300

  .image-checker
    display: none
    position: absolute
</style>
