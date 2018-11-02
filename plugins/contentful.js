import Vue from 'vue'
import * as contentful from 'contentful'

const config = {
  space: process.env.CF_SPACE || process.env.cfSpace,
  accessToken: process.env.CF_TOKEN || process.env.cfToken
}

const client = contentful.createClient(config)

const Contentful = {
  install(Vue) {
    Vue.prototype.$contentful = client
  }
}

Vue.use(Contentful)

export default client
