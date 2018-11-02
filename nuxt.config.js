const pkg = require('./package')
import contentfulClient from './plugins/contentful'

module.exports = {
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
      { hid: 'description', name: 'description', content: pkg.description }
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
  modules: [],

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
      const { items } = await contentfulClient.getEntries({
        content_type: 'article',
        order: '-fields.date'
      })

      return items.filter((item) => item.fields.isInternal).map((item) => {
        return {
          route: `/text/${item.fields.slug}`,
          payload: item
        }
      })
    }
  }
}
