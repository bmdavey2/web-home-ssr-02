<template lang="pug">
div
  XOWelcomeNavigation
  XOWelcomeScrollSnap
</template>

<script>
import XOWelcomeScrollSnap from '~/components/organisms/WelcomeScrollSnap'
import XOWelcomeNavigation from '~/components/organisms/WelcomeNav'

export default {
  name: 'XPWelcome',
  components: { XOWelcomeNavigation, XOWelcomeScrollSnap },
  data() {
    return {
      isModalEnabled: false,
    }
  },
  mounted() {
    this.getAllExternalLinks()
  },
  methods: {
    setModalValue(value) {
      this.isModalEnabled = value
    },
  },
}
</script>
