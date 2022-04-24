<template lang="pug">
div
</template>

<script>
export default {
  async asyncData({ app, route, redirect }) {
    app?.$app.setPageLoader()
    const code = route.params?.code
    try {
      const { getOriginalURLFromCode } = await app?.$api.getOriginalURLFromCode({ code })
      redirect(`${getOriginalURLFromCode}`)
    } catch (error) {
      console.error(error)
    }
  },
}
</script>
