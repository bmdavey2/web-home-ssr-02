<template lang="pug">
.xd-medals-claimed.card
  .card-content
    .close(@click.prevent="doClosePopup()"): b-icon(icon="close")
    h2 This medal has already been claimed.
    h3 Please contact our support for questions.
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'XDMedalsClaimed',
  mounted() {
    this.$root.$emit('set/click/popup', true)
  },
  methods: {
    ...mapActions({
      setMedalClaimDetails: 'medals/setMedalClaimDetails',
    }),
    async doClosePopup() {
      await this.setMedalClaimDetails(null)
      const route = this.$route
      this.$router.push({
        path: route?.path,
      })
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xd-medals-claimed::v-deep {
  .card-content {
    padding: 100px 50px;
    color: $secondary;
    text-align: center;

    .close {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
    }

    h2 {
      font-size: 2.2857rem;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 1.5714rem;
      font-weight: 300;
    }
  }
}
</style>
