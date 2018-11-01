<template>
  <div class="default-layout">
    <main-header />
    <nuxt/>
  </div>
</template>

<script>
import MainHeader from '~/components/MainHeader'
// import TheFooter from '~/components/TheFooter.vue'

export default {
  metaInfo: {
    // titleTemplate: `%s | ${this.$store.state.siteName}`
  },
  components: {
    MainHeader
    // TheFooter
  }
}
</script>

<style lang="scss">
</style>
