<template>
  <the-content>
    <h1 class="main-headline">
      Worte auf digitalem Papier
    </h1>
    <text-list :items="list" />
  </the-content>
</template>

<script>
import TheContent from '~/components/global/TheContent.vue'
import TextList from '~/components/text/TextList.vue'

import contentfulClient from '~/plugins/contentful'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Texte',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Worte auf digitalem Papier.'
        }
      ]
    }
  },
  layout: 'default',
  components: {
    TheContent,
    TextList
  },
  computed: {
    ...mapState('articles', ['count', 'list'])
  },
  async fetch({ store, params }) {
    const { items, total } = await contentfulClient.getEntries({
      content_type: 'article',
      order: '-fields.date'
    })

    const currentTotal = store.state.articles.count

    if (currentTotal !== total) {
      store.commit('articles/total', total)
      store.commit('articles/add', items)
    }
  }
}
</script>

<style></style>
