export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      txt: '',
      mobileSM: 320,
      mobileLG: 427,
      tabletSM: 699,
      tabletLG: 768,
      desktop: 1024,
      widescreen: 1216,
    }
  },
  watch: {
    windowHeight(newWidth, oldWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
    lt(breakpoint) {
      if (!breakpoint) {
        return false
      }
      return this.getBreakPoint(breakpoint) > this.windowWidth
    },
    gt(breakpoint) {
      if (!breakpoint) {
        return false
      }
      return this.getBreakPoint(breakpoint) < this.windowWidth
    },
    lte(breakpoint) {
      if (!breakpoint) {
        return false
      }
      return this.getBreakPoint(breakpoint) >= this.windowWidth
    },
    gte(breakpoint) {
      if (!breakpoint) {
        return false
      }
      return this.getBreakPoint(breakpoint) <= this.windowWidth
    },
    getBreakPoint(breakpoint) {
      switch (breakpoint) {
        case 'mobileSM':
          return this.mobileSM
        case 'mobileLG':
          return this.mobileLG
        case 'tabletSM':
          return this.tabletSM
        case 'tabletLG':
          return this.tabletLG
        case 'desktop':
          return this.desktop
        case 'widescreen':
          return this.widescreen
        default:
          return 0
      }
    },
  },
}
