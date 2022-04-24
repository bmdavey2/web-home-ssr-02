<template lang="pug">
.xo-home-section-02
  .container.is-max-widescreen
    .row.justify-between
      .column-content.flex-column
        ._icon.mb-6: img(src="~assets/images/v2/Home/explore-events.svg" alt="Explore Events" width="50" height="50")
        .details
          h4.mb-5 Find and join endurance events
          p Running, cycling, swimming, triathlon and more

        .actions.mt-5.col.row.items-end: b-button.text-uppercase(
          type="is-primary"
          label="Explore Events"
          expanded
          tag="router-link"
          to="/marketplace")

      .column-content.flex-column
        ._icon.mb-6: img(src="~assets/images/v2/Home/digital-medal.svg" alt="Digital Medal" width="50" height="50")
        .details
          h4.mb-5 Earn Digital NFT medals
          p Centralize the collection of your sporting achievements

        .actions.mt-5.col.row.items-end: b-button.text-uppercase(
          type="is-primary"
          label="See Examples"
          outlined
          expanded
          tag="router-link"
          to="/businesses")

      .column-content.flex-column
        ._icon.mb-6: img(
          src="~assets/images/v2/Home/share-achievements.svg"
          alt="Share Achievements"
          width="50"
          height="50")
        .details
          h4.mb-5 Celebrate your success with others
          p It's never been easier to share & celebrate your achievements anywhere & anytime

      .column-content.flex-column
        ._icon.mb-6: img(src="~assets/images/v2/Home/business.svg" alt="Business" width="50" height="50")
        .details
          h4.mb-5 ActivePlace for business
          p Let us help you grow your event & business

        .actions.mt-5.col.row.items-end: b-button.text-uppercase(
          type="is-white"
          label="Discover How"
          outlined
          expanded
          tag="router-link"
          to="/businesses")

    .separator
</template>

<script>
export default {
  name: 'XOHomeSection02',
}
</script>

<style lang="scss" scoped>
.xo-home-section-02::v-deep {
  .column-content {
    width: calc(100% / 4 - 20px);
    padding: 30px;
    background-color: #2a4e55;
    border-radius: 10px;

    @include max-width(1023px) {
      width: calc(100% / 2 - 10px);
      margin-bottom: 20px;
    }

    @include max-width(767px) {
      width: 100%;
    }

    &:last-child {
      background-color: #886bf2;
    }

    h4 {
      line-height: 1.55;

      @include max-width(767px) {
        font-size: 1.5714rem;
      }
    }

    p {
      font-size: 1.1429rem;
      line-height: 1.75;
      font-weight: 100;
      letter-spacing: -0.28px;
    }
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: #1c3e45;
    margin: 100px 0;

    @include max-width(768px) {
      margin: 50px 0;
    }
  }
}
</style>
