<template lang="pug">
.xm-plans-pricing-testimonials
  .container
    h1 Here's what other businesses think about ActivePlace...
    .list
      .item
        .company-details
          .logo: img(src="~assets/images/PlansPricing/gc50-logo.webp" alt="GC50" width="80" height="80")
          ._content.is-flex-width-auto
            .company-name GC50
            .person-name Adam Goodger
        .testimonial ActivePlace is helping us talk to more of the right people and contain our brand story in one place, we're excited about the future and are looking forward to growing opportunities with it.
      .item
        .company-details
          .logo: img(src="~assets/images/PlansPricing/fisiocrem-logo.webp" alt="Fisiocrem" width="80" height="80")
          ._content.is-flex-width-auto
            .company-name Fisiocrem
            .person-name Teagan Rayner
        .testimonial We believe in the value of building trust with real customers and we are very energetic about activating Fisiocrem through product storytelling. ActivePlace is the perfect platform for us to do both, so we're excited.
      .item
        .company-details
          .logo: img(src="~assets/images/PlansPricing/opkix-logo.webp" alt="Opkix" width="80" height="80")
          ._content.is-flex-width-auto
            .company-name Opkix
            .person-name Christian Scott
        .testimonial OPKIX is a young brand, new to the Australian market. It's important that we communicate our brand message to the right people and ActivePlace gives us the opportunity to do that.
      .item
        .company-details
          .logo: img(src="~assets/images/PlansPricing/edco-logo.webp" width="80" height="80")
          ._content.is-flex-width-auto
            .company-name EDCO Wheels
            .person-name Stefan Anton
        .testimonial EDCO manufactures products for specific types of cyclists, they want to know the details and care about the quality and finish of the product, so ActivePlace is a great platform for us to house this important information, talk about our athletes and reach the right people by doing it there.
</template>

<script>
export default {
  name: 'XMPlansPricingTestimonials',
}
</script>

<style lang="scss" scoped>
.xm-plans-pricing-testimonials::v-deep {
  padding: 100px 0 30px;

  h1 {
    text-align: center;
    margin-bottom: 50px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: calc(100% / 4 - 30px);

      .company-details {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .company-name {
          color: $secondary;
          font-weight: 500;
        }

        .person-name {
          font-weight: 300;
        }
      }

      .testimonial {
        font-weight: 300;
        position: relative;
        padding-left: 15px;

        &::before {
          content: '“';
          color: $primary;
          position: absolute;
          top: 0;
          left: 0;
          font-size: 1.5714rem;
          line-height: 2.2857rem;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    padding: 100px 0 70px;

    .list {
      .item {
        width: calc(100% / 2 - 30px);
        margin-bottom: 30px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 50px 0 20px;

    .list {
      .item {
        width: 100%;
      }
    }
  }
}
</style>
