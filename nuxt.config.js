import { writeFileSync } from 'fs'
import { resolve } from 'path'
// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require('axios')
const apiKey = process.env.GOOGLE_MAPS_API_KEY

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: `The World's Active Community - ActivePlace`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'ActivePlace: Your active life in one place.' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
      },
    ],
  },

  ssr: true,

  env: {
    baseURL: process.env.APP_ENV !== 'production' ? 'https://staging.activeplace.com' : 'https://activeplace.com',
    baseAPIURL: process.env.API_URL,
  },

  serverMiddleware: [
    '~/server-middleware/setSSRPages.ts',
    '~/server-middleware/routeRedirects.ts',
    '~/server-middleware/routeRedirectProducts.ts',
    { path: '/apple-app-site-association', handler: '~/server-middleware/routeAppleUniversalLinking.ts' },
    { path: '/health', handler: '~/server-middleware/routeHealthcheck.ts' },
  ],

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/buefy.scss',
    '@/assets/css/fonts/Rotunda.scss',
    '@/assets/css/fonts/Georgia.scss',
    '@/assets/css/app.sass',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/app.server.js', mode: 'server' },
    { src: '@/plugins/app.client.js', mode: 'client' },
    { src: '@/plugins/app.plugin.client.ts', mode: 'client' },
    { src: '@/plugins/app.js' },
    { src: '@/plugins/graphql.ts' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
    '@nuxtjs/device',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/google-analytics',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
    ['nuxt-storm', { nested: true, alias: true }],
    'nuxt-typed-vuex',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-compress',
    'nuxt-helmet',
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    // Firebase
    [
      '@nuxtjs/firebase',
      {
        config: process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG) : null,
        services: {
          auth: {
            ssr: true,
            initialize: {
              onAuthStateChangedAction: 'auth/onStateChanged',
            },
          },
          storage: true,
          performance: false,
          analytics: {
            collectionEnabled: true, // default
          },
          firestore: true,
        },
      },
    ],
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@dansmaculotte/nuxt-segment',
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
    '@nuxtjs/apollo',
    '@nuxtjs/gtm',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL,
      },
    },
    defaultOptions: {
      $query: {
        prefetch: false,
        fetchPolicy: 'no-cache',
      },
    },
    cookieAttributes: {
      secure: true,
    },
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // analyze: process.env.NODE_ENV === 'development',
    devtools: process.env.NODE_ENV === 'development',
    extractCSS: process.env.NODE_ENV === 'production',
    terser: {
      sourceMap: true,
    },
    hotMiddleware: {
      client: {
        overlay: false,
      },
    },
  },

  googleAnalytics: {
    id: 'UA-159909987-1',
  },

  gtm: {
    id: 'GTM-55MFB26',
    pageTracking: true,
  },

  // https://www.npmjs.com/package/@aceforth/nuxt-optimized-images
  optimizedImages: {
    optimizeImages: true,
  },

  // Style Resources
  styleResources: {
    scss: ['./assets/css/vars/*.scss'],
    sass: ['./assets/css/bulma-utilities.sass'],
    hoistUseStatements: true,
  },

  // Segment
  segment: {
    writeKey: process.env.SEGMENT_WRITEKEY,
    useRouter: false,
  },

  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {
      environment: process.env.APP_ENV,
    },
    publishRelease: {
      authToken: '',
      org: '',
      project: '',
    },
  },

  pwa: {
    manifest: {
      name: 'ActivePlace',
      short_name: 'ActivePlace',
      description: 'ActivePlace: your active life in one place.',
    },
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      dev: process.env.NODE_ENV === 'development',
    },
  },

  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
      })
    },
  },

  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
  },

  render: {
    asyncScripts: true,
  },

  sitemap: {
    hostname: 'https://activeplace.com/',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
    routes: async () => {
      const API_URL =
        process.env.APP_ENV === 'staging' ? 'https://api-staging.activeplace.com' : 'https://api.activeplace.com'
      const { data: entries } = await axios.get(`${API_URL}/sitemap`)
      return entries
    },
  },

  hooks: {
    build: {
      before({
        options: {
          srcDir,
          dir: { static: staticDir },
        },
      }) {
        const filePath = resolve(srcDir, staticDir, 'robots.txt')
        const properties = {
          'User-Agent': '*',
          Allow: process.env.APP_ENV === 'production' ? '/' : undefined,
          Disallow: process.env.APP_ENV === 'staging' ? '/' : undefined,
          Noindex: process.env.APP_ENV === 'staging' ? '/' : undefined,
        }
        let str = ''
        for (const key in properties) {
          const value = properties[key]
          if (!value) continue
          str += `${key}: ${properties[key]}\n`
        }
        writeFileSync(filePath, str)
      },
    },
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  publicRuntimeConfig: {
    graphqlURL: process.env.GRAPHQL_URL,
  },

  loading: {
    color: '#f85454',
    height: '3px',
  },
}
