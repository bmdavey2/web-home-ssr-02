<template lang="pug">
.xp-pre-register-success.card
  .card-content
    h1 Thanks for pre-registering for the Starter plan
    h3 We'll be in contact as soon as the plan is ready with instructions on claiming your 20% discount.
    .actions.is-flex.is-flex-wrap-wrap.is-justify-content-center: b-button.is-uppercase(
      type="is-primary"
      tag="router-link"
      to="/trending"
      size="is-medium"
      @click.native="$parent.close()") Visit the Feed
</template>

<style lang="scss" scoped>
.xp-pre-register-success::v-deep {
  padding: 50px;

  .card-content {
    padding: 0;

    h1 {
      font-size: 2.2857rem;
      line-height: 1.5;
      font-weight: 500;
      text-align: center;
      margin-bottom: 30px;
    }

    h3 {
      font-size: 16px;
      line-height: 1.5;
      font-weight: 300;
      margin-bottom: 30px;
      text-align: center;
    }
  }

  @media screen and (max-width: 427px) {
    padding: 50px 30px;
  }
}
</style>
