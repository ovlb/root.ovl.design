<template>
  <the-content class="content--no-padding">
    <full-text
      :infos="{
        category: post.fields.categories
          ? post.fields.categories[0].fields.title
          : null,
        date: post.fields.date,
        title: post.fields.title,
        contentIntro: post.fields.contentIntro,
        heroImage: post.fields.heroImage,
        content: post.fields.content
      }"
    />
  </the-content>
</template>

<script>
import FullText from '~/components/text/FullText'

import contentfulClient from '~/plugins/contentful'

const makeTitle = (title) => `${title} « Texte`

export default {
  head() {
    const og = this.post.fields.openGraphImage
      ? this.post.fields.openGraphImage.fields.file
      : undefined
    const altText = this.post.fields.heroImage
      ? this.post.fields.heroImage.fields.altText
      : ''

    const meta = [
      {
        hid: 'description',
        name: 'description',
        content: this.post.fields.intro
      },
      {
        hid: 'ogDescription',
        name: 'og:description',
        content: this.post.fields.intro
      },
      {
        hid: 'description',
        name: 'description',
        content: this.post.fields.intro
      },
      {
        hid: 'ogTitle',
        property: 'og:title',
        content: `${makeTitle(this.post.fields.title)} | ovl – code & design`
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
      }
    ]

    if (og) {
      meta.push(
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
        },
        {
          hid: 'twitterImgAlt',
          property: 'twitter:image:alt',
          content: altText
        }
      )
    }

    return {
      title: makeTitle(this.post.fields.title),
      meta
    }
  },
  components: {
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
</style>
