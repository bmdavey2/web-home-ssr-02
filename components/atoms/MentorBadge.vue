<template lang="pug">
.xa-mentor-badge(v-if="badge"): img(:src="require(`~/assets/icons/mentor/${badge}.svg`)")
</template>

<script>
export default {
  name: 'XAMentorBadge',
  props: {
    badge: String,
  },
}
</script>

<style lang="scss" scoped>
.xa-mentor-badge::v-deep {
  display: flex;
  width: 24px;
  height: 24px;
}
</style>
