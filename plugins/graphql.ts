import { Plugin } from '@nuxt/types'
import request, { GraphQLClient } from 'graphql-request'
import { DocumentNode } from 'graphql'
import { getSdk } from '~/types/graphql'

declare module 'vue/types/vue' {
  interface Vue {
    $api: ReturnType<typeof getSdk>
    $gql<T>(query: string | DocumentNode, variables?: Record<string, any>): Promise<T>
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: ReturnType<typeof getSdk>
    $gql<T>(query: string | DocumentNode, variables?: Record<string, any>): Promise<T>
  }
  interface Context {
    $api: ReturnType<typeof getSdk>
    $gql<T>(query: string | DocumentNode, variables?: Record<string, any>): Promise<T>
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: ReturnType<typeof getSdk>
    $gql<T>(query: string | DocumentNode, variables?: Record<string, any>): Promise<T>
  }
}

const plugin: Plugin = ({ app, store, $config }, inject) => {
  const client = new GraphQLClient($config.graphqlURL)
  inject(
    'api',
    getSdk(client, async (action, name) => {
      try {
        const businessID = store.state.app.currentBusiness
        const authToken = store.state.auth.token
        app.$accessor.control.setError({ name, value: null })
        app.$accessor.control.setLoading({ name, value: true })
        return await action({
          ...(businessID ? { 'X-ActivePlace-Business-ID': businessID } : undefined),
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : undefined),
          'X-ActivePlace-Device-Platform': 'website',
          'X-ActivePlace-Client-Type': 'browser',
        })
      } catch (e) {
        app.$accessor.control.setError({ name, value: e })
        throw e
      } finally {
        app.$accessor.control.setLoading({ name, value: false })
      }
    })
  )
  inject('gql', (query: string | DocumentNode, variables?: Record<string, any>) => {
    return request($config.graphqlURL, query, variables)
  })
}

export default plugin
