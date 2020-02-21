<template>
  <ul class="article-list">
    <text-list-item
      v-for="article in items"
      :key="article.sys.id"
      :infos="article"
    />
  </ul>
</template>

<script>
import TextListItem from './TextListItem.vue'

export default {
  components: {
    TextListItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.article-list {
  max-width: 50ch;
  margin-left: auto;
  margin-right: auto;
  padding: 0;

  & > * + * {
    margin-top: 4vmin;
  }
}
</style>
