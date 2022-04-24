<template lang="pug">
.xa-form-toggle
  input.toggle-input(type="checkbox", :checked="value" @input="onInput")
  .active-color(:style="activeColorStyles")
  .circle
</template>

<script>
export default {
  name: 'XAFormToggle',
  props: {
    value: Boolean,
    label: String,
    activeColor: { type: String, default: '#886bf2' },
    inactiveColor: { type: String, default: '#c4c4c4' },
  },
  computed: {
    activeColorStyles() {
      const activeColorStyles = {
        backgroundColor: this.value ? this.activeColor : this.inactiveColor,
      }

      return activeColorStyles
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.checked)
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-form-toggle::v-deep {
  position: relative;
  width: 100%;
  max-width: 35px;

  .toggle-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 35px;
    height: 15px;
    opacity: 0;
    z-index: 2;
    cursor: pointer;

    &:checked {
      + .active-color {
        background-color: transparent;

        + .circle {
          left: calc(100% - 17px);
        }
      }
    }
  }

  .active-color {
    width: 35px;
    height: 15px;
    border-radius: 50px;
    background-color: transparent;
    transition: 0.3s;
  }

  .circle {
    background-color: $white;
    box-shadow: 0 1px 2px rgba(#c4c4c4, 0.54);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: -3px;
    left: -3px;
    z-index: 1;
    transition: 0.3s;
  }
}
</style>
