<template lang="pug">
.xm-profile-setup-loader
  .card
    .header
    .card-content
      h2 This will only take a moment. We're setting up your Personal Profile now.
      .logo-loader.has-text-centered.mt-6.mb-2: img(src="~assets/images/SignUp/logo-loader.svg" width="73" height="60")
      .percentage.has-text-centered {{ percentage }}%
</template>

<script>
export default {
  name: 'XMProfileSetupLoader',
  data() {
    return {
      percentage: 0,
    }
  },
  mounted() {
    this.doIncrementProgress()
    this.$root.$on('setup/loader/close', this.doCloseSetupLoaderModal)
  },
  methods: {
    doIncrementProgress() {
      setInterval(() => {
        if (this.percentage >= 100) return
        this.percentage++
      }, 50)
    },
    doCloseSetupLoaderModal() {
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-profile-setup-loader::v-deep {
  box-shadow: 0 4px 30px rgb(18 55 63 / 15%);

  .header {
    background-image: url('~assets/images/SignUp/setup-profile.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 225px;
  }

  .card-content {
    padding: 30px 50px;

    h2 {
      color: $secondary;
      text-align: center;
      font-size: 1.5714rem;
    }

    .percentage {
      font-size: 2.2857rem;
      color: $secondary;
    }
  }
}
</style>
