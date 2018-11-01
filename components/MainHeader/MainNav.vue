<template>
  <nav
    id="site-nav"
    class="main-nav"
    title="Seitennavigation">
    <nuxt-link
      :exact="true"
      class="u-is-visually-hidden"
      to="/"
      title="Zur Startseite"
      tabindex="-1"/>
    <main-nav-link
      v-for="link in links"
      :title="link.title"
      :text="link.text"
      :link="link.slug"
      :exact="link.exact"
      :key="link.id"/>
  </nav>
</template>

<script>
import MainNavLink from './MainNavLink.vue'

export default {
  components: {
    MainNavLink
  },
  data() {
    return {
      links: this.$store.state.mainNavLinks
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.main-nav {
  align-items: flex-start;
  display: flex;
  flex-flow: row wrap;
  font-size: var(--type-small);
  margin: 0 (-space(full, relative));
  position: relative;
  right: 0;
  // z-index: 100;
}
</style>
