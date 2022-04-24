import Vue from 'vue'
import checkView from 'vue-check-view'
import 'video.js/dist/video-js.min.css'
import TextareaAutosize from 'vue-textarea-autosize'
import InfiniteScroller from 'vue-infinite-scroll'
import vClickOutside from 'v-click-outside'
import VueSocialSharing from 'vue-social-sharing'
import VueTimeago from 'vue-timeago'
import toNow from 'date-fns/distance_in_words_to_now'
import VueTribute from 'vue-tribute'
import Affix from 'vue-affix'
import linkify from 'vue-linkify'
import Zendesk from '@dansmaculotte/vue-zendesk'
import Scrollspy from 'vue2-scrollspy'
import Vue2TouchEvents from 'vue2-touch-events'
import breakpoints from '~/mixins/breakpoints'

Vue.use(checkView)
Vue.use(TextareaAutosize)
Vue.use(InfiniteScroller)
Vue.use(vClickOutside)
Vue.use(VueSocialSharing)
Vue.use(Affix)
Vue.use(Scrollspy)
Vue.use(Vue2TouchEvents)

Vue.use(VueTimeago, {
  name: 'Timeago',
  converter: (date, locale, converterOptions) => {
    const { includeSeconds, addSuffix = true } = converterOptions
    return toNow(date, {
      locale,
      includeSeconds,
      addSuffix,
    })
      .replace('less than a minute ago', 'just now')
      .replace('about ', '')
      .replace('hours', 'hrs')
      .replace('hour', 'hr')
  },
})

Vue.component('vue-tribute', VueTribute)
Vue.directive('linkified', linkify)
Vue.mixin(breakpoints)

Vue.use(Zendesk, {
  key: '12cb03d3-7bc4-40c9-b89f-d05cd29b6498',
  disabled: false,
  hideOnLoad: false,
  settings: {
    webWidget: {
      color: {
        theme: '#0c353e',
      },
    },
  },
})
