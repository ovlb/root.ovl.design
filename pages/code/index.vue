<template>
  <the-content
    class="content--dark content--code"
    lang="en"
  >
    <p class="code-date">{{ dateString }}</p>
    <h1 class="u-is-visually-hidden">Code</h1>
    <terminal-row
      command="show-projects --verbose --directories"
      class="code-headline"
      aria-hidden="true"
    >
      <!-- <p
        class="terminal-row__output ls-output"
        v-html="itemNames"
      /> -->
    </terminal-row>
    <ul class="article-list">
      <code-card
        v-for="item in list"
        :key="item.sys.id"
        :infos="item"
      />
    </ul>
  </the-content>
</template>

<script>
import TheContent from '~/components/global/TheContent.vue'
import CodeCard from '~/components/code/CodeCard.vue'
import TerminalRow from '~/components/code/TerminalRow.vue'

import contentfulClient from '~/plugins/contentful'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Code',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '01000011 01101111 01100100 01100101 00100000 01001001 00100000 01101000 01100001 01110110 01100101 00100000 01110111 01110010 01101001 01110100 01110100 01100101 01101110'
        }
      ]
    }
  },
  layout: 'default',
  components: {
    TheContent,
    CodeCard,
    TerminalRow
  },
  computed: {
    ...mapState('code', ['count', 'list']),
    itemNames() {
      const names = this.list.map((item) => `<span>${item.fields.slug}</span>`)

      return names.join('')
    },
    dateString() {
      const d = new Date(Date.now())

      const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }
      const timeOptions = {
        hour12: false
      }

      const date = d.toLocaleDateString('en-EN', dateOptions)
      const time = d.toLocaleTimeString('en-EN', timeOptions)

      return `Last login: ${date} ${time} on ovl.design`
    }
  },
  /* methods: {
  }, */
  async fetch({ store, params }) {
    console.log('fetuching')
    const { items, total } = await contentfulClient.getEntries({
      content_type: 'code',
      order: '-fields.publishingDate'
    })

    const currentTotal = store.state.code.count

    if (currentTotal !== total) {
      store.commit('code/total', total)
      store.commit('code/add', items)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.content--code {
}

.code-date {
  font-family: monospace;
  margin-bottom: space(full, viewport);
}

.code-headline {
  margin-bottom: space(double, viewport);
}

/* .ls-output {
  display: grid;
  grid-gap: 0.25em 0.5em;
  // grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  line-height: 1;

  & span {
    grid-column: auto / span 1;
  }
} */
</style>
