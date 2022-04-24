<template lang="pug">
.become-mentor
  .container.is-max-widescreen
    .is-flex.is-flex-wrap-wrap.is-justify-content-space-between.mentor-container
      .left-content: h2 Why become a mentor?

      .right-content
        ul
          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Build awareness, trust and reputation within your industry.

          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Help individuals and your greater community achieve their own goals.

          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Be a part of an exponentially growing customer base from all over the world.

          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Focus your energy on a specialised platform that is built for health, wellness and living an active life..

          li
            span._icon.mr-2: img(src="~assets/images/Mentors/ap-sign.svg" width="12" height="12")
            span.value.is-flex-width-auto Potential to grow a new revenue line.
</template>

<script>
export default {
  name: 'XMBecomeMentor',
}
</script>

<style lang="scss" scoped>
.become-mentor::v-deep {
  background-color: #fafafa;
  padding-top: 8.5714rem;
  font-size: 1.1429rem;
  margin-bottom: -2px;

  @media screen and (min-width: 1023px) {
    .mentor-container {
      align-items: center;
    }
  }

  .left-content {
    width: 100%;
    max-width: 260px;

    @media screen and (max-width: 1023px) {
      h2 {
        font-size: 2.1429rem;
        line-height: 2.7143rem;
      }
    }

    @media screen and (max-width: 767px) {
      max-width: 100%;

      h2 {
        text-align: center;
        margin-bottom: 1.7857rem;
      }
    }
  }

  .right-content {
    width: 100%;
    max-width: 660px;

    ul {
      li {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 15px;
      }
    }

    @media screen and (max-width: 1024px) {
      max-width: 50%;
    }

    @media screen and (max-width: 1023px) {
      max-width: calc(100% - 260px);
    }

    @media screen and (max-width: 767px) {
      max-width: 660px;
      margin: 0 auto;
    }
  }
}
</style>
