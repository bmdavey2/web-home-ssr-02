import { accessorType } from '~/store'
import bindToNuxtApp from '~/scripts/app/client'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $appClient: ReturnType<typeof bindToNuxtApp>
    $segment: any
  }
  interface VueConstructor {
    $segment: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
    $segment: any
    $appClient: any
  }
}
