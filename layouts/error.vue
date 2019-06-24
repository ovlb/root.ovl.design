<template>
  <the-content>
    <h1 class="main-headline">This page is not what it seems.</h1>
    <p v-if="error.statusCode === 404">
      Da ist etwas schief gelaufen. Ich habe vermutlich die Seite, die du
      eigentlich gesucht hast, gelöscht. Das mache ich manchmal, wenn ich denke,
      dass ich das Internet aufräumen muss. Zwecklos. Fällt mir dann auch ein.
      Und ich räume alles wieder zurück. Nur diese Seite. Die habe ich irgendwie
      vergessen. Sorry!
    </p>
  </the-content>
</template>

<script>
import contentfulClient from '~/plugins/contentful'

export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  layout: 'default',
  async asyncData() {
    const { items } = await contentfulClient.getEntries({
      content_type: 'page',
      'fields.slug': 'error'
    })

    return { content: items[0] }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';
</style>
