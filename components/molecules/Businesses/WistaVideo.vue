<template lang="pug">
.business-video
  script(src="https://fast.wistia.com/embed/medias/xjdfhevs2k.jsonp" async)
  script(src="https://fast.wistia.com/assets/external/E-v1.js" async)
  .wistia_responsive_padding.is-fleex(style="padding: 56.25% 0 0 0; position: relative")
    .wistia_responsive_wrapper(style="height: 100%; left: 0; position: absolute; top: 0; width: 100%")
      .wistia_embed.wistia_async_xjdfhevs2k(class="videoFoam=true" style="height: 100%; position: relative; width: 100%")
        .wistia_swatch(
          style="height: 100%; left: 0; opacity: 0; overflow: hidden; position: absolute; top: 0; transition: opacity 200ms; width: 100%")
          img(
            src="https://fast.wistia.com/embed/medias/xjdfhevs2k/swatch"
            style="filter: blur(5px); height: 100%; object-fit: contain; width: 100%"
            alt
            aria-hidden="true"
            onload="this.parentNode.style.opacity=1;")
</template>

<script>
export default {
  name: 'XMBusinessVideo',
}
</script>
