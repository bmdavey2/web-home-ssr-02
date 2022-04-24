<template lang="pug">
.xa-flag(:class="size")
  country-flag(:country="flag", :size="size")
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'XAFlag',
  components: { CountryFlag },
  props: {
    country: String, // alpha-2 or alpha-3
    size: { type: String, default: 'normal' }, // small, normal, big
  },
  data() {
    return {
      flag: '',
    }
  },
  mounted() {
    this.doGetFlagAlpha2()
  },
  methods: {
    async doGetFlagAlpha2() {
      try {
        const result = await this.$store.dispatch('countries/getCode', this.country)
        if (result.length) this.flag = result[0].alpha2
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xa-flag::v-deep {
  border-left: 1px solid $secondary;
  margin-left: 10px;
  padding-left: 10px;
  position: relative;

  &.small {
    width: 13px;
    height: 10px;

    .flag {
      top: -15px;
      left: 10px;
    }
  }

  &.normal {
    width: 26px;
    height: 20px;

    .flag {
      top: -10px;
      left: 0;
    }
  }

  &.big {
    width: 52px;
    height: 39px;

    .flag {
      top: 0;
      left: 10px;
    }
  }

  .flag {
    position: absolute;
  }
}
</style>
