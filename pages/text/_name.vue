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
  components: {
    TheContent,
    FullText
  },
  async asyncData({ params, store, error, payload }) {
    const { name } = params
    const articles = store.state.articles.list

    let post

    if (payload) {
      post = payload
    } else if (articles && articles.length) {
      post = articles.find((a) => a.fields.slug === name)
    } else {
      const { items } = await contentfulClient.getEntries({
        content_type: 'article',
        'fields.slug': name
      })

      post = items[0]
    }

    return { post }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';
</style>
