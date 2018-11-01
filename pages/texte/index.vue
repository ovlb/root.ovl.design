<template>
  <main>Hi</main>
</template>

<script>
import contentfulClient from '~/plugins/contentful'

export default {
  layout: 'default',
  async fetch({ store, params }) {
    const { items, total } = await contentfulClient.getEntries({
      content_type: 'article',
      order: '-fields.date'
    })

    store.commit('articles/total', total)
    store.commit('articles/add', items)
  }
}
</script>

<style>
</style>
