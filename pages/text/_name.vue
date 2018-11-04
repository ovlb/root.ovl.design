<template>
  <the-content class="content--no-padding">
    <full-text
      :infos="{
        category: post.fields.categories[0].fields.title,
        date: post.fields.date,
        title: post.fields.title,
        contentIntro: post.fields.contentIntro,
        heroImage: post.fields.heroImage,
        content: post.fields.content
    }"/>
  </the-content>
</template>

<script>
import TheContent from '~/components/global/TheContent'
import FullText from '~/components/text/FullText'

import marked from 'marked'
import contentfulClient from '~/plugins/contentful'

export default {
  head() {
    const og = this.post.fields.openGraphImage.fields.file
    return {
      title: `${this.post.fields.title} « Texte`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.intro
        },
        {
          hid: 'ogType',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'ogType',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'ogAuthor',
          property: 'article:author',
          content: 'https://www.facebook.com/oscar.braunert'
        },
        {
          hid: 'ogImage',
          property: 'og:image',
          content: og.url
        },
        {
          hid: 'ogImageWidth',
          property: 'og:image:width',
          content: og.details.image.width
        },
        {
          hid: 'ogImageHeight',
          property: 'og:image:height',
          content: og.details.image.height
        }
      ]
    }
  },
  filters: {
    parsed: (value) => marked(value),
    displayDate: (value) => {
      const d = new Date(value)

      return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
    }
  },
  components: {
    TheContent,
    FullText
  },
  async asyncData({ params, store, error, payload }) {
    const { name } = params
    const articles = store.state.articles.list

    let post

    if (articles && articles.length) {
      post = articles.find((a) => a.fields.slug === name)
    } else {
      const { items } = await contentfulClient.getEntries({
        content_type: 'article',
        'fields.slug': name
      })

      post = items[0]
    }

    return { post }
  },
  methods: {
    parsedText(text) {
      return marked(text)
    },
    srcSet(url, size) {
      const sizes = {
        small: [
          320,
          360,
          400,
          480,
          520,
          560,
          640,
          680,
          720,
          760,
          800,
          880,
          920,
          960,
          1000,
          1040,
          1080,
          1120,
          1160,
          1220,
          1260,
          1300,
          1340,
          1380
        ],
        large: [
          600,
          680,
          760,
          840,
          900,
          960,
          1020,
          1080,
          1140,
          1200,
          1260,
          1320,
          1380,
          1420,
          1480,
          1520,
          1600,
          1700,
          1800,
          1900,
          2000,
          2100,
          2200,
          2300,
          2400,
          2600,
          2800,
          3000,
          3200,
          3400
        ]
      }

      let set = ''

      sizes[size].forEach((size) => {
        set += `${url}?w=${size} ${size}w, `
      })

      return set
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';
</style>
