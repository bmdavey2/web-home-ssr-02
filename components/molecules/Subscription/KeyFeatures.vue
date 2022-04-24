<template lang="pug">
.card
  .card-content
    p.is-size-4.has-text-black Your key-features
    div(v-if="type === 'default'")
      .features
        p Unlimited content creation
        .hint
          b-tooltip(
            label="Publish unique and unlimited content to be discoverd across web & app"
            type="is-light"
            position="is-left"
            square
            multilined)
            img(src="~assets/images/PlansPricing/question.png" width="16" height="16")
      .features
        p Create unlimited products
        .hint
          b-tooltip(
            label="Add and promote unlimted products (Events, Active Programs, Experiences) within the MarketPlace"
            type="is-light"
            position="is-left"
            square
            multilined)
            img(src="~assets/images/PlansPricing/question.png" width="16" height="16")
    div(v-else)
      // remove due to ticket AW-1447
      //.features
        p Product PINS on images
        .hint
          b-tooltip(
            label="Enable a powerful and instant connection between your published images and MarketPlace products using Pins"
            type="is-light"
            position="is-left"
            square
            multilined)
            img(src="~assets/images/PlansPricing/question.png" width="16" height="16")

      .features
        p Websites
        .hint
          b-tooltip(label="Link to an external website or URL" type="is-light" position="is-left" square multilined)
            img(src="~assets/images/PlansPricing/question.png" width="16" height="16")

    .features
      p follow limits -
      span.ml-1(style="color: #050505") {{ followLimits }}
      .hint
        b-tooltip(
          label="The amount of people and businesses you will be able to follow"
          type="is-light"
          position="is-left"
          square
          multilined)
          img(src="~assets/images/PlansPricing/question.png" width="16" height="16")

    .features
      p Team members -
      span.ml-1(style="color: #050505" v-if="type === 'default'") 1
      span.ml-1(style="color: #050505" v-else) 2
      .hint
        b-tooltip(
          label="Add members of your team or external agencies to help you manage content on behalf of your business"
          type="is-light"
          position="is-left"
          square
          multilined)
          img(src="~assets/images/PlansPricing/question.png" width="16" height="16")

    div(v-if="type === 'default'")
      .features
        p Profile & content searchable across web & app
        .hint
          b-tooltip(
            label="Be more discovered by resulting in the ActivePlace Web & App Search Engine"
            type="is-light"
            position="is-left"
            square
            multilined)
            img(src="~assets/images/PlansPricing/question.png" width="16" height="16")
    div(v-else)
      .features
        p Preferred search ranking
        .hint
          b-tooltip(
            label="Rank higher in ActivePlace search results, allowing your content to be found more easily and regulary"
            type="is-light"
            position="is-left"
            square
            multilined)
            img(src="~assets/images/PlansPricing/question.png" width="16" height="16")
</template>

<script>
export default {
  name: 'XMSubscriptionFeatures',
  props: {
    features: { type: Object, default: () => {} },
    type: { type: String, default: 'default' },
  },
  computed: {
    addLinksInContent() {
      return this.features?.addLinksInContent || false
    },
    followLimits() {
      const number = this.features?.followLimits || '1000'
      return parseInt(number).toLocaleString('en-US')
    },
    // recommendProfile() {
    //   return this.features?.recommendProfile || false
    // },
    // prioritySupport() {
    //   return this.features?.prioritySupport || false
    // },
    additionalTeamMembers() {
      return this.features?.additionalTeamMembers || 0
    },
  },
}
</script>

<style lang="scss" scoped>
.features {
  display: flex;
  align-items: flex-start;
  padding: 20px 40px 20px 20px;
  background: linear-gradient(201.54deg, #eaeff3 66.91%, #e5e9f0 84.46%);
  border-radius: 4px;
  margin: 8px 0;
  position: relative;

  p {
    font-size: 14px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #050505;
  }

  .hint {
    background-color: $white;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
