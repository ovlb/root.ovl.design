<template>
  <the-content class="">
    <header class="archive-header u-floral-heart-gradient">
      <h1 class="main-headline">Scribbles on digital paper</h1>
    </header>
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

<style>
.archive-header {
  --gradient-bottom-offset: calc(100% - 1rem);
  --fleuron-bottom-offset: 0.66rem;

  margin-bottom: 5vh;
  min-height: 33vh;
  padding-bottom: 5vh;
  padding-top: 10vh;
  text-align: center;
}
</style>
