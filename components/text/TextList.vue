<template>
  <ul class="article-list">
    <text-list-item
      v-for="article in items"
      :key="article.sys.id"
      :infos="article" />
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
@import '~assets/css/sass/import';

.article-list {
  display: grid;
  grid-gap: space(double, viewport);
  // grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin-left: -(space(full, viewport));
  padding: 0;
}
</style>
