require('dotenv').config()

const contentfulClient = require('./plugins/contentful')

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: (chunk) => {
      return chunk ? `${chunk} | ovl – code & design` : 'ovl – code & design'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
      }
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
  css: ['@/assets/css/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/contentful.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
  ],
  /* env: {
    cfSpace: process.env.CF_SPACE,
    cfToken: process.env.CF_TOKEN
  }, */
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
