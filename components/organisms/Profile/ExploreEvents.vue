<template lang="pug">
.xo-profile-explore-events.row.items-center
  .left-content
    img(src="~assets/images/MarketPlace/achievement.png")
    h3 Join events, earn your digital medals
    b-button.text-uppercase(type="is-primary" tag="router-link" to="/marketplace") Explore Events
    router-link.text-weight-light.link-digital-medals(to="/digital-medals") Read more about digital medals
</template>

<script>
export default {
  name: 'XOProfileExploreEvents',
}
</script>

<style lang="scss" scoped>
.xo-profile-explore-events::v-deep {
  background-image: url('~assets/images/MarketPlace/background-cards.webp');
  background-size: cover;
  background-position: right center;
  padding: 30px 50px;
  margin-top: 20px;
  color: $white;
  position: relative;
  border-radius: 6px;

  @include max-width(1024px) {
    padding: 30px 20px;
    background-position: right -220px center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(90deg, $secondary 70%, transparent);
      border-radius: 6px;
    }
  }

  .left-content {
    width: 100%;
    max-width: 60%;
    position: relative;
    z-index: 2;

    @include max-width(767px) {
      max-width: 100%;
    }

    img {
      margin-bottom: 50px;
    }

    h3 {
      font-size: 2.2857rem;
      line-height: 1.25;
      margin-bottom: 20px;
    }

    .button {
      width: 100%;
      max-width: 220px;
      margin-bottom: 10px;
    }

    .link-digital-medals {
      display: block;
      color: rgba($white, 0.7);
    }
  }
}
</style>
