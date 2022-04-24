<template lang="pug">
.actions.is-flex.is-align-items-center
  p.mr-5.is-clickable(v-if="link && breakpoint" @click="redirectTo") See All
  .is-flex.is-justify-content-center
    a.slider-btn-prev(@click="$emit('Prev')" v-if="breakpoint"): b-icon.is-clickable.pl-3.pt-3.mr-4(icon="chevron-left")
    a.slider-btn-next.has-text-centered(@click="$emit('Next')"): b-icon.is-clickable.pt-3(icon="chevron-right")
</template>

<script>
export default {
  name: 'XASliderAction',
  props: {
    link: { type: String, default: '' },
  },
  computed: {
    breakpoint() {
      return this.gte('tabletLG')
    },
  },
  methods: {
    redirectTo() {
      this.$router.push(this.link)
    },
  },
}
</script>

<style lang="scss" scoped>
.actions {
  margin-left: auto;

  .slider-btn-prev {
    color: $secondary;
  }

  .slider-btn-next {
    height: 35px;
    width: 35px;
    background-color: $secondary;
    color: $white;
    border-radius: 50%;
    display: inline-block;
  }
}
</style>
