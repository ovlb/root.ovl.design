<template>
  <the-content>
    <full-text
      :infos="{
        title: post.fields.title,
        heroImage: post.fields.heroImage,
        content: post.fields.content
      }"
    />
  </the-content>
</template>

<script>
import TheContent from '~/components/global/TheContent'
import FullText from '~/components/text/FullText'

import marked from 'marked'
import contentfulClient from '~/plugins/contentful'

export default {
  head() {
    return {
      title: this.post.fields.title
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
    // const articles = store.state.articles.list

    const { items } = await contentfulClient.getEntries({
      content_type: 'page',
      'fields.slug': name
    })

    if (items.length) {
      return { post: items[0] }
    } else {
      error({ statusCode: 404, message: 'Post not found' })
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';
</style>
