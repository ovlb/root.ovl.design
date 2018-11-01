<template>
  <the-content>
    <article class="text">
      <header class="article__header">
        <p class="type-is-aside">{{ post.fields.categories[0].fields.title }}—{{ post.fields.date | displayDate }}</p>
        <h1 class="main-headline">{{ post.fields.title }}</h1>
      </header>
      <section
        v-if="post.fields.intro"
        class="article__intro"
        v-html="parsedText(post.fields.intro)"
      />
      <section
        class="article__body"
        v-html="parsedText(post.fields.content)"
      />
    </article>
  </the-content>
</template>

<script>
import marked from 'marked'

import TheContent from '~/components/global/TheContent'

import contentfulClient from '~/plugins/contentful'

export default {
  head() {
    return {
      title: `${this.post.fields.title} « Texte`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.intro
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
    TheContent
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
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.article__header {
  margin-bottom: space(full, relative);
  padding: 1.6rem 0.8rem;
  text-align: center;
  -webkit-transition: opacity 0.1s cubic-bezier(0, 0.1, 0.3, 1);
  transition: opacity 0.1s cubic-bezier(0, 0.1, 0.3, 1);
}

.article__intro {
  padding: space(full, viewport) space(double, viewport);
}

.article__body {
  & > h3 {
    position: relative;

    &::before {
      background-color: #b00000;
      content: '';
      height: 2px;
      right: calc(100% + 0.25em);
      position: absolute;
      top: 0;
      -webkit-transform: rotate(22.5deg);
      transform: rotate(22.5deg);
      width: 24px;
      z-index: -1;
    }
  }
}
</style>
