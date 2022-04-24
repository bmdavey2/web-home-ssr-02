<template lang="pug">
.section.index-bg-fourth.page-4
  .fourth-content.d-md-tablet(style="max-width: 1071px")
    .columns.is-vcentered.pt-5(style="max-height: 558px")
      .column.is-one-third.is-offset-1
        h2.middle-text.is-mobile.is-size-1.is-size-3-mobile.has-text-left-desktop.is-family-secondary
          | Get exactly what
          | you came for.
        h2.pt-4.has-text-weight-light.has-text-black-bis.has-text-left.sub-text
          | Easily personalise ActivePlace so it aligns to your
          | unique active lifestyle
      .column.is-6
        img.is-hidden-mobile.block-image(
          src="~/assets/images/Welcome/posts-group-third.png"
          width="525"
          height="585"
          loading="lazy")
        img.d-img-md(
          src="~/assets/images/Welcome/posts-group-third.png"
          style="max-width: 70%; width: 100%"
          width="525"
          height="585"
          loading="lazy")
        img.d-img-sm(
          src="~/assets/images/Welcome/MbMidImg.png"
          style="max-width: 77%; width: 100%"
          width="525"
          height="585"
          loading="lazy")
</template>

<script>
export default {
  name: 'XMWelcomeFourthSection',
}
</script>

<style lang="scss" scoped>
.fourth-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  text-align: center;
}

.d-md-tablet {
  top: 50%;
}

.middle-text {
  white-space: pre;
  color: #f15a29;
}

.sub-text {
  font-size: 16px;
}

.d-img-md {
  display: none !important;
}

.d-img-sm {
  display: none !important;
}

@media screen and (max-width: $tabletLG) {
  .middle-text {
    margin: 0 !important;
    padding: 0 !important;
    padding-top: 30px !important;
    line-height: 40px !important;
  }
  .sub-text {
    text-align: center !important;
    padding: 0 5px;
  }
}

@media screen and (max-width: $mobileSM) {
  .sub-text {
    text-align: center !important;
    padding: 0 5px !important;
  }
}

@media screen and (max-width: $mobileLG) {
  .d-img-sm {
    display: unset !important;
  }
}

@media screen and (min-width: $tabletLG) and (max-width: $BPdesktop) {
  .block-image {
    width: 80%;
    margin-right: -60px;
  }
}

@media screen and (max-width: $tabletLG) and (min-width: $mobileLG) {
  .d-md-tablet {
    top: 40% !important;
  }
  .d-img-md {
    display: unset !important;
  }
}
</style>
