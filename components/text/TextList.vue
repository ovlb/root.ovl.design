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
  display: grid;
  grid-gap: space(triple, viewport);
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  padding: 0;
}
</style>
