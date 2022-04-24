<template lang="pug">
.xm-signup-user-described-as.row
  .describe.row.items-center.justify-center(
    v-for="(describe, index) in describes",
    :key="index"
    @click.prevent="selected = describe",
    :class="describe === selected && 'active'") {{ describe }}
</template>

<script>
export default {
  name: 'XMSignUpUserDescribedAs',
  props: {
    value: String,
  },
  data() {
    return {
      describes: ['Getting Started', 'An Exerciser', 'Competitor', 'Professional Athlete'],
      selected: '',
    }
  },
  watch: {
    selected(value) {
      this.selected = value
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-signup-user-described-as::v-deep {
  .describe {
    border: 1px solid #c5c5c5;
    font-size: 1.2857rem;
    font-weight: 300;
    height: 46px;
    border-radius: 50px;
    margin: 0 10px 10px 0;
    padding: 0 20px;
    cursor: pointer;
    user-select: none;
    transition: 0.3s;

    @include max-width(767px) {
      height: 36px;
      font-size: 1rem;
    }

    &.active {
      background-color: $secondary;
      color: $white;
    }
  }
}
</style>
