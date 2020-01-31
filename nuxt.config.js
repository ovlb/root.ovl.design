require('dotenv').config()

const { default: contentfulClient } = require('./plugins/contentful')

const robots = process.env.STAGE === 'preview' ? { name: 'robots', content: 'noindex,nofollow' } : {}

export default {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en-UK',
    },
    titleTemplate: (chunk) => {
      return chunk ? `${chunk} | ovl – code & design` : 'ovl – code & design'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      robots,
      {
        hid: 'description',
        name: 'description',
        content:
          'Hi, I am Oscar. I write code and design for web and print. This is my website.'
      },
      {
        hid: 'ogName',
        property: 'og:site_name',
        content: 'www.ovl.design'
      },
      {
        hid: 'ogImage',
        property: 'og:image',
        content:
          'https://images.ctfassets.net/0qq78o7muy2j/41AVLQd3q0oEaQKwcW0Ck2/1adc1e0fc0c7525b4f25b45570847396/ovl-og-image-generic.png'
      },
      {
        hid: 'ogImageWidth',
        property: 'og:image:width',
        content: '2240'
      },
      {
        hid: 'ogImageHeight',
        property: 'og:image:height',
        content: '1260'
      },
      {
        hid: 'twitterSite',
        property: 'twitter:site',
        content: '_ovlb'
      },
      {
        hid: 'twitterCreator',
        property: 'twitter:creator',
        content: '_ovlb'
      },
      {
        hid: 'twitterImgAlt',
        property: 'twitter:image:alt',
        content: 'An owl sitting on a branch. The letters o v l are added in the top right corner.'
      },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/main.scss',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/components.js',
    '~/plugins/contentful.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: ['assets/css/sass/_import.scss']
  },
  env: {
    cfSpace: process.env.CF_SPACE,
    cfToken: process.env.CF_TOKEN
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    async routes() {
      const articles = await contentfulClient.getEntries({
        content_type: 'article',
        order: '-fields.date'
      })

      const pages = await contentfulClient.getEntries({
        content_type: 'page'
      })

      const items = [
        ...pages.items,
        ...articles.items.filter((item) => item.fields.isInternal)
      ]

      const pathMap = {
        article: '/text/',
        page: '/'
      }

      return items.map((item) => {
        const type = item.sys.contentType.sys.id

        return {
          route: `${pathMap[type]}${item.fields.slug}`,
          payload: item
        }
      })
    }
  }
}
